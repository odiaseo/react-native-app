import * as types from "../types";

export function getCouponsByType(type, page = 1, limit = 20) {
    return {
        type: types.GET_COUPONS,
        storeType: type,
        segment: types.GET_COUPONS,
        page: page,
        limit: limit
    };
}
