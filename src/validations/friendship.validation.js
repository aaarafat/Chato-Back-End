const Joi = require('@hapi/joi');
const { idCheck } = require('./custom.validation');

/**
 * Schema for FriendRequestId
 *
 * @author Abdelrahman Tarek
 * @summary Schema for FriendRequestId
 * @namespace
 * @property {object} params
 * An object containing parameter values parsed from the URL path
 * @property {string} params.id Id of the user
 */

exports.FriendRequestId = {
  params: Joi.object().keys({
    id: Joi.required().custom(idCheck),
  }),
};

exports.getFriendRequests = {
  query: Joi.object().keys({
    limit: Joi.number().default(20).min(1).max(50),
    offset: Joi.number().default(0).min(0),
  }),
};
