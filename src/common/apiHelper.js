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

    searchCoupons(accessToken, searchTerm, page = 1, limit = 20) {
        let endPoint = `/search/voucher?per_page=${limit}&keyword=${searchTerm}&page=${page}`;
        return call(endPoint, accessToken)
            .then((responseJson) => responseJson);
    },

    getCategoryOffers() {
        let offer = {
            "id": 103047,
            "title": "Reservation]Red Velvet[IRENE]-Photocard",
            "site_id": 37,
            "discount": "0.0",
            "voucher_code": "",
            "popularity": 0,
            "is_expired": false,
            "is_featured": false,
            "is_exclusive": false,
            "while_stock_last": 1,
            "end_at": null,
            "slug": "reservation-red-velvet-irene-photocard",
            "created_at": "2017-11-28 00:39:20",
            "discount_type": null,
            "symbol": null,
            "is_ending_today": false,
            "outlink": "https://api.kuponhub.net/redirect/05a3c83d659f21bbe2f66a786676a746d5ec4db4d50c1f4ad0339eba03c096d1/voucher",
            "offer_type": {
                "id": 2,
                "title": "Deals",
                "slug": "deal"
            },
            "merchant": {
                "id": 189240,
                "title": "Koreanmall",
                "description": "",
                "keywords": "koreanmall, malls, shopping",
                "logo": "https://www.kuponhub.net/merchants/compressed/png/koreanmall.png",
                "url": "http://www.koreanmall.com/app",
                "is_active": true,
                "is_adult": false,
                "popularity": 1,
                "slug": "koreanmall",
                "voucher_count": 166,
                "screen_shot": "https://www.kuponhub.net/merchants/screenshot/png/koreanmall.png",
                "is_profitable": true,
                "has_logo": true,
                "has_screen_shot": true,
                "display_order": 0,
                "outlink": "https://api.kuponhub.net/redirect/a29yZWFubWFsbC5jb20/merchant",
                "category": {
                    "id": 314,
                    "title": "Home & Garden",
                    "description": "<p>For all your home and garden equipment and appliances look no further. Products in this category includes white goods like fridge, freezer, cooker, oven and washing machine. Home appliances include living and bedroom furniture, wall fittings, home decor and DIY equipments. For you gardening you can find all you garden furniture, equipment and all you need for pest control.</p>",
                    "keywords": "garden, furniture, pest control, kitchen, microwave, kettle, oven, office supplies, DIY, fridge, bedroom",
                    "is_adult": false,
                    "offer_count": 1910,
                    "icon_class_name": "icon-picture ti-home",
                    "slug": "home-garden",
                    "level": 1,
                    "path": "home-garden",
                    "stats": {
                        "offer_count": 0,
                        "popularity": 1,
                        "voucher_count": 1525
                    }
                },
                "stats": {
                    "offer_count": 0,
                    "popularity": 0,
                    "voucher_count": 166
                }
            },
            "category": {
                "id": 314,
                "title": "Home & Garden",
                "description": "<p>For all your home and garden equipment and appliances look no further. Products in this category includes white goods like fridge, freezer, cooker, oven and washing machine. Home appliances include living and bedroom furniture, wall fittings, home decor and DIY equipments. For you gardening you can find all you garden furniture, equipment and all you need for pest control.</p>",
                "keywords": "garden, furniture, pest control, kitchen, microwave, kettle, oven, office supplies, DIY, fridge, bedroom",
                "is_adult": false,
                "offer_count": 1910,
                "icon_class_name": "icon-picture ti-home",
                "slug": "home-garden",
                "level": 1,
                "path": "home-garden",
                "stats": {
                    "offer_count": 0,
                    "popularity": 1,
                    "voucher_count": 1525
                }
            }
        };

        return {
            '2': [offer, offer, offer, offer, offer, offer],
            '84': [offer, offer, offer],
            '107': [offer, offer, offer, offer, offer, offer],
            '319': [offer, offer, offer, offer, offer, offer],
        };

    }
};

export default ApiHelper;