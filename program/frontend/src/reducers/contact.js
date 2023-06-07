import {
    GET_CONTACTS_SUCCESS,
    NEW_CONTACT_SUCCESS, UPDATE_CONTACT_SUCCESS
} from "../actions/types";
import {control} from "react-validation/build/main";

const initialState = {
    contacts: []
};
export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case NEW_CONTACT_SUCCESS:
            return {
                contacts: [...state.contacts, payload.contact]
            };
        case GET_CONTACTS_SUCCESS:
            return {
                contacts: [...payload.contact]
            }
        case UPDATE_CONTACT_SUCCESS:
            let contacts = state.contacts.filter((contact => contact._id !== payload.contact._id))
            return {
                contacts : [...contacts, payload.contact]
            }
        default:
            return state;
    }
}
