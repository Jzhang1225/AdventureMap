import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { acceptRequest, declineRequest } from "../store";
import Stack from '@mui/material/Stack';
import Container from "@mui/material/Container";
import Paper from '@mui/material/Paper';

const PendingFriendRequests = ({
  pendingFriendRequest,
  users,
  auth,
  acceptRequest,
  declineRequest,
}) => {
  return (
    <div className="user friend-requests content">
      <div className="row top">
        <h1>Pending Friend Requests</h1>
      </div>
      <div className="row flex-container">
        {
          pendingFriendRequest.length
          ? pendingFriendRequest
              .filter((request) => request.userId !== auth.id)
              .map((friendRequest) => {
                const friend = users.find(
                  (user) => user.id === friendRequest.userId
                );
                return(
                  <div className="flex-container user-card">
                    <div className="column-left flex-container">
                    <Link to={`/users/${friend.id}`}><img src={`/public/profile-pics/${friend.avatar}`} /></Link>
                      <p><span className="username">{friend.username}</span><br/>
                      {friend.city}, {friend.state}</p>
                    </div>
                    <div className="column-right">
                    <button className="accept" onClick={() => acceptRequest(friendRequest)}>
                        Accept
                      </button>
                      <button className="decline" onClick={() => declineRequest(friendRequest)}> 
                        Decline
                      </button>
                    </div>
                  </div>
                  );
              }) : "No pending requests"
        }
      </div>
    </div>
  );
};

const mapState = ({ friendRequests, users, auth }) => {
  const pendingFriendRequest = friendRequests.filter(
    (request) => request.status === "pending"
  );

  return {
    pendingFriendRequest,
    users,
    auth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    acceptRequest: (request) => {
      dispatch(acceptRequest(request));
    },
    declineRequest: (request) => {
      dispatch(declineRequest(request));
    },
  };
};

export default connect(mapState, mapDispatch)(PendingFriendRequests);
