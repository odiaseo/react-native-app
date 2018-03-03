import React from "react";
import {StyleSheet, View, Text} from "react-native";
import {styleVariables} from "../../common/styles";
import {renderOfferCount} from "../../common/helperFuntions";
import {withNavigation} from "react-navigation";
import {Rating, Tile} from "react-native-elements";
import PropTypes from "prop-types";

class MerchantCard extends React.Component {

    handleGoToMerchantPage = () => this.props.navigation.navigate("MerchantDetail", {tempData: this.props.store});

    render() {
        return (<Tile
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
                onPress={this.handleGoToMerchantPage}>
                <View style={styles.textContainer}>
                    <Text numberOfLines={1} style={styles.subText}>
                        {renderOfferCount(this.props.store.stats.voucher_count)}
                    </Text>
                    <Rating
                        type="star"
                        fractions={1}
                        startingValue={9}
                        readonly
                        imageSize={9}
                        style={styles.ratingStyle}
                    />
                </View>
            </Tile>
        );
    }
}


export default withNavigation(MerchantCard);

MerchantCard.propTypes = {
    store: PropTypes.object,
    navigation: PropTypes.object,
};

const styles = StyleSheet.create(
    {
        ratingStyle: {
            paddingVertical: 0,
            marginTop: 2
        },
        tileContainer: {
            flex: 1,
            flexDirection: "column",
            borderWidth: 1,
            borderColor: styleVariables.borderColor,
            marginRight: 10,
            backgroundColor: styleVariables.backgroundColor,
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
        image: {
            flex: 1,
            width: 120,
            height: null,
            margin: 5
        }
    }
);