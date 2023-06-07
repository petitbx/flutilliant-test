import {visitService} from "../services";
import {NEW_VISIT_FAILED, NEW_VISIT_SUCCESS} from "./types";

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