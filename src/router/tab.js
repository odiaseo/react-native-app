import React from "react";
import HeaderRight from "../components/HeaderRight";
import Trending from "../screens/Trending";
import {styleVariables} from "../common/styles";
import * as types from "../flow/types";
import {TabNavigator} from "react-navigation";

const TabNav = TabNavigator(
    {
        [types.SET_LATEST_COUPONS]: {
            screen: Trending,
            navigationOptions: {
                title: "Latest",
                headerRight: (<HeaderRight searchPage="CouponSearch"/>)
            },
        },
        [types.SET_POPULAR_COUPONS]: {
            screen: Trending,
            navigationOptions: {
                title: "Popular",
                headerRight: (<HeaderRight searchPage="CouponSearch"/>)
            },
        },
        [types.SET_TOP_COUPONS]: {
            screen: Trending,
            navigationOptions: {
                title: "Top 10",
                headerRight: (<HeaderRight searchPage="CouponSearch"/>)
            },
        },
        [types.SET_EXPIRING_COUPONS]: {
            screen: Trending,
            navigationOptions: {
                title: "Expiring",
                headerRight: (<HeaderRight searchPage="CouponSearch"/>)
            },
        },
    },
    {
        tabBarPosition: "top",
        swipeEnabled: true,
        navigationOptions: {
            headerStyle: {
                height: 40
            },
        },
        tabBarOptions: {
            initialRouteName: "Latest",
            activeTintColor: styleVariables.headerColor,
            labelStyle: {
                fontSize: styleVariables.mainTextFontSize,
            },
            tabStyle: {
                margin: 0,
                padding: 0,
            },
            style: {
                backgroundColor: styleVariables.headerBackgroundColor,
                margin: 0,
                paddingVertical: 10,
                padding: 8,
            },
            indicatorStyle: {
                borderBottomColor: styleVariables.primaryColor,
                borderBottomWidth: 3,
            },
        }
    }
);
export default TabNav;