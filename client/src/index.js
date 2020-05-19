import React from 'react';
import { render } from 'react-dom';
import App from './js/App';
import './css/app.scss';
import { Provider } from "overmind-react";
import {app} from "../app"
const renderApp = () => render(
    <Provider value={app}>
        <App />
    </Provider>


    , document.getElementById('root'));
renderApp()
if (module.hot) {
    console.log("module hot is true")
    module.hot.accept('./js/App', () => {
        console.log("Update app")
        renderApp();
    });
}