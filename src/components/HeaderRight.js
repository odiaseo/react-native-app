import React, {Component} from 'react'
import {StyleSheet, View} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import {withNavigation} from 'react-navigation';
import {styleVariables} from "../common/styles";
import Touchable from 'react-native-platform-touchable';

class HeaderRight extends Component {
    render() {
        return (
            <View style={styles.rightNav} {...this.props}>
                <Touchable
                    hitSlop={styleVariables.hitSlop}
                    onPress={() => this.props.navigation.navigate('Search')}>
                    <Icon name="search" size={25} color={styleVariables.headerColor}/>
                </Touchable>
                <Touchable
                    hitSlop={styleVariables.hitSlop}
                    onPress={() => this.props.navigation.navigate('DrawerToggle')}>
                    <Icon style={styles.navItem} name="menu" size={25} color={styleVariables.headerColor}/>
                </Touchable>
            </View>
        )
    }
}

export default withNavigation(HeaderRight);

const styles = StyleSheet.create(
    {
        rightNav: {
            marginRight: 10,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignContent: 'center',
        },
        navItem: {
            marginLeft: 20
        }
    }
);