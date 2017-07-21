// react
import React from 'react';
import { connect } from 'react-redux';
// service
import PostJSON from '../../services/XHR/PostJSON.js';
// action
import { NewShout } from '../../reducers/main-feed/main-feed-actions.js';
// visual component
import MainBar from '../visual/main-bar/main-bar.js';
// text entered into text box
var entered_text = "";

function mapStateToProps(state){
    return {
        user: state.User,
    }
}

function mapDispatchToProps(dispatch){
    return {
        dispatch: dispatch
    }
}

function mergeProps(stateProps, dispatchProps){
    return Object.assign({}, stateProps, {
        sendShout: function(e){
            e.preventDefault();
            e.persist();
            PostJSON('/new_shout/', {
                user: stateProps.user,
                body: entered_text
            }).then(shout => {
                e.target.firstElementChild.value = '';
                dispatchProps.dispatch(NewShout(shout));
            });
        },
        textEntered: function (e) {
            entered_text = e.currentTarget.value;
        }
    });
}

const MainBarContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
)(MainBar);

export default MainBarContainer;