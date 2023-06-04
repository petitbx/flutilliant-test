const Joi = require('joi');

const contactBody = {
    body: Joi.object().keys({
        lastName: Joi.string().required(),
        firstName: Joi.string().required(),
        email: Joi.string().required().email(),
        phoneNumber: Joi.string().required(),
        addressId: Joi.string().required(),
    })
}

module.exports = {
    contactBody
};