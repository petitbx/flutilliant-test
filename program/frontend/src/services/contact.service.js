import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3000/";

export const createContact = (lastName, firstName, phoneNumber, email, addressId) => {
    return axios.post(API_URL + "contact", {
        lastName,
        firstName,
        phoneNumber,
        email,
        addressId
    }, {headers: authHeader()})
        .then((response) => {
            if (response.data.contact) {
                return response.data.contact;
            }
        })
}

export const getContact = (contactId) => {
    return axios.get(API_URL + "contact/" + contactId,
        {headers: authHeader()})
        .then((response) => {
            if (response.data.contact) {
                return response.data.contact;
            }
        })
}

export const getAllContacts = () => {
    return axios.get(API_URL + "contact", {
        headers: authHeader()
    }).then((response) => {
        if (response.data.contact) {
            return response.data.contact;
        }
    })
}

export const updateContact = (contactId, lastName, firstName, phoneNumber, email, addressId) => {
    return axios.put(API_URL + "contact/" + contactId, {
        lastName,
        firstName,
        phoneNumber,
        email,
        addressId
    }, {headers: authHeader()})
        .then((response) => {
            if (response.data.contact) {
                return response.data.contact;
            }
        })
}
