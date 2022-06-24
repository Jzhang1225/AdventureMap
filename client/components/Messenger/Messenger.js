import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import Conversation from "./Conversation";
import Message from "./Message";
import ChatOnline from "./ChatOnline";
import { io } from "socket.io-client";
import axios from "axios";
import { Link } from 'react-router-dom';

const Messenger = (props) => {
  const { users, auth } = props;
  const user = props.auth;
  const URL = typeof process !== 'undefined' ? process.env.SOCKET_IO_URL : null;

  console.log("USER", user);

  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const scrollRef = useRef();

  useEffect(() => {
    socket.current = io(URL);
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      (currentChat?.receiverId === arrivalMessage.sender ||
        currentChat?.senderId === arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user.id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const response = await axios.get(`/api/conversations/${user.id}`);
        setConversations(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user.id]);

  useEffect(()=> {
    const found = conversations.find(conversation => conversation.id === props.match.params.id * 1);
    if(found){
      setCurrentChat(found);
    }

  },[props.match.params.id, conversations]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        if(!currentChat){
          return;
        }
        const response = await axios.get(`/api/messages/${currentChat.id}`);
        setMessages(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const message = {
      sender: user.id,
      text: newMessage,
      conversationId: currentChat.id,
    };

    socket.current.emit("sendMessage", {
      senderId: user.id,
      receiverId: user.id !== currentChat.receiverId ? currentChat.receiverId : currentChat.senderId,
      text: newMessage,
    });

    try {
      const response = await axios.post("/api/messages", message);
      setMessages([...messages, response.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  console.log("CURRENT CHAT", currentChat);

  return (
    <div>
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search For Friends" className="chatMenuInput" />
            {conversations.map((c) => {
              return (
                <Link to={`/messenger/${c.id}`}>
                  <Conversation conversation={c} currentUser={user} />
                </Link>
              );
            })}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m) => {
                    return (
                      <div ref={scrollRef}>
                        <Message message={m} own={m.sender === user.id} />
                      </div>
                    );
                  })}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(ev) => setNewMessage(ev.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    {" "}
                    Send{" "}
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText"> Open A Conversation </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline
              onlineUsers={onlineUsers}
              currentId={user.id}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    users: state.users,
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(Messenger);
