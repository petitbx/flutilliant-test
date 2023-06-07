import {contactService} from "../services";
import {
    GET_CONTACT_FAIL,
    GET_CONTACT_SUCCESS,
    GET_CONTACTS_FAIL,
    GET_CONTACTS_SUCCESS,
    NEW_CONTACT_FAIL,
    NEW_CONTACT_SUCCESS,
    UPDATE_CONTACT_FAIL,
    UPDATE_CONTACT_SUCCESS
} from "./types";

export const newContact = (lastName, firstName, phoneNumber, email, addressId) => (dispatch) => {
    return contactService.createContact(lastName, firstName, phoneNumber, email, addressId).then(
        (data) => {
            dispatch({
                type: NEW_CONTACT_SUCCESS,
                payload: {contact: data}
            });

            return Promise.resolve();
        },
        (error) => {
            dispatch({
                type: NEW_CONTACT_FAIL
            });

            return Promise.reject();
        }
    )
}

export const getAllContacts = () => (dispatch) => {
    return contactService.getAllContacts().then(
        (data) => {
            dispatch({
                type: GET_CONTACTS_SUCCESS,
                payload: {contact: data}
            });

            return Promise.resolve();
        },
        (error) => {
            dispatch({
                type: GET_CONTACTS_FAIL
            });

            return Promise.reject();
        }
    )
}

export const getContact = (contactId) => (dispatch) => {
    return contactService.getContact(contactId).then(
        (data) => {
            dispatch({
                type: GET_CONTACT_SUCCESS,
                payload: {contact: data}
            });

            return Promise.resolve();
        },
        (error) => {
            dispatch({
                type: GET_CONTACT_FAIL
            });

            return Promise.reject();
        }
    )
}

export const updateContact = (contactId, lastname, firstname, phoneNumber, email, addressId) => (dispatch) => {
    return contactService.updateContact(
        contactId,
        lastname,
        firstname,
        phoneNumber,
        email,
        addressId
    ).then(
        (data) => {
            dispatch({
                type: UPDATE_CONTACT_SUCCESS,
                payload: {contact: data}
            });

            return Promise.resolve();
        },
        (error) => {
            dispatch({
                type: UPDATE_CONTACT_FAIL
            });

            return Promise.reject();
        }
    )
}