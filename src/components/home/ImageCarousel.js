import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {ActionCreators} from "../../actions";
import {connect} from "react-redux";
import Carousel from 'react-native-smart-carousel';

class ImageCarousel extends Component {

    render() {
        if (this.props.sliders.length === 0) {
            return null;
        }

        return (
            <Carousel
                data={this.props.sliders}
                height={200}
                autoPlay={true}
                playTime={5000}
                navigationType={"dots"}
                navigation={true}
                titleColor="#ffffff"
                navigationColor="#ffffff"
                parentScrollViewRef={this.props.parentScrollView}
            />
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

function mapStateTopProps(state) {
    return {
        sliders: state.sliders ? Object.values(state.sliders) : [],
    };
}

export default connect(mapStateTopProps, mapDispatchToProps)(ImageCarousel);

