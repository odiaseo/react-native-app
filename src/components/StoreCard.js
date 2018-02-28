import React, {Component} from "react";
import {StyleSheet, View, Text} from "react-native";
import {styleVariables} from "../common/styles";
import {Tile} from "react-native-elements";
import {renderOfferCount} from "../common/helperFuntions";
import {withNavigation} from "react-navigation";
import {Rating} from "react-native-elements";

class StoreCard extends Component {
    render() {
        return (
            <Tile
                width={130}
                height={170}
                key={this.props.store.id}
                containerStyle={styles.tileContainer}
                title={this.props.store.title}
                titleNumberOfLines={2}
                titleStyle={styles.mainText}
                imageContainerStyle={styles.image}
                contentContainerStyle={styles.contentContainer}
                imageSrc={{uri: this.props.store.logo}}
                onPress={() => this.props.navigation.navigate("MerchantDetail", {tempData: this.props.store})}
                icon={{name: "play-circle", type: "font-awesome"}}>
                <View style={styles.textContainer}>
                    <Text numberOfLines={1} style={styles.subText}>
                        {renderOfferCount(this.props.store.popularity/15)}
                    </Text>
                    <Rating
                        type="star"
                        fractions={1}
                        startingValue={9}
                        readonly={true}
                        imageSize={9}
                        style={{paddingVertical: 0, marginTop:2}}
                    />
                </View>
            </Tile>
        );
    }
}

export default withNavigation(StoreCard);

const styles = StyleSheet.create(
    {
        tileContainer: {
            flex: 1,
            flexDirection: "column",
            borderWidth: 1,
            borderColor: styleVariables.borderColor,
            marginRight: 10,
            backgroundColor: "white",
            elevation: 3,
            borderRadius: 10,
        },

        contentContainer: {
            elevation: 5,
            height: 50,
            paddingTop: 10,
            paddingBottom: 5,
            paddingRight: 5,
            paddingLeft: 5,
        },

        mainText: {
            fontSize: 12, justifyContent: "center", alignSelf: "stretch"

        },

        subText: {
            fontSize: 10
        },

        textContainer: {
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
        },
        sliderWrapper: {
            backgroundColor: styleVariables.lightBackgroundColor

        },
        slideHeader: {
            flex: 1,
            paddingHorizontal: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 15,
            marginBottom: 5,
        },
        slideTitle: {
            fontWeight: "bold",
        },

        image: {
            flex: 1,
            width: 120,
            height: null,
            margin: 5
        },
        moreTextLink: {},
        navBar: {
            height: 60,
            paddingTop: 10,
            backgroundColor: styleVariables.headerBackgroundColor,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
        }
    }
);