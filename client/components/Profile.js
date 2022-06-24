import React, { Component } from "react";
import { connect } from "react-redux";
import { updateProfile } from "../store";

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
    } = this.state;
    const { updateProfile, onChange } = this;
    const { auth } = this.props;

    return (
      <div>
        <h3>Update User Profile</h3>
        <form>
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
          style={{ padding: "5px", margin: "10px" }}
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
