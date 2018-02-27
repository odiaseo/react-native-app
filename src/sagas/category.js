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
        const categories = yield select(selectors.getCategories);
        const token = yield select(selectors.getAccessToken);
        const resp = yield call(apiHelper.getCategoryOffers, token, action.categoryIdList);
        yield put({type: types.SET_CATEGORY_OFFERS, result: resp, categories});
    } catch (e) {
        yield put({type: types.API_FETCH_FAILED, message: e.message});
    }
}

const categoryWatcherSagas = [
    takeEvery(types.LIST_CATEGORIES, getCategories),
    takeEvery(types.GET_CATEGORY_OFFERS, getCategoryCarouselOffers)
];

export default categoryWatcherSagas;