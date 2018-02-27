import * as constants from "../constants";
import * as types from "./types";

export function searchByKeyword(type, searchTerm, page = 1) {
    switch (type) {
        case constants.SEARCH_MERCHANT:
            return {
                type: types.SEARCH_MERCHANT,
                searchTerm: searchTerm,
                page: page
            };
        default:
            return {
                type: types.SEARCH_COUPONS,
                searchTerm: searchTerm,
                page: page
            };
    }
}

export function getCouponsByType(type, page = 1) {
    return {
        type: types.GET_COUPONS,
        storeType: type,
        segment: types.GET_COUPONS,
        page: page
    }
}

export function getCategories() {
    return {
        type: types.LIST_CATEGORIES
    }
}

export function getCategoryCarouselOffers(categoryIdList = []) {
    return {
        type: types.GET_CATEGORY_OFFERS,
        categoryIdList: categoryIdList
    }
}


export function setActivityStatus(status) {
    return {
        type: types.SET_REFRESH_STATUS,
        isRefreshing: status
    }
}

export function getAccessToken() {
    return {
        type: types.GET_ACCESS_TOKEN
    }
}

export function getSliders() {

    return {
        type: types.GET_SLIDERS
    }
}