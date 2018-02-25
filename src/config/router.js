import React from 'react';
import Home from '../screens/Home';
import Category from '../screens/Category';
import CouponSearch from '../screens/search/CouponSearch';
import Login from '../screens/Login';
import {StackNavigator, DrawerNavigator, TabNavigator} from 'react-navigation'
import CouponDetail from "../screens/CouponDetail";
import MerchantDetail from "../screens/MerchantDetail";
import {styleVariables} from '../common/styles';
import Trending from "../screens/tabs/Trending";
import TopCoupons from "../screens/tabs/TopCoupons";
import PopularCoupons from "../screens/tabs/PopularCoupons";
import ExpiringCoupons from "../screens/tabs/ExpiringCoupons";
import MerchantSearch from "../screens/search/MerchantSearch";

export const TabNav = TabNavigator(
    {
        Latest: {
            screen: Trending
        },
        Popular: {
            screen: PopularCoupons
        },
        Top: {
            screen: TopCoupons
        },
        Expiring: {
            screen: ExpiringCoupons
        },
    },
    {
        tabBarPosition: 'top',
        swipeEnabled: true,
        navigationOptions: {
            headerStyle: {
                height: 40
            },
        },
        tabBarOptions: {
            initialRouteName: 'Latest',
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

const RootStack = StackNavigator(
    {
        Home: {
            screen: Home
        },
        CouponSearch: {
            screen: CouponSearch
        },
        CouponDetail: {
            screen: CouponDetail
        },
        CategoryList: {
            screen: Category
        },
        WhatsHot: {
            screen: TabNav
        },
        MerchantSearch: {
            screen: MerchantSearch
        },
        MerchantDetail: {
            screen: MerchantDetail
        },
    },
    {
        initialRouteName: 'Home',
        navigationOptions: {
            headerStyle: {
                backgroundColor: styleVariables.headerBackgroundColor,
                height: 35
            },
            headerTintColor: styleVariables.headerColor,
            headerTitleStyle: {
                fontSize: styleVariables.mainTextFontSize
            },
            gesturesEnabled: true,
            headerBackTitleStyle: {
                fontSize: styleVariables.mainTextFontSize,
                color: styleVariables.headerColor,
            }
        }
    }
);

export const DrawerNav = DrawerNavigator(
    {
        Stack: {
            screen: RootStack
        },
        Login: {
            screen: Login
        }
    },
    {
        //drawerBackgroundColor: styleVariables.headerBackgroundColor
    }
);

export default DrawerNav;
