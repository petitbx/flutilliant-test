import {
    NEW_ADDRESS_SUCCESS,
    NEW_ADDRESS_FAIL,
    GET_ADDRESSES_SUCCESS,
    GET_ADDRESSES_FAILED,
    UPDATE_ADDRESS_SUCCESS,
    UPDATE_ADDRESS_FAIL,
    GET_ADDRESS_SUCCESS,
    GET_ADDRESS_FAILED
} from "./types";
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

export const updateAddress = (addressId, address, postalCode, city) => (dispatch) => {
    return addressService.updateAddress(addressId, address, postalCode, city).then(
        (data) => {
            dispatch({
                type: UPDATE_ADDRESS_SUCCESS,
                payload: {address: data}
            });

            return Promise.resolve();
        },
        (error) => {
            dispatch({
                type: UPDATE_ADDRESS_FAIL
            });

            return Promise.reject();
        }
    )
}

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

export const getAddress = (addressId) => (dispatch) => {
    return addressService.getAddress(addressId).then(
        (data) => {
            dispatch({
                type: GET_ADDRESS_SUCCESS,
                payload: {address: data}
            });

            return Promise.resolve();
        },
        (error) => {
            dispatch({
                type: GET_ADDRESS_FAILED
            });

            return Promise.reject();
        }
    )
}
