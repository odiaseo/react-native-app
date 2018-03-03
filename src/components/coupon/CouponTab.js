import React, {Component} from "react";
import {StyleSheet, ScrollView, View} from "react-native";
import commonStyles, {styleVariables} from "../../common/styles";
import CouponList from "./CouponList";
import TabBar from "../navigation/TabBar";
import PropTypes from "prop-types";

export default class CouponTab extends Component {

    parentScrollView = null;

    constructor(props) {
        super(props);
        this.setItemRef = this.setItemRef.bind(this);
        this.handleRowClick = this.handleRowClick.bind(this);
    }

    handleRowClick(coupon) {
        this.props.navigation.navigate("CouponDetail", {coupon});
    }

    setItemRef(ref) {
        this.parentScrollView = ref;
    }

    render() {
        return (
            <View style={styles.container}>
                {this.props.children}
                <View style={styles.body}>
                    <ScrollView ref={this.setItemRef}>
                        <View style={[commonStyles.vertical, styles.body]}>
                            <CouponList
                                {...this.props}
                                list={this.props.coupons}
                                onClick={this.handleRowClick}
                            />
                        </View>
                    </ScrollView>
                </View>
                <TabBar {...this.props}/>
            </View>
        );
    }
}

CouponTab.propTypes = {
    navigation: PropTypes.object,
    coupons: PropTypes.array,
    children: PropTypes.element
};

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
