import React, { Component } from "react";
import { connect } from "react-redux";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      test: "",
    };
  }

  showPosition = (position) => {
    this.setState({
      test: `Latitude: ${position.coords.latitude} Longitude: ${position.coords.longitude}`,
    });
  };

  render() {
    const { username } = this.props;
    const { test } = this.state;
    const { showPosition } = this;

    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
      }
    }

    return (
      <div>
        <h3>Welcome, {username}</h3>
        <div>{test}</div>
        <button
          onClick={() => {
            getLocation();
          }}
        >
          Get current location
        </button>

        <div>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapState)(Home);
