import React, {Component} from "react";
import {Text, View} from "react-native";
import TabBar from "../components/navigation/TabBar";
import commonStyles from "../common/styles";

export default class Login extends Component {
    render() {
        return (
            <View style={commonStyles.container}>
                <Text>Please Login</Text>
                <TabBar {...this.props}/>
            </View>

        );
    }
}
