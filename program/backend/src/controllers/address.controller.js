require('express-async-errors');
const { addressService } = require('../services');
const ApiError = require("../errors/ApiError");
const httpStatus = require("http-status");
const createAddress = async (req, res) => {
    let { city, address, postalCode } = req.body;
    let params = {
        city: city,
        address: address,
        postalCode: postalCode
    };
    let newAddress = await addressService.createAddress(params)
    res.json({ address: newAddress });
}

const updateAddress = async (req, res) => {
    let { city, address, postalCode } = req.body;
    let addressToUpdate = await addressService.getAddressById(req.params.id);
    if (!addressToUpdate) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Incorrect id");
    }
    let params = {
        city: city,
        address: address,
        postalCode: postalCode
    };

    let addressUpdated = await addressService.updateAddressWithParams(addressToUpdate, params);
    res.json({ address: addressUpdated });
}

const getAddresses = async (req, res) => {
    let addresses = await addressService.getAllAdresses();
    res.json({address: addresses});
}

module.exports = {
    createAddress,
    updateAddress,
    getAddresses
};