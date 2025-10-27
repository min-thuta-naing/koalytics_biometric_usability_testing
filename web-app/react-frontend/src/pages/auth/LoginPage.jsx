import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();


  // function to handle the login logic 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 

    try {
      const response = await fetch(`${API_URL}login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful:", data);
        // ✅ Save user data to localStorage
        //localStorage.setItem("user", JSON.stringify(data));
        // ✅ Save ONLY the user data to localStorage (not the entire response)
        localStorage.setItem("user", JSON.stringify(data.user));
        //localStorage.setItem("user_id", data.user_id);
        navigate("/homepage"); 
      } else {
        setError(data.error || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="flex h-screen ">
      {/*the left column */}
      <div className="w-1/3 bg-violet-200 p-4 fixed left-0 top-0 h-full">
        <div className="h-full w-full">
          <img
            src="/static/images/welcomeback.png"
            alt="Left Column Image"
            className="h-full w-full object-contain"
          />
        </div>
      </div>

      {/*the right column */}
      <div className="ml-[33.33%] w-2/3 bg-[#F0EEED] flex items-center p-4 overflow-y-auto">
        {/* <div className="bg-white p-10 rounded-3xl w-full max-w-md mx-auto text-center shadow-lg border border-gray-300"> */}
        <div className="w-full max-w-sm mx-auto text-center items-center ">
          <h2 className="text-3xl font-funnel font-semibold mb-4">Welcome back to Koalytics</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
              required
            />
            {error && <p className="text-red-500">{error}</p>}
            <button
              type="submit"
              className="w-full bg-violet-500 text-white py-2 rounded-lg hover:bg-violet-600 transition"
            >
              Log in
            </button>
          </form>
          <p className="mt-4 text-sm">
            Don’t have an account yet?{" "}
            <Link to="/signup" className="text-violet-600 font-semibold">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
      
    </div>
  );
};

export default LoginPage;
