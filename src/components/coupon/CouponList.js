import React, {Component} from "react";
import {ScrollView} from "react-native";
import SiteActivityIndicator from "../SiteActivityIndicator";
import commonStyles, {styleVariables} from "../../common/styles";
import {renderOfferCount} from "../../common/helperFuntions";
import {List, ListItem} from "react-native-elements";
import {renderExpiryDate} from "../../common/helperFuntions";

export default class CouponList extends Component {

    getSubTitle(coupon) {
        if ("merchant" === this.props.type) {
            return renderExpiryDate(coupon);
        }

        return coupon.merchant.title + renderOfferCount(coupon.merchant.stats.voucher_count, true);
    }

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
                                onPress={() => this.props.onClick(coupon)}
                                subtitle={this.getSubTitle(coupon)}
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