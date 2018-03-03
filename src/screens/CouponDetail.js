import React, {Component} from "react";
import {StyleSheet, Image, View, ScrollView} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import TabBar from "../components/navigation/TabBar";
import commonStyles, {styleVariables} from "../common/styles";
import {Text, Button, Rating} from "react-native-elements";
import AboutSection from "../components/AboutSection";
import Touchable from "react-native-platform-touchable";
import PropTypes from "prop-types";
import {openExternalLink, renderOfferCount, renderExpiryDate} from "../common/helperFuntions";

export default class CouponDetail extends Component {

    handleOpenExternalLink = () => openExternalLink(this.props.navigation.getParam("coupon").outlink);

    handleMerchantDetailNavigation = () =>  this.props.navigation.navigate("MerchantDetail", {tempData: this.props.navigation.getParam("coupon").merchant});

    render() {
        const coupon = this.props.navigation.getParam("coupon");

        return (

            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.body}>
                        <View style={styles.detailsWrapper}>
                            <Image source={{uri: coupon.merchant.logo}} style={styles.image}/>
                            <Touchable
                                style={styles.details}
                                hitSlop={styleVariables.hitSlop}
                                onPress={this.handleMerchantDetailNavigation}>
                                <View>
                                    <Text style={styles.mainTitle}>{coupon.title}</Text>
                                    <Text style={styles.subTitle}>
                                        {
                                            coupon.merchant.title + " " + renderOfferCount(coupon.merchant.stats.voucher_count, true)
                                        }
                                    </Text>
                                    <Rating
                                        type="star"
                                        fractions={1}
                                        startingValue={coupon.merchant.stats.popularity}
                                        readonly
                                        imageSize={13}
                                        style={styles.ratingStyle}
                                    />
                                </View>
                            </Touchable>
                        </View>

                        <View style={styles.expiryRow}>
                            <Icon name="timer" size={24} color={styleVariables.deliveryColor}/>
                            <Text style={styles.rowItemText}>{renderExpiryDate(coupon)}</Text>
                        </View>

                        <View style={styles.rowItems}>
                            <Icon name="monetization-on" size={24} color={styleVariables.primaryColor}/>
                            <Text style={styles.rowItemText}>{coupon.offer_type.title}</Text>
                        </View>

                        <View style={styles.rowItems}>
                            <Icon name="folder" size={24} color={styleVariables.couponColor}/>
                            <Text style={styles.rowItemText}>{coupon.category.title}</Text>
                        </View>

                        <AboutSection
                            title={coupon.merchant.title}
                            description={coupon.merchant.description}
                        />

                        <View style={commonStyles.buttonStyle}>
                            <Button
                                backgroundColor={styleVariables.dealColor}
                                iconRight={{name: "shopping-cart"}}
                                onPress={this.handleOpenExternalLink}
                                textStyle={commonStyles.buttonTextStyle}
                                containerViewStyle={commonStyles.buttonViewStyle}
                                title='Get Deal'/>
                        </View>
                    </View>
                </ScrollView>
                <TabBar {...this.props}/>
            </View>
        );
    }
}

CouponDetail.propTypes = {
    coupon: PropTypes.object,
    showLoading: PropTypes.bool,
    navigation: PropTypes.object,
};

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
            borderColor: styleVariables.borderColor,
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

        mainTitle: {
            fontSize: 14,
        },

        subTitle: {
            fontSize: 12,
            marginTop: 5,
        },

        ratingStyle: {
            paddingVertical: 10
        },
        expiryRow: {
            flexDirection: "row",
            alignContent: "center",
            paddingHorizontal: 20,
            borderBottomWidth: 1,
            borderColor: styleVariables.borderColor,
            backgroundColor: styleVariables.lightBackgroundColor,
            paddingVertical: 15
        }
    }
);
