import {combineReducers} from 'redux';
import * as navigationReducer from './navigation'
import * as couponReducer from './coupon'
import * as homeReducer from './home'

export default combineReducers(Object.assign(
    navigationReducer,
    couponReducer,
    homeReducer
));