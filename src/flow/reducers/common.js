import createReducer from "../../common/createReducer";
import * as types from "../types";
import options from "../../config/options";

export const errorMessage = createReducer("", {

    [types.API_FETCH_FAILED](state, action) {
        return action.message;
    },

    [types.SET_REFRESH_STATUS]() {
        return false;
    }
});

export const refreshStatus = createReducer(false, {
    [types.SET_REFRESH_STATUS](state, action) {
        return action.status;
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
            const items = [];

            action.result.data.forEach((slide) => {
                items.push({
                    id: slide.id,
                    title: slide.title,
                    imagePath: options.sliderImageDomain + slide.background_image,
                });
            });

            return items;
        }

        return state;
    }
});
