const Joi = require('@hapi/joi');

exports.userSearch = {
    query: Joi.object().keys({
        limit: Joi.number().default(20).min(1).max(50),
        offset: Joi.number().default(0).min(0),
        q: Joi.string().required()
    })
}