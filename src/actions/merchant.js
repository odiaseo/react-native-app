import * as types from "./types";

export function findMerchantsByKeyword(keyword, page = 1, limit = 20) {

    return {
        type: types.SEARCH_MERCHANT,
        keyword: keyword,
        page: page,
        limit: limit
    }
}

export function findMerchantById(merchantId) {
    return {
        type: types.GET_MERCHANT_DETAIL,
        merchantId: merchantId
    }
}