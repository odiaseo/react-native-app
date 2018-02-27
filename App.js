import React from "react";
import DrawerNav from "./src/config/router";
import {Provider} from "react-redux";
import store from "./src/store";
import {GET_ACCESS_TOKEN} from "./src/actions/types";
import {persistStore} from "redux-persist";
import {PersistGate} from "redux-persist/integration/react";
import {StatusBar} from "react-native";
import {styleVariables} from "./src/common/styles";
import SiteActivityIndicator from "./src/components/SiteActivityIndicator";

const persistor = persistStore(store);

const App = function () {
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
};

store.dispatch({type: GET_ACCESS_TOKEN});

export default App;