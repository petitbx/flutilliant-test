import {visitService} from "../services";
import {GET_VISITS_FAILED, GET_VISITS_SUCCESS, NEW_VISIT_FAILED, NEW_VISIT_SUCCESS} from "./types";

export const newVisit = (
    date,
    comment,
    nbArticlesSold,
    turnover,
    nextVisitDate,
    forecastTurnover,
    forecastNbArticles,
    contact
) => (dispatch) => {
    return visitService.newVisit(
        date,
        comment,
        nbArticlesSold,
        turnover,
        nextVisitDate,
        forecastTurnover,
        forecastNbArticles,
        contact
    ).then((data) => {
            dispatch({
                type: NEW_VISIT_SUCCESS,
                payload: {visit: data}
            });

            return Promise.resolve();
        },
        (error) => {
            dispatch({
                type: NEW_VISIT_FAILED
            });

            return Promise.reject();
        }
    )
}

export const getVisits = () => (dispatch) => {
    return visitService.getVisits().then(
        (data) => {
            dispatch({
                type: GET_VISITS_SUCCESS,
                payload: {visit: data}
            })

            return Promise.resolve();
        },
        (error) => {
            dispatch({
                type: GET_VISITS_FAILED
            });

            return Promise.reject();
        }
    )
}