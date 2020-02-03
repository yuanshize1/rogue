import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDqYprWCKDtD0w8J0raT1uzNTxN357MNso",
    authDomain: "going-rogue.firebaseapp.com",
    databaseURL: "https://going-rogue.firebaseio.com",
    projectId: "going-rogue",
    storageBucket: "going-rogue.appspot.com",
    messagingSenderId: "702357719614",
    appId: "1:702357719614:web:bdcf4f560fac7dd4f99f6f",
    measurementId: "G-8KHEMR0XDC"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;