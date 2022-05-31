import React, { Component } from "react";
import { connect } from "react-redux";
import { updateProfile } from "../store";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.auth.username ? this.props.auth.username : "",
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
    const { username, streetAddress, email, city, state, zip } = this.state;
    const { updateProfile, onChange } = this;
    const { auth } = this.props;

    return (
      <div>
        <h3>Update User Profile</h3>
        <form>
          <input name="username" value={username} onChange={onChange} />
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
          style={{ padding: "5px", margin: "10px" }}
          disabled={
            username === auth.username &&
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
