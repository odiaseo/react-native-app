import React from "react";
import options from "../config/options";
import moment from "moment";
import * as types from "../flow/types";
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
        let endPoint = "/site-category?sort=+title";

        if (level !== null) {
            endPoint += "&level=" + level;
        }

        return call(endPoint, accessToken)
            .then((responseJson) => responseJson);
    },

    getMerchantById(accessToken, merchantId) {

        const endPoint = `/merchant/${merchantId}`;

        return call(endPoint, accessToken)
            .then((responseJson) => responseJson);
    },

    findMerchantsByCategory(accessToken, categoryId, page = 1, limit = 10) {
        const params = {
            unique_field: "title",
            //fields: ["id", "title", "logo", "is_featured", "deep_link"].join(","),
            sort: ["-display_order", "-popularity"].join(','),
            filters: [`category_id=${categoryId}`, "has_logo=true", "is_active=true"].join(","),
            page: page,
            per_page: limit
        };

        const queryString = querystring.stringify(params);
        const endPoint = `/merchant?${queryString}`;
        console.log(endPoint);

        return call(endPoint, accessToken)
            .then((responseJson) => responseJson.data);
    },

    searchMerchants(accessToken, keyword, page, limit = 20) {
        const params = {
            unique_field: "title",
            fields: ["id", "title", "logo", "voucher_count", "is_featured"].join(","),
            filters: ["has_logo=true", "is_active=true"].join(","),
            keyword,
            page,
            per_page: limit
        };

        const queryString = querystring.stringify(params);
        const endPoint = `/type-ahead/merchant?${queryString}`;

        console.log(endPoint);

        return call(endPoint, accessToken)
            .then((responseJson) => responseJson);
    },

    getCoupons(accessToken, storeType, page = 1, limit = 20) {
        let endPoint;
        let params = {};

        switch (storeType) {
            case types.SET_POPULAR_COUPONS:
                params = {
                    sort: "+is_expired,-popularity"
                };
                break;
            case types.SET_FEATURED_COUPONS:
                params = {
                    sort: "-is_exclusive,-is_featured",
                    filters: "is_expired=false"
                };
                break;
            case types.SET_TOP_COUPONS:
                params = {
                    sort: "-discount",
                    filters: "is_expired=false"
                };
                break;
            case types.SET_EXPIRING_COUPONS:
                params = {
                    sort: "+is_expired,+end_at,-created_at",
                    filters: "end_at=null<>"
                };
                break;
            case types.SET_LATEST_COUPONS:
                params = {
                    sort: "-created_at",
                    filters: "is_expired=false"
                };
                break;
        }

        let filters = Object.assign({}, params, {page: page, per_page: limit});
        const queryString = querystring.stringify(filters);

        endPoint = `/voucher?${queryString}`;

        return call(endPoint, accessToken)
            .then((responseJson) => responseJson);
    },

    getMerchantCoupons(accessToken, merchantId, page = 1, limit = 10) {
        let filters = {
            filters: `is_expired=0,merchant_id=${merchantId}`,
            page: page,
            sort: "-popularity",
            per_page: limit
        };

        const queryString = querystring.stringify(filters);

        return call(`/voucher?${queryString}`, accessToken)
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

    getMerchantsByCategory(accessToken, categoryList, limit = 10, page = 1) {

        const params = {
            fields: ["id", "deep_link", "title", "logo", "voucher_count", "is_featured", "category_id"].join(","),
            filters: ["has_logo=true", "is_active=true"].join(","),
            sort: "-display_order,-is_profitable,-popularity",
            group_id: categoryList.join(","),
            page: page,
            per_page: limit
        };

        const queryString = querystring.stringify(params);

        const endPoint = `/merchant/group/category_id?${queryString}`;

        return call(endPoint, accessToken)
            .then((merchants) => {
                return ApiHelper.groupByCategory(merchants.data);
            }).catch((error) => {
                console.error(error);
            });
    },

    groupByCategory(merchantList) {
        let sections = {};

        _.forEach(merchantList, function (merchants) {
            const firstMerchant = merchants[0];
            const categoryId = firstMerchant.category.id;

            if (!_.has(sections, categoryId)) {

                sections[categoryId] = {
                    title: firstMerchant.category.title,
                    data: merchants
                };
            }
        });

        return sections;
    }
};

export default ApiHelper;