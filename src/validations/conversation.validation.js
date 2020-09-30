const Joi = require('@hapi/joi');
const {idsArray} = require('./custom.validation');

exports.createConversation = {
  body: Joi.object().keys({
    members: Joi.array().unique().min(1).max(50).custom(idsArray()).required(),
  }),
};
