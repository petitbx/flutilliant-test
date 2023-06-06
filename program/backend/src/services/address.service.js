const { Address } = require('../models');

const getAddressById = async (id) => {
    try {
        return await Address.findById(id);
    } catch (error) {
        return null;
    }
}

const updateAddressWithParams = async (address, params) => {
    address.set(params)
    await address.save();
    return address;
}

const createAddress = async (params) => {
    let newAddress = new Address(params);
    await newAddress.save();
    return newAddress;
}

const getAllAdresses = async () => {
    return Address.find();
}

module.exports = {
    getAddressById,
    updateAddressWithParams,
    createAddress,
    getAllAdresses
}