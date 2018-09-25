import React, { Component } from 'react';
// import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import reducer from './reducer';
import routes from './route';

let store;

if (window.__REDUX_DEVTOOLS_EXTENSION__ || window.__DEVTOOLS_EXTENSION__) {
    store = createStore(
        reducer,
        compose(applyMiddleware(thunk, logger), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) //插件调试，未安装会报错
    );
} else {
    store = createStore(
        reducer,
        applyMiddleware(thunk, logger)
    );
}

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    { routes }
                </BrowserRouter>
            </Provider>
        );
    }
}



