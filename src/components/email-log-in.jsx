import React, { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../config/firebase.js';
import { useNavigate } from 'react-router-dom';

const EmailLogIn = ({ setLoggedInFor }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nagivate = useNavigate();

  const signInEmail = () => {

    signInWithEmailAndPassword(auth, email, password) 
      .then(() => {
        nagivate("/home");
      })
      .catch((error) => {
        alert(error);
      });
  };

  const handleButton = (status) => {
    setLoggedInFor(status)
    signInEmail()
  }

  return (
    <div className="bodyy">
      <h1>Welcome back</h1>
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
        <div className="warning"> &#9432; Login as a</div>
        <div className="btnContainer">
          <button onClick={() => {handleButton("student")}}>Student</button>
          <button onClick={() => {handleButton("alumni")}}>Alumni</button>
          <button onClick={() => {handleButton("employer")}}>Employer</button>
          <button onClick={() => {handleButton("admin")}}>Admin</button>
        </div>
      </div>
    </div>
  );
};

export default EmailLogIn