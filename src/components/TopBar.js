import React, {Component} from 'react'
import {StyleSheet, View, Keyboard} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {SearchBar} from 'react-native-elements';
import {ActionCreators} from "../actions";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import _ from 'lodash';
import Touchable from 'react-native-platform-touchable';
import {styleVariables} from "../common/styles";

class TopBar extends Component {
    search: null;

    constructor(props) {
        super(props);
        this.onChangeTextDelayed = _.debounce(this.onChangeTextDelayed.bind(this), 500);
    }

    onChangeTextDelayed(searchTerm, page = 1) {
        if (searchTerm.length > 2) {
            this.props.setActivityStatus(true);
            this.props.searchCouponsByKeyword(searchTerm, page);
            Keyboard.dismiss();
        }
    }

    componentDidMount() {
        this.search.focus()
    }

    render() {
        return (
            <View style={styles.navBar}>
                <SearchBar
                    round
                    ref={search => this.search = search}
                    showLoadingIcon={this.props.showLoading}
                    placeholder='Enter keyword ...'
                    inputStyle={styles.searchBar}
                    containerStyle={styles.searchContainer}
                    autoCapitalize={'none'}
                    onChangeText={(text) => this.onChangeTextDelayed(text)}
                />
                <View>
                    <Touchable
                        hitSlop={styleVariables.hitSlop}
                        onPress={() => this.props.navigation.navigate('DrawerToggle')}>
                        <Icon style={styles.navItem} name="menu" size={25} color="#FFFFFF"/>
                    </Touchable>
                </View>
            </View>
        )
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

export default connect(mapStateTopProps, mapDispatchToProps)(TopBar);

const styles = StyleSheet.create(
    {
        container: {},
        navBar: {
            height: 55,
            backgroundColor: '#25282e',
            paddingHorizontal: 15,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        logo: {
            height: 22
        },
        rightNav: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignContent: 'center'
        },
        navItem: {
            marginLeft: 5
        },
        searchBar: {
            borderColor: '#25282e',
            fontSize: 14
        },
        searchContainer: {
            marginHorizontal: 5,
            flex: 1,
            backgroundColor: '#25282e',
            marginTop: 5
        }
    }
);
