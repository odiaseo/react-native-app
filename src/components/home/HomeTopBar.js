import React from "react";
import {StyleSheet, View} from "react-native";
import Logo from "../Logo";
import HeaderRight from "../HeaderRight";
import {styleVariables} from "../../common/styles";

const HomeTopBar = function() {
        return (
            <View style={styles.navBar}>
                <Logo/>
                <HeaderRight />
            </View>
        );
};

export default   HomeTopBar;

const styles = StyleSheet.create(
    {
        navBar: {
            height: 60,
            paddingTop:10,
            backgroundColor: styleVariables.headerBackgroundColor,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
        }
    }
);
