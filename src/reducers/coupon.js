import * as types from "../actions/types";
import createReducer from "../common/createReducer";
import _ from 'lodash';

export const foundCoupons = createReducer({}, {
    [types.SET_FOUND_COUPONS](state, action) {
        return storeCoupons(state, action);
    }
});

export const topCoupons = createReducer({}, {
    [types.SET_TOP_COUPONS](state, action) {
        return storeCoupons(state, action);
    }
});

export const featuredCoupons = createReducer({}, {
    [types.SET_FEATURED_COUPONS](state, action) {
        return storeCoupons(state, action);
    }
});

export const latestCoupons = createReducer({}, {
    [types.SET_LATEST_COUPONS](state, action) {
        return storeCoupons(state, action);
    }
});

export const popularCoupons = createReducer({}, {
    [types.SET_POPULAR_COUPONS](state, action) {
        return storeCoupons(state, action);
    }
});


export const expiringCoupons = createReducer({}, {
    [types.SET_EXPIRING_COUPONS](state, action) {
        return storeCoupons(state, action);
    }
});

export const searchedCoupons = createReducer({}, {
    [types.SET_SEARCHED_COUPONS](state, action) {
        return storeCoupons(state, action);
    }
});


export const categories = createReducer({}, {

    [types.SET_FOUND_CATEGORIES](state, action) {
        if (!action.result) {
            return state;
        }

        let items = {};

        action.result.forEach((category) => {
            if (1 !== category.id) {
                items[category.id] = category
            }
        });

        return items
    },
});

export const categoryOffers = createReducer({}, {
    [types.SET_CATEGORY_OFFERS](state, action) {

        return formatCategoryOffers(action.categories, action.result);

        //return action.result;
    }
});


formatCategoryOffers = function (categories, offers) {
    let sections = [];

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


storeCoupons = function (state, action) {
    if (!action.result.data) {
        return state;
    }

    let items = {};

    action.result.data.forEach((coupon) => {
        if (coupon.merchant) {
            items[coupon.id] = coupon
        }
    });

    return items;
};