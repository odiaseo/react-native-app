import * as types from "../actions/types";
import apiHelper from "../common/apiHelper";
import * as selectors from "./selectors";
import {call, put, takeEvery, select} from "redux-saga/effects";
import _ from "lodash";

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
        const token = yield select(selectors.getAccessToken);
        const mainCategories = yield call(apiHelper.listCategories, token, 1);
        let categoryIdList = mainCategories.map(a => a.id);
        const resp = yield call(apiHelper.getCategoryOffers, token, categoryIdList);
        yield put({type: types.SET_CATEGORY_OFFERS, result: resp ,mainCategories});
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