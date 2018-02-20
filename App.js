import React, {Component} from 'react';
import {RouterStack, DrawerNav} from './src/common/Router';

import {Provider} from 'react-redux';
import {creastStore, applyMiddleware, combineReducers, compose} from 'redux';
import thunkMiddlware from 'redux-thunk';
import createLogger from 'redux-logger';

const loggerMiddleware = createLogger({predicate: (getState, action) => __DEV__});

function configureStore(initialState){
    const enhancer = compose(
        applyMiddleware(
            thunkMiddlware,
            loggerMiddleware
        )
    );

    return create(reducer, initialState, enhancer);
}

const store = configureStore({});


export default class App extends Component {
    render() {
        return ( 
            <DrawerNav / >
        );
    }
}