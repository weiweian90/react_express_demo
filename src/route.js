import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/home';
import About from './pages/about';

const routes = [
    {
        path: '',
        component: Home
    },
    {
        path: 'about',
        component: About
    }
];

export default <Switch>
    {
        routes.map((route) => {
            return (
                <Route
                    key={route.path}
                    {
                    ...route
                    }
                    exact={true}
                    path={'/' + route.path}
                />
            );
        })
    }
</Switch>;



