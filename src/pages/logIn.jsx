import React from 'react'
import EmailLogIn from "../components/email-log-in.jsx";
import SignUp from "../components/sign-up";
import "../css/login.css"
import { useState } from "react";

const LogIn = ({ setSignedUpFor, setLoggedInFor }) => {
  const [hasAccount, setHasAccount] = useState();

  return (
    <div className="container">
      <h1 className="Title">ILEAP</h1>
      <div className="log-in-container">
        {hasAccount ? (
          <SignUp setSignedUpFor={setSignedUpFor} />
        ) : (
          <EmailLogIn setLoggedInFor={setLoggedInFor} />
        )}
        {!hasAccount ? (
          <>
            Don't have an Account?
            <button className="log-in-btn" onClick={() => setHasAccount(true)}>
              Sign up
            </button>
          </>
        ) : (
          <>
            Already have an Account?
            <button
              className="sign-up-btn"
              onClick={() => {
                setHasAccount(false);
              }}
            >
              Login
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default LogIn