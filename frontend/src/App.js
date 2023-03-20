import { Routes , Route } from "react-router-dom"

import Header from './components/Header'
import LandingPage from './components/LandingPage'
import PrivateRoute from './components/PrivateRoute'
import Teacher from "./components/Teacher";
import Student from "./components/Student";
import Login from './components/Login'
import SignUp from './components/SignUp'
import AdminSection from "./components/AdminSection";
import Profile from "./components/Profile";
import CreateTest from "./components/CreateTest";
import Test from "./components/Test";
import ShowTest from "./components/ShowTest";
import AddGrading from "./components/ChangeGrading";
import PrintTest from "./components/PrintTest";
import Archive from "./components/Archive";
import Stats from "./components/Stats";

function App() {

  return (
    <>
      <Header id="header" />
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/teacher" element={<PrivateRoute><Teacher /></PrivateRoute>} />
        <Route path="/archive" element={<PrivateRoute _shownOwnTest={true}><Archive /></PrivateRoute>} />
        <Route path="/student" element={<Student />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/adminsection" element={<PrivateRoute admin={true}><AdminSection /></PrivateRoute>} />
        <Route path="/stats" element={<PrivateRoute _shownOwnTest={true}><Stats /> </PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>}/>
        <Route path="/createTest" element={<PrivateRoute><CreateTest /></PrivateRoute>}/>
        <Route path="/showTest" element={<PrivateRoute><ShowTest /></PrivateRoute>}/>
        <Route path="/changeGrading" element={<PrivateRoute><AddGrading /></PrivateRoute>}/>
        <Route path="/test" element={<Test />} />
        <Route path="/printTest" element={<PrintTest />} /> 
    </Routes>
    </>
  );
}

export default App;
