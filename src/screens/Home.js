import React, {Component,} from "react";
import {StyleSheet, View, ScrollView} from "react-native";
import HomeTopBar from "../components/home/HomeTopBar";
import SliderRow from "../components/coupon/SliderRow";
import ImageCarousel from "../components/home/ImageCarousel";
import TabBar from "../components/navigation/TabBar";
import {connect} from "react-redux";
import {ActionCreators} from "../flow/actions";
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
        this.props.getCarouselMerchants();
    }

    render() {
        return (
            <View style={styles.container}>
                <HomeTopBar {...this.props}/>

                <ScrollView ref={(ref) => this.parentScrollView = ref}>
                    <View style={styles.body}>
                        <View style={styles.carouselWrapper}>
                            <ImageCarousel parentScrollView={this.parentScrollView} {...this.props}/>
                        </View>
                        {this.props.merchants.map((section, index) => <SliderRow key={index} section={section}/>)}
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
        showLoading: state.refreshStatus,
        merchants: _.isEmpty(state.carouselMerchants) ? [] : Object.values(state.carouselMerchants),
    };
}

export default connect(mapStateTopProps, mapDispatchToProps)(Home);

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