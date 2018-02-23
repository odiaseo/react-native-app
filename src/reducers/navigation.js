import * as types from '../actions/types'
import createReducer from '../common/createReducer'

export const navigationParams = createReducer({}, {
    [types.NAVIGATION_FORWARD](state, action) {
        return action.state;
    },
});

export const recipeCount = createReducer(0, {
    [types.ADD_RECIPE](state, action) {
        return state + 10;
    }
});