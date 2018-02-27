import {combineReducers} from "redux";
import * as searchReducer from "./search";
import * as couponReducer from "./coupon";
import * as homeReducer from "./common";
import * as merchantReducer from "./merchant";
import * as categoryReducer from "./category";

export default combineReducers(Object.assign(
    searchReducer,
    couponReducer,
    homeReducer,
    merchantReducer,
    categoryReducer
));