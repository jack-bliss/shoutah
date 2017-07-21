// React/Redux
import React from 'react';
import { connect } from 'react-redux';
// Components
import ShoutList from '../visual/shout-list/shout-list.js';

function mapStateToProps(state, ownProps){
    return {
        shouts: state.MainFeed.shouts,
        loading: state.MainFeed.loadingFeed,
        reload: ownProps.reload
    }
}

const ShoutFeed = connect(
    mapStateToProps
)(ShoutList)

export default ShoutFeed;