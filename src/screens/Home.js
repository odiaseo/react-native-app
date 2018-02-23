import React, {Component,} from 'react';
import {StyleSheet, FlatList, View, Text, TouchableHighlight} from 'react-native';
import CouponItem from '../components/CouponItem';
import HomeTopBar from '../components/home/HomeTopBar';
import Carousel from '../components/home/Carousel';
import TabBar from '../components/TabBar';
import {connect} from 'react-redux';
import {ActionCreators} from "../actions";
import {bindActionCreators} from 'redux';

class Home extends Component {
    static navigationOptions = {
        title: 'Home',
        header: null
    };

    _renderCoupons() {
        return (
            <FlatList
                data={this.props.coupons}
                renderItem={(coupon) => <CouponItem coupon={coupon.item}/>}
                keyExtractor={(item) => item.id}
                itemSeparatorComponent={() => <View style={styles.divider}/>}
            />
        );
    }

    componentDidMount() {
        this.props.getCoupons();
    }

    render() {
        return (
            <View style={styles.container}>
                <HomeTopBar {...this.props}/>
                <Carousel/>
                <View style={styles.body}>
                    {this._renderCoupons()}
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
        coupons: state.foundCoupons.coupons ? Object.values(state.foundCoupons.coupons) : [],
    };
}

export default connect(mapStateTopProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            marginTop: 20,
            backgroundColor: '#FFFFFF'
        },
        body: {
            flex: 1
        },
        divider: {
            borderTopWidth: 0.5,
            borderColor: '#3e3e3e',
            height: 2
        },
        statusBar: {
            backgroundColor: '#25282e'
        }
    }
);