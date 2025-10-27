import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function EmploymentStatusQuestion() {
  const API_URL = process.env.REACT_APP_API_URL;
  const [selectedStatus, setSelectedStatus] = useState([]);
  const navigate = useNavigate(); // Initialize navigate function

  const currentQuestion = 2;
  const totalQuestions = 5;

  const employmentStatuses = [
    { emoji: "💼", text: "Employed (Full-time)" },
    { emoji: "⌛", text: "Employed (Part-time)" },
    { emoji: "🔍", text: "Looking for work" },
    { emoji: "🍵", text: "Unemployed" },
    { emoji: "🎓", text: "Student" },
    { emoji: "🏖️", text: "Retired" },
  ];

  const handleStatusSelect = (statusText) => {
    setSelectedStatus((prevStatus) =>
      prevStatus.includes(statusText)
        ? prevStatus.filter((item) => item !== statusText)
        : [...prevStatus, statusText]
    );
  };

  
  const handleConfirm = async () => {
    try {
      // Get user data from localStorage
      const storedUser = localStorage.getItem("user");
      let userId;
      
      // if (storedUser) {
      //   const userData = JSON.parse(storedUser);
      //   // Handle both nested and direct user structures
      //   if (userData.user && userData.user.id) {
      //     userId = userData.user.id;
      //   } else if (userData.id) {
      //     userId = userData.id;
      //   } else {
      //     // Try to get from user_id storage
      //     userId = localStorage.getItem('user_id');
      //   }
      // } else {
      //   // Fallback to user_id
      //   userId = localStorage.getItem('user_id');
      // }

      if (storedUser) {
        const userData = JSON.parse(storedUser);
        userId = userData.id; 
      } else {
        userId = localStorage.getItem('user_id');
      }
      
      if (!userId) {
        alert('User ID not found. Please sign up again.');
        navigate("/signup");
        return;
      }

      const response = await fetch(`${API_URL}save_employment_status/${userId}/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ employmentStatuses: selectedStatus  }),
      });

      if (response.ok) {
        //alert('Employement status saved successfully!');
        navigate("/question3");
      } else {
        const data = await response.json();
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      alert('Something went wrong. Please try again.');
      console.error('Save Employment status Error:', error);
    }
  };



  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-[#F0EEED] p-4">
      {/* Progress Bar and Navigation */}
      <div className="w-full max-w-3xl flex items-center justify-between mt-8 mb-8">
        <button
          className="text-gray-500 font-semibold hover:underline"
          onClick={() => navigate("/question2")} // Navigate back to Question 2 when click the back key 
        >
          ← Back
        </button>
        <div className="flex-grow h-3 mx-4 bg-gray-300 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#ACA3E3] transition-all"
            style={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}
          />
        </div>
        <span className="text-gray-600">{`${currentQuestion}/${totalQuestions}`}</span>
      </div>

      {/* Question Box */}
      <div className="w-full max-w-3xl h-[70vh] p-10 bg-white shadow-md rounded-md flex flex-col justify-center items-center mt-8">
        <p className="text-2xl font-funnel font-semibold text-gray-700 mb-6 text-center">
          What is your employment status?
        </p>

        {/* Employment Status Selection */}
        <div className="flex flex-wrap gap-6 justify-center mb-8">
          {employmentStatuses.map((status) => (
            <button
              key={status.text}
              className={`inline-flex items-center gap-2 border-2 rounded-full font-semibold transition duration-300 px-6 py-3 ${
                selectedStatus.includes(status.text)
                  ? "bg-[#4A90E2] text-white"
                  : "border-gray-400 text-gray-500 hover:bg-[#DCD6F7]"
              }`}
              onClick={() => handleStatusSelect(status.text)}
            >
              <span className="text-2xl">{status.emoji}</span>
              <span className="font-funnel text-lg">{status.text}</span>
            </button>
          ))}
        </div>

        {/* Confirm Button */}
        <div className="flex justify-center mt-8">
          <button
            className="bg-[#C4BDED] hover:bg-[#ACA3E3] text-gray-700 py-3 px-6 rounded-xl font-semibold text-lg transition duration-300"
            onClick={handleConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
