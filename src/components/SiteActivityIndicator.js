import React from "react";
import {View} from "react-native";
import {styleVariables} from "../common/styles";
import {SkypeIndicator} from "react-native-indicators";

const SiteActivityIndicator = function () {
    return (
        <View style={{flex: 1, justifyContent: "center", backgroundColor: styleVariables.backgroundColor}}>
            <SkypeIndicator color={styleVariables.primaryColor} size={40}/>
        </View>
    );
};

export default SiteActivityIndicator;
