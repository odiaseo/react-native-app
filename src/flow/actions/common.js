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

export function setActivityStatus(status) {
    return {
        type: types.SET_REFRESH_STATUS,
        status: status
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