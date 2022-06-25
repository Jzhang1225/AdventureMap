import React, { Component } from "react";
import { connect } from "react-redux";
import { updateProfile } from "../store";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.auth.username ? this.props.auth.username : "",
      firstName: this.props.auth.firstName ? this.props.auth.firstName : "",
      lastName: this.props.auth.lastName ? this.props.auth.lastName : "",
      streetAddress: this.props.auth.streetAddress
        ? this.props.auth.streetAddress
        : "",
      email: this.props.auth.email ? this.props.auth.email : "",
      city: this.props.auth.city ? this.props.auth.city : "",
      state: this.props.auth.state ? this.props.auth.state : "",
      zip: this.props.auth.zip ? this.props.auth.zip : "",
      avatar: this.props.auth.avatar ? this.props.auth.avatar : "",
      points: this.props.auth.points ? this.props.auth.points : "",
    };
  }

  onChange = (ev) => {
    this.setState({
      [ev.target.name]: ev.target.value,
    });
  };

  updateProfile = (ev) => {
    ev.preventDefault();
    this.props.update(this.state);
  };

  render() {
    const {
      username,
      firstName,
      lastName,
      streetAddress,
      email,
      city,
      state,
      zip,
      avatar,
      points,
    } = this.state;
    const { updateProfile, onChange } = this;
    const { auth } = this.props;

    return (
      <div style={{display: 'flex', flexDirection:'column'}}>
        <Container>
          <div className="row top">
            <h1> Profile </h1>
          </div>
          <Card className="profile-card" container="true" columns={2} direction={"row"} spacing={3}>
            <CardMedia>
              <img style={{borderRadius: "50%", border: "solid 1px black", height: "150px", display: 'flex', justifyContent:'center', alignItems:'center'}}
              src={`/public/profile-pics/${auth?.avatar}`}/>
            </CardMedia>
            <div style={{display: 'flex', flexDirection:'column', marginLeft: '3rem', fontSize: "1em" }}>
              <Typography variant="h4" >
              {auth?.username}
              </Typography>
              <Typography variant="subtitle1" style={{fontStyle: "italic"}}>
                  {auth?.points} Points
                </Typography>
              <Typography className="profile-info">
                Name: {auth?.firstName} {auth?.lastName}
              </Typography>
              <Typography className="profile-info">
                Email: {auth?.email}
              </Typography>
              <Typography className="profile-info">
                Address: {auth?.streetAddress}
              </Typography>
              {/* <button style={{marginBottom: '1rem', background: "#5e387c", color: 'white', padding: '0.5rem', marginTop: '1rem', borderRadius: "10px",marginRight:'auto'}}> 
                Edit Profile Details 
              </button> */}
            </div>
          </Card>
          
          <div style={{display: 'flex', justifyContent:'center'}}>
              <Grid container spacing={3} style={{margin: "8px", width: "25%"}}>
              <h3>Update Profile Details </h3>
                <form style={{ padding: "5px", margin: "10px", }} >
                  <input name="username" value={username} onChange={onChange} />
                  <input name="firstName" value={firstName} onChange={onChange} />
                  <input name="lastName" value={lastName} onChange={onChange} />
                  <input
                    name="streetAddress"
                    value={streetAddress}
                    onChange={onChange}
                  />
                  <input name="email" value={email} onChange={onChange} />
                  <input name="city" value={city} onChange={onChange} />
                  <input name="state" value={state} onChange={onChange} />
                  <input name="zip" value={zip} onChange={onChange} />
                </form>
                <button
                  onClick={updateProfile}
                  style={{ padding: "5px", margin: "10px",}}
                  disabled={
                    username === auth.username &&
                    firstName === (auth.firstName || "") &&
                    lastName === (auth.lastName || "") &&
                    streetAddress === (auth.streetAddress || "") &&
                    email === (auth.email || "") &&
                    city === (auth.city || "") &&
                    state === (auth.state || "") &&
                    zip === (auth.zip || "")
                  }
                >
                  Update
                </button>
              </Grid>
          </div>
         
        </Container>
        
      </div>
    );
  }
}

const mapState = ({ auth }) => {
  return {
    auth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    update: (user) => {
      dispatch(updateProfile(user));
    },
  };
};

export default connect(mapState, mapDispatch)(Profile);
