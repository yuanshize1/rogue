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
        console.log(client)
        if(client.firstName) firestore.collection('clients').doc(id).update({firstName: client.firstName})
        if(client.lastName) firestore.collection('clients').doc(id).update({lastName: client.lastName})
        if(client.role) firestore.collection('clients').doc(id).update({role: client.role})
        if(client.email) firestore.collection('clients').doc(id).update({email: client.email})
        if(client.primaryContact) firestore.collection('clients').doc(id).update({primaryContact: client.primaryContact})
        if(client.secondaryContact) firestore.collection('clients').doc(id).update({secondaryContact: client.secondaryContact})

    }
    
};