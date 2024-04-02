import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase.js";
import { useNavigate } from "react-router-dom";

const SignUp = ({ setSignedUpFor }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signUpEmail = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((useCredential) => {
        console.log(useCredential);
        navigate("/home");
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={signUpEmail}>
        <div className="email-log-in-container">
          <label>Email:</label>
          <input
            type="text"
            className="email mailBorder"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <label>Password:</label>
          <input
            type="password"
            className="password mailBorder"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div className="warning">&#9432; Sign up as a</div>
          <div className="btnContainer">
            <button onClick={() => setSignedUpFor("student")}>Student</button>
            <button onClick={() => setSignedUpFor("alumni")}>Alumni</button>
            <button onClick={() => setSignedUpFor("employer")}>Employer</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default SignUp;
