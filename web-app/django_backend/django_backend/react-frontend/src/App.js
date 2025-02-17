import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignUpForm from "./pages/SignupPage";
// import Login from "./pages/LoginPage";
// import Welcome from "./pages/WelcomePage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Pages */}
        <Route path="/sign-up" element={<SignUpForm />} />
        {/* <Route path="/login" element={<Login />} />
        <Route path="/welcome" element={<Welcome />} /> */}

        {/* Redirect any other route to sign-up */}
        <Route path="*" element={<Navigate to="/sign-up" />} />
      </Routes>
    </Router>
  );
}

export default App;