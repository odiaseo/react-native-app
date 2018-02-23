import {combineReducers} from 'redux';
import * as navigationReducer from './navigation'
import * as couponReducer from './coupon'

export default combineReducers(Object.assign(
    navigationReducer,
    couponReducer
));