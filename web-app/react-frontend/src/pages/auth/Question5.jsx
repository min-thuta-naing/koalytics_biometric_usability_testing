import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function IndustryQuestion() {
  const API_URL = process.env.REACT_APP_API_URL;
  const [selectedIndustry, setSelectedIndustry] = useState([]);
  const navigate = useNavigate(); // Initialize navigate function

  const currentQuestion = 5;
  const totalQuestions = 5;

  const industries = [
    { emoji: "🌾", text: "Agriculture" },
    { emoji: "💻", text: "Technology" },
    { emoji: "📊", text: "Business/Finance" },
    { emoji: "🏥", text: "Healthcare" },
    { emoji: "🎓", text: "Education" },
    { emoji: "🏭", text: "Manufacturing" },
    { emoji: "🛒", text: "Retail" },
    { emoji: "✈️", text: "Hospitality/Travel" },
    { emoji: "🏗️", text: "Construction/Real Estate" },
    { emoji: "🏛️", text: "Government/Public Sector" },
    { emoji: "⚡", text: "Energy" },
    { emoji: "🎬", text: "Media/Entertainment" },
    { emoji: "⚖️", text: "Legal" },
    { emoji: "🚚", text: "Transportation/Logistics" },
    { emoji: "🍔", text: "Food & Beverage" },
    { emoji: "🤝", text: "Non-Profit" },
    { emoji: "🎓", text: "Student" },
    { emoji: "🏖️", text: "Retired" },
    { emoji: "💼", text: "Entrepreneur" },
    { emoji: "🔍", text: "Looking for Work" },
    { emoji: "🍵", text: "Unemployed" },
    { emoji: "❓", text: "Others" },
  ];

  const handleIndustrySelect = (industryText) => {
    setSelectedIndustry((prevIndustry) =>
      prevIndustry.includes(industryText)
        ? prevIndustry.filter((item) => item !== industryText)
        : [...prevIndustry, industryText]
    );
  };
  
  const handleConfirm = async () => {
    try {
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

      const response = await fetch(`${API_URL}/api/save_industry/${userId}/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ industry: selectedIndustry }),
      });

      if (response.ok) {
        //alert('Industry saved successfully!');
        navigate("/homepage");
      } else {
        const data = await response.json();
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      alert('Something went wrong. Please try again.');
      console.error('Save industry Error:', error);
    }
  };


  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-[#F0EEED] p-4">
      {/* Progress Bar and Navigation */}
      <div className="w-full max-w-3xl flex items-center justify-between mt-8 mb-8">
        <button
          className="text-gray-500 font-semibold hover:underline"
          onClick={() => navigate("/question4")} // Navigate back to Question 4
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
      <div className="w-full max-w-3xl p-10 bg-white shadow-md rounded-md flex flex-col justify-center items-center mt-8">
        <p className="font-funnel text-2xl font-funnel font-semibold text-gray-700 mb-6 text-center">
          Which of the following categories best describe the primary industry of the company you work for?
        </p>

        {/* Industry Selection */}
        <div className="flex flex-wrap gap-6 justify-center mb-8 max-h-80 overflow-y-auto">
          {industries.map((industry) => (
            <button
              key={industry.text}
              className={`inline-flex items-center gap-2 border-2 rounded-full font-semibold transition duration-300 px-6 py-3 ${
                selectedIndustry.includes(industry.text)
                  ? "bg-[#4A90E2] text-white"
                  : "border-gray-400 text-gray-500 hover:bg-[#DCD6F7]"
              }`}
              onClick={() => handleIndustrySelect(industry.text)}
            >
              <span className="text-2xl">{industry.emoji}</span>
              <span className="font-funnel text-lg">{industry.text}</span>
            </button>
          ))}
        </div>

        {/* Confirm Button */}
        <div className="flex justify-center mt-8">
          <button
            className="bg-[#C4BDED] hover:bg-[#ACA3E3] text-gray-700 py-3 px-6 rounded-xl font-semibold text-lg transition duration-300"
            onClick={handleConfirm} // Call the handleConfirm function here
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
