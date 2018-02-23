import React from 'react';

const API_URL = "https://api.kuponhub.net/api/v1";

const ApiHelper = {
    getAccessToken() {
        let endPoint = API_URL + '/oauth/token';
        let body = JSON.stringify({
            'client_id': 3,
            'client_secret': 'Q3IpUgZ6UjO2GTeCkaiRRzKhqMo8bJfhKyR0IGK0',
            'grant_type': 'client_credentials'
        });

        return fetch(
            endPoint,
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: body
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

    getCoupons(accessToken, page = 1) {

        let endPoint = '/voucher?sort=+is_expired,-popularity&per_page=20&page=' + page;
        return ApiHelper.call(endPoint, accessToken)
            .then((responseJson) => responseJson);
    },

    call(endPoint, token) {

        let url = API_URL + endPoint;

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