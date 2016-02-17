import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux'

// common actions
import {
    RESET_ERROR_MESSAGE
} from '../actions'

function currentLocale(state = { }, action) {
    return state;
}

// Updates error message to notify about the failed fetches.
function errorMessage(state = null, action) {
    const { type, error } = action;

    if (type === RESET_ERROR_MESSAGE) {
        return null;
    } else if (error) {
        return action.error;
    }
    return state;
}

const rootReducer = combineReducers({
    currentLocale,
    errorMessage,
    routing: routeReducer
});

export default rootReducer;
