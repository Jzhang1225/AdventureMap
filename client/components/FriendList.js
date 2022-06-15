import React from "react";
import { connect } from "react-redux";
import { acceptRequest } from "../store";

const FriendsList = ({
  acceptedFriendRequest,
  pendingFriendRequest,
  users,
  auth,
  acceptRequest,
}) => {
  return (
    <div>
      <h2>Friends</h2>

      <ul>
        {acceptedFriendRequest.length
          ? acceptedFriendRequest.map((friendRequest) => {
              const friend = users
                .filter((user) => user.id !== auth.id)
                .find(
                  (user) =>
                    user.id === friendRequest.userId ||
                    user.id === friendRequest.friendId
                );
              return <li key={friend.id}>{friend.username}</li>;
            })
          : "No Friends, go find some!"}
      </ul>

      <h2>Pending received requests</h2>
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
                      Accept request
                    </button>
                  </li>
                );
              })
          : "No pending requests"}
      </ul>

      <h2>Pending Sent requests</h2>
      <ul>
        {pendingFriendRequest.length
          ? pendingFriendRequest
              .filter((request) => request.userId === auth.id)
              .map((friendRequest) => {
                const friend = users.find(
                  (user) => user.id === friendRequest.friendId
                );
                return <li key={friend.id}>{friend.username}</li>;
              })
          : "No pending requests"}
      </ul>
    </div>
  );
};

const mapState = ({ friendRequests, users, auth }) => {
  const acceptedFriendRequest = friendRequests.filter(
    (request) => request.status === "accepted"
  );
  const pendingFriendRequest = friendRequests.filter(
    (request) => request.status === "pending"
  );

  return {
    acceptedFriendRequest,
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
  };
};

export default connect(mapState, mapDispatch)(FriendsList);
