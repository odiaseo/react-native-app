import * as NavigationActions from './navigation'
import * as CouponActions from './coupon';
import * as HomeActions from './home';

export const ActionCreators = Object.assign({},
    NavigationActions,
    CouponActions,
    HomeActions,
);