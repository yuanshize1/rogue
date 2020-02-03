const initState = {
    clients: []
}

const clientReducer = (state=initState, action) => {
    //check action type
    switch (action.type) {
        case 'CREATE_CLIENT':
            console.log('created client', action.project);
            return state;
        case 'CREATE_CLIENT_ERROR':
            console.log('created client error', action.err);
            return state;
        default:
            return state;
    } 
}

export default clientReducer