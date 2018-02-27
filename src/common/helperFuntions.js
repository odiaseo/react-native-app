import moment from "moment/moment";
import {styleVariables} from "./styles";
import numeral from "numeral";

export function renderExpiryDate(coupon) {
    if (coupon.end_at) {
        return moment(coupon.end_at).format("Do MMM");
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

export function getIconName(text) {
    return "shopping-cart";

    let classname = text.split(" ").reverse()[0];
    classname = classname.replace("ti-", "").replace("fa-", "");

    return classname || "shopping-cart";
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