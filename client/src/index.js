import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './assets/stylesheets/main.scss';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import configureStore from './store/configureStore';
import * as serviceWorker from './serviceWorker';
import { Drizzle, generateStore } from "drizzle";
import { DrizzleContext } from "drizzle-react";
import CampaignFactory from "./contracts/CampaignFactory.json";

const { persistor, store } = configureStore();

const options = { contracts: [CampaignFactory] };
const drizzleStore = generateStore(options);
const drizzle = new Drizzle(options, drizzleStore);

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <DrizzleContext.Provider drizzle={drizzle}>
                <App/>
            </DrizzleContext.Provider>
        </PersistGate>
    </Provider>
    , document.getElementById('root')
);

if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./App', function () {
        var NextApp = require('./App').default
        ReactDOM.render(
        <Provider store={store}>
            <NextApp drizzle={drizzle}/>
        </Provider>
       , document.querySelector('.root'));
    })
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
