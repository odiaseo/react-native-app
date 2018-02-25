import React, {Component} from 'react'
import {StyleSheet, View, ScrollView, Image, Text} from 'react-native'
import Logo from '../Logo'
import HeaderRight from '../HeaderRight';
import {styleVariables} from "../../common/styles";
import {Tile} from 'react-native-elements';

let imageSource = 'https://www.kuponhub.net/merchants/compressed/png/nba.png';

const CouponThumbnail = function () {
    return (

        <Tile
            width={130}
            height={180}
            containerStyle={{
                flex: 1,
                flexDirection: 'column',
                borderWidth: 1,
                borderColor: styleVariables.borderColor,
                marginRight: 10,
                backgroundColor: 'white'
            }}
            title="Argos"
            titleNumberOfLines={2}
            titleStyle={{fontSize: 12, justifyContent: 'center', alignSelf: "stretch"}}
            imageContainerStyle={{flex: 1, width: 120, height: null, margin: 5}}
            contentContainerStyle={{
                elevation: 5,
                height: 50,
                paddingTop: 10,
                paddingBottom: 5,
                paddingRight: 5,
                paddingLeft: 5,

            }}
            imageSrc={{uri: imageSource}}
            icon={{name: 'play-circle', type: 'font-awesome'}}>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignContent: 'flex-end'}}>
                <Text numberOfLines={1} style={{fontSize: 12}}>text 1</Text>
                <Text style={{fontSize: 12}}>Argos</Text>
            </View>
        </Tile>
    );
};

export default class CouponScroller extends Component {
    render() {
        return (
            <ScrollView>
                <View style={styles.sliderWrapper}>
                    <View style={styles.slideHeader}>
                        <Text style={styles.slideTitle}>Electronics</Text>
                        <Text style={styles.moreTextLink}>View All</Text>
                    </View>
                    <ScrollView horizontal style={styles.sliders}>
                        {[1, 2, 3, 4, 5].map((item) => <CouponThumbnail key={item}/>)}
                    </ScrollView>

                    <View style={styles.slideHeader}>
                        <Text style={styles.slideTitle}>Home & Garden</Text>
                        <Text style={styles.moreTextLink}>View All</Text>
                    </View>
                    <ScrollView horizontal style={styles.sliders}>
                        {[1, 2, 3, 4, 5].map((item) => <CouponThumbnail key={item}/>)}
                    </ScrollView>

                    <View style={styles.slideHeader}>
                        <Text style={styles.slideTitle}>Tickets & Travel</Text>
                        <Text style={styles.moreTextLink}>View All</Text>
                    </View>
                    <ScrollView horizontal style={styles.sliders}>
                        {[1, 2, 3, 4, 5].map((item) => <CouponThumbnail key={item}/>)}
                    </ScrollView>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create(
    {
        sliderWrapper: {
            backgroundColor: styleVariables.borderColor
        },
        sliders: {
            backgroundColor: styleVariables.headerColor
        },
        slideHeader: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 15,
            marginBottom: 5,
        },
        slideTitle: {
            fontWeight: 'bold',
        },
        moreTextLink: {},
        navBar: {
            height: 60,
            paddingTop: 10,
            backgroundColor: styleVariables.headerBackgroundColor,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
        }
    }
);
