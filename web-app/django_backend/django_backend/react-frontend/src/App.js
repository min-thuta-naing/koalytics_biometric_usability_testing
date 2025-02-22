import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/SignupPage";
import LandingPage from "./pages/LandingPage";
// import Login from "./pages/LoginPage";
// import Welcome from "./pages/WelcomePage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Pages */}
        <Route path="*" element={<LandingPage/>} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;