import React from "react";
import {StyleSheet, View, KeyboardAvoidingView} from "react-native";
import TopBar from "../../components/navigation/TopBar";
import TabBar from "../../components/navigation/TabBar";
import _ from "lodash";
import {styleVariables} from "../../common/styles";
import {SEARCH_MERCHANT} from "../../constants";
import MerchantList from "../../components/merchant/MerchantList";
import withConnect, {withIndicator} from "../../config/hoc";
import PropTypes from "prop-types";


const MerchantSearch = (props) => (
    <KeyboardAvoidingView style={styles.container}>
        <TopBar {...props} searchType={SEARCH_MERCHANT}/>

        <View style={styles.body}>
            <MerchantList {...props} list={props.merchants}/>
        </View>

        <TabBar {...props}/>
    </KeyboardAvoidingView>
);

function mapStateTopProps(state) {
    return {
        merchants: _.isEmpty(state.searchedMerchants) ? [] : Object.values(state.searchedMerchants),
        showLoading: state.refreshStatus,
    };
}

MerchantSearch.propTypes = {
    merchants: PropTypes.array
};

export default withConnect(withIndicator(MerchantSearch), mapStateTopProps);

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