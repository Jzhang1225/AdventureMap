import React from "react";
import { connect } from "react-redux";
import { addFriendRequest } from "../store";

const SelectedUser = ({ user, addFriendRequest, pending }) => {
  return (
    <div>
      {user.username}
      {!pending ? (
        <button onClick={() => addFriendRequest(user)}>Add friend</button>
      ) : (
        <button disabled={pending} onClick={() => addFriendRequest(user)}>
          Invitation Sent
        </button>
      )}
    </div>
  );
};

const mapState = ({ users, friendRequests, auth }, otherProps) => {
  const user =
    users.find((user) => user.id === otherProps.match.params.id * 1) || {};
  const pending = !!friendRequests.find(
    (request) =>
      (request.userId === auth.id && request.friendId === user.id) ||
      (request.friendId === auth.id && request.userId === user.id)
  );
  return {
    user,
    pending,
  };
};

const mapDispatch = (dispatch) => {
  return {
    addFriendRequest: (user) => {
      dispatch(addFriendRequest(user));
    },
  };
};

export default connect(mapState, mapDispatch)(SelectedUser);
