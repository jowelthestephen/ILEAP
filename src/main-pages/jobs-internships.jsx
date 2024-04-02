import React, { useEffect } from 'react'
import "../css/jobs&internships.css"
import { db, auth } from '../config/firebase'
import { collection } from "firebase/firestore";
import { handleUser } from '../config/getUser'
import { useAuthState } from 'react-firebase-hooks/auth'
import BackToHome from '../components-extra/back-to-homebtn'
import Internships from '../components/Internships';
import Jobs from '../components/jobs';


const JobsAndInternships = ({ setActualUser, actualUser, signedUpFor, setDetails }) => {
  const [user, loading] = useAuthState(auth);
  const usersRef = collection(db, "users");

  useEffect(() => {
    if (!loading) {
      // Check for user being truthy before using it
      if (user) {
        handleUser(user, usersRef, setActualUser, signedUpFor);
      }
    }
  }, [user, loading]);

  return (
    // an if else statement that detects if the user has a status of student || graduate
    // if they dont have one a pop up shall show up that can let the user choose if they are a student or graduate
    <div className="jobs-internships-container">
      <BackToHome />
      {actualUser?.status === "student" ? (
        <Internships setDetails={setDetails} />
      ) : actualUser?.status === "alumni" ? (
        <Jobs setDetails={setDetails} />
      ) : (
        "404 error status not found"
      )}
    </div>
  );
};

export default JobsAndInternships
