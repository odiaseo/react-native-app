import {combineReducers} from "redux";
import * as searchReducer from "./search";
import * as couponReducer from "./coupon";
import * as homeReducer from "./common";
import * as merchantReducer from "./merchant";
import * as categoryReducer from "./category";
import * as types from "../types";
import {AsyncStorage} from "react-native";

const appReducer = combineReducers(Object.assign(
    searchReducer,
    couponReducer,
    homeReducer,
    merchantReducer,
    categoryReducer
));

const rootReducer = (state, action) => {

    if (action.type === types.RESET_CACHE) {

        Object.keys(state).forEach(key => {
            AsyncStorage.removeItem(`persist:${key}`);
        });

        state = undefined;
    }

    return appReducer(state, action);
};

export default rootReducer;