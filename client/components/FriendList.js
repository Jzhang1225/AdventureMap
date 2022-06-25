import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const FriendsList = ({ acceptedFriendRequest, users, auth }) => {
  return (
    <div>
      <Container style={{ paddingBottom: "4rem" }}>
        <div className="row top">
          <h1>Friends</h1>
        </div>
        <Grid className="flex-grid">
          {acceptedFriendRequest.length
            ? acceptedFriendRequest.map((friendRequest) => {
                const friend = users
                  .filter((user) => user.id !== auth.id)
                  .find(
                    (user) =>
                      user.id === friendRequest.userId ||
                      user.id === friendRequest.friendId
                  );
                return (
                  <Card
                    className="friend-card"
                    key={friend.id}
                    sx={{ width: 250, height: 300 }}
                  >
                    <CardMedia
                      component="img"
                      alt="No profile pic"
                      height="140"
                      image={`/public/profile-pics/${friend.avatar}`}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        <Link to={`/users/${friend.id}`}>
                          {friend.username}
                        </Link>
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {friend.firstName} {friend.lastName} from {friend.city}{" "}
                        {friend.state}
                      </Typography>
                      <Link to={`/messenger/${friend.id}`}>
                        <Button
                          style={{
                            marginBottom: ".5rem",
                            background: "#5e387c",
                            color: "white",
                            padding: ".25rem",
                            marginTop: ".5rem",
                            borderRadius: "10px",
                            marginRight: "auto",
                          }}
                        >
                          Send Message
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                );
              })
            : "No Friends, go find some!"}
        </Grid>
      </Container>
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
