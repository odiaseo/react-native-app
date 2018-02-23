import SwipeableParallaxCarousel from 'react-native-swipeable-parallax-carousel'
import React, {Component} from 'react';

export default class Carousel extends Component {
  constructor (props) {
    super(props)
    this.state = {
      images: [
        {
          'id': 339964,
          'title': 'Valerian and the City of a Thousand Planets',
          'imagePath': 'https://image.tmdb.org/t/p/w780/o6OhxtsgMurL4h68Uqei0aSPMNr.jpg'
        },
        {
          'id': 315635,
          'imagePath': 'https://image.tmdb.org/t/p/w780/fn4n6uOYcB6Uh89nbNPoU2w80RV.jpg'
        },
        {
          'id': 339403,
          'title': 'Baby Driver',
          'subtitle': 'More than just a trend',
          'imagePath': 'https://image.tmdb.org/t/p/w780/xWPXlLKSLGUNYzPqxDyhfij7bBi.jpg'
        }
      ]
    }
  }

  render () {
    return (
      <SwipeableParallaxCarousel
        data={this.state.images}
        navigationType="dots"
        titleColor="#ffffff"
        navigationColor="#ffffff"
        parentScrollViewRef={this.parentScrollView}
      />
    )
  }
}
