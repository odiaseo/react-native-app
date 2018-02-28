import React, {Component} from "react";
import {StyleSheet, View, ScrollView, Text} from "react-native";
import StoreCard from "../StoreCard";
import {styleVariables} from "../../common/styles";
import PropTypes from "prop-types";

export default class SliderRow extends Component {

    render() {
        return (
            <View style={styles.contentContainer}>
                <View style={styles.slideHeader}>
                    <Text style={styles.slideTitle}>{this.props.section.title}</Text>
                    <Text style={styles.moreTextLink}>view all</Text>
                </View>
                <ScrollView
                    contentContainerStyle={{marginBottom: 15}}
                    horizontal
                    keyboardDismissMode={"on-drag"}
                    maximumZoomScale={3.0}>
                    {this.props.section.data.map((store, index) => <StoreCard key={index} store={store}/>)}
                </ScrollView>
            </View>
        );
    }
}

SliderRow.propTypes = {
    section: PropTypes.object.isRequired,
};

const styles = StyleSheet.create(
    {
        contentContainer: {
            flex: 1,
            backgroundColor: styleVariables.lightBackgroundColor
        },
        slideHeader: {
            paddingHorizontal: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 15,
            marginBottom: 5,
        },
        slideTitle: {
            fontWeight: "bold",
        },
        moreTextLink: {},
    }
);