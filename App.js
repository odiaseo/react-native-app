import React, {Component} from 'react';
import DrawerNav from './src/config/router';
import {Provider} from 'react-redux';
import store from './src/store';
import {getAccessToken} from "./src/actions/home";
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import {StatusBar} from 'react-native';
import {styleVariables} from './src/common/styles';
import {Dimensions} from 'react-native';

const persistor = persistStore(store);

export default class App extends Component {

    setDeviceOrientation() {
        const {width, height} = Dimensions.get('window');
        console.log(width, height);
    }

    render() {
        return (
            <Provider store={store}>
                <PersistGate
                    loading={null}
                    debug={true}
                    persistor={persistor}>
                    <StatusBar
                        barStule="dark-content"
                        translucent={false}
                        backgroundColor={styleVariables.headerColor}
                    />
                    <DrawerNav {...this.props} onLayout={this.setDeviceOrientation.bind(this)}/>
                </PersistGate>
            </Provider>
        );
    }
}

store.dispatch(getAccessToken());