import React from 'react';
import options from '../config/options';
import moment from 'moment';
import * as constant from '../constants';

const querystring = require('querystring');

const call = function (endPoint, token = "", body = null, method = 'GET') {

    let url = options.apiUrl + endPoint;

    let headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    };

    if (token) {
        headers.Authorization = 'Bearer ' + token;
    }

    let params = {
        mode: 'no-cors',
        method: method,
        headers: headers
    };

    if (body) {
        params.body = body;
    }

    return fetch(url, params)
        .then((response) => {
            return response.json();
        })
        .catch((error) => {
            console.error(error);
        });
};

const ApiHelper = {
    getAccessToken() {
        let body = JSON.stringify({
            'client_id': options.clientId,
            'client_secret': options.clientSecret,
            'grant_type': 'client_credentials'
        });

        return call('/oauth/token', '', body, 'POST')
            .then((responseJson) => {
                return responseJson.access_token;
            })
            .catch((error) => {
                console.error(error);
            });
    },

    listCategories(accessToken) {
        return call('/site-category', accessToken)
            .then((responseJson) => responseJson);
    },

    getMerchantById(accessToken, merchantId) {

        let endPoint = `/merchant/${merchantId}`;

        return call(endPoint, accessToken)
            .then((responseJson) => responseJson);
    },


    getMerchants(accessToken, keyword, page, limit = 20) {
        let params = {
            unique_field: 'title',
            fields: ['id', 'title', 'logo', 'voucher_count', 'is_featured', 'is_exclusive'].join(','),
            filters: ['has_logo=true', 'is_active=true'].join(','),
            keyword: keyword,
            page: page,
            per_page: limit
        };

        let queryString = querystring.stringify(params);

        //let endPoint = `/search/merchant?filter=is_active=true,is_profitable=true,has_logo=true,&per_page=${limit}&page=${page}&keyword=${keyword}`;
        let endPoint = `/type-ahead/merchant?${queryString}`;
        console.log(endPoint);

        return call(endPoint, accessToken)
            .then((responseJson) => responseJson);
    },

    getCoupons(accessToken, segment, page = 1, limit = 20) {
        let endPoint;

        switch (segment) {
            case constant.POPULAR_COUPONS:
                endPoint = `/voucher?sort=+is_expired,-popularity&per_page=${limit}&page=${page}`;
                break;
            case constant.FEATURED_COUPONS:
                endPoint = `/voucher?sort=-is_exclusive,-is_featured&filter=is_expired=false&per_page=${limit}&page=${page}`;
                break;
            case constant.TOP_COUPONS:
                endPoint = `/voucher?sort=-discount&filter=is_expired=false&per_page=${limit}&page==${page}`;
                break;
            case constant.EXPIRING_COUPONS:
                endPoint = `/voucher?sort=+is_expired,+end_at,-created_at&filter=end_at=null<>&per_page=${limit}&page=${page}`;
                break;
            default:
                endPoint = `/voucher?sort=-created_at&filter=is_expired=false&per_page=${limit}&page=${page}`;
        }

        return call(endPoint, accessToken)
            .then((responseJson) => responseJson);
    },

    getCarouselSlides(accessToken) {
        let today = moment().format('YYYY-MM-DD');
        let endPoint = `/slide?filters=is_active=true,end_at=${today}>`;
        return call(endPoint, accessToken)
            .then((responseJson) => responseJson);
    },

    searchCoupons(accessToken, searchTerm, page = 1, limit =20) {
        let endPoint = `/search/voucher?per_page=${limit}&keyword=${searchTerm}&page=${page}`;
        return call(endPoint, accessToken)
            .then((responseJson) => responseJson);
    },
};

export default ApiHelper;