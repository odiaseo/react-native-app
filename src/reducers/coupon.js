import * as types from "../actions/types";
import createReducer from "../common/createReducer";

export const foundCoupons = createReducer({}, {

    [types.SET_FOUND_COUPONS](state, action) {

        let items = {};

        action.result.data.forEach((coupon) => {
            items[coupon.id] = coupon
        });

        return {
            coupons: items,
            page: action.result.current_page,
            total: action.result.total
        }
    }
});

export const searchedCoupons = createReducer({}, {

    [types.SET_SEARCHED_COUPONS](state, action) {

        let items = {};

        action.result.data.forEach((coupon) => {
            items[coupon.id] = coupon
        });

        return {
            coupons: items,
        }
    },
});

export const refreshStatus = createReducer({}, {
    [types.SET_REFRESH_STATUS](state, action) {
        return {
            isRefreshing: action.isRefreshing,
        }
    }
});

export const searchTerm = createReducer({}, {
    [types.SET_SEARCH_TERM](state, action) {
        return {
            keyword: action.keyword
        };
    }
});