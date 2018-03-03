import React from "react";
import SiteActivityIndicator from "../components/SiteActivityIndicator";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {ActionCreators} from "../flow/actions/index";
import PropTypes from "prop-types";

export default function withConnect(ComposedComponent, mapStateToProps) {

    function mapDispatchToProps(dispatch) {
        return bindActionCreators(ActionCreators, dispatch);
    }

    return connect(mapStateToProps, mapDispatchToProps)(ComposedComponent);
}

export const withIndicator = (ComposedComponent) => {
    const ReduxContainer = (props) => (
        <ComposedComponent {...props}>
            <SiteActivityIndicator isHidden={!props.showLoading}/>
        </ComposedComponent>
    );

    ReduxContainer.propTypes = {
        showLoading: PropTypes.bool
    };

    return ReduxContainer;
};