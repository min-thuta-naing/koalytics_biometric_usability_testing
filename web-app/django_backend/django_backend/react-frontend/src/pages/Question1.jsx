import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function HobbyQuestion() {
  const [selectedHobbies, setSelectedHobbies] = useState([]);
  const navigate = useNavigate(); // Initialize navigate function

  const currentQuestion = 1;
  const totalQuestions = 5;

  const hobbies = [
    { emoji: "🏀", text: "Sports and Fitness" },
    { emoji: "🎷", text: "Music and Performing Arts" },
    { emoji: "📖", text: "Reading and Writing" },
    { emoji: "🧗", text: "Outdoor Activities" },
    { emoji: "🎮", text: "Technology and Gaming" },
    { emoji: "🍞", text: "Cooking and Baking" },
    { emoji: "🚞", text: "Travel and Adventure" },
    { emoji: "➿", text: "Other Interests" },
  ];

  const handleHobbySelect = (hobbyText) => {
    setSelectedHobbies((prevHobbies) =>
      prevHobbies.includes(hobbyText)
        ? prevHobbies.filter((hobby) => hobby !== hobbyText)
        : [...prevHobbies, hobbyText]
    );
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-[#EEF2FF] p-4">
      {/* Progress Bar and Navigation */}
      <div className="w-full max-w-3xl flex items-center justify-between mt-8 mb-8">
      <button
          className="text-[#4A90E2] font-semibold hover:underline"
          onClick={() => navigate("/signup")} // Navigate back to SignUp page
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
          What is your favorite hobby?
        </p>

        {/* Hobby Selection */}
        <div className="flex flex-wrap gap-6 justify-center mb-8">
          {hobbies.map((hobby) => (
            <button
              key={hobby.text}
              className={`inline-flex items-center gap-2 border-2 rounded-full font-semibold transition duration-300 px-6 py-3 ${
                selectedHobbies.includes(hobby.text)
                  ? "bg-[#4A90E2] text-white"
                  : "border-[#4A90E2] text-[#4A90E2] hover:bg-[#f0f0f0]"
              }`}
              onClick={() => handleHobbySelect(hobby.text)}
            >
              <span className="text-2xl">{hobby.emoji}</span>
              <span className="text-lg">{hobby.text}</span>
            </button>
          ))}
        </div>

        {/* Confirm Button */}
        <div className="flex justify-center mt-8">
          <button
            className="bg-[#4A90E2] hover:bg-[#357ABD] text-white py-3 px-6 rounded-xl font-semibold text-lg transition duration-300"
            onClick={() => navigate("/question2")} // Navigate to Question 2
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
