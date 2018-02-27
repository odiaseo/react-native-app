import React, {Component} from "react";
import {ScrollView} from "react-native";
import SiteActivityIndicator from "../components/SiteActivityIndicator";
import commonStyles, {styleVariables} from "../common/styles";
import {renderOfferCount} from "../common/helperFuntions";
import {List, ListItem} from "react-native-elements";

export default class CouponList extends Component {

    render() {
        if (this.props.showLoading) {
            return (
                <SiteActivityIndicator/>
            );
        }

        return (

            <ScrollView>
                <List containerStyle={commonStyles.listContainerStyle}>
                    {
                        this.props.list.map((coupon) => (
                            <ListItem
                                avatar={{uri: coupon.merchant.logo}}
                                key={coupon.id}
                                onPress={() => this.props.navigation.navigate("CouponDetail", {coupon})}
                                subtitle={coupon.merchant.title + renderOfferCount(coupon.merchant.stats.voucher_count, true)}
                                titleStyle={{fontSize: styleVariables.mainTextFontSize}}
                                subtitleStyle={commonStyles.listSubTitleText}
                                containerStyle={{borderBottomColor: styleVariables.borderColor, marginTop: 0}}
                                title={coupon.title}
                            />
                        ))
                    }
                </List>
            </ScrollView>
        );
    }
}