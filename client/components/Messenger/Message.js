import React from 'react';

export default  function Message({ own }) {
  return (
    <div className={ own ? 'message own' : 'message'}>
      <div className='messageTop'>
        <img 
          className='messageImg'
          src='https://www.w3schools.com/howto/img_avatar2.png' 
          alt=''
        />
        <p className='messageText'> Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
      </div>
      <div className='messageBottom'>
        1 Hour Ago
      </div>
    </div>
  )
}