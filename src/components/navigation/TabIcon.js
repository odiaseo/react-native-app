import React, {Component} from "react";
import {StyleSheet, Text, View} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Touchable from "react-native-platform-touchable";
import {styleVariables} from "../../common/styles";
import PropTypes from "prop-types";

class TabIcon extends Component {

    constructor(props) {
        super(props);
        this.handleTabNavigation = this.handleTabNavigation.bind(this);

    }

    handleTabNavigation() {
        this.props.navigation.navigate(this.props.routeName);
    }

    render() {
        return (

            <Touchable
                hitSlop={styleVariables.hitSlop}
                style={styles.tabItem}
                onPress={this.handleTabNavigation}>
                <View style={styles.tabItem}>
                    <Icon name={this.props.iconName} size={styleVariables.menuIconSize}/>
                    <Text style={styles.tabTitle}>{this.props.iconTitle}</Text>
                </View>
            </Touchable>
        );
    }
}

TabIcon.propTypes = {
    navigation: PropTypes.object,
    routeName: PropTypes.string,
    iconTitle: PropTypes.string,
    iconName: PropTypes.string
};

export default TabIcon;

const styles = StyleSheet.create(
    {
        tabItem: {
            alignItems: "center",
            justifyContent: "center"
        },
        tabTitle: {
            fontSize: styleVariables.subtitleFontSize,
            color: styleVariables.tabColor,
            paddingTop: 3
        }
    }
);