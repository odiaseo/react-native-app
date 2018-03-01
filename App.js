import React, {Component} from "react";
import DrawerNav from "./src/config/router";
import {Provider} from "react-redux";
import store from "./src/store";
import {GET_ACCESS_TOKEN, RESET_CACHE} from "./src/flow/types";
import {persistStore} from "redux-persist";
import {PersistGate} from "redux-persist/integration/react";
import {StatusBar} from "react-native";
import {styleVariables} from "./src/common/styles";
import SiteActivityIndicator from "./src/components/SiteActivityIndicator";

const persistor = persistStore(store);

class App extends Component {

    componentDidMount() {
        store.dispatch({type: GET_ACCESS_TOKEN});
    }

    render() {
        return (
            <Provider store={store}>
                <PersistGate
                    loading={<SiteActivityIndicator/>}
                    debug
                    persistor={persistor}>
                    <StatusBar
                        barStule="dark-content"
                        translucent={false}
                        backgroundColor={styleVariables.headerColor}
                    />
                    <DrawerNav {...this.props} />
                </PersistGate>
            </Provider>
        );
    }
};

export default App;