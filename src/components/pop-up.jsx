import React, { useState } from 'react'
import { db } from "../config/firebase";
import { doc, updateDoc } from "firebase/firestore";

const PopUp = ({For, setPopUp, actualUser}) => {
    const usersRef = doc(db, "users", `${actualUser.id}`)
    const [value, setValue] = useState("")
    const popUpFor = For;

    const confirmEdit = async () => {
        //updates the value on the database
        if (For === "name"){
          await updateDoc(usersRef,{
            username: value
          })
          window.location.reload(false);
        }
        if (For === "number") {
          await updateDoc(usersRef, {
            phoneNumber: value,
          });
          window.location.reload(false);
        }
        if (For === "status") {
          await updateDoc(usersRef, {
            status: value.toLowerCase(),
          });
          window.location.reload(false);
        }
        if (For === "imageURL") {
          await updateDoc(usersRef, {
            imageURL: value,
          });
          window.location.reload(false);
        }
        if (For === "sex") {
          await updateDoc(usersRef, {
            sex: value.toLowerCase(),
          });
          window.location.reload(false);
        }
        if (For === "course") {
          await updateDoc(usersRef, {
            course: value,
          });
          window.location.reload(false);
        }
        
    }
    const editHandler = (e) => {
      //takes the value from the input
        setValue(e.target.value);
        console.log(value)
    }

  return (
    <div className="pop-up-container">
        <div className="pop-up">
            <div className="x-button-container">
              <button onClick={()=> setPopUp((prev) => !prev)}>x</button>
            </div>
            <h1 className='h1Pop'>Edit your {popUpFor}</h1>
            <input className='inputPop' onChange={editHandler} type="text" />
            <button className='buttonPop' onClick={confirmEdit} >Confirm</button>
        </div>
    </div>
  )
}

export default PopUp