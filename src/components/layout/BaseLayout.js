import React from "react";
import {StyleSheet, View} from "react-native";
import TopBar from "../../components/navigation/TopBar";
import TabBar from "../../components/navigation/TabBar";
import {styleVariables} from "../../common/styles";
import PropTypes from "prop-types";

const BaseLayout = (props) => (
    <View style={styles.container}>
        {props.showSearch && <TopBar {...props} searchType={props.searchType}/>}

        <View style={styles.body}>
            {props.children}
        </View>

        <TabBar {...props}/>
    </View>
);


BaseLayout.defaultProps = {
    searchType: "",
    showSearch: true
};

BaseLayout.propTypes = {
    children: PropTypes.node,
    searchType: PropTypes.string,
    showSearch: PropTypes.bool
};

export default BaseLayout;

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            backgroundColor: styleVariables.backgroundColor
        },
        body: {
            flex: 1
        }
    }
);