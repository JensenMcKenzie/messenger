import React from 'react'
import {auth} from '../firebase.js';

function Logout() {
  return (
    <div>
        <button onClick={() => auth.signOut()}>Logout</button>
    </div>
  )
}

export default Logout