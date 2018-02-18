import React, {Component} from 'react';
import {StyleSheet, FlatList, View, StatusBar} from 'react-native';
import CouponItem from '../components/CouponItem';
import HomeTopBar from '../components/home/HomeTopBar';
import Carousel from '../components/home/Carousel';
import TabBar from '../components/TabBar';
import ApiHelper from '../common/ApiHelper';

export default class Home extends Component {

    defaultEndpoint = '/voucher?sort=+is_expired,-popularity&per_page=20';

    static navigationOptions = {
        title: 'Home',
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            accessToken: "",
            endpoint: this.defaultEndpoint,
            coupons: {},
            isRefreshing: false,
            page: 1
        };

        this._renderCoupons = this._renderCoupons.bind(this);
        this._getCoupons = this._getCoupons.bind(this);
    }

    _getCoupons() {
        let endPoint = this.state.endpoint + '&page=' + this.state.page;
        this.setState({
            isRefreshing: true
        });

        ApiHelper.call(endPoint, this.state.accessToken)
            .then((responseJson) => this.setState({coupons: responseJson, isRefreshing: false}));
    }

    _renderCoupons() {
        return (
            <FlatList
                data={this.state.coupons.data}
                renderItem={(coupon) => <CouponItem coupon={coupon.item}/>}
                keyExtractor={(item) => item.id}
                itemSeparatorComponent={() => <View style={styles.divider}/>}
            />
        );
    }

    componentDidMount() {
        ApiHelper.getAccessToken()
            .then((token) => this.setState({accessToken: token}))
            .then(() => this._getCoupons());
    }

    render() {
        return (
            <View style={styles.container}>
                <HomeTopBar navigation={this.props.navigation}/>
                <Carousel/>
                <View style={styles.body}>

                    {this._renderCoupons()}
                </View>

                <TabBar navigation={this.props.navigation}/>
            </View>
        );
    }
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            marginTop: 20,
            backgroundColor: '#ffffff'
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