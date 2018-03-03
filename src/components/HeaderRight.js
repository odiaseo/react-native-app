import React, {Component} from "react";
import {StyleSheet, View} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import {withNavigation} from "react-navigation";
import {styleVariables} from "../common/styles";
import Touchable from "react-native-platform-touchable";
import PropTypes from "prop-types";

class HeaderRight extends Component {
    constructor(props) {
        super(props);
        this.handleDisplayDrawerStack = this.handleDisplayDrawerStack.bind(this);
        this.handleGoToSearchPage = this.handleGoToSearchPage.bind(this);
    }


    handleGoToSearchPage() {

        let searchPage = "MerchantSearch";

        if (typeof this.props.searchPage !== "undefined") {
            searchPage = this.props.searchPage;
        }
        this.props.navigation.navigate(searchPage);
    }

    handleDisplayDrawerStack() {
        this.props.navigation.navigate("DrawerToggle");
    }

    render() {


        return (
            <View style={styles.rightNav} {...this.props}>
                <Touchable
                    key="touch1"
                    hitSlop={styleVariables.hitSlop}
                    onPress={this.handleGoToSearchPage}>
                    <Icon
                        style={styles.navItem} name="search"
                        size={styleVariables.menuIconSize}
                        color={styleVariables.headerColor}
                    />
                </Touchable>
                <Touchable
                    key="touch2"
                    hitSlop={styleVariables.hitSlop}
                    onPress={this.handleDisplayDrawerStack}>
                    <Icon
                        style={styles.navItem} name="menu"
                        size={styleVariables.menuIconSize}
                        color={styleVariables.headerColor}
                    />
                </Touchable>
            </View>
        );
    }
}

export default withNavigation(HeaderRight);

HeaderRight.propTypes = {
    navigation: PropTypes.object,
    searchPage: PropTypes.string
};

const styles = StyleSheet.create(
    {
        rightNav: {
            marginRight: 10,
            flexDirection: "row",
            justifyContent: "flex-end",
            alignContent: "center",
        },
        navItem: {
            padding: 10
        }
    }
);