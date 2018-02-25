import React, {Component} from 'react';
import Carousel from 'react-native-smart-carousel';
import options from '../../config/options'

export default class ImageCarousel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sliders: [
                {
                    'id': 1,
                    'title': '',
                    'imagePath': options.sliderImageDomain + '/images/slides/optimized/70-percent-sale.jpg'
                },
                {
                    'id': 2,
                    'title': '',
                    'imagePath': options.sliderImageDomain + '/images/slides/optimized/clothing-footwear-accessories.jpg'
                },
                {
                    'id': 3,
                    'title': '',
                    'imagePath': options.sliderImageDomain + '/images/slides/optimized/womens-fashion.jpg'
                },
                {
                    'id': 4,
                    'title': '',
                    'imagePath': options.sliderImageDomain + '/images/slides/optimized/bra-sales.jpg'
                },
                {
                    'id': 5,
                    'title': '',
                    'imagePath': options.sliderImageDomain + '/images/slides/optimized/mens-clothing-sale.jpg'
                },
                {
                    'id': 6,
                    'title': '',
                    'imagePath': options.sliderImageDomain + '/images/slides/optimized/back-to-school-sale.jpg'
                },
            ]

        }
    }

    render() {
        if (this.state.sliders.length === 0) {
            return null;
        }

        return (
            <Carousel
                data={this.state.sliders}
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
