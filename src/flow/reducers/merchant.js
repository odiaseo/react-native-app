import * as types from "../types";
import createReducer from "../../common/createReducer";
import {storeCoupons, storeMerchants} from "../../common/helperFuntions";

export const searchedMerchants = createReducer({}, {
    [types.SET_SEARCHED_MERCHANTS](state, action) {
        return storeMerchants(state, action);
    },
});

export const categoryMerchants = createReducer([], {
    [types.SET_CATEGORY_MERCHANTS](state, action) {
        return action.result;
    }
});

export const carouselMerchants = createReducer([], {
    [types.SET_CAROUSEL_MERCHANTS](state, action) {
        return action.result;
    }
});

export const merchantDetails = createReducer({}, {
    [types.SET_MERCHANT_DETAIL](state, action) {
        return action.result;
    },

    [types.CLEAR_MERCHANT_DETAILS]() {
        return {};
    }
});

export const merchantCoupons = createReducer({}, {
    [types.SET_MERCHANT_COUPONS](state, action) {
        return storeCoupons(state, action);
    },
    [types.CLEAR_MERCHANT_DETAILS]() {
        return {};
    }
});