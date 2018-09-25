import express from 'express';
import React from 'react';
import ReactDomServer from 'react-dom/server';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { StaticRouter } from 'react-router-dom';

import reducer from '../src/reducer';
import routes from '../src/route';

var router = express.Router();

let store = createStore(
    reducer,
    applyMiddleware(thunk, logger)
);

router.get('/', function (req, res, next) {
    var html = ReactDomServer.renderToString(
        <Provider store={store} >
            <StaticRouter
                context={{}}
                location={ req.url }
            >
                {
                    routes
                }
            </StaticRouter>
        </Provider>
    );
    
    // res.send('<h2>测试</h2>');
    res.reactHtml = html;
    next();
});


// module.exports = router;
// export default router;
// exports.router = router;
export default router;