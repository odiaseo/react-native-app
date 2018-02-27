import React from "react";
import {StyleSheet, Image, View} from "react-native";
import image from "../images/kupon-logo.png";


const Logo = function () {
    return (
        <View>
            <Image source={image} style={styles.logo}/>
        </View>
    );
};

export default Logo;

const styles = StyleSheet.create(
    {
        logo: {
            marginLeft: 10,
            height: 22
        }
    }
);
