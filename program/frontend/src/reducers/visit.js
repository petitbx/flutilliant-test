import {
    NEW_VISIT_SUCCESS,
} from "../actions/types";

const initialState = {
    visits: []
};
export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case NEW_VISIT_SUCCESS:
            return {
                visits: [...state.visits, payload.visit]
            };
        default:
            return state;
    }
}