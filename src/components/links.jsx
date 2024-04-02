import React from 'react'
import { Link } from 'react-router-dom'

const Links = ({actualUser}) => {
  return (
    <>
      <Link to="/profile" className="dropdown-options">My Profile</Link>
      {actualUser?.status === "student" || actualUser?.status === "alumni" ? (
    <Link to="/progress" className="dropdown-options">My Progress</Link>
      ) : actualUser?.status === "employer" ? (
        <Link to="/student-progress" className='dropdown-options'>Student Progress</Link>
      ): null} 
      {actualUser.status === "employer" ? (
        <Link to="/employer" className='dropdown-options'>Post A Job/Internship </Link>
      ) : actualUser.status === "admin" ? (null) :
       <Link to="/jobs-and-internships" className="dropdown-options">Jobs/Internships</Link>}
      {actualUser.status === "admin" && (<Link to="/graph" className='dropdown-options'>Data Portal</Link>)}
      {actualUser.status === "admin" && (<Link to="/analytics" className="dropdown-options">Analytics and Reporting</Link>)}
    </>
  );
}

export default Links
