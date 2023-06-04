const { Contact } = require('../models');

const getContactById = async (id) => {
    try {
        return await Contact.findById(id);
    } catch (error) {
        return null;
    }
}

const updateContactWithParams = async (contact, params) => {
    contact.set(params)
    await contact.save();
    return contact;
}

const createContact = async (params) => {
    let newContact = new Contact(params);
    await newContact.save();
    return newContact;
}

module.exports = {
    getContactById,
    updateContactWithParams,
    createContact,
}