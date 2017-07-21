var defaultState = {
    shouts: [],
    loadingFeed: false
}

function MainFeed(state = defaultState, action){
    switch (action.type){
        case 'START_LOADING_MAIN_FEED':
            return Object.assign({}, state, {
                loadingFeed: true
            });
        case 'DONE_LOADING_MAIN_FEED':
            return Object.assign({}, state, {
                loadingFeed: false,
                shouts: action.shouts
            });
        case 'NEW_SHOUT':
            return Object.assign({}, state, {
                shouts: state.shouts.concat([action.shout])
            });
        default:
            return state;
    }
}

export default MainFeed;