import React, { useState } from 'react';
import { io } from "socket.io-client";

const Chat = ({ users, message, setMessage }) => {
  const [ message, setMessage] = useState('')

  return (
    <div>
      <form className='chat-container' >
        <input 
        type='text' 
        name='message' 
        value='' 
        placeholder='Message'
        onChange={ (ev) => setMessage(ev.target.value) }
        />
        <button onClick> SEND </button>
      </form>
    </div>
  )
}

export default Chat