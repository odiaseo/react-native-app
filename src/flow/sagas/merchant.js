import * as types from "../types";
import apiHelper from "../../common/apiHelper";
import * as selectors from "./selectors";
import _ from "lodash";
import {call, put, takeEvery, takeLatest, select, all} from "redux-saga/effects";
import {delay} from "redux-saga";
import config from "../../config/options";
import {getSliders, checkTokenExists} from "./common";

function* findMerchantCoupons(action) {
    try {
        const token = yield call(checkTokenExists);

        const [resp, details] = yield all(
            [
                call(apiHelper.getMerchantCoupons, token, action.merchantId, action.page, action.limit),
                call(apiHelper.getMerchantById, token, action.merchantId)
            ]
        );

        yield put({type: types.SET_MERCHANT_DETAIL, result: details});
        yield put({type: types.SET_MERCHANT_COUPONS, result: resp});
        yield put({type: types.SET_REFRESH_STATUS, status: false});
    } catch (e) {
        yield put({type: types.API_FETCH_FAILED, message: e.message});
    }
}

function* searchMerchantsByCategoryId(action) {
    try {

        const token = yield call(checkTokenExists);
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

        const token = yield call(checkTokenExists);
        const resp = yield call(apiHelper.searchMerchants, token, action.searchTerm, action.page, action.limit);
        yield put({type: types.SET_SEARCHED_MERCHANTS, result: resp});
        yield put({type: types.SET_REFRESH_STATUS, status: false});
    } catch (e) {
        yield put({type: types.API_FETCH_FAILED, message: e.message});
    }
}

export function* homePageData() {
    try {
        yield all([call(getSliders), call(homePageMerchants)]);
    } catch (e) {
        yield put({type: types.API_FETCH_FAILED, message: e.message});
    }
}

export function* homePageMerchants() {
    try {
        const merchantList = yield select(selectors.getHomeMerchants);

        if (_.isEmpty(merchantList)) {
            const token = yield call(checkTokenExists);
            const mainCategories = yield call(apiHelper.listCategories, token, 1);
            const IdList = mainCategories.map(cat => cat.id);
            const resp = yield call(apiHelper.getMerchantsByCategory, token, IdList);
            yield put({type: types.SET_CAROUSEL_MERCHANTS, result: resp});
        }

        yield put({type: types.SET_REFRESH_STATUS, status: false});

    } catch (e) {
        yield put({type: types.API_FETCH_FAILED, message: e.message});
    }
}

function* findMerchantById(action) {
    try {
        const token = yield call(checkTokenExists);
        const resp = yield call(apiHelper.getMerchantById, token, action.merchantId);
        yield put({type: types.SET_MERCHANT_DETAIL, result: resp});
        yield put({type: types.SET_REFRESH_STATUS, status: false});
    } catch (e) {
        yield put({type: types.API_FETCH_FAILED, message: e.message});
    }
}

const merchantWatcherSagas = [
    takeEvery(types.GET_HOME_PAGE_DATA, homePageData),
    takeEvery(types.GET_MERCHANT_COUPONS, findMerchantCoupons),
    takeEvery(types.GET_MERCHANT_DETAIL, findMerchantById),
    takeEvery(types.SEARCH_MERCHANT_BY_CATEGORY, searchMerchantsByCategoryId),
    takeLatest(types.SEARCH_MERCHANT, findMerchantsByKeyword)
];

export default merchantWatcherSagas;