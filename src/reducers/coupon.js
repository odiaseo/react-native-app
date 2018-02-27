import * as types from "../actions/types";
import createReducer from "../common/createReducer";

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

const storeCoupons = function (state, action) {
    if (!action.result.data) {
        return state;
    }

    const items = {};

    action.result.data.forEach((coupon) => {
        if (coupon.merchant) {
            items[coupon.id] = coupon;
        }
    });

    return items;
};