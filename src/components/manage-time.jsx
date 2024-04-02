import React, { useState, useEffect } from "react";
import { db, auth } from "../config/firebase";
import { updateDoc, doc,collection } from "firebase/firestore";
import { handleUser } from "../config/getUser";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import information from "../files/4_BatStateU-FO-OJT-02_Student-Trainees-Personal-History-Statement_Rev.-02.pdf";
import STfeedback from "../files/BatStateU-FO-OJT-03_Student-Trainees-Performance-Appraisal-Report_Rev.-01.pdf";
import SVfeedback from "../files/BatStateU-FO-OJT-04_Training-Supervisors-Feedback-Form_Rev.-01.pdf";
import grades from "../files/BatStateU-FO-OJT-05_Student-Trainees-Feedback-Form_Rev.-01.pdf";

const ManageTime = ({ actualUser, setActualUser }) => {
  const [user, loading] = useAuthState(auth);
  const usersRef = collection(db, "users");
  const userRef = doc(db, "users", `${actualUser.id}`)

  useEffect(() => {
    if (!loading) {
      // Check for user being truthy before using it
      if (user) {
        handleUser(user, usersRef, setActualUser);
      }
    }
  }, [user, loading]);


  const [timer, setTimer] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [totalTimeToday, setTotalTimeToday] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [totalTime, setTotalTime] = useState(actualUser.time || {hours: 0, minutes: 0, seconds: 0});

  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const storedTime = JSON.parse(localStorage.getItem("timer")) || {
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    setTotalTimeToday(storedTime);
  }, []);

  useEffect(() => {
    let   interval;

    if (isActive) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          const newTimer = {
            ...prevTimer,
            seconds: prevTimer.seconds + 1,
          };

          if (newTimer.seconds === 60) {
            newTimer.seconds = 0;
            newTimer.minutes += 1;

            if (newTimer.minutes === 60) {
              newTimer.minutes = 0;
              newTimer.hours += 1;
            }
          }

          localStorage.setItem("timer", JSON.stringify(newTimer));
          return newTimer;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive]);

  const startCount = () => {
    setIsActive(true);
  };

  const stopCount = async () => {
    setIsActive(false);
    addToTotal(timer);
    setTotalTimeToday({
      hours: timer.hours,
      minutes: timer.minutes,
      seconds: timer.seconds,
    });
    setTimer({
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
    localStorage.setItem("totalTimeToday", JSON.stringify(totalTimeToday)); // Save totalTimeToday in localStorage

    await updateDoc(userRef, {
      time: {
        hours: totalTime.hours,
        minutes: totalTime.minutes,
        seconds: totalTime.seconds,
      },
    });
  };

  const addToTotal = async (newTotalTime) => { // this function will be accting to the user time not the newTotalTime
    setTotalTime((prevTotalTime) => ({
      hours: prevTotalTime.hours + newTotalTime.hours,
      minutes:
        prevTotalTime.minutes +
        newTotalTime.minutes +
        Math.floor((prevTotalTime.seconds + newTotalTime.seconds) / 60),
      seconds: (prevTotalTime.seconds + newTotalTime.seconds) % 60,
    }));

  };


  return (
    <div>
      <div className="ttime"> <h1 className="time">
        Total Time Today: {totalTimeToday.hours < 10 ? "0" + totalTimeToday.hours : totalTimeToday.hours}:
        {totalTimeToday.minutes < 10 ? "0" + totalTimeToday.minutes : totalTimeToday.minutes}:
        {totalTimeToday.seconds < 10 ? "0" + totalTimeToday.seconds : totalTimeToday.seconds}
      </h1>
      <div className="inout"><button className="inn" onClick={startCount}>Time In</button>
      <button className="outt" onClick={stopCount}>Time Out</button></div>
      
      <h1 className="time">
        {String(timer.hours).padStart(2, "0")}:
        {String(timer.minutes).padStart(2, "0")}:
        {String(timer.seconds).padStart(2, "0")}
      </h1></div>
     
      <div className="bfr"><h1>1. Download the PDF below</h1><h1>2. Fill-up the form</h1><h1>3. Proceed to upload the file</h1>
      </div>
      <div className="linkk">
      <Link  className="lin"
        to={information}
        target="_blank"
        download
      >
        Information Form
      </Link>
      <Link  className="lin"
        to={STfeedback}
        target="_blank"
        download
      >
        ST feedback Form
      </Link>
      <Link  className="lin"
        to={SVfeedback}
        target="_blank"
        download
      >
        SV feeback Form
      </Link>
      <Link
      className="lin"
        to={grades}
        target="_blank"
        download
      >
      Grades Form
      </Link>
      </div>
     
    </div>
    
  );
};

export default ManageTime;
