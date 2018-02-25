import React, {Component} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Touchable from 'react-native-platform-touchable';
import {styleVariables} from "../../common/styles";

export default class TabBar extends Component {
    render() {
        return (
            <View style={styles.tabBar}>
                <Touchable
                    hitSlop={styleVariables.hitSlop}
                    style={styles.tabItem} onPress={() => this.props.navigation.navigate('Home')}>
                    <View style={styles.tabItem}>
                        <Icon name="home" size={25}/>
                        <Text style={styles.tabTitle}>Home</Text>
                    </View>
                </Touchable>

                <Touchable
                    hitSlop={styleVariables.hitSlop}
                    style={styles.tabItem}
                    onPress={() => this.props.navigation.navigate('WhatsHot')}>
                    <View style={styles.tabItem}>
                        <Icon name="whatshot" size={25}/>
                        <Text style={styles.tabTitle}>Trending</Text>
                    </View>
                </Touchable>

                <Touchable
                    hitSlop={styleVariables.hitSlop}
                    style={styles.tabItem}
                    onPress={() => this.props.navigation.navigate('MerchantSearch')}>
                    <View style={styles.tabItem}>
                        <Icon name="subscriptions" size={25}/>
                        <Text style={styles.tabTitle}>Stores</Text>
                    </View>
                </Touchable>

                <Touchable
                    style={styles.tabItem}
                    hitSlop={styleVariables.hitSlop}
                    onPress={() => this.props.navigation.navigate('CategoryList')}>
                    <View style={styles.tabItem}>
                        <Icon name="folder" size={25}/>
                        <Text style={styles.tabTitle}>Categories</Text>
                    </View>
                </Touchable>
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
