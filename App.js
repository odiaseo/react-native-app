import React, {Component} from 'react';
import {DrawerNav} from './src/config/router';
import {Provider} from 'react-redux';
import store from './src/store';

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <DrawerNav {...this.props}/>
            </Provider>
        );
    }
}