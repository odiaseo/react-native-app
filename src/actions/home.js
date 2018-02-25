import * as types from './types';
import apiHelper from "../common/apiHelper";
import {setRefreshStatus} from "./coupon";


export function setActivityStatus(status) {
    return (dispatch, getState) => {
        dispatch(setRefreshStatus({status: status}));
    }
}

export function getAccessToken() {
    return (dispatch, getState) => {

        let state = getState();

        if (state.accessToken) {
            return;
        }

        return apiHelper.getAccessToken()
            .then((token) => {
                dispatch(setAccessToken({accessToken: token}));
            }).catch((ex) => console.log(ex));
    }
}

export function getSliders() {
    return (dispatch, getState) => {
        let {sliders} = getState();

        if (sliders.length > 0) {
            return;
        }

        return apiHelper.getCarouselSlides(getState().accessToken)
            .then((resp) => {
                dispatch(setFoundSlides({result: resp}));
            }).catch((ex) => console.log(ex));
    }
}

export function setAccessToken({accessToken}) {
    return {
        type: types.SET_ACCESS_TOKEN,
        accessToken
    }
}

export function setFoundSlides({result}) {

    return {
        type: types.SET_FOUND_SLIDES,
        result
    }
}