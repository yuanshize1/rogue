export const createProject = (project) => {
    //dispatch method dispatches action to reducer
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //make async call to database
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;
        console.log(project);
        firestore.collection('projects').add({
            title: project.title,
            status: project.status,
            streetAddress: project.streetAddress,
            unitNumber: project.unitNumber,
            cityAddress: project.cityAddress,
            stateAddress: project.stateAddress,
            zipCode: project.zipCode,
            clientId: project.clientId,
            clientFirstName: project.clientFirstName,
            clientLastName: project.clientLastName,
            authorFirstName: profile.firstName,
            authorLastName: profile.lastName,
            authorID: authorId,
            createdAt: new Date()
        }).then(() => {
            dispatch({type: 'CREATE_PROJECT', project })
        }).catch((err) => {
            dispatch({type: 'CREATE_PROJECT_ERROR', err })
        })


       
    }
    
};

export const editProject = (project, id) => {
    //dispatch method dispatches action to reducer
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //make async call to database
        const firestore = getFirestore();
        console.log(project);

        if(project.title) firestore.collection('projects').doc(id).update({title: project.title});
        if(project.status) firestore.collection('projects').doc(id).update({status: project.status});
        if(project.streetAddress) firestore.collection('projects').doc(id).update({streetAddress: project.streetAddress});
        if(project.unitNumber) firestore.collection('projects').doc(id).update({unitNumber: project.unitNumber});
        if(project.cityAddress) firestore.collection('projects').doc(id).update({cityAddress: project.cityAddress});
        if(project.stateAddress) firestore.collection('projects').doc(id).update({stateAddress: project.stateAddress});
        if(project.zipCode) firestore.collection('projects').doc(id).update({zipCode: project.zipCode});
        /*
        if(project.firstName) firestore.collection('projects').doc(id).update({firstName: client.firstName})
        if(client.lastName) firestore.collection('clients').doc(id).update({lastName: client.lastName})
        if(client.role) firestore.collection('clients').doc(id).update({role: client.role})
        if(client.email) firestore.collection('clients').doc(id).update({email: client.email})
        if(client.primaryContact) firestore.collection('clients').doc(id).update({primaryContact: client.primaryContact})
        if(client.secondaryContact) firestore.collection('clients').doc(id).update({secondaryContact: client.secondaryContact})
        
        else console.log('ll')
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
*/

       
    }
    
};