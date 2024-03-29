const Joi = require('@hapi/joi');
const {idCheck} = require('./custom.validation');

exports.registerUser = {
  body: Joi.object().keys({
    name: Joi.string().min(5).max(50).required(),
    username: Joi.string().min(5).max(50).required(),
    email: Joi.string().email().min(6).max(255).required(),
    password: Joi.string().min(8).max(255).required(),
    repeatPassword: Joi.ref('password'),
  }),
};

/**
 * Schema that checks that the request is valid for getUserById endpoint
 *
 * @author Abdelrahman Tarek
 * @summary Schema for a req for getUserById endpoint
 * @namespace
 * @property {object} params
 * An object containing parameter values parsed from the URL path
 * @property {string} params.id Id of the user
 */

exports.getUserById = {
  params: Joi.object().keys({
    id: Joi.required().custom(idCheck),
  }),
};

exports.changePassword = {
  body: Joi.object().keys({
    password: Joi.string().min(8).max(255).required(),
    repeatPassword: Joi.any()
      .equal(Joi.ref('password'))
      .required(),
    oldPassword: Joi.string().min(8).max(255).required(),
  }),
};
