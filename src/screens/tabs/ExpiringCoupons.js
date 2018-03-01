import React, {Component} from "react";
import HeaderRight from "../../components/HeaderRight";
import {bindActionCreators} from "redux";
import {ActionCreators} from "../../flow/actions/index";
import {connect} from "react-redux";
import _ from "lodash";
import * as types from "../../flow/types";
import CouponTab from "../../components/coupon/CouponTab";
import SiteActivityIndicator from "../../components/SiteActivityIndicator";

class ExpiringCoupons extends Component {

    static navigationOptions = {
        title: "EXPIRING",
        headerRight: (<HeaderRight searchPage="CouponSearch"/>)
    };

    componentDidMount() {
        this.props.setActivityStatus(true);
        this.props.getCouponsByType(types.SET_EXPIRING_COUPONS);
    }

    render() {

        if (this.props.showLoading) {
            return (
                <SiteActivityIndicator/>
            );
        }
        return (<CouponTab {...this.props}/>);
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

function mapStateTopProps(state) {
    return {
        coupons: _.isEmpty(state.expiringCoupons) ? [] : Object.values(state.expiringCoupons),
        showLoading: state.refreshStatus,
    };
}

export default connect(mapStateTopProps, mapDispatchToProps)(ExpiringCoupons);