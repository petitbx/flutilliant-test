const { Visit } = require('../models');

const getVisitById = async (id) => {
    try {
        return await Visit.findById(id);
    } catch (error) {
        return null;
    }
}

const getVisitByIdAndSales = async (id, salesRep) => {
    try {
        return await Visit.find({_id: id, salesRep: salesRep});
    } catch (error) {
        return null;
    }
}

const updateVisitWithParams = async (visit, params) => {
    visit.set(params);
    await visit.save();
    return visit;
}

const createVisit = async (params) => {
    let newVisit = new Visit(params);
    await newVisit.save();
    return newVisit;
}

const deleteVisit = async (visit) => {
    await Visit.deleteOne({id: visit._id});
    return true;
}

const getAllVisits = async (visit) => {
    return Visit.find()
}

const getVisitBySalesRep = async (salesRep) => {
    try {
        return await Visit.find({salesRep: salesRep});
    } catch (error) {
        return null;
    }
}

module.exports = {
    getVisitById,
    updateVisitWithParams,
    createVisit,
    getVisitByIdAndSales,
    deleteVisit,
    getAllVisits,
    getVisitBySalesRep,
};