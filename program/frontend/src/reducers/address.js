import {
    GET_ADDRESSES_SUCCESS,
    NEW_ADDRESS_SUCCESS,
} from "../actions/types";

const initialState = {
    addresses: []
};
export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case NEW_ADDRESS_SUCCESS:
            return {
                addresses: [...state.addresses, payload.address]
            };
        case GET_ADDRESSES_SUCCESS:
            return {
                addresses: [...payload.address]
            };
        default:
            return state;
    }
}
