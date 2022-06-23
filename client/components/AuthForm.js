import React from "react";
import { connect } from "react-redux";
import { authenticate } from "../store";
import { Link } from "react-router-dom";

const AuthForm = (props) => {
  const { name, displayName, googleButton, handleSubmit, error } = props;

  // return (
  //   <div>
  //     <form onSubmit={handleSubmit} name={name}>
  //       <div>
  //         <label htmlFor="username">
  //           <small>Username</small>
  //         </label>
  //         <input name="username" type="text" />
  //       </div>
  //       <div>
  //         <label htmlFor="password">
  //           <small>Password</small>
  //         </label>
  //         <input name="password" type="password" />
  //       </div>
  //       <div>
  //         <button type="submit">{displayName}</button>
  //       </div>
  //       {error && error.response && <div> {error.response.data} </div>}
  //     </form>
  //     <button onClick={() => (window.location = "/api/googleOauth")}>
  //       Login with Google
  //     </button>
  //   </div>
  // );

  return (
    <div className="authform content flex-container">
      <div className="column-left">
        <div className="login">
          <form onSubmit={handleSubmit} name={name}>
            <h1>{displayName}</h1>

            <div className="field-row">
              <label htmlFor="username">Username</label>
              <input name="username" type="text" required placeholder="username" />
            </div>

            <div className="field-row">
              <label htmlFor="password">Password</label>
              <input
                name="password"
                type="password"
                required
                placeholder="password"
              />
            </div>

            <div className="field-row">
              <div>
                <span>
                  Don't have an account?
                </span>
              </div>
              <Link to="/signup">
                <div>Create Account</div>
              </Link>
            </div>
            
            <div className="field-row">
              <button className="loginb" type="submit">
                {displayName}
              </button>
            </div>
            {error && error.response && <div> {error.response.data} </div>}
          </form>

          <button className="google" onClick={() => (window.location = "/api/googleOauth")}>
            <img src="/images/google-icon.svg"/>
            {googleButton}
          </button>
        </div>
      </div>

      <div className="column-right">
        <p>&nbsp;</p>
      </div>
    </div>
  )
};

const mapLogin = (state) => {
  return {
    name: "login",
    displayName: "Login",
    googleButton: "Sign in with Google",
    error: state.auth.error,
  };
};

const mapSignup = (state) => {
  return {
    name: "signup",
    displayName: "Sign Up",
    googleButton: "Sign Up with Google",
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const username = evt.target.username.value;
      const password = evt.target.password.value;
      dispatch(authenticate(username, password, formName));
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
