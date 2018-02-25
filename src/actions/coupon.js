import * as types from './types';
import apiHelper from "../common/apiHelper";
import * as constant from '../constants';

export function getHomePageCoupons(page = 1) {
    return _getCoupons(constant.FEATURED_COUPONS);
}

export function getFeatureCoupons(page = 1) {
    return _getCoupons(constant.FEATURED_COUPONS, types.SET_FEATURED_COUPONS);
}

export function getTopCoupons(page = 1) {
    return _getCoupons(constant.TOP_COUPONS, types.SET_TOP_COUPONS);
}

export function getLatestCoupons(page = 1) {
    return _getCoupons(constant.LATEST_COUPONS, types.SET_LATEST_COUPONS);
}

export function getExpiringCoupons(page = 1) {
    return _getCoupons(constant.EXPIRING_COUPONS, types.SET_EXPIRING_COUPONS);
}

export function getPopularCoupons(page = 1) {
    return _getCoupons(constant.POPULAR_COUPONS, types.SET_POPULAR_COUPONS);
}

export function _getCoupons(segment, type = types.SET_FOUND_COUPONS, page = 1) {
    return (dispatch, getState) => {
        const {accessToken} = getState();

        return apiHelper.getCoupons(accessToken, segment, page)
            .then((resp) => {
                dispatch(setFoundResults({result: resp, type: type}));
                dispatch(setRefreshStatus({status: false}));
            }).catch((ex) => console.log(ex));
    }
}

export function searchCouponsByKeyword(searchTerm, page = 1) {
    return (dispatch, getState) => {
        const {accessToken} = getState();

        return apiHelper.searchCoupons(accessToken, searchTerm, page)
            .then((resp) => {
                dispatch(setSearchTerm({keyword: searchTerm}));
                dispatch(setFoundResults({result: resp, type: types.SET_SEARCHED_COUPONS}));
                dispatch(setRefreshStatus({status: false}));
            }).catch((ex) => console.log(ex));
    }
}

export function getCategories() {
    return (dispatch, getState) => {
        const {accessToken} = getState();

        return apiHelper.listCategories(accessToken)
            .then((resp) => {
                dispatch(setFoundResults({result: resp, type: types.SET_FOUND_CATEGORIES}));
                dispatch(setRefreshStatus({status: false}));
            }).catch((ex) => console.log(ex));
    }
}


export function setFoundResults({result, type}) {

    return {
        type: type,
        result
    }
}

export function setRefreshStatus({status}) {
    return {
        type: types.SET_REFRESH_STATUS,
        isRefreshing: status,
    }
}

export function setSearchTerm({keyword}) {
    return {
        type: types.SET_SEARCH_TERM,
        keyword: keyword,
    }
}