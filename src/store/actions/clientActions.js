export const createClient = (client) => {
    //dispatch method dispatches action to reducer
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //make async call to database
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;
        firestore.collection('clients').add({
            ...client,
            authorFirstName: profile.firstName,
            authorLastName: profile.lastName,
            authorID: authorId,
            createdAt: new Date()
        }).then(() => {
            dispatch({type: 'CREATE_CLIENT', client })
        }).catch((err) => {
            dispatch({type: 'CREATE_CLIENT_ERROR', err })
        })


       
    }
    
};

export const deleteClient = (client) => {
    console.log("dispatch", client)
};