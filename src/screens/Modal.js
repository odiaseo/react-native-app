import React, {Component} from "react";
import {View, ScrollView, StyleSheet} from "react-native";
import {Button} from "react-native-elements";
import PropTypes from "prop-types";

class ModalScreen extends Component {

    handleBackButton = () => this.props.navigation.goBack();

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    {this.props.children}
                    <Button
                        onPress={this.handleBackButton}
                        title="Dismiss"
                    />
                </View>
            </ScrollView>
        );
    }
}

export default ModalScreen;

ModalScreen.propTypes = {
    children: PropTypes.node,
    navigation: PropTypes.object
};

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
        }
    }
);