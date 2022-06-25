import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import Conversation from "./Conversation";
import Message from "./Message";
import ChatOnline from "./ChatOnline";
import { io } from "socket.io-client";
import axios from "axios";
import { Link } from "react-router-dom";

const Messenger = (props) => {
  const { users, auth, acceptedFriendRequest } = props;
  const user = props.auth;
  const URL = process.env.SOCKET_IO_URL;

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

  useEffect(() => {
    const found = conversations.find(
      (conversation) => conversation.id === props.match.params.id * 1
    );
    if (found) {
      setCurrentChat(found);
    }
  },[props.match.params.id, conversations]);
  
  useEffect(() => {
    const getMessages = async () => {
      try {
        if (!currentChat) {
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

  useEffect(async () => {
    const conversationArr = [];
    for (let friendRequest of acceptedFriendRequest) {
      const friend = users
        .filter((user) => user.id !== auth.id)
        .find(
          (user) =>
            user.id === friendRequest.userId ||
            user.id === friendRequest.friendId
        );
      try {
        const newConversation = (
          await axios.post("/api/conversations", { friend, auth })
        ).data;
        conversationArr.push(newConversation);
      } catch (err) {
        console.log(err);
      }
    }
    setConversations([...conversations, ...conversationArr]);
  }, [acceptedFriendRequest.length]);

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const message = {
      sender: user.id,
      text: newMessage,
      conversationId: currentChat.id,
    };

    socket.current.emit("sendMessage", {
      senderId: user.id,
      receiverId:
        user.id !== currentChat.receiverId
          ? currentChat.receiverId
          : currentChat.senderId,
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

  return (
    <div>
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <h2>Friends</h2>
            {conversations.map((c, idx) => {
              return (
                <Link key={idx} to={`/messenger/${c.id}`} className="chatMenuName" >
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
                  {messages.map((m, idx) => {
                    return (
                      <div key={idx} ref={scrollRef}>
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
              <span className="noConversationText">Open a Conversation</span>
            )}
          </div>
        </div>
        {/* <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline
              onlineUsers={onlineUsers}
              currentId={user.id}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div> */}
      </div>
    </div>
  );
};

const mapState = ({ friendRequests, users, auth }) => {
  const acceptedFriendRequest = friendRequests.filter(
    (request) => request.status === "accepted"
  );

  return {
    acceptedFriendRequest,
    users,
    auth,
  };
};

export default connect(mapState)(Messenger);
