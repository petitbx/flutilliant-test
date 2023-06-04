const Joi = require('joi');

const visitBody = {
    body: Joi.object().keys({
        date: Joi.date().required(),
        comment: Joi.string().required(),
        nbArticlesSold: Joi.number().required(),
        turnover: Joi.number().required(),
        nextVisitDate: Joi.date().required(),
        forecastTurnover: Joi.number().required(),
        forecastNbArticles: Joi.number().required(),
        contactId: Joi.string().required(),
    })
}

module.exports = {
    visitBody
};