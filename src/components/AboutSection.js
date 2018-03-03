import React from "react";
import {View, Text, StyleSheet} from "react-native";
import PropTypes from "prop-types";

const AboutSection = ({title, description}) => {

    if (!description) {
        return null;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>About {title}</Text>
            <Text>{description}</Text>
        </View>
    );
};

const styles = StyleSheet.create(
    {
        container: {
            paddingHorizontal: 20,
            marginTop: 20
        },
        title: {
            fontWeight: "bold"
        }
    }
);

AboutSection.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
};

export default AboutSection;