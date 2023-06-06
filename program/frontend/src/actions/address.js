import {NEW_ADDRESS_SUCCESS, NEW_ADDRESS_FAIL, GET_ADDRESSES_SUCCESS, GET_ADDRESSES_FAILED} from "./types";
import {addressService} from "../services";

export const newAddress = (address, postalCode, city) => (dispatch) => {
    return addressService.createAddress(address, postalCode, city).then(
        (data) => {
            dispatch({
                type: NEW_ADDRESS_SUCCESS,
                payload: {address: data}
            });

            return Promise.resolve();
        },
        (error) => {
            dispatch({
                type: NEW_ADDRESS_FAIL
            });

            return Promise.reject();
        }
    )
};

export const getAllAddresses = () => (dispatch) => {
    return addressService.getAllAddresses().then(
        (data) => {
            dispatch({
                type: GET_ADDRESSES_SUCCESS,
                payload: {address: data}
            });

            return Promise.resolve();
        },
        (error) => {
            dispatch({
                type: GET_ADDRESSES_FAILED
            });

            return Promise.reject();
        }
    )
}
