import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Settings from "./Settings";
import { logout, resetFriends } from "../store";

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div>
    <h1>Pending Project Name</h1>
    <nav>
      {isLoggedIn ? (
        <div>
          <Link to="/home">Home</Link>
          <Link to="/explore">Explore</Link>
          <Link to="/leaderboard">Leaderboard</Link>
          <Link to="/users">Users</Link>
          <Settings />
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
);

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
      dispatch(resetFriends());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
