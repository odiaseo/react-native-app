import React, {Component} from "react";
import {StyleSheet} from "react-native";
import {styleVariables} from "../../common/styles";
import {renderOfferCount} from "../../common/helperFuntions";
import PropTypes from "prop-types";
import {ListItem} from "react-native-elements";

class MerchantListItem extends Component {

    handleGoToMerchantPage = () => this.props.navigation.navigate("MerchantDetail", {tempData: this.props.merchant});

    render() {
        return (<ListItem
                avatar={{uri: this.props.merchant.logo}}
                onPress={this.handleGoToMerchantPage}
                subtitle={renderOfferCount(this.props.merchant.voucher_count)}
                titleStyle={styles.title}
                subtitleStyle={styles.subTitle}
                containerStyle={styles.container}
                title={this.props.merchant.title}
            />
        );
    }
}


export default MerchantListItem;

MerchantListItem.propTypes = {
    merchant: PropTypes.object,
    navigation: PropTypes.object,
};

const styles = StyleSheet.create(
    {
        container: {
            borderBottomColor: styleVariables.borderColor,
            marginTop: 0
        },
        subTitle: {
            fontSize: styleVariables.infoTextFontSize,
            fontWeight: "normal"
        },
        title: {
            fontSize: styleVariables.mainTextFontSize
        },
    }
);