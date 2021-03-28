const Joi = require('@hapi/joi');
const { idsArray, idCheck } = require('./custom.validation');

exports.createConversation = {
  body: Joi.object().keys({
    members: Joi.array().unique().min(1).max(50).custom(idsArray()).required(),
  }),
};

/**
 * Schema for ConversationId
 *
 * @author Abdelrahman Tarek
 * @summary Schema for ConversationId
 * @namespace
 * @property {object} params
 * An object containing parameter values parsed from the URL path
 * @property {string} params.id Id of the conversation
 */

exports.conversationId = {
  params: Joi.object().keys({
    id: Joi.required().custom(idCheck),
  }),
};

exports.getConversations = {
  query: Joi.object().keys({
    limit: Joi.number().default(20).min(1).max(50),
    offset: Joi.number().default(0).min(0),
  }),
};

exports.getConversationMessages = {
  query: Joi.object().keys({
    limit: Joi.number().default(20).min(1).max(50),
    offset: Joi.number().default(0).min(0),
  }),
  params: Joi.object().keys({
    id: Joi.required().custom(idCheck),
  }),
};
