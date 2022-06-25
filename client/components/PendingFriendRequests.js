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
    <div>
      <Container style={{ paddingBottom: "4rem"}} >
        <div className="row top">
        <h1>Pending Friend Requests</h1>
        </div>

        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={1}
          className="request-list"
        >
          {pendingFriendRequest.length
                      ? pendingFriendRequest
                          .filter((request) => request.userId !== auth.id)
                          .map((friendRequest) => {
                            const friend = users.find(
                              (user) => user.id === friendRequest.userId
                            );
                            return (
                              <Paper elevation={0} key={friend.id} className="friend-request">
                                <Link to={`/users/${friend.id}`} style={{ fontWeight: "bold", color: "black"}}>
                                  {friend.username}
                                </Link>
                                <div>
                                  <button className="friend-req-button" onClick={() => acceptRequest(friendRequest)}>
                                    Accept
                                  </button>
                                  <button className="friend-req-button" onClick={() => declineRequest(friendRequest)}>
                                    Decline
                                  </button>
                                </div>
                              </Paper>                          
                            );
                          })
                      : "No pending requests"}
        </Stack>
      </Container>
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
