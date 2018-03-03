import React, {Component} from "react";
import {StyleSheet} from "react-native";
import {ListItem} from "react-native-elements";
import {styleVariables} from "../../common/styles";
import {renderOfferCount, getIconName} from "../../common/helperFuntions";
import PropTypes from "prop-types";

export default class CategoryListItem extends Component {

    handleGoToMerchantPage = () => {
        this.props.navigation.navigate("CategoryMerchant", {category: this.props.category});
    };

    render() {
        return (
            <ListItem
                leftIcon={{name: getIconName(this.props.category.icon_class_name), type: "font-awesome"}}
                key={this.props.category.id}
                onPress={this.handleGoToMerchantPage}
                subtitle={renderOfferCount(this.props.category.stats.voucher_count)}
                titleStyle={styles.title}
                subtitleStyle={styles.subTitle}
                containerStyle={styles.container}
                title={this.props.category.title}
            />
        );
    }
}

CategoryListItem.propTypes = {
    category: PropTypes.object,
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
