import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignupPage";
import './index.css';
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import ResearcherPage from "./pages/ResearcherPage";
import MyAccount from "./pages/MyAccount";
import AboutUs from "./pages/AboutUs";
import Settings from "./pages/Settings";
import Question1 from "./pages/Question1";
import Question2 from "./pages/Question2";
import Question3 from "./pages/Question3";
import Question4 from "./pages/Question4";
import Question5 from "./pages/Question5";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<LandingPage />} /> {/* Landing page at the root path */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/my-account" element={<MyAccount />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/researcher-dashboard" element={<ResearcherPage />} />
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
