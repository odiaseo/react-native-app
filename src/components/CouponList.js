import React, {Component} from 'react';
import {FlatList, View} from 'react-native';
import CouponRowItem from '../components/CouponRowItem';
import SiteActivityIndicator from "../components/SiteActivityIndicator";
import commonStyles from "../common/styles";

export default class CouponList extends Component {

    render() {
        if (this.props.showLoading) {
            return (
                <SiteActivityIndicator/>
            );
        }

        return (
            <FlatList
                data={this.props.list}
                renderItem={(coupon) => <CouponRowItem coupon={coupon.item} {...this.props}/>}
                keyExtractor={(item) => item.id}
                itemSeparatorComponent={() => <View style={commonStyles.divider}/>}
            />
        );
    }
}