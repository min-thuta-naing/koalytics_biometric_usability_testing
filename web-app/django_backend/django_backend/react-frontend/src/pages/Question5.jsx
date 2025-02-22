import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function IndustryQuestion() {
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

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-[#EEF2FF] p-4">
      {/* Progress Bar and Navigation */}
      <div className="w-full max-w-3xl flex items-center justify-between mt-8 mb-8">
        <button
          className="text-[#4A90E2] font-semibold hover:underline"
          onClick={() => navigate("/question4")} // Navigate back to Question 4
        >
          ← Back
        </button>
        <div className="flex-grow h-3 mx-4 bg-gray-300 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#4A90E2] transition-all"
            style={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}
          />
        </div>
        <span className="text-gray-600">{`${currentQuestion}/${totalQuestions}`}</span>
      </div>

      {/* Question Box */}
      <div className="w-full max-w-3xl p-10 bg-white shadow-md rounded-md flex flex-col justify-center items-center mt-8">
        <p className="text-2xl font-semibold text-gray-700 mb-6 text-center">
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
                  : "border-[#4A90E2] text-[#4A90E2] hover:bg-[#f0f0f0]"
              }`}
              onClick={() => handleIndustrySelect(industry.text)}
            >
              <span className="text-2xl">{industry.emoji}</span>
              <span className="text-lg">{industry.text}</span>
            </button>
          ))}
        </div>

        {/* Confirm Button */}
        <div className="flex justify-center mt-8">
          <button
            className="bg-[#4A90E2] hover:bg-[#357ABD] text-white py-3 px-6 rounded-xl font-semibold text-lg transition duration-300"
            onClick={() => alert(`Selected Industry: ${selectedIndustry.join(", ") || "None"}`)}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
