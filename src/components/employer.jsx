import React from 'react'
import { addDoc , collection} from 'firebase/firestore'
import { db,auth } from '../config/firebase'
import BackToHome from '../components-extra/back-to-homebtn';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth";


const Employer = ({actualUser}) => {
  const [user] = useAuthState(auth);
      const jobsRef = collection(db, "Jobs");
      const internshipsRef = collection(db, "internships")
      const navigate = useNavigate()

      const handleAddInternship = async (e) => {
        e.preventDefault()

        await addDoc(internshipsRef, {
          companyName: e.target.companyName.value,
          imageURL: e.target.imageURL.value,
          location: e.target.location.value,
          workingHours: e.target.workingHours.value,
          employer: actualUser?.username,
          employerNumber: actualUser?.phoneNumber,
          employerPosition: e.target.position.value,
          employerPhoto: actualUser?.imageURL,
          employerEmail: user.email,
          description: e.target.description.value,
        });

        alert("Internship Has Been Added Successfully");
    }
    const handleAddJob = async (e) => {
        e.preventDefault();

        await addDoc(jobsRef, {
          companyName: e.target.companyName.value,
          imageURL: e.target.imageURL.value,
          location: e.target.location.value,
          workingHours: e.target.workingHours.value,
          employer: actualUser?.username,
          employerNumber: actualUser?.phoneNumber,
          employerPosition: e.target.position.value,
          employerPhoto: actualUser?.imageURL,
          employerEmail: user.email,
          description: e.target.description.value
        });
        
        alert("Job Has Been Added Successfully")
    }
  return (
    <>
      <BackToHome />
      <div className="employer-container">
        <div className="add-internship">
          <div className="add ttle">POST AN INTERNSHIP</div>
          <form onSubmit={handleAddInternship}>
            <input
              className="bb"
              name="companyName"
              placeholder="Company name..."
              required
            ></input>
            <input
              className="bb"
              name="imageURL"
              type='url'
              placeholder="Image Of The Company..."
              required
            ></input>
            <input
              className="bb"
              name="location"
              placeholder="Location..."
              required
            ></input>
            <input
              className="bb"
              name="workingHours"
              placeholder="Working Hours..."
              required
            ></input>
            <textarea
              className="bb"
              name="description"
              placeholder="Description..."
              required
            ></textarea>
            <input
              className="bb"
              name="position"
              placeholder="Your Position in the Company..."
              required
            ></input>
            <input className="bbtn" type="submit"></input>
          </form>
        </div>
        <div className="add-job ">
          <div className="add ttle">POST A JOB</div>
          <form onSubmit={handleAddJob}>
            <input
              className="bb"
              name="companyName"
              placeholder="Company name..."
              required
            ></input>
            <input
              name="imageURL"
              className="bb"
              type='url'
              placeholder="Image Of The Company..."
              required
            ></input>
            <input
              className="bb"
              name="location"
              placeholder="Location..."
              required
            ></input>
            <input
              className="bb"
              name="workingHours"
              placeholder="Working Hours..."
              required
            ></input>
            <textarea
              className="bb"
              name="description"
              placeholder="Description..."
              required
            ></textarea>
            <input
              className="bb"
              name="position"
              placeholder="Your Position in the Company..."
              required
            ></input>
            <input className="bbtn" type="submit"></input>
          </form>
        </div>
      </div>
      <div className="to-totality">
        <div
          onClick={() => navigate("/employer/totality")}
          className="totality-button"
        >
          See posted Jobs/internships
        </div>
      </div>
    </>
  );
}

export default Employer