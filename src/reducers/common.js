import createReducer from "../common/createReducer";
import * as types from "../actions/types";
import options from "../config/options";

export const errorMessage = createReducer("", {

    [types.API_FETCH_FAILED](state, action) {
        return action.message;
    }
});

export const refreshStatus = createReducer({}, {
    [types.SET_REFRESH_STATUS](state, action) {
        return {
            isRefreshing: action.isRefreshing
        };
    }
});

export const accessToken = createReducer("", {

    [types.SET_ACCESS_TOKEN](state, action) {
        if (action.result) {
            return action.result;

        }
        return state;
    }
});

export const sliders = createReducer([], {
    [types.SET_FOUND_SLIDES](state, action) {

        if (action.result.data) {
            const items = {};

            action.result.data.forEach((slide) => {

                const url = options.sliderImageDomain + slide.background_image;

                items[slide.id] = {
                    id: slide.id,
                    title: slide.title,
                    imagePath: url,
                };
            });

            return items;
        }

        return state;
    }
});
