import React from 'react';
import {createStore, applyMiddleware, compose} from 'redux';
import thunkMiddlware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import reducer from '../reducers';
import appSagas from '../sagas';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import {composeWithDevTools} from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

const loggerMiddleware = createLogger({predicate: (getState, action) => __DEV__});
const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: hardSet,
};

const persistedReducer = persistReducer(persistConfig, reducer);

function configureStore(initialState) {
    const enhancer = composeWithDevTools(
        applyMiddleware(
            //thunkMiddlware,
            sagaMiddleware,
            loggerMiddleware
        )
    );

    return createStore(persistedReducer, initialState, enhancer);
}

const store = configureStore({});

if (module.hot) {
    // Support hot reloading of components.
    // Whenever the App component file or one of its dependencies
    // is changed, re-import the updated component and re-render it
    module.hot.accept("../reducers", () => {
        const nextRootReducer = require('../reducers');
        store.replaceReducer(persistedReducer)
    });
}

sagaMiddleware.run(appSagas);

export default store;