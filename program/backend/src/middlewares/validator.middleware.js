const Joi = require('joi');
const httpStatus = require('http-status');
const ApiError = require('../errors/ApiError');

const validate = (schema) => (req, res, next) => {
    const validSchema = createObjectFromPickedProperties(schema, ['params', 'query', 'body']);
    const object = createObjectFromPickedProperties(req, Object.keys(validSchema));
    const { value, error } = Joi.compile(validSchema)
        .prefs({ errors: { label: 'key' }, abortEarly: false })
        .validate(object);

    if (error) {
        const errorMessage = error.details.map((details) => details.message).join(', ');
        return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
    }
    Object.assign(req, value);
    return next();
};

const createObjectFromPickedProperties = (object, keys) => {
    return keys.reduce((obj, key) => {
        if (object && Object.prototype.hasOwnProperty.call(object, key)) {
            obj[key] = object[key];
        }
        return obj;
    }, {});
};

module.exports = validate;