import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const countries = ["Afghanistan", "Albania", "Algeria", "Thailand", "United States", "United Kingdom", "Vietnam"];

export default function SignUpLayout() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    birthday: "",
    gender: "",
    marital_status: "",
    country: "",
    zip_code: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirm_password) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const csrftoken = document.cookie.split("; ").find((row) => row.startsWith("csrftoken="))?.split("=")[1];

      const response = await fetch("/api/signup/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        //localStorage.setItem("user_id", data.user_id);
        // Store user ID separately
        // localStorage.setItem("user_id", data.user.id);
        
        // // Store complete user data with the same structure as login
        // localStorage.setItem("user", JSON.stringify(data));
        
        // // Also store as signupData for backup
        // localStorage.setItem("signupData", JSON.stringify(data));

        localStorage.setItem("user", JSON.stringify({
          user: data.user,
          message: data.message
        }));
        localStorage.setItem("user_id", data.user.id.toString());

        // const userResponse = await fetch(`/api/user/${data.user_id}/`);
        // if (userResponse.ok) {
        //   const userData = await userResponse.json();
        //   localStorage.setItem("user", JSON.stringify(userData));
        // }

        alert("User registered successfully!");
        navigate("/question1");
      } else {
        const data = await response.json();
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
      console.error("Signup Error:", error);
    }
  };

  return (

    <div className="flex min-h-screen ">
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
      <div className="ml-[33.33%] w-2/3 bg-[#F0EEED] flex items-center p-8 overflow-y-auto">
        <div className="w-full h-full max-w-sm mx-auto text-center items-center">
            <h2 className="text-3xl font-funnel font-semibold mb-4">Welcome to Koalytics</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {[{ label: "First Name", name: "first_name", type: "text" },
                { label: "Last Name", name: "last_name", type: "text" },
                { label: "Birthday", name: "birthday", type: "date" }].map((field) => (
                <div className="input-group text-left" key={field.name}>
                  <label className="text-gray-600">{field.label}</label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 placeholder-gray-400"
                    required
                  />
                </div>
              ))}

              {[{ label: "Gender", name: "gender", options: ["Male", "Female", "Other", "Prefer not to say"] },
                { label: "Marital Status", name: "marital_status", options: ["Single", "Married", "Divorced"] },
                { label: "Country", name: "country", options: countries }].map((field) => (
                <div className="input-group text-left" key={field.name}>
                  <label className="text-gray-600">{field.label}</label>
                  <select
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 placeholder-gray-400"
                    required
                  >
                    <option value="">Select {field.label}</option>
                    {field.options.map((option) => (
                      <option key={option} value={option.toLowerCase()}>{option}</option>
                    ))}
                  </select>
                </div>
              ))}

              {[{ label: "Zip Code", name: "zip_code", type: "text" },
                { label: "Email", name: "email", type: "email" },
                { label: "Password", name: "password", type: "password" },
                { label: "Confirm Password", name: "confirm_password", type: "password" }].map((field) => (
                <div className="input-group text-left" key={field.name}>
                  <label className="text-gray-600">{field.label}</label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 placeholder-gray-400"
                    required
                  />
                </div>
              ))}

              <div className="col-span-2 flex justify-center mt-8">
                <button
                  type="submit"
                  className="w-full bg-violet-500 text-white py-3 rounded-2xl hover:bg-violet-600 transition"
                >
                  Sign Up
                </button>
              </div>
            </form>
        </div>
      </div>

    </div>

    
  );
}
