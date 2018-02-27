import * as types from "../actions/types";
import createReducer from "../common/createReducer";

export const searchTerm = createReducer("", {
    [types.SET_SEARCH_TERM](state, action) {
        if (action.keyword) {
            return action.keyword;
        }
        return state;
    }
});