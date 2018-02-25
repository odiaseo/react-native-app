import * as types from "./types";
import apiHelper from "../common/apiHelper";
import {setFoundResults, setRefreshStatus} from "./coupon";

export function findMerchantsByKeyword(keyword, page = 1, limit = 20) {
    return (dispatch, getState) => {
        const {accessToken} = getState();

        return apiHelper.getMerchants(accessToken, keyword, page, limit)
            .then((resp) => {
                dispatch(setFoundResults({result: resp, type: types.SET_SEARCHED_MERCHANTS}));
                dispatch(setRefreshStatus({status: false}));
            }).catch((ex) => console.log(ex));
    }
}

export function findMerchantById(merchantId) {
    return (dispatch, getState) => {
        const {accessToken} = getState();

        return apiHelper.getMerchantById(accessToken, merchantId)
            .then((resp) => {
                dispatch(setFoundResults({result: resp, type: types.SET_MERCHANT_DETAIL}));
                dispatch(setRefreshStatus({status: false}));
            }).catch((ex) => console.log(ex));
    }
}