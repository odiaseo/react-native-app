import React, {Component} from 'react'
import {StyleSheet, Image, View} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import commonStyles, {styleVariables} from '../common/styles';
import {Text} from 'react-native-elements'
import * as util from '../common/helperFuntions';
import Touchable from 'react-native-platform-touchable';

export default class CouponRowItem extends Component {

    render() {
        let coupon = this.props.coupon;

        return (
            <Touchable
                onPress={() => this.props.navigation.navigate('CouponDetail', {coupon: coupon})}>
                <View style={[commonStyles.container, styles.container]}>
                    <View>
                        <Image source={{uri: coupon.merchant.logo}} style={commonStyles.merchantLogo}/>
                    </View>
                    <View style={styles.offerDetails}>
                        <Text numberOfLines={2} style={styles.offerTitle}>{coupon.title}</Text>
                        <View style={styles.infoSection}>
                            <View style={{flexDirection: 'row'}}>
                                {/* <Icon name="link" color={styleVariables.subTitleColor}
                                      size={styleVariables.subtitleFontSize}/> */}
                                <Text style={styles.merchantTitle}>{coupon.merchant.title}</Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <Icon name="timer" size={styleVariables.subtitleFontSize} color={styleVariables.subTitleColor}/>
                                <Text style={[styles.infoDetailText, {color: styleVariables.subTitleColor}]}>
                                    {util.renderExpiryDate(coupon)}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.rightSection}>
                        <Icon
                            name="keyboard-arrow-right"
                            size={25}
                            color={styleVariables.headerColor}
                        />
                    </View>
                </View>
            </Touchable>
        )
    }
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            paddingHorizontal: 15,
            elevation: 5,
            flexDirection: 'row',
            paddingVertical: 10,
            borderBottomWidth: 1,
            borderBottomColor: styleVariables.borderColor,
            alignContent: 'center',
        },

        infoSection: {
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginTop: 5,
        },

        rightSection: {
            flexDirection: 'column',
            justifyContent: 'center'
        },

        offerDetails: {
            height: 50,
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            flex: 1
        },

        offerTitle: {
            fontSize: styleVariables.mainTextFontSize,
            color: styleVariables.headerBackgroundColor,
        },

        infoDetailText: {
            fontSize: styleVariables.subtitleFontSize,
            justifyContent: 'center',
            alignContent: 'center',
            marginLeft: 2,
        },

        merchantTitle: {
            paddingLeft: 2,
            fontSize: styleVariables.subtitleFontSize,
            color: styleVariables.subTitleColor,
        }
    }
);
