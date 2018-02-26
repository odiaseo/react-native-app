import React, {Component} from 'react'
import {ScrollView} from 'react-native'
import SliderRow from "../coupon/SliderRow";
import PropTypes from 'prop-types';

export default class CouponScroller extends Component {

    render() {
        return (
            <ScrollView>
                {this.props.sections.map((section, index) => <SliderRow key={index} section={section}/>)}
            </ScrollView>
        )
    }
}

CouponScroller.propTypes = {
    sections: PropTypes.arrayOf(PropTypes.object).isRequired,
};