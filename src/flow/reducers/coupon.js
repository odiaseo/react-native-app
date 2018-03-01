import * as types from "../types";
import createReducer from "../../common/createReducer";
import {storeCoupons} from "../../common/helperFuntions";

export const foundCoupons = createReducer({}, {
    [types.SET_FOUND_COUPONS](state, action) {
        return storeCoupons(state, action);
    }
});

export const topCoupons = createReducer({}, {
    [types.SET_TOP_COUPONS](state, action) {
        return storeCoupons(state, action);
    }
});

export const featuredCoupons = createReducer({}, {
    [types.SET_FEATURED_COUPONS](state, action) {
        return storeCoupons(state, action);
    }
});

export const latestCoupons = createReducer({}, {
    [types.SET_LATEST_COUPONS](state, action) {
        return storeCoupons(state, action);
    }
});

export const popularCoupons = createReducer({}, {
    [types.SET_POPULAR_COUPONS](state, action) {
        return storeCoupons(state, action);
    }
});

export const expiringCoupons = createReducer({}, {
    [types.SET_EXPIRING_COUPONS](state, action) {
        return storeCoupons(state, action);
    }
});

export const searchedCoupons = createReducer({}, {
    [types.SET_SEARCHED_COUPONS](state, action) {
        return storeCoupons(state, action);
    }
});
