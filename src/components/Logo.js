import React, {Component} from 'react';
import {StyleSheet, Image, View} from 'react-native';

const image = require('../images/kupon-logo.png');

export default class Logo extends Component {

    render() {
        return (
            <View>
                <Image source={image} style={styles.logo}/>
            </View>
        );
    }
}

const styles = StyleSheet.create(
    {
        logo: {
            height: 22
        }
    }
);