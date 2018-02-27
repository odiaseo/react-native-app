import * as constants from "../constants";
import * as types from "./types";

export function searchByKeyword(type, searchTerm, page = 1) {
    switch (type) {
        case constants.SEARCH_MERCHANT:
            return {
                type: types.SEARCH_MERCHANT,
                searchTerm,
                page
            };
        default:
            return {
                type: types.SEARCH_COUPONS,
                searchTerm,
                page
            };
    }
}

export function getCouponsByType(type, page = 1) {
    return {
        type: types.GET_COUPONS,
        storeType: type,
        segment: types.GET_COUPONS,
        page
    };
}

export function setActivityStatus(status) {
    return {
        type: types.SET_REFRESH_STATUS,
        isRefreshing: status
    };
}

export function getAccessToken() {
    return {
        type: types.GET_ACCESS_TOKEN
    };
}

export function getSliders() {

    return {
        type: types.GET_SLIDERS
    };
}