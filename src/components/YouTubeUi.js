import React, {Component} from 'react'
import {StyleSheet, Image, TouchableOpacity, FlatList, Text, View} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import VideoItem from './VideoItem'

const logo = require('./images/youtube.png')

export default class YouTubeUi extends Component {
  constructor (props) {
    super(props)
    this.state = {
      videos: []
    }
  }

  _getVideoList () {
    fetch(
      'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&key=AIzaSyB_8gvXxxrlxsj6lcPz_sBPqsqrMWSQcAo'
    ).then((response) => response.json())
      .then((responseJson) => this.setState({videos: responseJson}))
      .catch((error) => {
        console.error(error)
      })
  }

  componentDidMount () {
    this._getVideoList()
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.navBar}>
          <Image source={logo} style={styles.logo}/>
          <View style={styles.rightNav}>
            <TouchableOpacity>
              <Icon name="search" size={25}/>
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon style={styles.navItem} name="account-circle" size={25}/>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.body}>
          <FlatList
            data={this.state.videos.items}
            renderItem={(video) => <VideoItem video={video.item}/>}
            keyExtractor={(item) => item.id.videoId}
            itemSeparatorComponent={() => <View style={styles.separator}/>}
          />
        </View>

        <View style={styles.tabBar}>
          <TouchableOpacity style={styles.tabItem}>
            <Icon name="home" size={25}/>
            <Text style={styles.tabTitle}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem}>
            <Icon name="whatshot" size={25}/>
            <Text style={styles.tabTitle}>Trending</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem}>
            <Icon name="subscriptions" size={25}/>
            <Text style={styles.tabTitle}>Subscription</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem}>
            <Icon name="folder" size={25}/>
            <Text style={styles.tabTitle}>Library</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create(
  {
    container: {
      flex: 1
    },
    body: {
      flex: 1
    },
    navBar: {
      height: 55,
      backgroundColor: 'white',
      elevation: 3,
      paddingHorizontal: 15,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    logo: {
      height: 22,
      width: 98
    },
    rightNav: {
      flexDirection: 'row'
    },

    navItem: {
      marginLeft: 25
    },
    tabBar: {
      backgroundColor: 'white',
      height: 60,
      borderTopWidth: 0.5,
      borderColor: '#E5E5E5',
      flexDirection: 'row',
      justifyContent: 'space-around'
    },
    tabItem: {
      alignItems: 'center',
      justifyContent: 'center'
    },
    tabTitle: {
      fontSize: 11,
      color: '#3C3C3C',
      paddingTop: 3
    },

    separator: {
      backgroundColor: '#00ff00',
      height: 2
    }
  }
)
