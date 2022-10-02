import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAEtf_Qwh3CiAOHoT7IHpMHUX8vfkKKQ8I",
    authDomain: "messenger-245a0.firebaseapp.com",
    projectId: "messenger-245a0",
    storageBucket: "messenger-245a0.appspot.com",
    messagingSenderId: "93823699100",
    appId: "1:93823699100:web:9b372b4daba878ae2e0559"
}
const firebaseApp = firebase.initializeApp(firebaseConfig);


const db = firebaseApp.firestore();

const auth = firebase.auth();

export {auth, db};