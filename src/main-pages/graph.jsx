import React, { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { getDocs, collection } from "firebase/firestore";
import BackToHome from "../components-extra/back-to-homebtn";
import BarChart from "../components/bar-chart";
import LocationBarChart from "../components/locations-bar-chart";
import CourseBarChart from "../components/course-bar-chart";
import "../css/graph.css"

const Graph = () => {
  // LABELS USESTATE
  const [sex, setSex] = useState(false);
  const [course, setCourse] = useState(false);
  const [job, setJob] = useState(false);
  const [internship, setInternship] = useState(false);
  const [names, setNames] = useState(false);
  const [location, setLocation] = useState(false);
  const [graphData, setGraphData] = useState({})

  // DATA USESTATE
  const [male, setMale] = useState(0);
  const [female, setFemale] = useState(0);
  const [courses, setCourses] = useState({});
  const [name, setName] = useState("");
  const [jobs, setJobs] = useState(0);
  const [internships, setInternships] = useState(0);
  const [locations, setLocations] = useState({});

  // USERS
  const usersRef = collection(db, "users");
  const [usersList, setUsersList] = useState([]);
  // INTERNSHIPS
  const internshipRef = collection(db, "internships");
  const [internshipList, setInternshipList] = useState([]);
  // JOBS
  const jobsRef = collection(db, "Jobs");
  const [jobList, setJobList] = useState([]);

  // LOCATION USESTATE
  const [locationsCount, setLocationsCount] = useState({});

  // COURSES USESTATE
  const [coursesCount, setCoursesCount] = useState({});

  // THIS WILL BE PASSED ON TO THE BAR GRAPH
  const generateData = () => {
    
    //SEX
    if (sex) {
      let males = 0;
      let females = 0;

      usersList.forEach((user) => {
        if (user.sex === "male") {
          males++;
        } else if (user.sex === "female") {
          females++;
        }
      });
      setMale(males);
      setFemale(females);
    } else {
      setMale(0);
      setFemale(0);
    }
    //COURSE
    if (course) {
      countCourses();
    } else {
      setCoursesCount({})
    }
    if (job) {
      setJobs(jobList.length);
    } else {
      setJobs(0)
    }
    if (internship) {
      setInternships(internshipList.length);
    } else {
      setInternships(0)
    }
    if (names) {
      console.log("names");
    }
    if (location) {
      countLocations();
    } else {
      setLocationsCount({})
    }
  };

  // GETTING DATA
  const getInternships = async () => {
    const data = await getDocs(internshipRef);
    setInternshipList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const getJobs = async () => {
    const data = await getDocs(jobsRef);
    setJobList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const getUsers = async () => {
    const data = await getDocs(usersRef);
    setUsersList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  // Count locations in the internshipList and jobList
  const countLocations = () => {
    const locationCounts = {};

    const updateLocationCount = (location) => {
      locationCounts[location] = (locationCounts[location] || 0) + 1;
    };

    // Count locations in internshipList
    internshipList.forEach((item) => {
      if (item.location) {
        updateLocationCount(item.location);
      }
    });

    // Count locations in jobList
    jobList.forEach((item) => {
      if (item.location) {
        updateLocationCount(item.location);
      }
    });

    setLocationsCount(locationCounts);
  };

  // Count courses in the usersList
  const countCourses = () => {
    const coursesCount = {};

    usersList.forEach((user) => {
      const course = user.course;

      if (course) {
        coursesCount[course] = (coursesCount[course] || 0) + 1;
      }
    });

    setCoursesCount(coursesCount);
  };

  useEffect(() => {
    getInternships();
    getJobs();
    getUsers();
  }, []);

  useEffect(() => {
    generateData();
  }, [
    sex,
    course,
    job,
    internship,
    names,
    location,
    usersList,
    jobList,
    internshipList,
  ]);

  return (
    <div>
      <BackToHome />
      <div className="namos">
      <h2>Student/Alumni</h2><br/>
        <div className="containerrr">    
          <input type="checkbox" id="yes" onClick={() => setSex((prev) => !prev)} />
          <label for="yes">
          SEX
          </label>
          
          <input id="yess" type="checkbox" onClick={() => setCourse((prev) => !prev)} />
          <label for="yess">
          COURSE
          </label>
          <input id="yesss" type="checkbox" onClick={() => setJob((prev) => !prev)} />
          <label for="yesss">
JOBS          </label>
          <input id="no"
            type="checkbox"
            onClick={() => setInternship((prev) => !prev)}
          />
           <label for="no">
          INTERNSHIPS
          </label>
        </div><h2>Company Details</h2><br/>
        <div className="containerrr">
          <input id="noo" type="checkbox" onClick={() => setNames((prev) => !prev)} />
          <label for="noo">
          NAMES
          </label>
         
          <input id="nooo" type="checkbox" onClick={() => setLocation((prev) => !prev)} />
          <label for="nooo">
          LOCATION
          </label>
        </div>
      </div>

      <div className="data-container">
        {/* Pass the data as props to BarChart */}
        {(sex || job || internship) && (
          <div className="tite">
            <BarChart
              male={male}
              female={female}
              jobs={jobs}
              internships={internships}
             
            />
          </div>
        )}
      <div className="borbor"></div>
        {location ? (
          <div className="tite2">
            <LocationBarChart locationsCount={locationsCount} />
          </div>
        ) : null}
        <div className="borbor"></div>
        {course ? (
          <div className="tite3">
            <CourseBarChart CoursesCount={coursesCount} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Graph;
