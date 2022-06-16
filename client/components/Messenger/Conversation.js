import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Conversation ({ conversation, currentUser }) {
  console.log("CURRENT USER", currentUser)
  const [user, setUser] = useState(null)

 
  useEffect(() => {
    const friendId = conversation.senderId !== currentUser.id
    ? conversation.senderId
    : conversation.receiverId;
    console.log("FRIEND ID", friendId)
    
    const getUser = async() => {
      
      try{
        const response = await axios(`/api/users/${friendId}`)
        console.log("RES IN CONVO", response)
        setUser(response.data)
      }
      catch(err) {
        console.log(err)
      }
    }
    getUser();
  }, [currentUser, conversation])

  return (
    <div className='conversation'>
      <img 
        className='conversationImg' 
        src={user?.avatar} 
        alt='' />
      <span className='conversationName'>{user?.username}</span>
    </div>
  )
}