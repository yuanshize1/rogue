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

export const editClient = (client, id) => {
    //dispatch method dispatches action to reducer
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //make async call to database
        const firestore = getFirestore();
        firestore.collection('clients').doc(id).update({
            firstName: client.firstName,
            lastName: client.lastName,
            role: client.role,
            email: client.email,
            primaryContact: client.primaryContact,
            secondaryContact: client.secondaryContact
        }).then(() => {
            dispatch({type: 'UPDATE_CLIENT', client })
        }).catch((err) => {
            dispatch({type: 'UPDATE_CLIENT_ERROR', err })
        })


       
    }
    
};