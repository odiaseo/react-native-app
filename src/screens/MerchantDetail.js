import React, {Component} from "react";
import {StyleSheet, View, ScrollView, Image} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import TabBar from "../components/navigation/TabBar";
import {styleVariables} from "../common/styles";
import {Text, Button, Rating} from "react-native-elements";
import HeaderRight from "../components/HeaderRight";
import CouponList from "../components/coupon/CouponList";
import AboutSection from "../components/AboutSection";
import {ActionCreators} from "../flow/actions";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import _ from "lodash";
import {renderOfferCount, openExternalLink} from "../common/helperFuntions";
import Touchable from "react-native-platform-touchable";

class MerchantDetail extends Component {

    tempData = null;

    constructor(props) {
        super(props);

        this.renderCategorySection = this.renderCategorySection.bind(this);
        this.handleOutlink = this.handleOutlink.bind(this);
    }

    static navigationOptions = ({navigation}) => {

        const {params} = navigation.state;

        return {
            title: params ? params.tempData.title : "STORE DETAIL",
            headerRight: (<HeaderRight/>)
        };
    };

    handleOutlink(coupon) {
        openExternalLink(coupon.outlink);
    }

    componentDidMount() {
        this.props.setActivityStatus(true);
        this.props.clearMerchantDetails();
        this.props.findMerchantById(this.props.navigation.state.params.tempData.id);
        this.props.getCouponsByMerchantId(this.props.navigation.state.params.tempData.id);
    }

    renderCategorySection() {

        if (_.isEmpty(this.props.merchant)) {
            return null;
        }

        return (
            <View>
                <Text style={styles.merchantTitle}>{this.props.merchant.category.title}</Text>
                <Text style={styles.merchantTitle}>
                    {renderOfferCount(this.props.merchant.category.stats.voucher_count)}
                </Text>
                <Rating
                    type="star"
                    fractions={1}
                    startingValue={9}
                    readonly={true}
                    imageSize={13}
                    style={{paddingVertical: 10}}
                />
            </View>

        );
    }

    render() {

        this.tempData = this.props.navigation.state.params.tempData;

        return (

            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.body}>
                        <View style={styles.detailsWrapper}>
                            <Touchable
                                onPress={() => this.handleOutlink(this.props.merchant)}>
                                <Image source={{uri: this.tempData.logo}} style={styles.image}/>
                            </Touchable>
                            <View style={styles.details}>
                                <Text style={styles.offerTitle}>{this.tempData.title}</Text>
                                {this.renderCategorySection()}
                            </View>
                        </View>

                        <View style={styles.rowItems}>
                            <Icon name="monetization-on" size={24} color={styleVariables.primaryColor}/>
                            <Text style={styles.rowItemText}>{this.tempData.title}</Text>
                        </View>

                        <View style={styles.rowItems}>
                            <Icon name="folder" size={24} color={styleVariables.couponColor}/>
                            <Text style={styles.rowItemText}>{this.tempData.title}</Text>
                        </View>

                        {!this.props.showLoading && this.props.merchant &&
                        <AboutSection
                            title={this.tempData.title}
                            description={this.props.merchant ? this.props.merchant.description : null}
                        />}

                        {(this.props.coupons.length > 0) &&
                        <View style={styles.couponSection}>
                            <Text style={{fontWeight: "bold", paddingHorizontal: 20}}>Offers </Text>
                            <CouponList
                                {...this.props}
                                list={this.props.coupons}
                                onClick={this.handleOutlink}
                                type="merchant"
                            />
                        </View>
                        }

                        <View style={{flex: 1}}>
                            <Button
                                loading={this.props.showLoading}
                                backgroundColor={styleVariables.dealColor}
                                iconRight={{name: "shopping-cart"}}
                                onPress={() => this.handleOutlink(this.props.merchant)}
                                textStyle={{fontSize: styleVariables.mainTextFontSize}}
                                containerViewStyle={{marginVertical: 15, alignContent: "stretch"}}
                                title={"Visit " + this.tempData.title}/>
                        </View>


                    </View>
                </ScrollView>
                <TabBar {...this.props}/>
            </View>


        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

function mapStateTopProps(state) {
    return {
        merchant: _.isEmpty(state.merchantDetails) ? {} : state.merchantDetails,
        coupons: _.isEmpty(state.merchantCoupons) ? [] : Object.values(state.merchantCoupons),
        showLoading: state.refreshStatus,
    };
}

export default connect(mapStateTopProps, mapDispatchToProps)(MerchantDetail);

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

        couponSection: {
            marginVertical: 20,
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
