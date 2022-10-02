import React, {useState, useEffect, useRef} from 'react'
import { db, auth } from '../firebase'
import Logout from './Logout'
import {collection, onSnapshot, orderBy, query, limit} from 'firebase/firestore'
import SendMessage from './SendMessage'
import Help from './Help'

function Chat() {
    const [messages, setMessages] = useState([])
    const bottom = useRef()
    useEffect(() => {
        //Whenever something changes inside the messages collection
        const dataCol = collection(db, 'messages');
        const q = query(dataCol, orderBy('createdAt'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const data = querySnapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setMessages(data);
            bottom.current.scrollIntoView({behavior: 'smooth'})
        });
    }, []);
    

    function deleteMessage(m){
        if (auth.currentUser.uid === m.uid){
            db.collection('messages').doc(m.id).delete();
        }
    }

    function editMessage(e, m){
        if (auth.currentUser.uid === m.uid){
            if (e.target.innerHTML === m.text){
                return
            }
            if (e.target.innerHTML.trim() === ''){
                e.target.innerHTML = m.text;
                return
            }
            db.collection('messages').doc(m.id).update({
                userName: auth.currentUser.displayName + " (edited)",
                text: e.target.textContent
            })
        }
    }

    return (
    <div>
        <div className="topBar">
            <Help/>
            <Logout/>
        </div>
        <div className="msgs">
        {messages.map((m) => (
            <div key={m.id} className={`msg ${m.uid === auth.currentUser.uid ? 'sent' : 'received'}`}>
                    <button onClick={() => {deleteMessage(m)}} className='delete'>x</button>
                    <p className='username'>{m.userName}</p>
                    <p contentEditable={m.uid === auth.currentUser.uid ? "true" : "false"} onBlur={(e) => editMessage(e,m)}>{m.text}</p>
            </div>
        ))}
        </div>
        <SendMessage scroll={bottom}/>
        <div ref={bottom}/>
    </div>
  )
}

export default Chat