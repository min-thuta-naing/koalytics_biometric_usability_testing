import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/SignupPage";
import './index.css'; // Ensure this is already here
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import ResearcherSidebar from "./pages/Researcher/ResearcherSidebar";
import MyAccount from "./pages/MyAccount";
import AboutUs from "./pages/AboutUs";
import Settings from "./pages/Settings";
import Question1 from "./pages/Question1";
import Question2 from "./pages/Question2";
import Question3 from "./pages/Question3";
import Question4 from "./pages/Question4";
import Question5 from "./pages/Question5";
import LoginPage from "./pages/LoginPage";
import ResearcherProjects from "./pages/Researcher/ResearcherProjects";
import ResearcherHome from "./pages/Researcher/ResearcherHome";
import NewProjectPage from "./pages/Researcher/NewProjectPage";

// import Login from "./pages/LoginPage";
// import Welcome from "./pages/WelcomePage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Pages */}
        <Route path="*" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="loginpage" element={<LoginPage/>}/>
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/my-account" element={<MyAccount />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/new-project" element={<NewProjectPage />} />
        <Route path="/researcher-dashboard" element={<ResearcherSidebar />} />
        <Route path="/researcher-home" element={<ResearcherHome />} />
        <Route path="/researcher-project" element={<ResearcherProjects />} />
        <Route path="/question1" element={<Question1 />} />
        <Route path="/question2" element={<Question2 />} />
        <Route path="/question3" element={<Question3 />} />
        <Route path="/question4" element={<Question4 />} />
        <Route path="/question5" element={<Question5 />} />
      </Routes>
    </Router>
  );
}

export default App;
