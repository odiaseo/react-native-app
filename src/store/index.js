import React from 'react';
import {createStore, applyMiddleware, compose} from 'redux';
import thunkMiddlware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import reducer from '../reducers';

const loggerMiddleware = createLogger({predicate: (getState, action) => __DEV__});

function configureStore(initialState) {
    const enhancer = compose(
        applyMiddleware(
            thunkMiddlware,
            loggerMiddleware
        )
    );

    return createStore(reducer, initialState, enhancer);
}

const store = configureStore({});

if (module.hot) {
    // Support hot reloading of components.
    // Whenever the App component file or one of its dependencies
    // is changed, re-import the updated component and re-render it
    module.hot.accept("../reducers", () => {
        const nextRootReducer = require('../reducers/index');
        store.replaceReducer(nextRootReducer)
    });
}

export default store;