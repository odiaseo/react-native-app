import React, {Component} from 'react';
import {StyleSheet, FlatList, View} from 'react-native';
import CouponItem from '../components/CouponItem';
import TopBar from '../components/TopBar';
import TabBar from '../components/TabBar';
import ApiHelper from '../common/ApiHelper';


export default class Search extends Component {

    defaultEndpoint = '/search/voucher?per_page=20&keyword=';
    static navigationOptions = {
        title: 'Search',
    };

    constructor(props) {
        super(props);
        this.state = {
            accessToken: "",
            coupons: {},
            isRefreshing: false,
            page: 1
        };

        this._doSearch = this._doSearch.bind(this);
    }


    _doSearch(searchTerm, page: 1) {
        let endPoint = this.defaultEndpoint + searchTerm + '&page=' + page;
        this.setState({isRefreshing: true});

        if (searchTerm.length <= 1) {

            return null;
        }

        ApiHelper.getAccessToken()
            .then((token) => ApiHelper.call(endPoint, token))
            .then((responseJson) => this.setState({coupons: responseJson, isRefreshing: false}))
            .catch((error) => {
                console.error(error);
            });

    }


    render() {
        return (
            <View style={styles.container}>
                <TopBar doSearch={this._doSearch}
                        showLoading={this.state.isRefreshing}
                        navigation={this.props.navigation}/>

                <View style={styles.body}>
                    <FlatList
                        data={this.state.coupons.data}
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