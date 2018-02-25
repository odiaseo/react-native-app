import {combineReducers} from 'redux';
import * as navigationReducer from './navigation'
import * as couponReducer from './coupon'
import * as homeReducer from './home'
import * as merchantReducer from './merchant'

export default combineReducers(Object.assign(
    navigationReducer,
    couponReducer,
    homeReducer,
    merchantReducer
));