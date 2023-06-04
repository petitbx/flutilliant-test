const Joi = require('joi');

const addressBody = {
    body: Joi.object().keys({
        postalCode: Joi.string().required(),
        city: Joi.string().required(),
        address: Joi.string().required()
    })
}

module.exports = {
    addressBody
};