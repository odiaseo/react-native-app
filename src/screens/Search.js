import React, {Component} from 'react';
import {StyleSheet, FlatList, View} from 'react-native';
import CouponItem from '../components/CouponItem';
import TopBar from '../components/TopBar';
import TabBar from '../components/TabBar';
import {bindActionCreators} from "redux";
import {ActionCreators} from "../actions";
import {connect} from "react-redux";


class Search extends Component {

    static navigationOptions = {
        title: 'Search',
    };

    render() {
        return (
            <View style={styles.container}>
                <TopBar {...this.props}/>

                <View style={styles.body}>
                    <FlatList
                        data={this.props.searchedCoupons}
                        renderItem={(coupon) => <CouponItem coupon={coupon.item}/>}
                        keyExtractor={(item) => item.id}
                        itemSeparatorComponent={() => <View style={styles.divider}/>}
                    />
                </View>

                <TabBar navigation={this.props.navigation}/>
            </View>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

function mapStateTopProps(state) {
    return {
        searchedCoupons: state.searchedCoupons.coupons ? Object.values(state.searchedCoupons.coupons) : [],
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