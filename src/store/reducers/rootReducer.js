import projectReducer from './projectReducer'
import clientReducer from './clientReducer'
import authReducer from './authReducer'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'

const rootReducer = combineReducers({
    auth: authReducer,
    project: projectReducer,
    client: clientReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
});

export default rootReducer