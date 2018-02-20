import React, {Component} from 'react'
import {StyleSheet, Image, TouchableOpacity, View} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {SearchBar} from 'react-native-elements'
import _ from 'lodash'

const logo = require('../images/kupon-logo.png')

export default class TopBar extends Component {
  constructor (props) {
    super(props)

    this.state = {
      showSearch: false
    }

    this._renderSearchBar = this._renderSearchBar.bind(this)
    this.onChangeTextDelayed = _.debounce(this.props.doSearch, 300)
  }

  _renderSearchBar () {
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
      )
    }

    return null
  }

  componentDidMount () {
    this.search.focus()
  }

  render () {
    return (
      <View style={styles.navBar}>
        <SearchBar
          round
          ref={search => this.search = search}
          showLoadingIcon={this.props.showLoading}
          placeholder='Enter keyword ...'
          inputStyle={styles.searchBar}
          containerStyle={styles.searchContainer}
          onChangeText={(text) => this.onChangeTextDelayed(text)}
          onCancel={() => this.setState({showLoading: false})}
          onClearText={() => this.setState({showLoading: false})}
        />
        <View>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('DrawerToggle')}>
            <Icon style={styles.navItem} name="menu" size={25} color="#FFFFFF"/>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

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
)
