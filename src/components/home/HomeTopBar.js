import React, {Component} from 'react'
import {StyleSheet, TouchableOpacity, View} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Logo from '../Logo'

export default class HomeTopBar extends Component {
  render () {
    return (
      <View style={styles.navBar}>
        <Logo/>
        <View style={styles.rightNav}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Search')}
          >
            <Icon name="search" size={25} color="#FFFFFF"/>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('DrawerToggle')}
          >
            <Icon style={styles.navItem} name="menu" size={25} color="#FFFFFF"/>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create(
  {
    navBar: {
      height: 55,
      backgroundColor: '#25282e',
      paddingHorizontal: 15,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },

    rightNav: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignContent: 'center'
    },
    navItem: {
      marginLeft: 25
    }
  }
)
