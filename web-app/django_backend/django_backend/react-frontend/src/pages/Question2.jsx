import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function EmploymentStatusQuestion() {
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

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-[#EEF2FF] p-4">
      {/* Progress Bar and Navigation */}
      <div className="w-full max-w-3xl flex items-center justify-between mt-8 mb-8">
        <button
          className="text-[#4A90E2] font-semibold hover:underline"
          onClick={() => navigate("/question1")} // Navigate back to Question 1
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
      <div className="w-full max-w-3xl h-[70vh] p-10 bg-white shadow-md rounded-md flex flex-col justify-center items-center mt-8">
        <p className="text-2xl font-semibold text-gray-700 mb-6 text-center">
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
                  : "border-[#4A90E2] text-[#4A90E2] hover:bg-[#f0f0f0]"
              }`}
              onClick={() => handleStatusSelect(status.text)}
            >
              <span className="text-2xl">{status.emoji}</span>
              <span className="text-lg">{status.text}</span>
            </button>
          ))}
        </div>

        {/* Confirm Button */}
        <div className="flex justify-center mt-8">
          <button
            className="bg-[#4A90E2] hover:bg-[#357ABD] text-white py-3 px-6 rounded-xl font-semibold text-lg transition duration-300"
            onClick={() => navigate("/question3")}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
