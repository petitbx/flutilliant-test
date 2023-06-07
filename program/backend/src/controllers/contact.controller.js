require('express-async-errors');
const { addressService, contactService} = require('../services');
const ApiError = require("../errors/ApiError");
const httpStatus = require("http-status");
const createContact = async (req, res) => {
    let { lastName, firstName, email, phoneNumber, addressId } = req.body;
    let address = await addressService.getAddressById(addressId);
    if (!address) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Incorrect address id")
    }
    let params = {
        lastName: lastName,
        firstName: firstName,
        email: email,
        phoneNumber: phoneNumber,
        address: addressId
    };
    let newContact = await contactService.createContact(params)
    res.json({ contact: newContact });
}

const updateContact = async (req, res) => {
    let { lastName, firstName, email, phoneNumber, addressId } = req.body;
    let address = await addressService.getAddressById(addressId);
    if (!address) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Incorrect address id")
    }
    let contactToUpdate = await contactService.getContactById(req.params.id);
    if (!contactToUpdate) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Incorrect id");
    }

    let params = {
        lastName: lastName,
        firstName: firstName,
        email: email,
        phoneNumber: phoneNumber,
        address: addressId
    };

    let contactUpdated = await contactService.updateContactWithParams(contactToUpdate, params);
    res.json({ contact: contactUpdated });
}

const getContacts = async (req, res) => {
    let contacts = await contactService.getContacts();
    res.json({ contact: contacts });
}

const getContact = async (req, res) => {
    let contact = await contactService.getContactById(req.params.id);
    res.json({ contact: contact })
}

module.exports = {
    createContact,
    updateContact,
    getContacts,
    getContact
};