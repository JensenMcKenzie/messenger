import React, {useState, useRef} from 'react'
import {db, auth} from '../firebase.js';
import firebase from 'firebase/compat/app';
function SendMessage() {
    const [msg, setMsg] = useState('');
    const [wobble, setWobble] = useState(0);
    async function sendMessage(e){
        e.preventDefault();
        if (msg.trim() === ''){
            setWobble(1);
            return;
        }
        await db.collection('messages').add({
            text: msg,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid: auth.currentUser.uid,
            userName: auth.currentUser.displayName,
        })
        setMsg('');
    }

    return (
        <div>
            <form onSubmit={sendMessage}>
                <input wobble={wobble} className="msgBox" type="text" value={msg} onChange={(e) => setMsg(e.target.value)}placeholder='Message...'/>
                <button onAnimationEnd={() => setWobble(0)} wobble={wobble} className="sendButton" type='submit'>Send</button>
            </form>
        </div>
    )
}

export default SendMessage