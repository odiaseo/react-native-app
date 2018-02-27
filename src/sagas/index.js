import couponWatcherSagas from './coupon';
import categoryWatcherSagas from './category';
import merchantWatcherSagas from './merchant';
import commonWatcherSagas from './common';
import {all} from 'redux-saga/effects';

export default function* appSagas() {
    yield all([
        ...commonWatcherSagas,
        ...couponWatcherSagas,
        ...categoryWatcherSagas,
        ...merchantWatcherSagas
    ])
}