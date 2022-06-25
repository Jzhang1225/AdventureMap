import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="logo"><img src="/images/logo-white.svg" /></div>
        <p>A Website by Cathy Lu, Stefan Mitrovic, Evelyn Rodriguez, Jianing Zhang</p>
        <p className="libraries"><small>
          This website was built with the React library. 
          Find out what else we used&nbsp;
          <Link 
            to="/libraries" 
            style={{color: '#e4dded', textDecoration: 'underline'}}>
              here!
          </Link>
          </small>
        </p>
      </div>
    </div>
  )
}

export default connect(state => state)(Footer);