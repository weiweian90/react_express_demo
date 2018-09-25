import React from 'react';
import ReactDom from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import App from './app.js';

// ReactDOM.render(
//     <App />,
//     document.getElementById('app')
// );

ReactDom.hydrate(
    <AppContainer>
        <App />
    </AppContainer>,
    document.getElementById('app')
);

if (module.hot) {
    module.hot.accept('./app', () => {
        const App = require('./app'.default);

        ReactDom.hydrate(
            <AppContainer>
                <App />
            </AppContainer>,
            document.getElementById('app')
        );
    });
}
