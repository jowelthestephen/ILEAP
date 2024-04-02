import React from 'react'
import { useNavigate } from 'react-router-dom';
import "../css/backtohome.css"

const BackToHome = () => {
    const navigate = useNavigate();

    const returnHome = () => {
      navigate("/home");
    };

  return (
    <div className="button-container">
      <button className="btn" onClick={returnHome}>
        Back To Home
      </button>
    </div>
  );
}

export default BackToHome