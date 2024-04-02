import React, { useEffect, useState } from 'react'
import '../css/home.css'
import { auth } from '../config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import Links from '../components/links'
import Hexagon from "../components-extra/hexagon"
import Logo from "../images/BSU_LOGO.jpg"
import { collection } from "firebase/firestore";
import {db} from "../config/firebase"
import { handleUser } from '../config/getUser'
import { handleMatching } from '../config/match'
import { useNavigate } from 'react-router-dom'
import  Video from "../vid/bsuVid1.mp4"

const Home = ({ setActualUser, actualUser, signedUpFor, loggedInFor }) => {
  const [user, loading] = useAuthState(auth);
  const [isMatched, setIsMatched] = useState(false)
  const usersRef = collection(db, "users");
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading) {
      // Check for user being truthy before using it
      if (user) {
        handleUser(user, usersRef, setActualUser, signedUpFor, loggedInFor);
        handleMatching(actualUser, loggedInFor, setIsMatched);
      }
    }
  }, [user, loading]);

  const doesMatch = () => {
        if (isMatched) {
      console.log("matched")
      alert(
        `Sorry There Is A Problem In Our End. Please Log in Again. \n This could be because your status does not match with the one you signed up with or a file error`
      );
      navigate("/");
    }
  }

  doesMatch()


  const handleSmoothScroll = (event) => {
    event.preventDefault();

    const targetElement = document.getElementById("home-page");

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }

  return (
    <div className='home-container'>
      <header>
        <div className="user-container">
          <div className="logo-container">
            <img src={Logo} />
          </div>
        </div>
        <section class="p-menu1">
          <nav id="navbar" class="navigation" role="navigation">
            <input id="toggle1" type="checkbox" />
            <label class="hamburger1" for="toggle1">
              <div class="top"></div>
              <div class="meat"></div>
              <div class="bottom"></div>
            </label>

            <nav class="menu1">
              <Links actualUser={actualUser} />
            </nav>
            <nav class="menu2">
              <div className="user-profile">
                <img src={actualUser?.imageURL || ""} />
              </div>
              <div className="user-name">
                {actualUser?.username || "insert a name"}
              </div>
            </nav>
          </nav>
        </section>
      </header>
      <div className="video">
        <video autoPlay loop muted src={Video}></video>
        <div className="scroll-container">
          <a href="#home-page" onClick={handleSmoothScroll}>
            <div class="box">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </a>
        </div>
      </div>
      <div id='home-page' className="home-main">
        <div className="details-container">
          <div className="title">ILEAP</div>
          <p>
            Internship, Learning, Experience, Advancement, and Placement Web
            Based System for OJT and Job Placement Offices of Batangas State
            University-The National Engineering University-Lipa Campus
          </p>
        </div>
        <div>
          <Hexagon />
        </div>
      </div>
    </div>
  );
};

export default Home