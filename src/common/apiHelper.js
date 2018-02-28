import React from "react";
import options from "../config/options";
import moment from "moment";
import * as types from "../actions/types";
import axios from "axios";
import _ from "lodash";

const querystring = require("querystring");

const call = function (endPoint, token = "", body = null, method = "GET") {

    let headers = {
        Accept: "application/json",
        "Content-Type": "application/json"
    };

    if (token) {
        headers.Authorization = "Bearer " + token;
    }

    const instance = axios.create({
        baseURL: options.apiUrl,
        timeout: 1000,
        headers
    });

    const params = {
        mode: "no-cors",
        method: method,
        url: endPoint
    };

    if (body) {
        params.data = body;
    }

    return instance(params)
        .then((responseJson) => {
            return responseJson.data;
        });
};

const ApiHelper = {

    requestAccessToken() {
        const body = {
            client_id: options.clientId,
            client_secret: options.clientSecret,
            grant_type: "client_credentials"
        };

        return call("/oauth/token", "", body, "POST")
            .catch((error) => {
                console.error(error);
            });
    },

    listCategories(accessToken, level = null) {
        let endPoint = "/site-category";

        if (level !== null) {
            endPoint += "?level=" + level;
        }

        return call(endPoint, accessToken)
            .then((responseJson) => responseJson);
    },

    getMerchantById(accessToken, merchantId) {

        const endPoint = `/merchant/${merchantId}`;

        return call(endPoint, accessToken)
            .then((responseJson) => responseJson);
    },


    getMerchants(accessToken, keyword, page, limit = 20) {
        const params = {
            unique_field: "title",
            fields: ["id", "title", "logo", "voucher_count", "is_featured", "is_exclusive"].join(","),
            filters: ["has_logo=true", "is_active=true"].join(","),
            keyword,
            page,
            per_page: limit
        };

        const queryString = querystring.stringify(params);

        //let endPoint = `/search/merchant?filter=is_active=true,is_profitable=true,has_logo=true,&per_page=${limit}&page=${page}&keyword=${keyword}`;
        const endPoint = `/type-ahead/merchant?${queryString}`;
        console.log(endPoint);

        return call(endPoint, accessToken)
            .then((responseJson) => responseJson);
    },

    getCoupons(accessToken, storeType, page = 1, limit = 20) {
        let endPoint;

        switch (storeType) {
            case types.SET_POPULAR_COUPONS:
                endPoint = `/voucher?sort=+is_expired,-popularity&per_page=${limit}&page=${page}`;
                break;
            case types.SET_FEATURED_COUPONS:
                endPoint = `/voucher?sort=-is_exclusive,-is_featured&filter=is_expired=false&per_page=${limit}&page=${page}`;
                break;
            case types.SET_TOP_COUPONS:
                endPoint = `/voucher?sort=-discount&filter=is_expired=false&per_page=${limit}&page==${page}`;
                break;
            case types.SET_EXPIRING_COUPONS:
                endPoint = `/voucher?sort=+is_expired,+end_at,-created_at&filter=end_at=null<>&per_page=${limit}&page=${page}`;
                break;
            case types.SET_LATEST_COUPONS:
            default:
                endPoint = `/voucher?sort=-created_at&filter=is_expired=false&per_page=${limit}&page=${page}`;
        }

        return call(endPoint, accessToken)
            .then((responseJson) => responseJson);
    },

    getCarouselSlides(accessToken) {
        const today = moment().format("YYYY-MM-DD");
        const endPoint = `/slide?filters=is_active=true,end_at=${today}>`;
        return call(endPoint, accessToken)
            .then((responseJson) => responseJson);
    },

    searchCoupons(accessToken, searchTerm, page = 1, limit = 20) {
        const endPoint = `/search/voucher?per_page=${limit}&keyword=${searchTerm}&page=${page}`;
        return call(endPoint, accessToken)
            .then((responseJson) => responseJson);
    },

    getMerchantsByCategory(accessToken, categoryId, limit = 10) {
        const endPoint = `/merchant?per_page=${limit}&filters=has_logo=true&category_id=${categoryId}&sort=-is_profitable,-popularity`;

        return call(endPoint, accessToken)
            .then((merchants) => {
                return ApiHelper.groupByCategory(merchants.data);
            }).catch((error) => {
                console.error(error);
            });
    },

    groupByCategory(merchantList) {
        let sections = {};

        merchantList.map((merchant) => {
            let categoryId = merchant.category.id;

            if (!_.has(sections, categoryId)) {
                sections[categoryId] = {
                    title: merchant.category.title,
                    data: []
                };
            }

            sections[categoryId]["data"].push(merchant);
        });

        return sections;
    }
};

export default ApiHelper;