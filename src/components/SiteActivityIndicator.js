import React, {Component} from 'react';
import {View} from 'react-native';
import {styleVariables} from '../common/styles';
import {SkypeIndicator} from 'react-native-indicators';

export default class SiteActivityIndicator extends Component {
    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', backgroundColor: styleVariables.backgroundColor}}>
                <SkypeIndicator color={styleVariables.primaryColor} size={40}/>
            </View>
        )
    }
}
