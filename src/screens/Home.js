import React, {Component,} from "react";
import {StyleSheet, View, ScrollView} from "react-native";
import HomeTopBar from "../components/home/HomeTopBar";
import SliderRow from "../components/coupon/SliderRow";
import ImageCarousel from "../components/home/ImageCarousel";
import TabBar from "../components/navigation/TabBar";
import {connect} from "react-redux";
import {ActionCreators} from "../actions";
import {bindActionCreators} from "redux";
import {styleVariables} from "../common/styles";
import _ from "lodash";

class Home extends Component {

    parentScrollView = "main-carousel";

    static navigationOptions = {
        title: "HOME",
        header: null
    };

    componentDidMount() {
        this.props.getCategoryCarouselOffers();
    }

    render() {
        return (
            <View style={styles.container}>
                <HomeTopBar {...this.props}/>

                <ScrollView ref={this.parentScrollView}>
                    <View style={styles.body}>
                        <View style={styles.carouselWrapper}>
                            <ImageCarousel parentScrollView={this.parentScrollView} {...this.props}/>
                        </View>
                        {this.props.categoryOffers.map((section, index) => <SliderRow key={index} section={section}/>)}
                    </View>
                </ScrollView>

                <TabBar navigation={this.props.navigation}/>
            </View>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

function mapStateTopProps(state) {
    return {
        showLoading: state.refreshStatus.isRefreshing,
        categories: state.categories,
        categoryOffers: _.isArray(state.categoryOffers) ? state.categoryOffers : [],
    };
}

export default connect(mapStateTopProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            flexDirection: "column",
            marginTop: 20,
            backgroundColor: styleVariables.backgroundColor
        },
        carouselWrapper: {
            marginBottom: 5
        },
        body: {
            flex: 1,
            justifyContent: "center",
        }
    }
);