import moment from "moment/moment";
import {styleVariables} from "./styles";

export function renderExpiryDate(coupon) {
    if (coupon.end_at) {
        return moment(coupon.end_at).format('Do MMM');
    }
    return 'While stock last';
}

export function renderVoucherCount(voucherCount) {
    if (voucherCount > 0) {
        return ' (' + voucherCount + ' offers)';
    }
    return null;
}

export function getIconName(text) {
    return 'shopping-cart';

    let classname = text.split(' ').reverse()[0];
    classname = classname.replace('ti-', '').replace('fa-', '');

    return classname ? classname : 'shopping-cart';
}

export function renderOfferType(coupon) {
    switch (coupon.offer_type.slug) {
        case 'deal':
            return styleVariables.dealColor;
        case 'coupon':
            return styleVariables.couponColor;
        case 'sale':
            return styleVariables.saleColor;
        default:
            return styleVariables.deliveryColor;
    }
}