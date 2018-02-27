import * as MerchantActions from "./merchant";
import * as CommonActions from "./common";
import * as CategoryActions from "./category";

export const ActionCreators = Object.assign({},
    MerchantActions,
    CommonActions,
    CategoryActions,
);