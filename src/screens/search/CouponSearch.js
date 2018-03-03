import React from "react";
import _ from "lodash";
import CouponList from "../../components/coupon/CouponList";
import {SEARCH_COUPON} from "../../constants";
import withConnect, {withIndicator} from "../../config/hoc";
import BaseLayout from "../../components/layout/BaseLayout";
import PropTypes from "prop-types";

const CouponSearch = (props) => (
    <BaseLayout searchType={SEARCH_COUPON} {...props}>
        {props.children}
        <CouponList {...props} list={props.searchedCoupons}/>
    </BaseLayout>
);

CouponSearch.propTypes = {
    searchedCoupons: PropTypes.array,
    children: PropTypes.node
};

function mapStateTopProps(state) {
    return {
        searchedCoupons: _.isEmpty(state.searchedCoupons) ? [] : Object.values(state.searchedCoupons),
        searchTerm: state.searchTerm,
        showLoading: state.refreshStatus,
    };
}

export default withConnect(withIndicator(CouponSearch), mapStateTopProps);