var defaultState = {
    name: '',
    id: -1
}

function User(state = defaultState, action){
    switch (action.type){
        case 'LOGIN':
            return Object.assign({}, state, action.user);
        case 'LOGOUT':
            return defaultState;
        default:
            return state;
    }
}

export default User;