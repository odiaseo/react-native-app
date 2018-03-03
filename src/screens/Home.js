import React, {Component,} from "react";
import {StyleSheet, View, ScrollView, RefreshControl} from "react-native";
import HomeTopBar from "../components/home/HomeTopBar";
import SliderRow from "../components/coupon/SliderRow";
import ImageCarousel from "../components/home/ImageCarousel";
import TabBar from "../components/navigation/TabBar";
import {styleVariables} from "../common/styles";
import _ from "lodash";
import withConnect, {withIndicator} from "../config/hoc";
import PropTypes from "prop-types";

class Home extends Component {

    parentScrollView = "main-carousel";

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
        };

        this.handleOnRefresh = this.handleOnRefresh.bind(this);
    }

    handleOnRefresh() {
        this.setState({refreshing: true});
        this.props.resetCache();
        this.props.getHomePageData();
        this.setState({refreshing: false});
    }

    componentDidMount() {
        this.props.getHomePageData();
    }

    render() {
        return (
            <View style={styles.container}>
                <HomeTopBar {...this.props}/>

                <ScrollView
                    ref={this.parentScrollView}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.handleOnRefresh}
                        />
                    }>
                    <View style={styles.body}>
                        <View style={styles.carouselWrapper}>
                            <ImageCarousel parentScrollView={this.parentScrollView} sliders={this.props.sliders}/>
                        </View>
                        {this.props.children}
                        {this.props.merchants.map((section, index) => <SliderRow key={index} section={section} {...this.props}/>)}
                    </View>
                </ScrollView>

                <TabBar navigation={this.props.navigation}/>
            </View>
        );
    }
}

Home.defaltProps = {
    sliders: []
};

Home.propTypes = {
    merchants: PropTypes.array,
    navigation: PropTypes.object,
    children: PropTypes.node,
    resetCache: PropTypes.func,
    getSliders: PropTypes.func,
    sliders: PropTypes.array,
    getHomePageData: PropTypes.func,
};

function mapStateTopProps(state) {
    return {
        showLoading: state.refreshStatus,
        sliders: state.sliders,
        merchants: _.isEmpty(state.carouselMerchants) ? [] : Object.values(state.carouselMerchants),
    };
}

export default withConnect(withIndicator(Home), mapStateTopProps);

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            flexDirection: "column",
            marginTop: 20,
            backgroundColor: styleVariables.lightBackgroundColor
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