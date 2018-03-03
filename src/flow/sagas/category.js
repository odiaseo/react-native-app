import * as types from "../types";
import apiHelper from "../../common/apiHelper";
import * as selectors from "./selectors";
import {call, put, takeEvery, select} from "redux-saga/effects";
import {checkTokenExists} from "./common";

export function* getCategories() {
    try {
        const categories = yield select(selectors.getCategories);

        if (categories.length === 0) {
            const token = yield call(checkTokenExists);
            const resp = yield call(apiHelper.listCategories, token);
            yield put({type: types.SET_FOUND_CATEGORIES, result: resp});
        }

        yield put({type: types.SET_REFRESH_STATUS, status: false});
    } catch (e) {
        yield put({type: types.API_FETCH_FAILED, message: e.message});
    }
}


export function* requestCategories() {
    const token = yield call(checkTokenExists);
    const categories = yield call(apiHelper.listCategories, token, 1);
    yield put({type: types.SET_MAIN_CATEGORIES, result: categories});
}

const categoryWatcherSagas = [
    takeEvery(types.LIST_CATEGORIES, getCategories),
    takeEvery(types.GET_MAIN_CATEGORIES, requestCategories),
];

export default categoryWatcherSagas;