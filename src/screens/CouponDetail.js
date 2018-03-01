import React, {Component} from "react";
import {StyleSheet, Image, Linking, View, ScrollView} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import TabBar from "../components/navigation/TabBar";
import {styleVariables} from "../common/styles";
import {Text, Button, Rating} from "react-native-elements";
import HeaderRight from "../components/HeaderRight";
import * as util from "../common/helperFuntions";
import AboutSection from "../components/AboutSection";
import Touchable from "react-native-platform-touchable";

export default class CouponDetail extends Component {

    static navigationOptions = {
        title: "DEAL",
        headerRight: (<HeaderRight/>)
    };

    openExternalLink() {
        Linking.openURL(this.coupon.outlink)
            .catch(err => console.error("An error occurred", err));
    }

    render() {
        this.coupon = this.props.navigation.state.params.coupon;

        return (

            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.body}>
                        <View style={styles.detailsWrapper}>
                            <Image source={{uri: this.coupon.merchant.logo}} style={styles.image}/>
                            <Touchable
                                style={styles.details}
                                hitSlop={styleVariables.hitSlop}
                                onPress={() => this.props.navigation.navigate("MerchantDetail", {tempData: this.coupon.merchant})}>
                                <View>
                                    <Text style={styles.offerTitle}>{this.coupon.title}</Text>
                                    <Text style={styles.merchantTitle}>
                                        {
                                            this.coupon.merchant.title + " " + util.renderOfferCount(this.coupon.merchant.stats.voucher_count, true)
                                        }
                                    </Text>
                                    <Rating
                                        type="star"
                                        fractions={1}
                                        startingValue={this.coupon.merchant.stats.popularity}
                                        readonly
                                        imageSize={13}
                                        style={{paddingVertical: 10}}
                                    />
                                </View>
                            </Touchable>
                        </View>

                        <View style={[styles.rowItems, {
                            backgroundColor: styleVariables.lightBackgroundColor,
                            paddingVertical: 15
                        }]}>
                            <Icon name="timer" size={24} color={styleVariables.deliveryColor}/>
                            <Text style={styles.rowItemText}>{util.renderExpiryDate(this.coupon)}</Text>
                        </View>

                        <View style={styles.rowItems}>
                            <Icon name="monetization-on" size={24} color={styleVariables.primaryColor}/>
                            <Text style={styles.rowItemText}>{this.coupon.offer_type.title}</Text>
                        </View>

                        <View style={styles.rowItems}>
                            <Icon name="folder" size={24} color={styleVariables.couponColor}/>
                            <Text style={styles.rowItemText}>{this.coupon.category.title}</Text>
                        </View>

                        <AboutSection
                            title={this.coupon.merchant.title}
                            description={this.coupon.merchant.description}
                        />

                        <View style={{flex: 1}}>
                            <Button
                                backgroundColor={styleVariables.dealColor}
                                iconRight={{name: "shopping-cart"}}
                                onPress={this.openExternalLink.bind(this)}
                                containerViewStyle={{marginTop: 60, alignContent: "stretch"}}
                                title='Get Deal'/>
                        </View>
                    </View>
                </ScrollView>
                <TabBar {...this.props}/>
            </View>
        );
    }
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            backgroundColor: styleVariables.backgroundColor
        },

        body: {
            flex: 1,
        },

        rowItems: {
            flexDirection: "row",
            alignContent: "center",
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderBottomWidth: 1,
            borderColor: styleVariables.borderColor
        },

        rowItemText: {
            marginTop: 5,
            marginLeft: 10
        },

        image: {
            width: 120,
            height: 90,
            borderWidth: 1,
            marginRight: 10,
            borderColor: "#cccccc",
        },
        detailsWrapper: {
            flexDirection: "row",
            alignContent: "center",
            justifyContent: "space-between",
            padding: 20,
        },

        details: {
            flex: 1,
            alignItems: "flex-start",
        },

        offerTitle: {
            fontSize: 14,
        },

        merchantTitle: {
            fontSize: 12,
            marginTop: 5,
        }
    }
);
