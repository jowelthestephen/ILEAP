import React, { useEffect, useState } from 'react'
import { db } from '../config/firebase'
import { getDocs, collection } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
const Jobs = ({setDetails}) => {
  
  const jobsRef = collection(db, "Jobs");
  const [jobList, setJobList] = useState([])
  const navigate = useNavigate()
  console.log(jobList)

  const getJobs = async () => {
    const data = await getDocs(jobsRef)
    setJobList(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
  }

  useEffect(() => {
    getJobs()
  },[])

  const passData = (data) => {
    setDetails(data)
    navigate("/details")
  }


  return (
    <div className="jobs-container">
      <div className="job-grid">
        {jobList.slice(0).reverse().map((job) => (
          <div className="job">
            <div className="companyImage">
              <img className="cImg" src={job.imageURL}/>
            </div>
            <div className="companyName genn">{job.companyName}</div>
            <div className="location genn">{job.location}</div>
            <div className="workingHours genn">
              {job.workingHours}
            </div>
            <div className="cMore">
              <button onClick={() => passData(job)}>See more </button>
            </div>
           </div>
        ))}
      </div>
    </div>
  );
}

export default Jobs