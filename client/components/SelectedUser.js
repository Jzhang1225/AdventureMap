import React from "react";
import { connect } from "react-redux";
import { addFriendRequest } from "../store";

const SelectedUser = ({ user, addFriendRequest, pending }) => {
  return (
    <div className="user user-profile content">
      <div className="row top">
        <h1>User Profile</h1>
      </div>
      <div className="row box-container">
        <div className="flex-container user-card">
          <div className="column-left flex-container">
            <img src={`/public/profile-pics/${user.avatar}`} />
            <p><span className="username">{user.username}</span><br/>
            {user.city}, {user.state}</p>
          </div>
          <div className="column-right">
            {!pending ? (
              <button onClick={() => addFriendRequest(user)}>Add friend</button>
            ) : (
              <button disabled={pending} onClick={() => addFriendRequest(user)}>
                Invitation Sent
              </button>
            )}
          </div>
        </div>

        <div className="info flex-container">
          <table>
            <tbody>
              <tr>
                <td>
                  Name:
                </td>
                <td>
                  {user.firstName} {user.lastName}
                </td>
              </tr>
              <tr>
                <td>
                  Points:
                </td>
                <td>
                  {user.points}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
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
