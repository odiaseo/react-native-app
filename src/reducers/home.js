import createReducer from "../common/createReducer";
import * as types from "../actions/types";
import options from '../config/options'

export const accessToken = createReducer("", {

    [types.SET_ACCESS_TOKEN](state, action) {
        if (action.accessToken) {
            return action.accessToken;

        }
        return state;
    }
});

export const sliders = createReducer([], {
    [types.SET_FOUND_SLIDES](state, action) {

        if (action.result.data) {
            let items = {};

            action.result.data.forEach((slide) => {

                let url = options.sliderImageDomain + slide.background_image;

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
