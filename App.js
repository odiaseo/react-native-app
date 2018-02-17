import React, {Component} from 'react';
import {StyleSheet, Image, ActivityIndicator, ListView, Text, View} from 'react-native';

const logo = require('./images/youtube.png');

export default class App extends Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.navBar}>
                    <Image source={logo} style={styles.logo}/>
                    <View style={styles.rightNav}>

                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1
        },
        navBar: {
            height: 55,
            backgroundColor: 'white',
            elevation: 3,
            paddingHorizontal: 15,
            flexDirection: 'row',
            alignItems: 'center'
        },
        logo: {
            height: 22,
            width: 98
        },
        rightNav: {}
    }
);