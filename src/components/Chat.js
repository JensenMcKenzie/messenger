import React, {useState, useEffect} from 'react'
import { db, auth } from '../firebase'
import Logout from './Logout'
import {collection, onSnapshot, orderBy, query, limit} from 'firebase/firestore';
import SendMessage from './SendMessage';
function Chat() {
    const [messages, setMessages] = useState([])

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
        });
    }, []);
    

    function deleteMessage(m){
        if (auth.currentUser.uid === m.uid){
            db.collection('messages').doc(m.id).delete();
        }
    }

    return (
    <div>
        <Logout/>
        <div className="msgs">
        {messages.map((m) => (
            <div key={m.id} className={`msg ${m.uid === auth.currentUser.uid ? 'sent' : 'received'}`}>
                    <button onClick={() => {deleteMessage(m)}} className='delete'>x</button>
                    <p>{m.userName}</p>
                    <p>{m.text}</p>
            </div>
        ))}
        </div>
        <SendMessage/>
    </div>
  )
}

export default Chat