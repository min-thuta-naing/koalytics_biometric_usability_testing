import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/SignupPage";
// import Login from "./pages/LoginPage";
// import Welcome from "./pages/WelcomePage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Pages */}
        <Route path="/signup" element={<SignUp />} />
        {/* <Route path="/login" element={<Login />} />
        <Route path="/welcome" element={<Welcome />} /> */}

        {/* Redirect any other route to sign-up */}
        <Route path="*" element={<Home/>} />
      </Routes>
    </Router>
  );
}
const Home = () => {
  return (
    <div>
      <h1>Welcome to Our Website</h1>
      <p>
        <a href="/signup">Go to Sign Up</a>
      </p>
    </div>
  );
};
export default App;