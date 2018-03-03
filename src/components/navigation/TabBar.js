import React from "react";
import {StyleSheet, View} from "react-native";
import {styleVariables} from "../../common/styles";
import TabIcon from "./TabIcon";

const TabBar = (props) => (
    <View style={styles.tabBar}>
        <TabIcon routeName="Home" iconName="home" iconTitle="Home" {...props}/>
        <TabIcon routeName="WhatsHot" iconName="whatshot" iconTitle="Trending" {...props}/>
        <TabIcon routeName="MerchantSearch" iconName="subscriptions" iconTitle="Stores" {...props}/>
        <TabIcon routeName="CategoryList" iconName="folder" iconTitle="Categories" {...props}/>
    </View>
);

export default TabBar;

const styles = StyleSheet.create(
    {
        tabBar: {
            backgroundColor: styleVariables.backgroundColor,
            height: 60,
            borderTopWidth: 0.5,
            borderColor: styleVariables.borderColor,
            flexDirection: "row",
            justifyContent: "space-around"
        }
    }
);
