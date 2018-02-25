import React, {Component} from 'react'
import HeaderRight from "../../components/HeaderRight";
import {bindActionCreators} from "redux";
import {ActionCreators} from "../../actions/index";
import {connect} from "react-redux";
import _ from 'lodash';
import CouponTab from "../../components/CouponTab";
import SiteActivityIndicator from "../../components/SiteActivityIndicator";

class ExpiringCoupons extends Component {

    static navigationOptions = {
        title: 'Expiring',
        headerRight: (<HeaderRight/>)
    };

    componentDidMount() {
        this.props.setActivityStatus(true);
        this.props.getExpiringCoupons();
    }

    render() {

        if (this.props.showLoading) {
            return (
                <SiteActivityIndicator/>
            );
        }
        return (<CouponTab {...this.props}/>)
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

function mapStateTopProps(state) {
    return {
        coupons: _.isEmpty(state.expiringCoupons) ? [] : Object.values(state.expiringCoupons),
        showLoading: state.refreshStatus.isRefreshing,
    };
}

export default connect(mapStateTopProps, mapDispatchToProps)(ExpiringCoupons);