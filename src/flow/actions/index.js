import * as MerchantActions from "./merchant";
import * as  CouponActions from "./coupon";
import * as CommonActions from "./common";
import * as CategoryActions from "./category";

export const ActionCreators = Object.assign({},
    MerchantActions,
    CommonActions,
    CouponActions,
    CategoryActions,
);