import React, {Component} from "react";
import {ScrollView} from "react-native";
import SiteActivityIndicator from "../components/SiteActivityIndicator";
import commonStyles, {styleVariables} from "../common/styles";
import {renderOfferCount} from "../common/helperFuntions";
import {List, ListItem} from "react-native-elements";

export default class MerchantList extends Component {

    render() {
        if (this.props.showLoading) {
            return (
                <SiteActivityIndicator/>
            );
        }

        return (

            <ScrollView>
                <List containerStyle={commonStyles.listContainerStyle}>
                    {
                        this.props.list.map((merchant, index) => (
                            <ListItem
                                avatar={{uri: merchant.logo}}
                                key={index}
                                onPress={() => this.props.navigation.navigate("MerchantDetail", {tempData: merchant})}
                                subtitle={renderOfferCount(merchant.voucher_count)}
                                titleStyle={{fontSize: styleVariables.mainTextFontSize}}
                                subtitleStyle={{fontSize: styleVariables.infoTextFontSize, fontWeight: "normal"}}
                                containerStyle={{borderBottomColor: styleVariables.borderColor, marginTop: 0}}
                                title={merchant.title}
                            />
                        ))
                    }
                </List>
            </ScrollView>
        );
    }
}