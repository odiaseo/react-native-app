import React, {Component} from 'react'
import {StyleSheet, View} from 'react-native'
import Logo from '../Logo'
import HeaderRight from '../HeaderRight';
import {styleVariables} from "../../common/styles";

export default class HomeTopBar extends Component {
    render() {
        return (
            <View style={styles.navBar}>
                <Logo/>
                <HeaderRight />
            </View>
        )
    }
}

const styles = StyleSheet.create(
    {
        navBar: {
            height: 60,
            paddingTop:10,
            backgroundColor: styleVariables.headerBackgroundColor,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
        }
    }
);
