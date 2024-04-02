import React from 'react'
import { useNavigate } from 'react-router-dom';

const Details = ({details, actualUser}) => {
  
    const navigate = useNavigate()
    console.log(details)

    const backButton = () => {
      if(actualUser.status === "student"){
        navigate("/jobs-and-internships");
      }
      if(actualUser.status === "alumni"){
        navigate("/jobs-and-internships");
      }
      if(actualUser.status === "employer"){
        navigate("/employer/totality");
      }
    }

  return (
    <>
      <div className="detailsCont">
        <div className="leftt">
          <div className="btnnn">
            <button
              onClick={() => {
                backButton()
              }}
            >
              return
            </button>
          </div>
          <div className="detImg">
            <img src={details.imageURL} />
          </div>
          <div className="detCompName">{details.companyName}</div>
          <div className="detDesc">{details.description}</div>
          <div className="dett">{details.location}</div>
          <div className="dett">{details.workingHours}</div>
        </div>
        <div className="rightt">
          <h1 className="empDet">Employer Details</h1>
          <div className="detProf">
            <img src={details.employerPhoto} />
          </div>
          <div className="detName">{details.employer}</div>
          <div className="detNumb">
            {details.employerNumber
              ? `Contact Number: ${details.employerNumber}`
              : `Contact Number: N/A`}
          </div>
          <div className="detEm">{details.employerEmail}</div>
        </div>
      </div>
    </>
  );
}

export default Details