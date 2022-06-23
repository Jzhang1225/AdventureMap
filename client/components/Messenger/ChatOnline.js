import React, { useState } from 'react';

export default function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  
  return (
    <div className='chatOnline'>
      <div className='chatOnlineFriend'>
        <div className='chatOnlineImgContainer'>
          <img className='chatOnlineImg'
            src='https://www.w3schools.com/howto/img_avatar2.png' 
            alt='' 
          />
          <div className='chatOnlineBadge'></div>
        </div>
        <span className='chatOnlineName'> Juan Doe </span>
      </div>
      <div className='chatOnlineFriend'>
        <div className='chatOnlineImgContainer'>
          <img className='chatOnlineImg'
            src='https://www.w3schools.com/howto/img_avatar2.png' 
            alt='' 
          />
          <div className='chatOnlineBadge'></div>
        </div>
        <span className='chatOnlineName'> Juan Doe </span>
      </div>
      <div className='chatOnlineFriend'>
        <div className='chatOnlineImgContainer'>
          <img className='chatOnlineImg'
            src='https://www.w3schools.com/howto/img_avatar2.png' 
            alt='' 
          />
          <div className='chatOnlineBadge'></div>
        </div>
        <span className='chatOnlineName'> Juan Doe </span>
      </div>
    </div>
  )
}