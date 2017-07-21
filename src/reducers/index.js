import { combineReducers } from 'redux';

import MainFeed from './main-feed/main-feed-reducer.js';
import User from './user/user-reducer.js';

const AppReducer = combineReducers({
    MainFeed,
    User
});

export default AppReducer;
