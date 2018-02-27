import * as types from '../actions/types';
import apiHelper from "../common/apiHelper";
import * as selectors from './selectors';
import {call, put, takeEvery, takeLatest, select} from 'redux-saga/effects';

function* getCouponsSaga(action) {
    try {
        const token = yield select(selectors.getAccessToken);
        const resp = yield call(apiHelper.getCoupons, token, action.storeType, action.page);
        yield put({type: action.storeType, result: resp});
        yield put({type: types.SET_REFRESH_STATUS, status: false});
    } catch (e) {
        yield put({type: types.API_FETCH_FAILED, message: e.message});
    }
}

export function* searchCouponsByKeyword(action) {
    try {
        const token = yield select(selectors.getAccessToken);
        const resp = yield call(apiHelper.searchCoupons, token, action.searchTerm, action.page);
        yield put({type: types.SET_SEARCH_TERM, keyword: action.searchTerm});
        yield put({type: types.SET_SEARCHED_COUPONS, result: resp});
        yield put({type: types.SET_REFRESH_STATUS, status: false});
    } catch (e) {
        yield put({type: types.API_FETCH_FAILED, message: e.message});
    }
}

const couponWatcherSagas = [
    takeEvery(types.GET_COUPONS, getCouponsSaga),
    takeEvery(types.SEARCH_COUPONS, searchCouponsByKeyword)
];

export default couponWatcherSagas;
