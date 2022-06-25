import React from "react";
import { connect } from "react-redux";
import { acceptRequest, declineRequest } from "../store";

const PendingFriendRequests = ({
  pendingFriendRequest,
  users,
  auth,
  acceptRequest,
  declineRequest,
}) => {
  return (
    <div>
      <h2>Pending Friendrequest Invitations</h2>
      <ul>
        {pendingFriendRequest.length
          ? pendingFriendRequest
              .filter((request) => request.userId !== auth.id)
              .map((friendRequest) => {
                const friend = users.find(
                  (user) => user.id === friendRequest.userId
                );
                return (
                  <li key={friend.id}>
                    {friend.username}
                    <button onClick={() => acceptRequest(friendRequest)}>
                      Accept
                    </button>
                    <button onClick={() => declineRequest(friendRequest)}>
                      Decline
                    </button>
                  </li>
                );
              })
          : "No pending requests"}
      </ul>
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
