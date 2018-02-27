import React, {Component} from "react";
import {View, ScrollView} from "react-native";
import {Text, Button} from "react-native-elements";

class ModalScreen extends Component {
    render() {
        return (
            <ScrollView>
                <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                    <Text style={{fontSize: 30}}>This is a modal!</Text>
                    {this.props.children}
                    <Button
                        onPress={() => this.props.navigation.goBack()}
                        title="Dismiss"
                    />
                </View>
            </ScrollView>
        );
    }
}

export default ModalScreen;