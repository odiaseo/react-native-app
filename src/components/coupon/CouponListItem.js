import React, {Component} from "react";
import {StyleSheet} from "react-native";
import commonStyles, {styleVariables} from "../../common/styles";
import {renderExpiryDate, renderOfferCount} from "../../common/helperFuntions";
import PropTypes from "prop-types";
import {ListItem} from "react-native-elements";

class CouponListItem extends Component {

    handleGoToMerchantPage = () => this.props.navigation.navigate("CouponDetail", {coupon: this.props.coupon});

    getSubTitle = (coupon) => {
        if ("merchant" === this.props.type) {
            return renderExpiryDate(coupon);
        }

        return coupon.merchant.title + renderOfferCount(coupon.merchant.stats.voucher_count, true);
    };

    render() {
        return (<ListItem
                avatar={{uri: this.props.coupon.merchant.logo}}
                key={this.props.coupon.id}
                onPress={this.handleGoToMerchantPage}
                subtitle={this.getSubTitle(this.props.coupon)}
                titleStyle={{fontSize: styleVariables.mainTextFontSize}}
                subtitleStyle={commonStyles.listSubTitleText}
                containerStyle={styles.container}
                title={this.props.coupon.title}
            />
        );
    }
}

export default CouponListItem;

CouponListItem.propTypes = {
    coupon: PropTypes.object,
    type: PropTypes.string,
    navigation: PropTypes.object,
};

const styles = StyleSheet.create(
    {
        container: {
            borderBottomColor: styleVariables.borderColor,
            marginTop: 0
        }
    }
);