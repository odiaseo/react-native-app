import React, {Component} from "react";
import {View, Text} from "react-native";

export default class AboutSection extends Component {
    render() {
        if (!this.props.description) {
            return null;
        }

        return (
            <View style={{paddingHorizontal: 20, marginTop: 20}}>
                <Text style={{fontWeight: "bold"}}>About {this.props.title}</Text>
                <Text>{this.props.description}</Text>
            </View>
        );
    }
}
