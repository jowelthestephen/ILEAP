import React, {useState, useEffect} from 'react'
import { db } from '../config/firebase'
import { collection, getDocs } from 'firebase/firestore'
import "./totality.css"
import BackToHome from './back-to-homebtn'
import { useNavigate } from 'react-router-dom'

const Totality = ({setDetails}) => {
    const internshipRef = collection(db, "internships");
    const [internshipList, setInternshipList] = useState([]);
    const jobsRef = collection(db, "Jobs");
    const [jobList, setJobList] = useState([]);
    const navigate = useNavigate()
    

    const getInternships = async () => {
      const data = await getDocs(internshipRef);
      setInternshipList(
        data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };
     

     const getJobs = async () => {
       const data = await getDocs(jobsRef);
       setJobList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
     };

    const passData = (job) => {
        setDetails(job)
        navigate("/details")
    }

    useEffect(() => {
      getInternships();
      getJobs();
    }, []);

    return (
      <div className="totality-container">
        <BackToHome />
        <div className="h1s">
          <h1>JOBS</h1>
          <h1>INTERNSHPS</h1>
        </div>
        <div className="totality">
          <div className="jobs-grid">
            {jobList.slice(0).reverse().map((job) => (
                <div key={job.id} onClick={() => passData(job)} className="job11">
                  <div className="companyImage11">
                    <img className="cImg1" src={job.imageURL} />
                  </div>
                  <div className="companyName11 genn">{job.companyName}</div>
                  <div className="location11 genn">{job.location}</div>
                  <div className="workingHours11 genn">{job.workingHours}</div>
                </div>
            ))}
          </div>
          <div className="internship-grid">
            {internshipList.slice(0).reverse().map((internship) => (
              <div key={internship.id} onClick={() => passData(internship)} className="internship11 job11">
                <div className="companyImage11">
                  <img className="cImg1" src={internship.imageURL} />
                </div>
                <div className="companyName11 genn">{internship.companyName}</div>
                <div className="location11 genn">{internship.location}</div>
                <div className="workingHours11 genn">{internship.workingHours}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  
}

export default Totality