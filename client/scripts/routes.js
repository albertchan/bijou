import React from 'react';
import { Route } from 'react-router';
import * as containers from './containers';

const {
    App,
    User
} = containers;

export default (
    <Route path="/" component={App}>
        <Route path="/:login" component={User} />
    </Route>
)
