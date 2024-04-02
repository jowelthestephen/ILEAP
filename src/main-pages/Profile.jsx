import React, { useState, useEffect } from 'react'
import { auth, db } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "../css/profile.css"
import editIcon from "../images/edit.png"
import { useNavigate } from 'react-router-dom';
import {signOut} from 'firebase/auth'
import PopUp from '../components/pop-up';
import { collection } from 'firebase/firestore';
import { handleUser } from '../config/getUser';
import BackToHome from '../components-extra/back-to-homebtn';


const Profile = ({ actualUser, setActualUser, signedUpFor }) => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const [popUp, setPopUp] = useState(false);
  const [For, setFor] = useState("");
  const usersRef = collection(db, "users");
  console.log(actualUser);

  const signUserOut = async () => {
    await signOut(auth);
    alert("You Will Be Signed Out");
    navigate("/");
  };

  const handlePopUp = (popUpFor) => {
    setFor(popUpFor);
    setPopUp(true);
  };

  useEffect(() => {
    if (!loading) {
      // Check for user being truthy before using it
      if (user) {
        handleUser(user, usersRef, setActualUser, signedUpFor);
      }
    }
  }, [user, loading]);

  return (
    <div className="Profile">
      <div className="pop-up-body">
        {popUp && (
          <PopUp actualUser={actualUser} For={For} setPopUp={setPopUp} />
        )}
      </div>
      <BackToHome />
      <div className="god">
      <div className="profile-container">
        <div className="user-img">
          <div className="user-img-inner">
            <img src={actualUser?.imageURL} />
            <img
              onClick={() => handlePopUp("imageURL")}
              className="edit-icon"
              src={editIcon}
            />
          </div>
        </div>
        <div className="user-details">
          <table>
            <tr>
              <th>NAME:</th>
              <td className="user-value">
                {actualUser?.username || "Insert Your Name"}
                {` (${actualUser.id})`}
                <img
                  onClick={() => handlePopUp("name")}
                  className="edit-icon"
                  src={editIcon}
                />
              </td>
            </tr>
            <tr>
              <th>EMAIL:</th>
              <td className="user-value">{user?.email}</td>
            </tr>
            <tr>
              <th>CONTACT NUMBER:</th>
              <td className="user-value">
                {actualUser?.phoneNumber || "Please Put A Phone Number"}
                <img
                  className="edit-icon"
                  onClick={() => handlePopUp("number")}
                  src={editIcon}
                />
              </td>
            </tr>
            <tr>
              <th>AMMOUNT OF INTERNSHIPS/JOBS:</th>
              <td className="user-value">{actualUser?.internships || "0"}</td>
            </tr>
            <tr>
              <th>STATUS:</th>
              <td className="user-value">
                {actualUser?.status || "Null"}
                <img
                  className="edit-icon"
                  onClick={() => handlePopUp("status")}
                  src={editIcon}
                />
              </td>
            </tr>
            <tr>
              <th>SEX:</th>
              <td className="user-value">
                {actualUser?.sex || "Null"}
                <img
                  className="edit-icon"
                  onClick={() => handlePopUp("sex")}
                  src={editIcon}
                />
              </td>
            </tr>
            {actualUser?.status === "student" ||
            actualUser?.status === "alumni" ? (
              <tr>
                <th>COURSE:</th>
                <td className="user-value">
                  {actualUser?.course || "Null"}
                  <img
                    className="edit-icon"
                    onClick={() => handlePopUp("course")}
                    src={editIcon}
                  />
                </td>
              </tr>
            ) : null}
          </table>
        </div>
      </div>
      </div>
      
      <div className="sign-out-button-container">
        <button onClick={signUserOut}>
          <div className="a">
            <span className="b">Log Out</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Profile

{
  
}