const Joi = require('@hapi/joi');

exports.registerUser = {
  body: Joi.object().keys({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().email().min(6).max(255).required(),
    password: Joi.string().min(5).max(255).required(),
    repeatPassword: Joi.ref('password'),
  }),
};
