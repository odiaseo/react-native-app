import React, {Component} from "react";
import {StyleSheet, View, Keyboard} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import {SearchBar} from "react-native-elements";
import Touchable from "react-native-platform-touchable";
import {styleVariables} from "../../common/styles";
import withConnect from "../../config/hoc";
import PropTypes from "prop-types";

class TopBar extends Component {

    searchRef = null;

    constructor(props) {
        super(props);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.setItemRef = this.setItemRef.bind(this);
        this.handleDisplayDrawerStack = this.handleDisplayDrawerStack.bind(this);
    }

    handleTextChange(searchTerm) {
        if (searchTerm.length > 2) {
            this.props.setActivityStatus(true);
            this.props.searchByKeyword(this.props.searchType, searchTerm, 1);
            Keyboard.dismiss();
        }
    }

    handleDisplayDrawerStack() {
        this.props.navigation.navigate("DrawerToggle");
    }

    setItemRef(ref) {
        this.searchRef = ref;
    }

    componentDidMount() {
        this.searchRef.focus();
    }

    render() {
        return (
            <View style={styles.navBar}>
                <SearchBar
                    round
                    ref={this.setItemRef}
                    showLoadingIcon={this.props.showLoading}
                    placeholder='Enter keyword ...'
                    inputStyle={styles.searchBar}
                    containerStyle={styles.searchContainer}
                    autoCapitalize={"none"}
                    onChangeText={this.handleTextChange}
                    clearIcon={{color: styleVariables.clearIconColor}}
                />
                <View>
                    <Touchable
                        hitSlop={styleVariables.hitSlop}
                        onPress={this.handleDisplayDrawerStack}>
                        <Icon
                            style={styles.navItem}
                            name="menu"
                            size={styleVariables.menuIconSize}
                            color={styleVariables.backgroundColor}
                        />
                    </Touchable>
                </View>
            </View>
        );
    }
}

function mapStateTopProps(state) {
    return {
        showLoading: state.refreshStatus,
        searchTerm: state.searchTerm.keyword,
    };
}

export default withConnect(TopBar, mapStateTopProps);

TopBar.propTypes = {
    navigation: PropTypes.object,
    searchByKeyword: PropTypes.func,
    setActivityStatus: PropTypes.func,
    searchType: PropTypes.string,
    showLoading: PropTypes.bool
};

const styles = StyleSheet.create(
    {
        navBar: {
            height: 55,
            backgroundColor: styleVariables.headerBackgroundColor,
            paddingHorizontal: 15,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
        },
        navItem: {
            marginLeft: 5
        },
        searchBar: {
            borderColor: styleVariables.headerBackgroundColor,
            fontSize: styleVariables.mainTextFontSize
        },
        searchContainer: {
            marginHorizontal: 5,
            flex: 1,
            backgroundColor: styleVariables.headerBackgroundColor,
            marginTop: 5
        }
    }
);
