// React/Redux
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

// Reducers/Action
import AppReducer from './reducers/index.js';
import { FeedLoading, FeedLoaded } from "./reducers/main-feed/main-feed-actions";
import { Login } from "./reducers/user/user-actions";

// Services
import GetJSON from './services/XHR/GetJSON.js';

// Components
import ShoutFeed from './components/functional/shout-feed.js';
import MainBarContainer from './components/functional/main-bar-container.js';

// Build store from reducers
let Store = createStore(AppReducer);

// Gather DOM nodes
var NodeIDs = [['main', 'main'], ['mainbar', 'mainbar']];
var Nodes = {};
NodeIDs.forEach(function(pair){
    Nodes[pair[0]] = document.getElementById(pair[1]);
});

// Render app
ReactDOM.render(

    <Provider store={Store}>
        <ShoutFeed reload={function(){
            LoadFeed(FeedFilter);
        }} />
    </Provider>,

    Nodes.main
);
ReactDOM.render(

    <Provider store={Store}>
        <MainBarContainer />
    </Provider>,

    Nodes.mainbar
);

var FeedFilter;

// Load Feed
function LoadFeed(filter){
    if(Store.getState().MainFeed.loadingFeed === false) {
        var src = '/feed/';
        if (filter) {
            src += filter.filter + '/' + filter.with;
        }
        Store.dispatch(FeedLoading());
        GetJSON(src).then(shouts => {
            Store.dispatch(FeedLoaded(shouts));
        });
    }
}

// Login User the load feed
function LogIn(id){
    var src = '/user/'+id;
    GetJSON(src).then(user => {
        Store.dispatch(Login(user));
        FeedFilter = {
            filter: 'followed_by',
            with: Store.getState().User.id
        }
        LoadFeed(FeedFilter);
    });
}

// log in as user 1
LogIn(1);

// Perform Load and expose for debugging
window.LoadFeed = LoadFeed;
window.GetState = Store.getState;
window.LogIn = LogIn;

/*const updateFeed = setInterval(function(){
    try {
        LoadFeed(FeedFilter);
    } catch(e){
        console.error(e);
        clearInterval(updateFeed);
    }
}, );*/