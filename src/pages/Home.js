import React, {Component} from 'react';
import {StyleSheet, FlatList, View} from 'react-native';
import CouponItem from '../components/CouponItem';
import TopBar from '../components/TopBar';
import TabBar from '../components/TabBar';
import TokenHelper from '../common/TokenHelper';


export default class Home extends Component {

    defaultEndpoint = 'https://api.kuponhub.net/api/v1/voucher?sort=+is_expired,-popularity&per_page=20';

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
        this._doSearch = this._doSearch.bind(this);

    }


    _doSearch(searchTerm, page: 1) {
        if (searchTerm.length > 1) {
            this.setState({
                page: page,
                endpoint: 'https://api.kuponhub.net/api/v1/search/voucher?per_page=20&keyword=' + searchTerm
            });
            this._getCoupons();
        }
    }

    _getCoupons() {
        let endPoint = this.state.endpoint + '&page=' + this.state.page;
        this.setState({
            isRefreshing: true
        });
        return fetch(
            endPoint,
            {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + this.state.accessToken,
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                return response.json();
            })
            .then((responseJson) => this.setState({coupons: responseJson, isRefreshing: false}))
            .catch((error) => {
                console.error(error);
            });
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
        TokenHelper.getAccessToken()
            .then((token) => this.setState({accessToken: token}))
            .then(() => this._getCoupons());
    }

    render() {
        return (
            <View style={styles.container}>
                <TopBar doSearch={this._doSearch} showLoading={this.state.isRefreshing}/>

                <View style={styles.body}>
                    {this._renderCoupons()}
                </View>

                <TabBar/>
            </View>
        );
    }
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1
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