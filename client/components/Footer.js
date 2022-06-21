import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-content">
        <img className="logo" src="/images/logo-white.svg" />
        <p>A Website by Cathy Lu, Stefan Mitrovic, Evelyn Rodriguez, Jianing Zhang</p>
        <p><small></small></p>
      </div>
    </div>
  )
}

export default connect(state => state)(Footer);