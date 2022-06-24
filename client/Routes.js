import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Leaderboard from "./components/Leaderboard";
import FriendList from "./components/FriendList";
import Messenger from "./components/Messenger/Messenger";
import Explore from "./components/Explore";
import Users from "./components/Users";
import SelectedUser from "./components/SelectedUser";
import {
  me,
  setUsers,
  setFriendRequests,
  getChallenges,
  getChallengeLines,
} from "./store";
import Challenges from "./components/Challenges";
import Challenge from "./components/Challenge";
import PendingFriendRequests from "./components/PendingFriendRequests";

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.isLoggedIn && this.props.isLoggedIn) {
      this.props.loadLoggedInData();
    }
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/explore" component={Explore} />
            <Route path="/challenges" exact component={Challenges} />
            <Route path="/challenges/:id" exact component={Challenge} />
            <Route path="/leaderboard" component={Leaderboard} />
            <Route path="/users" exact component={Users} />
            <Route path="/users/:id" component={SelectedUser} />
            <Route path="/profile" component={Profile} />
            <Route path="/friends" component={FriendList} />
            <Route path="/messenger/:id?" component={Messenger} />
            <Route
              path="/pendingFriendRequests"
              component={PendingFriendRequests}
            />
            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/home" component={Home} />
            <Route path="/explore" component={Explore} />
            <Route path="/challenges" exact component={Challenges} />
            <Route path="/challenges/:id" exact component={Challenge} />
            <Route path="/leaderboard" component={Leaderboard} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </Switch>
        )}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
      dispatch(setUsers());
    },
    loadLoggedInData() {
      dispatch(setFriendRequests());
      dispatch(getChallenges());
      dispatch(getChallengeLines());
    },
  };
};

export default withRouter(connect(mapState, mapDispatch)(Routes));
