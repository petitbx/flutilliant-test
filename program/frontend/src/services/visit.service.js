import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3000/";

export const newVisit =
    (
        date,
        comment,
        nbArticlesSold,
        turnover,
        nextVisitDate,
        forecastTurnover,
        forecastNbArticles,
        contactId
    ) => {
    return axios.post(API_URL + "visit", {
        date,
        comment,
        nbArticlesSold,
        turnover,
        nextVisitDate,
        forecastTurnover,
        forecastNbArticles,
        contactId
    }, {headers: authHeader()})
        .then((response) => {
            if (response.data.visit) {
                return response.data.visit;
            }
        })
}

export const getVisits = () => {
    return axios.get(API_URL + "visit", {headers: authHeader()}).then(
        (response) => {
            if (response.data.visit) {
                return response.data.visit;
            }
        }
    )
}
