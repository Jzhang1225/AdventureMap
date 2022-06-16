import React from 'react';

export default  function Message({ message, own }) {
  return (
    <div className={ own ? 'message own' : 'message'}>
      <div className='messageTop'>
        <img 
          className='messageImg'
          src='https://www.w3schools.com/howto/img_avatar2.png' 
          alt=''
        />
        <p className='messageText'> { message.text } </p>
      </div>
      <div className='messageBottom'>
        { message.createdAt }
      </div>
    </div>
  )
}