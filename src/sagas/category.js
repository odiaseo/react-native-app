import * as types from "../actions/types";
import apiHelper from "../common/apiHelper";
import * as selectors from "./selectors";
import {call, put, takeEvery, select} from "redux-saga/effects";
import _ from "lodash";


function* setCategorySection(token, categoryId) {
    const resp = yield call(apiHelper.getMerchantsByCategory, token, categoryId);
    yield put({type: types.SET_CATEGORY_OFFERS, result: resp, categoryId});
}

export function* getCategories() {
    try {
        const categories = yield select(selectors.getCategories);

        if (!_.isEmpty(categories)) {
            return null;
        }
        const token = yield select(selectors.getAccessToken);
        const resp = yield call(apiHelper.listCategories, token);
        yield put({type: types.SET_FOUND_CATEGORIES, result: resp});
        yield put({type: types.SET_REFRESH_STATUS, status: false});
    } catch (e) {
        yield put({type: types.API_FETCH_FAILED, message: e.message});
    }
}

export function* getCategoryCarouselOffers(action) {
    try {
        const $merchantList = yield select(selectors.getHomeMerchants);

        if (!_.isEmpty($merchantList)) {
            return null;
        }

        const token = yield select(selectors.getAccessToken);
        const mainCategories = yield call(apiHelper.listCategories, token, 1);

        yield mainCategories.map(cat => call(setCategorySection, token, cat.id));
        yield put({type: types.SET_REFRESH_STATUS, status: false});

    } catch (e) {
        yield put({type: types.API_FETCH_FAILED, message: e.message});
    }
}

export function* requestCategories() {
    const token = yield select(selectors.getAccessToken);
    const categories = yield call(apiHelper.listCategories, token, 1);
    yield put({type: types.SET_MAIN_CATEGORIES, result: categories});
}

const categoryWatcherSagas = [
    takeEvery(types.LIST_CATEGORIES, getCategories),
    takeEvery(types.GET_MAIN_CATEGORIES, requestCategories),
    takeEvery(types.GET_CATEGORY_OFFERS, getCategoryCarouselOffers)
];

export default categoryWatcherSagas;