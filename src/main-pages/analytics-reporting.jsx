import React, { useEffect, useState } from "react";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../config/firebase";
import BackToHome from "../components-extra/back-to-homebtn";
import "../css/analyticsReporting.css"

const AnalyticsAndReporting = () => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [StudentInfoList, setStudentInfoList] = useState([]);
  const [StudentGradeList, setStudentGradeList] = useState([]);
  const [STfeedbackList, setSTfeedbackList] = useState([]);
  const [SVfeedbackList, setSVfeedbackList] = useState([]);
  const StudentInfoRef = ref(storage, "/Information");
  const StudentGradeRef = ref(storage, "/Grades");
  const SVfeedbackRef = ref(storage, "/SVfeedback");
  const STfeedbackRef = ref(storage, "/STfeedback");


  const handleRadioChange = (value) => {
    setSelectedValue(value);
    fetchData(value);
  };

  const fetchData = (value) => {
    let storageRef;
    let setListFunction;

    if (value === "Information") {
      storageRef = StudentInfoRef;
      setListFunction = setStudentInfoList;
    } else if (value === "Grades") {
      storageRef = StudentGradeRef;
      setListFunction = setStudentGradeList;
    }  else if (value === "STfeedback") {
      storageRef = STfeedbackRef;
      setListFunction = setSTfeedbackList;
    }  else if (value === "SVfeedback") {
      storageRef = SVfeedbackRef;
      setListFunction = setSVfeedbackList;
    } 

    if (storageRef && setListFunction) {
      listAll(storageRef)
        .then((response) => {
          const promises = response.items.map((item) =>
            getDownloadURL(item).then((url) => url)
          );
          return Promise.all(promises);
        })
        .then((urls) => setListFunction(urls))
        .catch((error) => console.error("Error fetching data:", error));
    }
  };

  return (
    <div>
      <BackToHome />
      <div className="gddd">
        <div className="containerr">
          
            <input
              type="radio"
              id="yes"
              value="Information"
              checked={selectedValue === "Information"}
              onChange={() => handleRadioChange("Information")}
            /><label for="yes">
            Student Information form
          </label>
        

          
            <input
            id="yess"
              type="radio"
              value="Grades"
              checked={selectedValue === "Grades"}
              onChange={() => handleRadioChange("Grades")}
            /><label for="yess">
            Grades Form
          </label>
         

          
            <input
              id="no"
              type="radio"
              value="STfeedback"
              checked={selectedValue === "STfeedback"}
              onChange={() => handleRadioChange("STfeedback")}
            /><label for="no">
            ST Feedback Form
          </label>
        

          
            <input  
              id="noo"
              type="radio"
              value="SVfeedback"
              checked={selectedValue === "SVfeedback"}
              onChange={() => handleRadioChange("SVfeedback")}
            /><label for="noo">
            SV Feedback Forms
          </label>
         
        </div>

        <h2 className="trt">{selectedValue}</h2>
        <div className="image-container">
          {selectedValue === "Information"
            ? StudentInfoList.map((url) => (
                <div key={url} className="image">
                  <img src={url} alt={`Student Information`} />
                </div>
              ))
            : selectedValue === "Grades"
            ? StudentGradeList.map((url) => (
                <div key={url} className="image">
                  <img src={url} alt={`Student Grades`} />
                </div>
              ))
            : selectedValue === "STfeedback"
            ? STfeedbackList.map((url) => (
                <div key={url} className="image">
                  <img src={url} alt={`ST feedback`} />
                </div>
              ))
            : selectedValue === "SVfeedback"
            ? SVfeedbackList.map((url) => (
                <div key={url} className="image">
                  <img src={url} alt={`SV feedback`} />
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsAndReporting;
