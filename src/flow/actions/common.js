import * as constants from "../../constants/index";
import * as types from "../types";

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

export function getHomePageData() {
    return [
        {
            type: types.SET_REFRESH_STATUS,
            status: true
        },
        {
            type: types.GET_HOME_PAGE_DATA,
        }
    ];
}

export function resetCache() {
    return {
        type: types.RESET_CACHE,
    };
}

export function setActivityStatus(status) {
    return {
        type: types.SET_REFRESH_STATUS,
        status
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