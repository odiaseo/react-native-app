import * as types from "../actions/types";
import createReducer from "../common/createReducer";
import _ from "lodash";

export const categoryOffers = createReducer({}, {
    [types.SET_CATEGORY_OFFERS](state, action) {

        return formatCategoryOffers(action.mainCategories, action.result);
    }
});

export const mainCategories = createReducer({}, {
    [types.SET_MAIN_CATEGORIES](state, action) {
        return action.result;
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

const formatCategoryOffers = function (mainCategories, offers) {
    const sections = [];

    _.forEach(mainCategories, (category) => {
        sections.push({
            title: category.title,
            data: offers[category.id]
        });
    });

    return sections;
};