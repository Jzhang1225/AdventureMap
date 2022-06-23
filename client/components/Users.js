import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addFriendRequest } from "../store";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

class Users extends React.Component {
  constructor() {
    super();
    this.state = {
      filterValue: "",
    };
  }
  FilterChange = (ev) => {
    this.setState({
      filterValue: ev.target.value,
    });
  };

  FilterUsers = (filterValue, Users) => {
    return Users.filter(
      (User) =>
        User.username.toLowerCase().includes(filterValue.toLowerCase()) ||
        User.firstName?.toLowerCase().includes(filterValue.toLowerCase()) ||
        User.lastName?.toLowerCase().includes(filterValue.toLowerCase())
    );
  };

  render() {
    const { filterValue } = this.state;
    const { FilterChange, FilterUsers } = this;
    let { users, friendRequests, auth, addFriendRequest } = this.props;
    users = FilterUsers(filterValue, users);
    if (!filterValue && users.length > 6) {
      const randomNum = Math.floor(Math.random() * (users.length - 6));
      users = users.slice(randomNum, randomNum + 6);
    }
    return (
      <div className="users content">
        <div className="row top">
          <h1>Find Users</h1>
          <p>Find other friends!</p>
        </div>
        <Container>
          <Grid>
            <input
              placeholder="Search Users"
              value={filterValue}
              name="Search by username"
              onChange={FilterChange}
            />
            <h2>Suggested Friends</h2>
          </Grid>
          <Grid container spacing={4}>
            {users.map((user) => {
              const pending = friendRequests.find(
                (request) =>
                  (request.userId === auth.id && request.friendId === user.id) ||
                  (request.friendId === auth.id && request.userId === user.id)
              );

              const accepted = pending?.status === "accepted";
              return (
                <Grid
                  key={user.id}
                  item
                  container
                  justifyContent="space-around"
                  alignContent="center"
                  xs={12}
                  sm={6}
                  md={4}
                >
                  <Card sx={{ width: 250, height: 300 }}>
                    <CardMedia
                      component="img"
                      alt="No profile pic"
                      height="140"
                      image={`/public/profile-pics/${user.avatar}`}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        <Link to={`/users/${user.id}`}>{user.username}</Link>
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {user.firstName} {user.lastName} from {user.city}{" "}
                        {user.state}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        disabled={!!pending}
                        onClick={() => addFriendRequest(user)}
                        size="small"
                      >
                        {pending
                          ? accepted
                            ? `Already Friends`
                            : `Awaiting Response`
                          : `Add Friend`}
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </div>
    );
  }
}

const mapState = ({ users, auth, friendRequests }) => {
  users = users.filter((user) => user.id !== auth.id);
  return {
    friendRequests,
    auth,
    users,
  };
};

const mapDispatch = (dispatch) => {
  return {
    addFriendRequest: (user) => {
      dispatch(addFriendRequest(user));
    },
  };
};

export default connect(mapState, mapDispatch)(Users);
