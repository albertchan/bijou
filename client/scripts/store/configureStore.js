import { applyMiddleware, compose, createStore } from 'redux';
import { browserHistory } from 'react-router';
import { syncHistory } from 'react-router-redux';
import thunk from 'redux-thunk';
import api from '../middleware/api';
import rootReducer from '../reducers';
import routes from '../routes';

const reduxRouterMiddleware = syncHistory(browserHistory);

export default function configureStore(initialState) {
    const store = createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(
                thunk, // lets us dispatch() functions
                api,
                reduxRouterMiddleware
            )
        )
    );

    return store;
}
