import * as types from "../types";
import createReducer from "../../common/createReducer";

export const categoryOffers = createReducer({}, {
    [types.SET_CATEGORY_OFFERS](state, action) {
        return Object.assign({}, state, action.result);
    }
});

export const mainCategories = createReducer({}, {
    [types.SET_MAIN_CATEGORIES](state, action) {
        return action.result;
    }
});

export const categories = createReducer([], {

    [types.SET_FOUND_CATEGORIES](state, action) {
        return action.result;
    },
});