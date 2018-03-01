import * as types from "../types";

export function findMerchantsByKeyword(keyword, page = 1, limit = 20) {

    return {
        type: types.SEARCH_MERCHANT,
        keyword,
        page,
        limit
    };
}

export function findMerchantById(merchantId) {
    return {
        type: types.GET_MERCHANT_DETAIL,
        merchantId
    };
}

export function findMerchantsByCategory(categoryId) {
    return {
        type: types.SEARCH_MERCHANT_BY_CATEGORY,
        categoryId
    };
}

export function clearMerchantDetails() {
    return {
        type: types.CLEAR_MERCHANT_DETAILS,
    };
}

export function getCouponsByMerchantId(merchantId, page = 1, limit = 5) {
    return {
        type: types.GET_MERCHANT_COUPONS,
        merchantId: merchantId,
        page: page,
        limit: limit
    };
}

export function getCarouselMerchants() {
    return {
        type: types.GET_CAROUSEL_MERCHANTS,
    };
}