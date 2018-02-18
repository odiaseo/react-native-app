import React, {Component} from 'react';
import {StyleSheet, Image, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {SearchBar} from 'react-native-elements';
import _ from 'lodash';

const logo = require('../images/kupon-logo.png');

export default class TopBar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showSearch: false
        };

        this.toggleSearch = this.toggleSearch.bind(this);
        this._renderSearchBar = this._renderSearchBar.bind(this);
        this.onChangeTextDelayed = _.debounce(this.props.doSearch, 500);
    }

    toggleSearch() {
        this.setState(
            {
                showSearch: !this.state.showSearch
            }
        );
    }

    _renderSearchBar() {
        if (this.state.showSearch) {
            return (
                <SearchBar
                    round
                    ref={search => this.search = search}
                    showLoadingIcon={this.props.showLoading}
                    placeholder='Enter keyword ...'
                    inputStyle={styles.searchBar}
                    onChangeText={(text) => this.onChangeTextDelayed(text)}
                    onCancel={() => this.setState({showLoading: false})}
                    onClearText={() => this.setState({showLoading: false})}
                />
            );
        }

        return null;
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.navBar}>
                    <Image source={logo} style={styles.logo}/>
                    <View style={styles.rightNav}>
                        <TouchableOpacity
                            onPress={this.toggleSearch}>
                            <Icon name="search" size={25} color="#FFFFFF"/>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Icon style={styles.navItem} name="menu" size={25} color="#FFFFFF"/>
                        </TouchableOpacity>
                    </View>
                </View>
                {this._renderSearchBar()}
            </View>
        );
    }
}

const styles = StyleSheet.create(
    {
        container: {},
        navBar: {
            height: 55,
            marginTop: 20,
            backgroundColor: '#25282e',
            paddingHorizontal: 15,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        logo: {
            height: 22
        },
        rightNav: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignContent: "center",
        },
        navItem: {
            marginLeft: 25
        },
        searchBar: {
            borderColor: '#25282e',
            fontSize: 14
        }
    }
);