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
import PropTypes from "prop-types";
import SliderRow from "./coupon/SliderRow";

class TopBar extends Component {

    searchRef = null;

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
                    showLoadingIcon={this.props.showLoading}
                    placeholder='Enter keyword ...'
                    inputStyle={styles.searchBar}
                    containerStyle={styles.searchContainer}
                    autoCapitalize={"none"}
                    onChangeText={(text) => this.onChangeTextDelayed(text)}
                    clearIcon={{color: "#86939c"}}
                />
                <View>
                    <Touchable
                        hitSlop={styleVariables.hitSlop}
                        onPress={() => this.props.navigation.navigate("DrawerToggle")}>
                        <Icon style={styles.navItem} name="menu" size={25} color="#FFFFFF"/>
                    </Touchable>
                </View>
            </View>
        );
    }
}

TopBar.propTypes = {
    searchType: PropTypes.string.isRequired,
    showLoading: PropTypes.boolean,
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

function mapStateTopProps(state) {
    return {
        showLoading: state.refreshStatus.isRefreshing,
        searchTerm: state.searchTerm.keyword,
    };
}

export default connect(mapStateTopProps, mapDispatchToProps)(TopBar);


const styles = StyleSheet.create(
    {
        container: {},
        navBar: {
            height: 55,
            backgroundColor: "#25282e",
            paddingHorizontal: 15,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
        },
        logo: {
            height: 22
        },
        rightNav: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignContent: "center"
        },
        navItem: {
            marginLeft: 5
        },
        searchBar: {
            borderColor: "#25282e",
            fontSize: 14
        },
        searchContainer: {
            marginHorizontal: 5,
            flex: 1,
            backgroundColor: "#25282e",
            marginTop: 5
        }
    }
);
