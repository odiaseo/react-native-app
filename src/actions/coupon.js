import * as types from './types';
import apiHelper from "../common/apiHelper";
import _ from 'lodash';

export function getCoupons(page = 1) {
    return (dispatch, getState) => {
        return apiHelper.getAccessToken()
            .then((token) => apiHelper.getCoupons(token, {page: page}))
            .then((resp) => {
                dispatch(setFoundCoupons({result: resp}));
                dispatch(setRefreshStatus({status: false}));
            }).catch((ex) => console.log(ex));
    }
}

export function searchCoupons(searchTerm, page = 1) {
    return (dispatch, getState) => {

        let endPoint = '/search/voucher?per_page=20&keyword=' + searchTerm + '&page=' + page;

        return apiHelper.getAccessToken()
            .then((token) => apiHelper.call(endPoint, token))
            .then((resp) => {
                dispatch(setSearchedCoupons({result: resp}));
                dispatch(setRefreshStatus({status: false}));
            }).catch((ex) => console.log(ex));
    }
}

export function debouncedSearch(search, page) {
    return _.debounce(searchCoupons(search, page), 300);
}

export function setFoundCoupons({result}) {

    return {
        type: types.SET_FOUND_COUPONS,
        result
    }
}

export function setSearchedCoupons({result}) {

    return {
        type: types.SET_SEARCHED_COUPONS,
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