import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Conversation from './Conversation';
import Message from './Message';
import ChatOnline from './ChatOnline';
import { io } from 'socket.io-client';
import axios from 'axios';

const Messenger = (props) => {
  const { users, auth } = props
  const user = props.auth

  console.log('PROPS', props)
  console.log("USER", user)

  const [conversations, setConversations] = useState([]);
  useEffect(()=> {
    const getConversations = async() => {
      try {
        const response = await axios.get(`api/conversations/${user.id}`)
        console.log("RESPONSE - CONVERSATIONS", response)
        setConversations(response.data);
      }
      catch(err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user.id]);

  
  const URL = 'http://localhost:8080'
  const socket = io(URL, { autoConnect: false });
  //console.log("SOCKET TO ME", socket)

  // socket.onAny((event, ...args) => {
  //   console.log("catch listener", event, args);
  // });

  return (
    <div>
      <div className='messenger'>
        <div className='chatMenu'>
          <div className='chatMenuWrapper'>
            <input placeholder='Search For Friends' className='chatMenuInput' />
            {
              conversations.map((c) => {
                <Conversation conversation={c} currentUser={user}/>
              })
            }
            
          </div>
        </div>
        <div className='chatBox'>
          <div className='chatBoxWrapper'>
            <div className='chatBoxTop'>
              <Message />
              <Message own={true}/>
              <Message />
              <Message own={true}/>
              <Message />
              <Message own={true}/>
              <Message />
              <Message own={true}/>
              <Message />
              <Message own={true}/>
              <Message />
            </div> 
            <div className='chatBoxBottom'>
              <textarea className='chatMessageInput' placeholder='write something...'> </textarea>
              <button className='chatSubmitButton'> Send </button>
            </div>
          </div>
        </div>
        <div className='chatOnline'>
          <div className='chatOnlineWrapper'>
            <ChatOnline /> 
          </div>
        </div>
      </div>
        
      {/* <form className='messengerBar' >
        <input 
        type='text' 
        name='message' 
        value='' 
        placeholder='Message'
        onChange={ (ev) => setMessage(ev.target.value) }
        />
        <button> SEND </button>
      </form> */}
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    users: state.users,
    auth: state.auth, 
  };
};

export default connect(mapStateToProps)(Messenger)