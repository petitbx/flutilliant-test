require('express-async-errors');
const { visitService, contactService} = require('../services');
const ApiError = require('../errors/ApiError');
const httpStatus = require('http-status');

const createVisit = async (req, res) => {
    let {
        date,
        comment,
        nbArticlesSold,
        turnover,
        nextVisitDate,
        forecastTurnover,
        forecastNbArticles,
        contactId
    } = req.body;

    let contact = await contactService.getContactById(contactId);
    if (!contact) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Incorrect Contact Id");
    }

    let params = {
        date: date,
        comment: comment,
        nbArticlesSold: nbArticlesSold,
        turnover: turnover,
        nextVisitDate: nextVisitDate,
        forecastTurnover: forecastTurnover,
        forecastNbArticles: forecastNbArticles,
        contact: contactId,
        salesRep: req.user._id
    }



    let newVisit = await visitService.createVisit(params);
    res.json({visit: newVisit});
}

const updateVisit = async (req, res) => {
    let {
        date,
        comment,
        nbArticlesSold,
        turnover,
        nextVisitDate,
        forecastTurnover,
        forecastNbArticles,
        contactId
    } = req.body;

    let visitToUpdate = await visitService.getVisitByIdAndSales(req.params.id, req.user._id);
    if (!visitToUpdate) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Incorrect ID or not your visit");
    }

    let contact = await contactService.getContactById(contactId);
    if (!contact) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Incorrect Contact Id");
    }

    let params = {
        date: date,
        comment: comment,
        nbArticlesSold: nbArticlesSold,
        turnover: turnover,
        nextVisitDate: nextVisitDate,
        forecastTurnover: forecastTurnover,
        forecastNbArticles: forecastNbArticles,
        contact: contactId,
        salesRep: req.user._id
    }

    let visitUpdated = await visitService.updateVisitWithParams(visitToUpdate, params);
    res.json({visit: visitUpdated});
}

const deleteVisit = async (req, res) => {
    let visitToDelete = await visitService.getVisitByIdAndSales(req.params.id, req.user._id);
    if (!visitToDelete) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Incorrect ID or not your visit");
    }

    let deleted = visitService.deleteVisit(visitToDelete);

    res.json({ deleted: true })

}

module.exports = {
    createVisit,
    updateVisit,
    deleteVisit
}