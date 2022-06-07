import React from "react";
import { connect } from "react-redux";

const Leaderboard = ({ users }) => {
  return (
    <div>
      <ul>
        {users.map((user) => {
          return (
            <li key={user.id}>
              {user.username} has {user.points} points
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const mapState = ({ users }) => {
  users.sort((a, b) => b.points - a.points);

  return {
    users,
  };
};

export default connect(mapState)(Leaderboard);
