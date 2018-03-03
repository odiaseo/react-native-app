import moment from "moment/moment";
import {styleVariables} from "./styles";
import numeral from "numeral";
import _ from "lodash";
import {Linking} from "react-native";

export function openExternalLink(outlink) {
    if (outlink) {
        Linking.openURL(outlink).catch(err => console.error("An error occurred", err));
    }
}

export function renderExpiryDate(coupon) {
    if (coupon.end_at) {
        return "Expires " + moment(coupon.end_at).format("Do MMM YYYY");
    }
    return "While stock last";
}


export function renderOfferCount(count, wrap = false) {
    if (count <= 0) {
        return null;
    }

    const value = numeral(count).format("0,0") + " offers";

    if (wrap) {
        return " (" + value + ")";
    }

    return value;
}

export function getIconName() {
    return "shopping-cart";
}

export function renderOfferType(coupon) {
    switch (coupon.offer_type.slug) {
        case "deal":
            return styleVariables.dealColor;
        case "coupon":
            return styleVariables.couponColor;
        case "sale":
            return styleVariables.saleColor;
        default:
            return styleVariables.deliveryColor;
    }
}

export const storeMerchants = function (state, action) {
    if (!action.result.data) {
        return state;
    }

    const items = {};

    action.result.data.forEach((merchant) => {
        items[merchant.id] = merchant;
    });

    return items;
};

export const storeCoupons = function (state, action) {
    if (_.isEmpty(action.result) || _.isEmpty(action.result.data)) {
        return state;
    }

    const items = {};

    action.result.data.forEach((coupon) => {
        if (coupon.merchant) {
            items[coupon.id] = coupon;
        }
    });

    return items;
};

export const toQueryString = function (obj) {
    return _.map(obj, (v, k) => encodeURIComponent(k) + "=" + encodeURIComponent(v)).join("&");
};