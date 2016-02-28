import React from 'react';
import { Route } from 'react-router';
import * as containers from './containers';

const {
    App,
    Login,
    Signup
} = containers;

export default (
    <Route path="/" component={App}>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
    </Route>
)
