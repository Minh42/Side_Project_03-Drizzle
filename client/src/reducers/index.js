import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './reducer_auth';
import companiesReducer from './reducer_companies';
import briefsReducer from './reducer_briefs';
import missionsReducer from './reducer_missions';
import { UNAUTHENTICATED } from './reducer_auth';

// mapping of our state
const appReducer = combineReducers({
    form: formReducer,
    auth: authReducer,
    companies: companiesReducer,
    briefs: briefsReducer,
    missions: missionsReducer
});

const rootReducer = (state, action) => {
    if (action.type === UNAUTHENTICATED) {
        state = undefined;
    }
    return appReducer(state, action)
}

export default rootReducer;