import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import TopBar from '../components/TopBar';
import TabBar from '../components/TabBar';
import {bindActionCreators} from "redux";
import {ActionCreators} from "../actions";
import {connect} from "react-redux";
import _ from 'lodash';
import CouponList from "../components/CouponList";

class Search extends Component {

    static navigationOptions = {
        title: 'Search',
    };

    render() {
        return (
            <View style={styles.container}>
                <TopBar {...this.props}/>

                <View style={styles.body}>
                    <CouponList {...this.props} list={this.props.searchedCoupons} />
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
        searchedCoupons: _.isEmpty(state.searchedCoupons.coupons) ? [] : Object.values(state.searchedCoupons.coupons),
        searchTerm: state.searchTerm,
        showLoading: state.refreshStatus.isRefreshing,
    };
}

export default connect(mapStateTopProps, mapDispatchToProps)(Search);

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            backgroundColor: '#ffffff'
        },
        body: {
            flex: 1
        },
        divider: {
            borderTopWidth: 0.5,
            borderColor: '#3e3e3e',
            height: 2
        }
    }
);