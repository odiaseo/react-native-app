import React from "react";
import HeaderRight from "../components/HeaderRight";
import MerchantDetail from "../screens/MerchantDetail";
import {StackNavigator} from "react-navigation";
import {styleVariables} from "../common/styles";
import CategoryMerchant from "../screens/search/CategoryMerchant";
import CouponDetail from "../screens/CouponDetail";
import MerchantSearch from "../screens/search/MerchantSearch";
import CouponSearch from "../screens/search/CouponSearch";
import Home from "../screens/Home";
import Category from "../screens/Category";
import TabNav from "./tab";

const RootStack = StackNavigator(
    {
        Home: {
            screen: Home,
            navigationOptions: {
                title: "HOME",
                header: null
            }
        },
        CouponSearch: {
            screen: CouponSearch,
            navigationOptions: {
                title: "COUPON SEARCH",
            }
        },
        CategoryMerchant: {
            screen: CategoryMerchant,
            navigationOptions: ({navigation}) => ({
                title: navigation.state.params.category.title,
                headerRight: (<HeaderRight/>),
            })
        },
        CouponDetail: {
            screen: CouponDetail,
            navigationOptions: {
                title: "DEAL",
                headerRight: (<HeaderRight/>)
            }
        },
        CategoryList: {
            screen: Category,
            navigationOptions: {
                title: "CATEGORIES",
                headerRight: (<HeaderRight/>),
            }
        },
        WhatsHot: {
            screen: TabNav
        },
        MerchantSearch: {
            screen: MerchantSearch,
            navigationOptions: {
                title: "MERCHANT SEARCH",
            }
        },
        MerchantDetail: {
            screen: MerchantDetail,
            navigationOptions: ({navigation}) => {

                const {params} = navigation.state;

                return {
                    title: params ? params.tempData.title : "STORE DETAIL",
                    headerRight: (<HeaderRight/>)
                };
            }
        },
    },
    {
        initialRouteName: "Home",
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

export default RootStack;