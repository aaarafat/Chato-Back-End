const httpStatus = require('http-status');
const AppError = require('../utils/AppError');
const config = require('config');
const logger = require('./../config/logger');

const errorConverter = (err, req, res, next) => {
  let error = err;
  if ((process.env.NODE_ENV || config.get('NODE_ENV')) === 'development') {
    logger.error(err);
  }

  if (error.code === 'ENOENT') error = handleENOENTError(error);
  if (error.name === 'ValidationError') error = handleValidationErrorDB(error);
  if (error.name === 'JsonWebTokenError') error = handleJWTError(error);
  if (error.name === 'TokenExpiredError') error = handleJWTExpiredError(error);
  if (error.code === 11000) error = handleDuplicateFieldsDB(error);
  if (!(error instanceof AppError)) {
    const statusCode = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new AppError(message, statusCode, false, err.stack);
  }
  next(error);
};

const handleENOENTError = (err) => {
  return new AppError('File Does Not exist', 404);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

/**
 * Handle JWT Error
 *
 * @function
 * @private
 * @author Abdelrahman Tarek
 * @param {Object} err Error object
 * @return {Object} AppError object
 */
const handleJWTError = (err) =>
  new AppError('Invalid Token. Please log in again', 401);

/**
 * Handle JWT Expired Error
 *
 * @function
 * @private
 * @author Abdelrahman Tarek
 * @param {Object} err Error object
 * @return {Object} AppError object
 */
const handleJWTExpiredError = (err) =>
  new AppError('Your token has expired! Please log in again.', 401);

/**
 * Handle Duplicate field value Error
 *
 * @function
 * @private
 * @author Abdelrahman Tarek
 * @param {Object} err Error object
 * @return {Object} AppError object
 */
const handleDuplicateFieldsDB = (err) => {
  const field = Object.keys(err.keyValue)[0];
  const value = err.keyValue[field];
  const message = `Duplicate field: ${field} value: ${value}`;
  return new AppError(message, 400);
};

const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  if (
    (process.env.NODE_ENV || config.get('NODE_ENV')) === 'production' &&
    !err.isOperational
  ) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;

  const response = {
    status: statusCode,
    message,
    ...((process.env.NODE_ENV || config.get('NODE_ENV')) === 'development' && {
      stack: err.stack,
    }),
  };

  if ((process.env.NODE_ENV || config.get('NODE_ENV')) === 'development') {
    logger.error(err);
  }
  res.status(statusCode).send(response);
};

module.exports = {
  errorConverter,
  errorHandler,
};
