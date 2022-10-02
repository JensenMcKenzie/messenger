import React from 'react';
import firebase from 'firebase/compat/app';
import {auth} from '../firebase.js';
function SignIn() {
    function googleSignIn(){
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    }
  return (
    <div>
        <button onClick={googleSignIn}>Sign In With Google</button>
    </div>
  )
}

export default SignIn