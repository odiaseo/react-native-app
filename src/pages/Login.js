import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class Login extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Text>Please Login</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            backgroundColor: '#455a64',
            alignItems: 'center',
            justifyContent: 'center'
        }
    }
);