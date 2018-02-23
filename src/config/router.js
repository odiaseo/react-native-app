import React from 'react'
import Home from '../screens/Home'
import Search from '../screens/Search'
import Login from '../screens/Login'

import {StackNavigator, DrawerNavigator} from 'react-navigation'

const RootStack = StackNavigator(
  {
    Home: {
      screen: Home
    },
    Search: {
      screen: Search
    }
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#c85a54',
        height: 40
      },
      headerTintColor: '#ffbcaf',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }
  }
);

export const DrawerNav = DrawerNavigator(
  {
    Stack: {
      screen: RootStack
    },
    Login: {
      screen: Login
    }
  }
);

export default RootStack
