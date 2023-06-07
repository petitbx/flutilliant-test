import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3000/";

export const createAddress = (address, postalCode, city) => {
    return axios.post(API_URL + "address", {
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

export const getAddress = (addressId) => {
    return axios.get(API_URL + "address/" + addressId,
    {headers: authHeader()})
        .then((response) => {
            if (response.data.address) {
                return response.data.address;
            }
        })
}

export const getAllAddresses = () => {
    return axios.get(API_URL + "address", {
        headers: authHeader()
    }).then((response) => {
        if (response.data.address) {
            return response.data.address;
        }
    })
}

export const updateAddress = (addressId, address, postalCode, city) => {
    return axios.put(API_URL + "address/" + addressId, {
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
