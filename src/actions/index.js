import * as NavigationActions from './navigation'
import * as CouponActions from './coupon';
import * as HomeActions from './home';
import * as MerchantActions from './merchant';
import * as SearchActions from './search';

export const ActionCreators = Object.assign({},
    NavigationActions,
    CouponActions,
    HomeActions,
    MerchantActions,
    SearchActions,
);