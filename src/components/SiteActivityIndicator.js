import React from "react";
import {StyleSheet} from "react-native";
import {styleVariables} from "../common/styles";
import {SkypeIndicator} from "react-native-indicators";
import PropTypes from "prop-types";

const SiteActivityIndicator = ({isHidden}) => {

    if (isHidden) {
        return null;
    }

    return (
        <SkypeIndicator
            color={styleVariables.primaryColor}
            size={styleVariables.loadingIconSize}
            style={styles.indicator}
        />
    );
};

SiteActivityIndicator.defaultProps = {
    isHidden: true
};

SiteActivityIndicator.propTypes = {
    isHidden: PropTypes.bool.isRequired,
};

SiteActivityIndicator.defaultProps = {
    isHidden: false
};

const styles = StyleSheet.create(
    {
        indicator: {
            flex: 1,
            justifyContent: "center",
            backgroundColor: styleVariables.transparent
        }
    }
);

export default SiteActivityIndicator;
