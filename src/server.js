const mongoose = require('mongoose');
const app = require('./app');
const config = require('config');
const logger = require('./config/logger');
const socketIo = require('./config/socket');

let server;
const port = process.env.PORT || config.get('PORT') || 3000;
logger.info(process.env.DB || config.get('db'));
mongoose
  .connect(process.env.DB || config.get('db'), {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info('Connected to MongoDB');
    server = app.listen(port, () => {
      logger.info(`Listening to port ${port}`);
    });

    socketIo.server(server);
  })
  .catch((err) => {
    logger.error('Error: ', err);
  });

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
