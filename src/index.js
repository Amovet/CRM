import React from 'react';
import './scss/index.scss';
import App from "./App";
import {Provider} from "react-redux";
import  * as ReactDOMClient from 'react-dom/client';
import store from "./redux/store";
import InfoLayout from "./HOC/info_layout";


const container = document.getElementById('root');
const root = ReactDOMClient.createRoot(container);

root.render(
        <Provider store={store}>
            <InfoLayout>
                    <App/>
            </InfoLayout>
        </Provider>
);