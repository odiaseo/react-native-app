import React, {Component} from "react";
import {StyleSheet, View, ScrollView, Text} from "react-native";
import StoreCard from "../merchant/MerchantCard";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/FontAwesome";
import Touchable from "react-native-platform-touchable";
import commonStyles from "../../common/styles";

export default class SliderRow extends Component {

    scrollViewRef = null;

    constructor(props) {
        super(props);
        this.state = {
            showLeftIcon: false,
            showRightIcon: true,
            currentX: 0,
            currentY: 0
        };

        this.handleScrollLeft = this.handleScrollLeft.bind(this);
        this.handleScrollRight = this.handleScrollRight.bind(this);
        this.setItemRef = this.setItemRef.bind(this);
    }

    handleScrollLeft() {
        this.scrollViewRef.scrollTo({x: 0, y: 0, animated: true});
        this.setState(
            {
                showLeftIcon: false,
                showRightIcon: true,
            }
        );
    }

    handleScrollRight() {
        this.scrollViewRef.scrollToEnd({animated: true});
        this.setState(
            {
                showLeftIcon: true,
                showRightIcon: false,
            }
        );
    }

    setItemRef(ref) {
        this.scrollViewRef = ref;
    }

    render() {
        return (
            <View style={styles.contentContainer}>
                <View style={styles.slideHeader}>
                    <Text style={styles.slideTitle}>{this.props.section.title}</Text>
                    {this.state.showLeftIcon &&
                    <Touchable
                        hitSlop={commonStyles.hitSlop}
                        onPress={this.handleScrollLeft}>
                        <Icon name="chevron-left" style={styles.viewIcon}/>
                    </Touchable>}
                    {this.state.showRightIcon &&
                    <Touchable
                        hitSlop={commonStyles.hitSlop}
                        onPress={this.handleScrollRight}>
                        <View>
                            <Icon name="chevron-right" style={styles.viewIcon}/>
                        </View>
                    </Touchable>}
                </View>
                <ScrollView
                    contentContainerStyle={styles.scrollContentContainer}
                    ref={this.setItemRef}
                    horizontal
                    keyboardDismissMode={"on-drag"}
                    scrollEventThrottle={16}
                    maximumZoomScale={3.0}>
                    {this.props.section.data.map((store, index) => (<StoreCard key={index} store={store}/>))}
                </ScrollView>
            </View>
        );
    }
}

SliderRow.propTypes = {
    section: PropTypes.object.isRequired,
};

const styles = StyleSheet.create(
    {
        contentContainer: {
            flex: 1,
            marginVertical: 15,
        },
        scrollContentContainer: {
            paddingTop: 5,
            paddingBottom: 15,
        },
        viewIcon: {
            marginHorizontal: 0,
            marginTop: 3,
        },

        slideHeader: {
            flexDirection: "row",
            marginTop: 15,
            justifyContent: "space-between",
            marginBottom: 5,
            marginHorizontal: 10,
        },
        slideTitle: {
            fontWeight: "bold",
        }
    }
);