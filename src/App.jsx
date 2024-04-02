import { Route, Routes } from 'react-router-dom';
import Progress from "./main-pages/Progress";
import JobsAndInternships from "./main-pages/jobs-internships";
import AnalyticsAndReporting from "./main-pages/analytics-reporting";
import AlumniNetwork from "./main-pages/alumni-network";
import Profile from "./main-pages/Profile";
import Home from './pages/home';
import LogIn from './pages/logIn';
import { useState } from 'react';
import Employer from './components/employer';
import Totality from './components-extra/totality';
import Details from './components/details';
import StudentProgress from './main-pages/student-progress';
import Graph from './main-pages/graph';

function App() {
  const [actualUser, setActualUser] = useState({});
  const [details, setDetails] = useState({});
  const [signedUpFor, setSignedUpFor] = useState()
  const [loggedInFor, setLoggedInFor] = useState();

  return (
    <div className="app-container">
      <Routes>
        <Route
          path="/"
          element={
            <LogIn
              setSignedUpFor={setSignedUpFor}
              setLoggedInFor={setLoggedInFor}
            />
          }
        ></Route>
        <Route
          path="/home/*"
          element={
            <Home
              setActualUser={setActualUser}
              actualUser={actualUser}
              signedUpFor={signedUpFor}
              loggedInFor={loggedInFor}
            />
          }
        ></Route>
        <Route
          path="/profile"
          element={
            <Profile
              setActualUser={setActualUser}
              actualUser={actualUser}
              signedUpFor={signedUpFor}
            />
          }
        ></Route>
        <Route path="/progress/*" element={<Progress actualUser={actualUser} setActualUser={setActualUser} />}></Route>
        <Route
          path="/jobs-and-internships"
          element={
            <JobsAndInternships
              actualUser={actualUser}
              setActualUser={setActualUser}
              signedUpFor={signedUpFor}
              setDetails={setDetails}
            />
          }
        ></Route>
        <Route path="/analytics/*" element={<AnalyticsAndReporting />}></Route>
        <Route path="/alumni-network/*" element={<AlumniNetwork />}></Route>
        <Route
          path="/employer"
          element={<Employer actualUser={actualUser} />}
        ></Route>
        <Route
          path="/employer/totality"
          element={<Totality setDetails={setDetails} />}
        ></Route>
        <Route path="/details" element={<Details details={details} actualUser={actualUser} />}></Route>
        <Route path='/student-progress' element={<StudentProgress />}></Route>
        <Route path="/graph" element={<Graph/>}></Route>
      </Routes>
      
    </div>
  );
}

export default App
