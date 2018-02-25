import * as constants from "../constants";
import {searchCouponsByKeyword} from "./coupon";
import {findMerchantsByKeyword} from "./merchant";

export function searchByKeyword(type, searchTerm, page = 1) {

    switch (type) {
        case constants.SEARCH_MERCHANT:
            return findMerchantsByKeyword(searchTerm, page);
        default:
            return searchCouponsByKeyword(searchTerm, page);
    }
}