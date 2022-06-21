import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

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
      <div className="homepage">
        <div class="hero">
          <div class="hero-text">
            <h1>Challenge Yourself to Explore Your World</h1>
            <Link to="/Explore">
              <button className="button-start">Start Exploring</button>
            </Link>
          </div>
        </div>
        {/* <h3>Welcome, {username}</h3>
        <div>{test}</div>
        <button
          onClick={() => {
            getLocation();
          }}
        >
          Get current location
        </button> */}

        <div className="row">
          <div className="flex-container">
            <div className="column-left">
              <h2>Meet up with other adventurers</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>
            <div className="column-right">
              <img src="/images/meet-up.png"/>
            </div>
          </div>
        </div>
        <div className="row-color">
          <div className="flex-container">
            <div class="column-4">
              <img src="/images/home1.png"></img>
            </div>
            <div class="column-4">
              <img src="/images/home2.png"></img>
            </div>
            <div class="column-4">
              <img src="/images/home3.png"></img>
            </div>
            <div class="column-4">
              <img src="/images/home4.png"></img>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="flex-container">
            <div className="column-3">
              <img src="" />
              <h3>Make challenges</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
              </p>
            </div>
            <div className="column-3">
              <img src="" />
              <h3>Compete against friends</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
              </p>
            </div>
            <div className="column-3">
              <img src="" />
              <h3>Explore your local area</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
              </p>
            </div>
          </div>
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
