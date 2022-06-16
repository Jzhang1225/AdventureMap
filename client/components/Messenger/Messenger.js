import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import Conversation from './Conversation';
import Message from './Message';
import ChatOnline from './ChatOnline';
import { io } from 'socket.io-client';
import axios from 'axios';

const Messenger = (props) => {
  
  const { users, auth } = props
  const user = props.auth

  console.log("USER", user)

  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const scrollRef = useRef();

  useEffect(()=> {
    const getConversations = async() => {
      try {
        const response = await axios.get(`api/conversations/${user.id}`)
        setConversations(response.data);
      }
      catch(err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user.id]);

  useEffect(() => {
    const getMessages = async() => {
      try{
      const response = await axios.get(`api/messages/${currentChat.id}`);
      setMessages(response.data);
      }
      catch(err) {
        console.log(err)
      }
    }
    getMessages();
  }, [currentChat])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages])

  const handleSubmit = async (ev) =>  {
    ev.preventDefault();
    const message = {
      sender: user.id,
      text: newMessage,
      conversationId: currentChat.id
    }

    try {
      const response = await axios.post('api/messages', message);
      console.log("MESSAGES RESPONSE", response)
      setMessages([...messages, response.data]);
      setNewMessage("");
    }
    catch(err) {
      console.log(err)
    }
  }

  console.log("MESSAGES", messages)

  const URL = 'http://localhost:8080'
  const socket = io(URL, { autoConnect: false });
  //console.log("SOCKET TO ME", socket)

  // socket.onAny((event, ...args) => {
  //   console.log("catch listener", event, args);
  // });
  console.log("CURRENT CHAT", currentChat)

  return (
    <div>
      <div className='messenger'>
        <div className='chatMenu'>
          <div className='chatMenuWrapper'>
            <input placeholder='Search For Friends' className='chatMenuInput' />
            {
              conversations.map((c) => {
                return (
                  <div onClick={() => setCurrentChat(c)}>
                    <Conversation conversation = {c} currentUser={user}/>
                  </div>
                )
              })
            }
            
          </div>
        </div>
        <div className='chatBox'>
          <div className='chatBoxWrapper'>
            {
              currentChat ?
              (<>
                <div className='chatBoxTop'>
                  {
                    messages.map((m) => {
                      return (
                        <div ref={scrollRef}>
                          <Message message={m} own={ m.sender === user.id }/>
                        </div>
                      )
                    })
                  }
                  
                </div> 
                <div className='chatBoxBottom'>
                  <textarea 
                  className='chatMessageInput' 
                  placeholder='write something...'
                  onChange={(ev) => setNewMessage(ev.target.value)}
                  value={newMessage} > 
                  </textarea>
                  <button className='chatSubmitButton' onClick={ handleSubmit }> Send </button>
                </div>
              </>) : (
                <span className='noConversationText'> Open A Conversation </span>
              )}
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