import createReducer from "../common/createReducer";
import * as types from "../actions/types";
import options from '../config/options'

const defaultSliders = [
    {
        'id': 1,
        'title': '',
        'imagePath': options.sliderImageDomain + '/images/slides/optimized/70-percent-sale.jpg'
    },
    {
        'id': 2,
        'title': '',
        'imagePath': options.sliderImageDomain + '/images/slides/optimized/clothing-footwear-accessories.jpg'
    },
    {
        'id': 3,
        'title': '',
        'imagePath': options.sliderImageDomain + '/images/slides/optimized/womens-fashion.jpg'
    },
    {
        'id': 4,
        'title': '',
        'imagePath': options.sliderImageDomain + '/images/slides/optimized/bra-sales.jpg'
    },
    {
        'id': 5,
        'title': '',
        'imagePath': options.sliderImageDomain + '/images/slides/optimized/mens-clothing-sale.jpg'
    },
    {
        'id': 6,
        'title': '',
        'imagePath': options.sliderImageDomain + '/images/slides/optimized/back-to-school-sale.jpg'
    },
];

export const accessToken = createReducer("", {

    [types.SET_ACCESS_TOKEN](state, action) {
        if (action.accessToken) {
            return action.accessToken;

        }
        return state;
    }
});

export const sliders = createReducer(defaultSliders, {
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
