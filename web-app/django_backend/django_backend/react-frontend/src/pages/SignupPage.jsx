import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function SignUpLayout() {
  const navigate = useNavigate(); // Initialize navigate function

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EEF2FF] p-4">
      <div className="w-full max-w-3xl p-8 grid grid-cols-2 gap-6">
        {/* First Column */}
        <div className="space-y-6">
          <div className="input-group">
            <label className="text-gray-600">First Name</label>
            <input
              type="text"
              className="h-12 bg-opacity-50 bg-white border border-gray-300 rounded-md w-full px-4 placeholder-gray-500"
            />
          </div>
          <div className="input-group">
            <label className="text-gray-600">Last Name</label>
            <input
              type="text"
              className="h-12 bg-opacity-50 bg-white border border-gray-300 rounded-md w-full px-4 placeholder-gray-500"
            />
          </div>
          <div className="input-group">
            <label className="text-gray-600">Birthday</label>
            <input
              type="date"
              className="h-12 bg-opacity-50 bg-white border border-gray-300 rounded-md w-full px-4 text-gray-500"
            />
          </div>
          <div className="input-group">
            <label className="text-gray-600">Gender</label>
            <select className="h-12 bg-opacity-50 bg-white border border-gray-300 rounded-md w-full px-4 text-gray-500">
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="nosay">Prefer not to say</option>
            </select>
          </div>
          <div className="input-group">
            <label className="text-gray-600">Marital Status</label>
            <select className="h-12 bg-opacity-50 bg-white border border-gray-300 rounded-md w-full px-4 text-gray-500">
              <option value="">Select Marital Status</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
              <option value="divorced">Divorced</option>
            </select>
          </div>
        </div>

        {/* Second Column */}
        <div className="space-y-6">
          <div className="input-group">
            <label className="text-gray-600">Country</label>
            <input
              type="text"
              className="h-12 bg-opacity-50 bg-white border border-gray-300 rounded-md w-full px-4 placeholder-gray-500"
            />
          </div>
          <div className="input-group">
            <label className="text-gray-600">Zip Code</label>
            <input
              type="text"
              className="h-12 bg-opacity-50 bg-white border border-gray-300 rounded-md w-full px-4 placeholder-gray-500"
            />
          </div>
          <div className="input-group">
            <label className="text-gray-600">Email</label>
            <input
              type="email"
              className="h-12 bg-opacity-50 bg-white border border-gray-300 rounded-md w-full px-4 placeholder-gray-500"
            />
          </div>
          <div className="input-group">
            <label className="text-gray-600">Password</label>
            <input
              type="password"
              className="h-12 bg-opacity-50 bg-white border border-gray-300 rounded-md w-full px-4 placeholder-gray-500"
            />
          </div>
          <div className="input-group">
            <label className="text-gray-600">Confirm Password</label>
            <input
              type="password"
              className="h-12 bg-opacity-50 bg-white border border-gray-300 rounded-md w-full px-4 placeholder-gray-500"
            />
          </div>
        </div>

        {/* Sign Up Button */}
        <div className="col-span-2 flex justify-center mt-8">
          <button
            className="bg-violet-400 text-black text-lg px-5 py-2 rounded-lg hover:bg-violet-500 border border-gray-400 rounded-full"
            onClick={() => navigate("/question1")} // Navigate to Question1
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
