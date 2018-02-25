import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import TopBar from '../../components/TopBar';
import TabBar from '../../components/navigation/TabBar';
import {bindActionCreators} from "redux";
import {ActionCreators} from "../../actions/index";
import {connect} from "react-redux";
import _ from 'lodash';
import CouponList from "../../components/CouponList";
import {styleVariables} from "../../common/styles";
import {SEARCH_COUPON} from "../../constants";

class CouponSearch extends Component {

    static navigationOptions = {
        title: 'COUPON SEARCH',
    };

    render() {
        return (
            <View style={styles.container}>
                <TopBar {...this.props} searchType={SEARCH_COUPON}/>

                <View style={styles.body}>
                    <CouponList {...this.props} list={this.props.searchedCoupons}/>
                </View>

                <TabBar {...this.props}/>
            </View>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

function mapStateTopProps(state) {
    return {
        searchedCoupons: _.isEmpty(state.searchedCoupons) ? [] : Object.values(state.searchedCoupons),
        searchTerm: state.searchTerm,
        showLoading: state.refreshStatus.isRefreshing,
    };
}

export default connect(mapStateTopProps, mapDispatchToProps)(CouponSearch);

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            backgroundColor: styleVariables.backgroundColor
        },
        body: {
            flex: 1
        }
    }
);