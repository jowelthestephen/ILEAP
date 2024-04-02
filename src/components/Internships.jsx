import React ,{useEffect, useState} from 'react'
import { db } from "../config/firebase";
import { getDocs, collection } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

const Internships = ({setDetails}) => {
  const internshipRef = collection(db, "internships");
  const [internshipList, setInternshipList] = useState([]);
  const navigate = useNavigate()

  const getInternships = async () => {
    const data = await getDocs(internshipRef);
    setInternshipList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getInternships();
  }, []);

  const passData = (data) => {
    setDetails(data)
    navigate("/details")
  }

  return (
    <div className="jobs-container">
      <div className="job-grid">
        {internshipList.slice(0).reverse().map((internship) => (
          <div className="job">
            <div className="companyImage">
              <img className="cImg" src={internship.imageURL} />
            </div>
            <div className="companyName">{internship.companyName}</div>
            <div className="location">{internship.location}</div>
            <div className="workingHours">{internship.workingHours}</div>
            <div className="cMore">
              <button onClick={() => passData(internship)}>See more </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Internships