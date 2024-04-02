import React from 'react'
import BackToHome from "../components-extra/back-to-homebtn";
import ManageTime from '../components/manage-time';
import ImageUpload from '../components/image-upload';
import "../css/progress.css"

const Progress = ({actualUser, setActualUser}) => {
  return (
    <div>
      <BackToHome/>
      <div className="goddy"> 
      <div className="rright"> <ManageTime actualUser={actualUser} setActualUser={setActualUser}/></div>  
      <div className="lleft"><ImageUpload/></div></div>
    </div>
  )
}

export default Progress