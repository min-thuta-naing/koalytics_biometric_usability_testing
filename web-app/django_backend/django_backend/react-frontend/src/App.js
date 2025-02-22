import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/SignupPage";
import './index.css'; // Ensure this is already here
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import ResearcherPage from "./pages/ResearcherPage";
import MyAccount from "./pages/MyAccount";
import AboutUs from "./pages/AboutUs";
import Settings from "./pages/Settings";
// import Login from "./pages/LoginPage";
// import Welcome from "./pages/WelcomePage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Pages */}
        <Route path="*" element={<LandingPage/>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/homepage" element={<HomePage/>}/>
        <Route path="/my-account" element={<MyAccount/>}/>
        <Route path="/settings" element={<Settings/>}/>
        <Route path="/about-us" element={<AboutUs/>}/>
        <Route path="/researcher-dashboard" element={<ResearcherPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
