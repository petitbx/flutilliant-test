import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3000/";

export const createContact = (address, postalCode, city) => {
    return axios.post(API_URL + "contact", {
        address,
        postalCode,
        city
    }, {headers: authHeader()})
        .then((response) => {
            if (response.data.address) {
                return response.data.address;
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

export const updateContact = (contactId, contact, postalCode, city) => {
    return axios.put(API_URL + "contact/" + contactId, {
        contact,
        postalCode,
        city
    }, {headers: authHeader()})
        .then((response) => {
            if (response.data.contact) {
                return response.data.contact;
            }
        })
}
