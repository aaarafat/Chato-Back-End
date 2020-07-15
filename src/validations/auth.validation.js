const Joi = require('@hapi/joi');

exports.loginUser = {
  body: Joi.object().keys({
    email: Joi.string().email().min(6).max(255).required(),
    password: Joi.string().min(5).max(255).required(),
  }),
};
