import * as types from "../types";
import apiHelper from "../../common/apiHelper";
import * as selectors from "./selectors";
import _ from "lodash";
import {call, put, takeEvery, takeLatest, select} from "redux-saga/effects";
import {delay} from "redux-saga";
import * as config from "../../config/options";


function* findMerchantCoupons(action) {
    try {
        const token = yield select(selectors.getAccessToken);
        const resp = yield call(apiHelper.getMerchantCoupons, token, action.merchantId, action.page, action.limit);
        yield put({type: types.SET_MERCHANT_COUPONS, result: resp});
        yield put({type: types.SET_REFRESH_STATUS, status: false});
    } catch (e) {
        yield put({type: types.API_FETCH_FAILED, message: e.message});
    }
}

function* searchMerchantsByCategoryId(action) {
    try {

        const token = yield select(selectors.getAccessToken);
        const resp = yield call(apiHelper.findMerchantsByCategory, token, action.categoryId, action.page, action.limit);
        yield put({type: types.SET_CATEGORY_MERCHANTS, result: resp});
        yield put({type: types.SET_REFRESH_STATUS, status: false});
    } catch (e) {
        yield put({type: types.API_FETCH_FAILED, message: e.message});
    }
}

function* findMerchantsByKeyword(action) {
    try {
        yield call(delay, config.typeAheadDelay);

        const token = yield select(selectors.getAccessToken);
        const resp = yield call(apiHelper.searchMerchants, token, action.searchTerm, action.page, action.limit);
        yield put({type: types.SET_SEARCHED_MERCHANTS, result: resp});
        yield put({type: types.SET_REFRESH_STATUS, status: false});
    } catch (e) {
        yield put({type: types.API_FETCH_FAILED, message: e.message});
    }
}

export function* homePageMerchants() {
    try {
        const merchantList = yield select(selectors.getHomeMerchants);

        if (_.isEmpty(merchantList)) {
            const token = yield select(selectors.getAccessToken);
            const mainCategories = yield call(apiHelper.listCategories, token, 1);
            const IdList = mainCategories.map(cat => cat.id);

            yield put({type: types.SET_REFRESH_STATUS, status: false});
            const resp = yield call(apiHelper.getMerchantsByCategory, token, IdList);
            yield put({type: types.SET_CAROUSEL_MERCHANTS, result: resp});
        }

    } catch (e) {
        yield put({type: types.API_FETCH_FAILED, message: e.message});
    }
}

function* findMerchantById(action) {
    try {
        console.log(action);

        const token = yield select(selectors.getAccessToken);
        const resp = yield call(apiHelper.getMerchantById, token, action.merchantId);
        yield put({type: types.SET_MERCHANT_DETAIL, result: resp});
        yield put({type: types.SET_REFRESH_STATUS, status: false});
    } catch (e) {
        yield put({type: types.API_FETCH_FAILED, message: e.message});
    }
}

const merchantWatcherSagas = [
    takeEvery(types.GET_CAROUSEL_MERCHANTS, homePageMerchants),
    takeEvery(types.GET_MERCHANT_COUPONS, findMerchantCoupons),
    takeEvery(types.GET_MERCHANT_DETAIL, findMerchantById),
    takeEvery(types.SEARCH_MERCHANT_BY_CATEGORY, searchMerchantsByCategoryId),
    takeLatest(types.SEARCH_MERCHANT, findMerchantsByKeyword)
];

export default merchantWatcherSagas;