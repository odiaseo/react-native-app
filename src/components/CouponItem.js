import React, {Component} from 'react'
import {StyleSheet, Image, TouchableOpacity, Text, View} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

let numeral = require('numeral')

export default class CouponItem extends Component {
  render () {
    let coupon = this.props.coupon

    return (
      <View style={styles.container}>
        <Image source={{uri: coupon.merchant.logo}} style={{width: 80}}/>
        <View style={styles.videoDetails}>
          <Text numberOfLines={2} style={styles.videoTitle}>{coupon.title}</Text>
          <Text numberOfLines={1} style={styles.merchantTitle}>{coupon.merchant.title}</Text>
        </View>
        <TouchableOpacity style={{alignItems: 'center'}}>
          <Icon name="keyboard-arrow-right" size={25} color="#999999"/>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create(
  {
    container: {
      padding: 15,
      flexDirection: 'row',
      paddingTop: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#eeeeee'
    },
    videoDetails: {
      paddingHorizontal: 15,
      flex: 1
    },
    videoTitle: {
      fontSize: 16,
      color: '#3c3c3c'
    },
    videoStats: {
      fontSize: 15,
      paddingTop: 3
    },
    merchantTitle: {
      fontSize: 14,
      color: '#333333',
      paddingVertical: 5
    }
  }
)
