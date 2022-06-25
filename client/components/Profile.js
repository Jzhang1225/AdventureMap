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
      <div className="profile content">
        <div className="row top">
          <h1>My Profile</h1>
        </div>
        <Card className="profile-card" container="true" columns={2} direction={"row"} spacing={3}>
          <CardMedia>
            <img style={{borderRadius: "50%", border: "solid 1px #999999", height: "150px", display: 'flex', justifyContent:'center', alignItems:'center'}}
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
              Address: 
              <div>
                {auth?.streetAddress}
              </div>
            </Typography>
            <Typography className="profile-info">
              {auth?.city}, {auth?.state} {auth?.zip}
            </Typography>
          </div>
        </Card>
        
        <div className="row update-form">
          <h3>Update Profile Details</h3>
          <form style={{ padding: "5px", margin: "10px" }}>
            <label htmlFor="username">User Name</label>
            <input name="username" value={username} onChange={onChange} />
            <label htmlFor="firstName">First Name</label>
            <input name="firstName" value={firstName} onChange={onChange} />
            <label htmlFor="lastName">Last Name</label>
            <input name="lastName" value={lastName} onChange={onChange} />
            <label htmlFor="streetAddress">Street Address</label>
            <input
              name="streetAddress"
              value={streetAddress}
              onChange={onChange}
            />
            <label htmlFor="city">City</label>
            <input name="city" value={city} onChange={onChange} />
            <label htmlFor="state">State</label>
            <input name="state" value={state} onChange={onChange} />
            <label htmlFor="zip">Zip</label>
            <input name="zip" value={zip} onChange={onChange} placeholder="Zip" />
            <label htmlFor="email">Email</label>
            <input
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Email"
            />
          </form>
          <button
            onClick={updateProfile}
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
        </div>
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
