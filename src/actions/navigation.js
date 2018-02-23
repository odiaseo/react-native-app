import * as types from './types';

export function navigate(action) {
    return (dispatch, getState) => {
        dispatch(navigateForward(action))
    }
}

function navigateForward(state) {
    return {
        type: types.NAVIGATION_FORWARD,
        state
    }
}

export function navigateBack() {
    return (dispatch, getState) => {
        dispatch({
            type: types.NAVIGATION_BACK
        })
    }
}

export function addRecipe(){
    return {
        type: types.ADD_RECIPE
    }
}
