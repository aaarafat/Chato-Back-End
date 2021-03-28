const Joi = require('@hapi/joi');
const { idCheck } = require('./custom.validation');

exports.sendMessage = {
  body: Joi.object().keys({
    message: Joi.required(),
    conversationId: Joi.required().custom(idCheck),
  }),
};
