import React, {Component} from "react";
import {StyleSheet, View, Keyboard} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import {SearchBar} from "react-native-elements";
import {ActionCreators} from "../actions/index";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import _ from "lodash";
import Touchable from "react-native-platform-touchable";
import {styleVariables} from "../common/styles";

class HeaderSearchBar extends Component {

    searchRef: null;

    constructor(props) {
        super(props);
        this.onChangeTextDelayed = _.debounce(this.onChangeTextDelayed.bind(this), 500);
    }

    onChangeTextDelayed(searchTerm, page = 1) {
        if (searchTerm.length > 2) {
            this.props.setActivityStatus(true);
            this.props.searchByKeyword(this.props.searchType, searchTerm, page);
            Keyboard.dismiss();
        }
    }

    componentDidMount() {
        this.searchRef.focus();
    }

    render() {
        return (
            <View style={styles.navBar}>
                <SearchBar
                    round
                    ref={(search) => {
                        this.searchRef = search;
                    }}
                    showLoadingIcon={false}
                    placeholder='Enter keyword ...'
                    inputStyle={styles.searchBar}
                    containerStyle={styles.searchContainer}
                    autoCapitalize={"none"}
                    icon={{style: styles.iconStyle}}
                    loadingIcon={{style: styles.iconStyle}}
                    clearIcon={{style: styles.iconStyle, color: styleVariables.headerColor}}
                    onChangeText={(text) => this.onChangeTextDelayed(text)}
                />
            </View>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

function mapStateTopProps(state) {
    return {
        showLoading: state.refreshStatus.isRefreshing,
        searchTerm: state.searchTerm.keyword,
    };
}

export default connect(mapStateTopProps, mapDispatchToProps)(HeaderSearchBar);

const styles = StyleSheet.create(
    {
        searchContainer: {
            height: 35,
            padding: 0,
            margin: 0,
            marginTop: 0,
            paddingTop: 0,
            backgroundColor: "transparent",
            borderTopWidth: 0,
            borderBottomWidth: 0
        },
        iconStyle: {
            top: 7.5,
        },
        navBar: {
            flex:1,
            backgroundColor: "#25282e",
            paddingHorizontal: 0,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
        },

        searchBar: {
            borderColor: "#25282e",
            fontSize: 12,
            marginTop: 0,
        },
    }
);
