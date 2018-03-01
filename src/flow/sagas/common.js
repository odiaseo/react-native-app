import * as types from "../types";
import apiHelper from "../../common/apiHelper";
import {setRefreshStatus} from "./coupon";
import * as selectors from "./selectors";
import {call, put, takeEvery, takeLatest, select} from "redux-saga/effects";

function* getAccessToken() {
    try {
        const resp = yield call(apiHelper.requestAccessToken);
        yield put({type: types.SET_ACCESS_TOKEN, result: resp});
    } catch (e) {
        yield put({type: types.API_FETCH_FAILED, message: e.message});
    }
}

function* getSliders() {
    try {
        const token = yield select(selectors.getAccessToken);
        const resp = yield call(apiHelper.getCarouselSlides, token);
        yield put({type: types.SET_FOUND_SLIDES, result: resp});
    } catch (e) {
        yield put({type: types.API_FETCH_FAILED, message: e.message});
    }
}

const commonWatcherSagas = [
    takeEvery(types.GET_SLIDERS, getSliders),
    takeLatest(types.GET_ACCESS_TOKEN, getAccessToken)
];

export default commonWatcherSagas;