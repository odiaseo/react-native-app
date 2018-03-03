import * as types from "../types";
import apiHelper from "../../common/apiHelper";
import * as selectors from "./selectors";
import {call, put, takeEvery, takeLatest, select} from "redux-saga/effects";
import store from "../../store";
import _ from "lodash";

export function* checkTokenExists() {
    try {
        yield call(requestAccessToken);
        return yield select(selectors.getAccessToken);

    } catch (e) {
        yield put({type: types.API_FETCH_FAILED, message: e.message});
        return {};
    }
}

function* requestAccessToken() {
    try {
        if (_.isEmpty(store.getState().accessToken)) {
            const resp = yield call(apiHelper.requestAccessToken);
            yield put({type: types.SET_ACCESS_TOKEN, result: resp});
        }
    } catch (e) {
        yield put({type: types.API_FETCH_FAILED, message: e.message});
    }
}

export function* getSliders() {
    try {
        const slider = yield select(selectors.getSliders);

        if (_.isEmpty(slider)) {
            const token = yield call(checkTokenExists);
            const resp = yield call(apiHelper.getCarouselSlides, token);
            yield put({type: types.SET_FOUND_SLIDES, result: resp});
        }
    } catch (e) {
        yield put({type: types.API_FETCH_FAILED, message: e.message});
    }
}

const commonWatcherSagas = [
    takeEvery(types.GET_SLIDERS, getSliders),
    takeLatest(types.GET_ACCESS_TOKEN, requestAccessToken)
];

export default commonWatcherSagas;