import * as types from "../actions/types";
import createReducer from "../common/createReducer";
import _ from "lodash";

export const categoryOffers = createReducer({}, {
    [types.SET_CATEGORY_OFFERS](state, action) {

        return formatCategoryOffers(action.categories, action.result);
    }
});

export const categories = createReducer({}, {

    [types.SET_FOUND_CATEGORIES](state, action) {
        if (!action.result) {
            return state;
        }

        const items = {};

        action.result.forEach((category) => {
            if (1 !== +category.id) {
                items[+category.id] = category;
            }
        });

        return items;
    },
});

const formatCategoryOffers = function (categories, offers) {
    const sections = [];

    _.forEach(offers, (items, categoryId) => {
        if (1 !== categoryId && categories.hasOwnProperty(categoryId)) {
            sections.push({
                title: categories[categoryId].title,
                data: items
            });
        }
    });

    return sections;
};