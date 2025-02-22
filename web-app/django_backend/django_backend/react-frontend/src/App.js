import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/SignupPage";
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import ResearcherPage from "./pages/ResearcherPage";
import AdminPage from "./pages/AdminPage";
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
        <Route path="/researcher" element={<ResearcherPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;