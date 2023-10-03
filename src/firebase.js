// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBnD2HUXQZsn4WyOoSM_bsez0-51_DpQwM",
    authDomain: "moodle-dev-f9676.firebaseapp.com",
    projectId: "moodle-dev-f9676",
    storageBucket: "moodle-dev-f9676.appspot.com",
    messagingSenderId: "652194426553",
    appId: "1:652194426553:web:f64ba2398e7f2d4729f568"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
console.log('Firebase initialized:', app);
console.log('Firestore instance:', db);
export default auth;

