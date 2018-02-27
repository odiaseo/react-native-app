import * as types from "../actions/types";
import apiHelper from "../common/apiHelper";
import {setFoundResults, setRefreshStatus} from "./coupon";
import * as selectors from "./selectors";
import {call, put, takeEvery, takeLatest, select} from "redux-saga/effects";


function* findMerchantsByKeyword(action) {
    try {
        const token = yield select(selectors.getAccessToken);
        const resp = yield call(apiHelper.getMerchants, token, action.searchTerm, action.page, action.limit);
        yield put({type: types.SET_SEARCHED_MERCHANTS, result: resp});
        yield put({type: types.SET_REFRESH_STATUS, status: false});
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
    takeEvery(types.GET_MERCHANT_DETAIL, findMerchantById),
    takeLatest(types.SEARCH_MERCHANT, findMerchantsByKeyword)
];

export default merchantWatcherSagas;