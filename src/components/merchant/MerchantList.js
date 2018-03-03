import React from "react";
import {ScrollView} from "react-native";
import commonStyles from "../../common/styles";
import {List} from "react-native-elements";
import PropTypes from "prop-types";
import MerchantListItem from "./MerchantListItem";

const MerchantList = (props) => (
    <ScrollView>
        <List containerStyle={commonStyles.listContainerStyle}>
            {props.list.map((merchant) => (<MerchantListItem key={merchant.id} merchant={merchant} {...props} />))}
        </List>
    </ScrollView>
);

MerchantList.propTypes = {
    list: PropTypes.array
};

export default MerchantList;