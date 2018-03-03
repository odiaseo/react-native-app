import React from "react";
import DrawerNav from "./src/router";
import {Provider} from "react-redux";
import store from "./src/store";
import {GET_ACCESS_TOKEN} from "./src/flow/types";
import {persistStore} from "redux-persist";
import {PersistGate} from "redux-persist/integration/react";
import {StatusBar} from "react-native";
import {styleVariables} from "./src/common/styles";

const persistor = persistStore(store);
store.dispatch({type: GET_ACCESS_TOKEN});

const App = (props) => (
    <Provider store={store}>
        <PersistGate
            loading={null}
            persistor={persistor}>
            <StatusBar
                barStyle="dark-content"
                translucent={false}
                backgroundColor={styleVariables.headerColor}
            />
            <DrawerNav {...props} />
        </PersistGate>
    </Provider>
);

export default App;