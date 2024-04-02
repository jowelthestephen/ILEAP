import React, { useEffect, useState } from "react";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../config/firebase";
import BackToHome from "../components-extra/back-to-homebtn";
import "../css/StudentProgress.css"

const StudentProgress = () => {
  const [selectedValue, setSelectedValue] = useState(null);
  const StudentInfoRef = ref(storage, "/Information");
  const StudentGradeRef = ref(storage, "/Grades");
  const [StudentInfoList, setStudentInfoList] = useState([]);
  const [StudentGradeList, setStudentGradeList] = useState([]);

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

  return (<><BackToHome/>
    <div className="gddd">
      
      <div className="containerr">
          <input
            type="radio"
            name="radio"
            id="yes"
            value="Information"
            checked={selectedValue === "Information"}
            onChange={() => handleRadioChange("Information")}
          />
             <label for="yes">
      <h3>Student Information form</h3>
    </label>

          <input
            name="radio"
            id="no"
            type="radio"
            value="Grades"
            checked={selectedValue === "Grades"}
            onChange={() => handleRadioChange("Grades")}
          />
           <label for="no"> 
      <h3>Grades Form</h3></label>
        <br />
      </div>

      <h2 className="trt">{selectedValue}</h2>
      <div className="image-container ">
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
          : null}
      </div>
    </div>
    </>
  );
};

export default StudentProgress;
