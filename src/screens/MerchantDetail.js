import React, {Component} from "react";
import {StyleSheet, View, ScrollView, Image, Share} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import commonStyles, {styleVariables} from "../common/styles";
import {Text, Button, Rating} from "react-native-elements";
import CouponList from "../components/coupon/CouponList";
import AboutSection from "../components/AboutSection";
import _ from "lodash";
import {renderOfferCount, openExternalLink} from "../common/helperFuntions";
import Touchable from "react-native-platform-touchable";
import withConnect, {withIndicator} from "../config/hoc";
import BaseLayout from "../components/layout/BaseLayout";
import PropTypes from "prop-types";

class MerchantDetail extends Component {

    tempData = null;

    handleSocialShare = () => Share.share(
        {
            message: "Testing share" + this.props.merchant.title,
            url: "http://bam.tech", //IOS  only
            title: this.props.merchant.description
        },
        {
            // Android only:
            dialogTitle: "Share BAM goodness",
            // iOS only:
            subject: "",
            tintColor: "red",
            excludedActivityTypes: []
        }
    );

    handleOutlink = () => openExternalLink(this.props.merchant.outlink);

    handleGoToCategoryMerchantPage = () => {
        this.props.navigation.navigate("CategoryMerchant", {category: this.props.merchant.category});
    };

    componentDidMount() {
        this.props.getCouponsByMerchantId(this.props.navigation.state.params.tempData.id);
    }

    renderCategorySection = () => {

        if (_.isEmpty(this.props.merchant)) {
            return null;
        }

        return (
            <View>
                <Touchable
                    onPress={this.handleGoToCategoryMerchantPage}>
                    <Text style={styles.subTitle}>{this.props.merchant.category.title}</Text>
                </Touchable>
                <Text style={styles.subTitle}>
                    {renderOfferCount(this.props.merchant.category.stats.voucher_count)}
                </Text>
                <Rating
                    type="star"
                    fractions={1}
                    startingValue={9}
                    readonly
                    imageSize={13}
                    style={styles.ratingStyle}
                />
            </View>

        );
    };

    render() {

        this.tempData = this.props.navigation.state.params.tempData;

        return (

            <BaseLayout {...this.props} showSearch={false}>
                <ScrollView>
                    <View style={styles.body}>
                        <View style={styles.detailsWrapper}>
                            <Touchable
                                onPress={this.handleOutlink}>
                                <Image source={{uri: this.tempData.logo}} style={styles.image}/>
                            </Touchable>
                            <View style={styles.details}>
                                <Text style={styles.mainTitle}>{this.tempData.title}</Text>
                                {this.renderCategorySection()}
                            </View>
                        </View>

                        <View style={styles.rowItems}>
                            <Touchable
                                onPress={this.handleSocialShare}>
                                <View style={styles.shareStyle}>
                                    <Icon name="share" size={styleVariables.iconSize}
                                          color={styleVariables.primaryColor}/>
                                    <Text style={styles.rowItemText}>Share</Text>
                                </View>
                            </Touchable>
                        </View>

                        {!this.props.showLoading && this.props.merchant &&
                        <AboutSection
                            title={this.tempData.title}
                            description={this.props.merchant ? this.props.merchant.description : null}
                        />}

                        {(this.props.coupons.length > 0) &&
                        <View style={styles.couponSection}>
                            <Text style={styles.couponTitleTitle}>Popular Offers </Text>
                            <CouponList
                                {...this.props}
                                list={this.props.coupons}
                                onClick={this.handleOutlink}
                                type="merchant"
                            />
                        </View>
                        }

                        <View style={commonStyles.buttonStyle}>
                            <Button
                                loading={this.props.showLoading}
                                backgroundColor={styleVariables.dealColor}
                                iconRight={{name: "shopping-cart"}}
                                onPress={this.handleOutlink}
                                textStyle={commonStyles.buttonTextStyle}
                                containerViewStyle={commonStyles.buttonViewStyle}
                                title={"Visit " + this.tempData.title}/>
                        </View>
                    </View>
                </ScrollView>
            </BaseLayout>
        );
    }
}

function mapStateTopProps(state) {
    return {
        merchant: state.merchantDetails,
        coupons: _.isEmpty(state.merchantCoupons) ? [] : Object.values(state.merchantCoupons),
        showLoading: state.refreshStatus,
    };
}

MerchantDetail.propTypes = {
    merchant: PropTypes.object,
    showLoading: PropTypes.bool,
    navigation: PropTypes.object,
    getCouponsByMerchantId: PropTypes.func,
    coupons: PropTypes.array
};

export default withConnect(withIndicator(MerchantDetail), mapStateTopProps);


const styles = StyleSheet.create(
    {

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

        couponSection: {
            marginVertical: 20,
            borderBottomWidth: 1,
            borderColor: styleVariables.borderColor
        },

        rowItemText: {
            marginTop: 2,
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
            fontSize: styleVariables.mainTextFontSize,
        },

        subTitle: {
            fontSize: styleVariables.mainTextFontSize,
            marginTop: 5,
        },
        ratingStyle: {
            paddingVertical: 10
        },
        couponTitleTitle: {
            fontWeight: "bold",
            paddingHorizontal: 20
        },
        shareStyle: {
            flexDirection: "row"
        }
    }
);
