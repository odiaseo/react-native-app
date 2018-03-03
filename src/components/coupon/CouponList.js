import React from "react";
import {ScrollView} from "react-native";
import commonStyles from "../../common/styles";
import {List} from "react-native-elements";
import PropTypes from "prop-types";
import CouponListItem from "./CouponListItem";

const CouponList = (props) => (
    <ScrollView>
        <List containerStyle={commonStyles.listContainerStyle}>
            {props.list.map((coupon) => (<CouponListItem key={coupon.id} coupon={coupon} {...props}/>))}
        </List>
    </ScrollView>
);

export default CouponList;

CouponList.propTypes = {
    list: PropTypes.array,
};
