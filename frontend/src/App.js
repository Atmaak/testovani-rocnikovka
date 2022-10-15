import {Routes , Route} from "react-router-dom"
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

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/teacher" element={<PrivateRoute><Teacher /></PrivateRoute>} />
        <Route path="/student" element={<Student />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/adminsection" element={<PrivateRoute admin={true}><AdminSection /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>}/>
        <Route path="/createTest" element={<PrivateRoute><CreateTest /></PrivateRoute>}/>
    </Routes>
    </>
  );
}

export default App;
