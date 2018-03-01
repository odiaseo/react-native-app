import React, {Component} from "react";
import {StyleSheet, View} from "react-native";
import TopBar from "../../components/TopBar";
import TabBar from "../../components/navigation/TabBar";
import {bindActionCreators} from "redux";
import {ActionCreators} from "../../flow/actions/index";
import {connect} from "react-redux";
import _ from "lodash";
import {styleVariables} from "../../common/styles";
import {SEARCH_MERCHANT} from "../../constants";
import MerchantList from "../../components/merchant/MerchantList";

class MerchantSearch extends Component {

    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        title: "MERCHANT SEARCH",
    };

    render() {
        return (
            <View style={styles.container}>
                <TopBar {...this.props} searchType={SEARCH_MERCHANT}/>

                <View style={styles.body}>
                    <MerchantList {...this.props} list={this.props.merchants}/>
                </View>

                <TabBar {...this.props}/>
            </View>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

function mapStateTopProps(state) {
    return {
        merchants: _.isEmpty(state.searchedMerchants) ? [] : Object.values(state.searchedMerchants),
        showLoading: state.refreshStatus,
    };
}

export default connect(mapStateTopProps, mapDispatchToProps)(MerchantSearch);

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