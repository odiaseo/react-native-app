import React from "react";
import Carousel from "react-native-smart-carousel";
import PropTypes from "prop-types";

const ImageCarousel = ({sliders, parentScrollView}) => (
    <Carousel
        data={sliders}
        height={200}
        autoPlay
        playTime={5000}
        navigationType={"dots"}
        navigation
        titleColor="#ffffff"
        navigationColor="#ffffff"
        parentScrollViewRef={parentScrollView}
    />
);


ImageCarousel.defaultProps = {
    sliders: []
};

ImageCarousel.propTypes = {
    parentScrollView: PropTypes.string,
    sliders: PropTypes.array
};

export default ImageCarousel;