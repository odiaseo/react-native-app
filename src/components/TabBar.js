import React, {Component} from 'react'
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

export default class TabBar extends Component {
  render () {
    return (
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => this.props.navigation.navigate('Home')}>
          <Icon name="home" size={25}/>
          <Text style={styles.tabTitle}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Icon name="whatshot" size={25}/>
          <Text style={styles.tabTitle}>Trending</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Icon name="subscriptions" size={25}/>
          <Text style={styles.tabTitle}>Subscription</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Icon name="folder" size={25}/>
          <Text style={styles.tabTitle}>Library</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create(
  {
    tabBar: {
      backgroundColor: 'white',
      height: 60,
      borderTopWidth: 0.5,
      borderColor: '#E5E5E5',
      flexDirection: 'row',
      justifyContent: 'space-around'
    },
    tabItem: {
      alignItems: 'center',
      justifyContent: 'center'
    },
    tabTitle: {
      fontSize: 11,
      color: '#3C3C3C',
      paddingTop: 3
    }
  }
)
