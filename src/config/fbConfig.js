import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDtOMz5_Abnd8Et1EHB16oAb_KCgd5x0F0",
    authDomain: "rogue-model.firebaseapp.com",
    databaseURL: "https://rogue-model.firebaseio.com",
    projectId: "rogue-model",
    storageBucket: "rogue-model.appspot.com",
    messagingSenderId: "804059970146",
    appId: "1:804059970146:web:03410f366b065254552f3b",
    measurementId: "G-X20VX16S5P"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;