import React, {Component} from "react";
import HeaderRight from "../../components/HeaderRight";
import {bindActionCreators} from "redux";
import {ActionCreators} from "../../actions/index";
import {connect} from "react-redux";
import _ from "lodash";
import CouponTab from "../../components/CouponTab";
import SiteActivityIndicator from "../../components/SiteActivityIndicator";
import * as types from "../../actions/types";

class PopularCoupons extends Component {

    static navigationOptions = {
        title: "POPULAR",
        headerRight: (<HeaderRight searchPage="CouponSearch"/>)
    };

    componentDidMount() {
        this.props.setActivityStatus(true);
        this.props.getCouponsByType(types.SET_POPULAR_COUPONS);
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
        coupons: _.isEmpty(state.popularCoupons) ? [] : Object.values(state.popularCoupons),
        showLoading: state.refreshStatus.isRefreshing,
    };
}

export default connect(mapStateTopProps, mapDispatchToProps)(PopularCoupons);
