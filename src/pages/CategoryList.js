import React, {Component} from 'react'
import {ActivityIndicator, ListView, Text, View} from 'react-native'

export default class CategoryList extends Component {
  constructor (props) {
    super(props)

    this._getAccessToken = this._getAccessToken.bind(this)
    this._getData = this._getData.bind(this)

    this.state = {
      isLoading: true,
      accessToken: '',
      category: [],
      message: 'this is my default message'
    }
  }

  _getAccessToken () {
    return fetch(
      'https://api.kuponhub.net/api/v1/oauth/token',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'client_id': 3,
          'client_secret': 'Q3IpUgZ6UjO2GTeCkaiRRzKhqMo8bJfhKyR0IGK0',
          'grant_type': 'client_credentials'
        }
        )
      })
      .then((response) => {
        return response.json()
      })
      .then((responseJson) => {
        this.setState(
          {
            accessToken: responseJson.access_token
          }
        )
        return responseJson.access_token
      })
      .catch((error) => {
        console.error(error)
      })
  }

  _getData () {
    return fetch(
      'https://api.kuponhub.net/api/v1/site-category',
      {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + this.state.accessToken,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        return response.json()
      })
      .catch((error) => {
        console.error(error)
      })
  }

  componentDidMount () {
    this._getAccessToken()
      .then(() => {
        return this._getData()
      })
      .then((data) => {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        this.setState(
          {
            category: ds.cloneWithRows(data),
            isLoading: false
          }
        )
      }
      )
  }

  render () {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return <View style={{flex: 1, paddingTop: 20}}>

      <ListView
        dataSource={this.state.category}
        renderRow={(rowData) => <Text>{rowData.title}, {rowData.offer_count}</Text>}
      />
    </View>
  }
}
