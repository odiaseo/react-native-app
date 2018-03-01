import React, {Component} from "react";
import {StyleSheet, View} from "react-native";
import TopBar from "../../components/TopBar";
import TabBar from "../../components/navigation/TabBar";
import {bindActionCreators} from "redux";
import {ActionCreators} from "../../flow/actions/index";
import {connect} from "react-redux";
import _ from "lodash";
import {styleVariables} from "../../common/styles";
import MerchantList from "../../components/merchant/MerchantList";
import HeaderRight from "../../components/HeaderRight";

class CategoryMerchant extends Component {

    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.state.params.category.title,
            headerRight: (<HeaderRight/>),
        };
    };

    componentDidMount() {
        this.props.findMerchantsByCategory(this.props.navigation.state.params.category.id);
    }

    render() {
        return (
            <View style={styles.container}>

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
        merchants: _.isEmpty(state.categoryMerchants) ? [] : Object.values(state.categoryMerchants),
        showLoading: state.refreshStatus,
    };
}

export default connect(mapStateTopProps, mapDispatchToProps)(CategoryMerchant);

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