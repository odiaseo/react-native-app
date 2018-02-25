import * as types from "../actions/types";
import createReducer from "../common/createReducer";

export const searchedMerchants = createReducer({}, {
    [types.SET_SEARCHED_MERCHANTS](state, action) {
        return storeMerchants(state, action);
    },
});

export const merchantDetails = createReducer({}, {
    [types.SET_MERCHANT_DETAIL](state, action) {
        return action.result;
    }
});

storeMerchants = function (state, action) {
    if (!action.result.data) {
        return state;
    }

    let items = {};

    action.result.data.forEach((merchant) => {
        items[merchant.id] = merchant
    });

    return items;
};