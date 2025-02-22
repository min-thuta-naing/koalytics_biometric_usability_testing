import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/SignupPage";
import Question1 from "./pages/Question1";
import Question2 from "./pages/Question2";
import Question3 from "./pages/Question3";
import Question4 from "./pages/Question4";
import Question5 from "./pages/Question5";

// import Login from "./pages/LoginPage";
// import Welcome from "./pages/WelcomePage";

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

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Pages */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/question1" element={<Question1/>} />
        <Route path="/question2" element={<Question2/>} />
        <Route path="/question3" element={<Question3/>} />
        <Route path="/question4" element={<Question4/>} />
        <Route path="/question5" element={<Question5/>} />
        {/* <Route path="/login" element={<Login />} />
        <Route path="/welcome" element={<Welcome />} /> */}

        {/* Redirect any other route to sign-up */}
        <Route path="*" element={<Navigate to="/signup" />} />
      </Routes>
    </Router>
  );
}

export default App;
