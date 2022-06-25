import React from "react";
import { connect } from "react-redux";

const FriendsList = ({ acceptedFriendRequest, users, auth }) => {
  return (
    <div className="friends content">
      <div className="row">
        <h1>My Friends List</h1>
      </div>
      <div className="row">
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

export default connect(mapState)(FriendsList);
