const Joi = require('@hapi/joi');
const { idCheck } = require('./custom.validation')

/**
 * Schema that checks that the request is valid for sendFriendRequest endpoint
 *
 * @author Abdelrahman Tarek
 * @summary Schema for a req for sendFriendRequest endpoint
 * @namespace
 * @property {object} params An object containing parameter values parsed from the URL path
 * @property {string} params.id Id of the user
 */

exports.sendFriendRequest = {
    params: Joi.object().keys({
        id: Joi.required().custom(idCheck)
    })
};
