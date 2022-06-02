import React from "react";
import { connect } from "react-redux";

const FriendsList = ({ acceptedFriends, pendingFriends }) => {
  return (
    <div>
      <h2>Friends</h2>
      <ul>
        {acceptedFriends.length ? (
          acceptedFriends.map((acceptedFriend) => {
            return <li key={acceptedFriend.id}>{acceptedFriend.username}</li>;
          })
        ) : (
          <li>Go find some friends!</li>
        )}
      </ul>

      <h2>Pending request</h2>
      <ul>
        {pendingFriends.length ? (
          pendingFriends.map((pendingFriend) => {
            return <li key={pendingFriend.id}>{pendingFriend.username}</li>;
          })
        ) : (
          <li>No pending requests!</li>
        )}
      </ul>
    </div>
  );
};

const mapState = ({ friends, users, auth }) => {
  const acceptedFriends = [];
  const pendingFriends = [];
  friends.forEach((friend) => {
    if (friend.status === "accepted") {
      acceptedFriends.push(
        users.find(
          (user) =>
            user.id !== auth.id &&
            (user.id === friend.userId || user.id === friend.friendId)
        )
      );
    } else {
      pendingFriends.push(
        users.find(
          (user) =>
            user.id !== auth.id &&
            (user.id === friend.userId || user.id === friend.friendId)
        )
      );
    }
  });
  return {
    acceptedFriends,
    pendingFriends,
  };
};

export default connect(mapState)(FriendsList);
