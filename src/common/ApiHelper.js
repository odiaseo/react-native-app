import React from 'react';
import { API_URL} from 'react-native-dotenv'

const ApiHelper = {
    getAccessToken() {
        return fetch(
                API_URL + '/oauth/token', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        'client_id': 3,
                        'client_secret': 'Q3IpUgZ6UjO2GTeCkaiRRzKhqMo8bJfhKyR0IGK0',
                        'grant_type': 'client_credentials'
                    })
                })
            .then((response) => {
                return response.json()
            })
            .then((responseJson) => {
                return responseJson.access_token;
            })
            .catch((error) => {
                console.error(error);
            });
    },
    call(endPoint, token) {

        let url = API_URL + endPoint;
        // console.log(url);
        return fetch(
                url, {
                    method: 'GET',
                    headers: {
                        Authorization: 'Bearer ' + token,
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
            .then((response) => {
                return response.json();
            })
            .catch((error) => {
                console.error(error);
            });
    }
};

export default ApiHelper;