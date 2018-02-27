import * as types from "./types";

export function getCategories() {
    return {
        type: types.LIST_CATEGORIES
    };
}

export function getMainCategories() {
    return {
        type: types.GET_MAIN_CATEGORIES
    };
}

export function getCategoryCarouselOffers(categoryIdList = []) {
    return {
        type: types.GET_CATEGORY_OFFERS,
        categoryIdList
    };
}