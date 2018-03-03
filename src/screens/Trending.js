import React from "react";
import _ from "lodash";
import CouponTab from "../components/coupon/CouponTab";
import withConnect, {withIndicator} from "../config/hoc";
import * as types from "../flow/types";
import PropTypes from "prop-types";

class Trending extends React.PureComponent {

    componentDidMount() {
        this.props.getCouponsByType(this.props.navigation.state.routeName);
    }

    getCoupons() {
        switch (this.props.navigation.state.routeName) {
            case  types.SET_TOP_COUPONS:
                return this.props.topCoupons;
            case  types.SET_POPULAR_COUPONS:
                return this.props.popularCoupons;
            case  types.SET_EXPIRING_COUPONS:
                return this.props.expiringCoupons;
            case types.SET_LATEST_COUPONS:
            default:
                return this.props.latestCoupons;
        }
    }

    render() {
        return (
            <CouponTab {...this.props} coupons={this.getCoupons()}/>
        );
    }
}

Trending.propTypes = {
    types: PropTypes.object,
    navigation: PropTypes.object,
    getCouponsByType: PropTypes.func,
    topCoupons: PropTypes.array,
    popularCoupons: PropTypes.array,
    expiringCoupons: PropTypes.array,
    latestCoupons: PropTypes.array,
};

function mapStateTopProps(state) {
    const mapping = {
        showLoading: state.refreshStatus
    };

    ["topCoupons", "latestCoupons", "expiringCoupons", "popularCoupons"]
        .map((stateKey) => mapping[stateKey] = _.isEmpty(state[stateKey]) ? [] : Object.values(state[stateKey]));

    return mapping;
}

export default withConnect(withIndicator(Trending), mapStateTopProps);