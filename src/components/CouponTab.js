import React, {Component} from 'react'
import {StyleSheet, ScrollView, View} from 'react-native'
import commonStyles, {styleVariables} from '../common/styles';
import CouponList from "../components/CouponList";
import TabBar from "./navigation/TabBar";

export default class CouponTab extends Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.body}>
                    <ScrollView ref={(c) => this.parentScrollView = c}>
                        <View style={[commonStyles.vertical, styles.body]}>
                            <CouponList {...this.props} list={this.props.coupons}/>
                        </View>
                    </ScrollView>
                </View>
                <TabBar {...this.props}/>
            </View>
        )
    }
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            backgroundColor: styleVariables.backgroundColor,
        },
        body: {
            flex: 1
        },
    }
);
