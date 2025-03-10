import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function ProfessionQuestion() {
  const [selectedProfession, setSelectedProfession] = useState([]);
  const navigate = useNavigate(); // Initialize navigate function

  const currentQuestion = 3;
  const totalQuestions = 5;

  const professions = [
    { emoji: "🎓", text: "Student" },
    { emoji: "🏖️", text: "Retired" },
    { emoji: "🔍", text: "Looking for work" },
    { emoji: "🍵", text: "Unemployed" },
    { emoji: "💼", text: "Entrepreneur" },
    { emoji: "🤖", text: "Software Engineer/Developer" },
    { emoji: "🎨", text: "Designer/Artist" },
    { emoji: "📊", text: "Business Professional" },
    { emoji: "🏥", text: "Healthcare Professional" },
    { emoji: "👨‍🏫", text: "Teacher/Educator" },
    { emoji: "👩‍🔬", text: "Scientist/Researcher" },
    { emoji: "🖋️", text: "Freelancer/Contractor" },
    { emoji: "❓", text: "Others" },
  ];

  const handleProfessionSelect = (professionText) => {
    setSelectedProfession((prevProfession) =>
      prevProfession.includes(professionText)
        ? prevProfession.filter((item) => item !== professionText)
        : [...prevProfession, professionText]
    );
  };

  const handleConfirm = async () => {
    try {
      const userId = localStorage.getItem('user_id');
      
      if (!userId) {
        alert('User ID not found. Please sign up again.');
        navigate("/signup");
        return;
      }

      const response = await fetch(`/api/save_profession/${userId}/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profession: selectedProfession }),
      });

      if (response.ok) {
        alert('Profession saved successfully!');
        navigate("/question4");
      } else {
        const data = await response.json();
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      alert('Something went wrong. Please try again.');
      console.error('Save Profession Error:', error);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-[#F0EEED] p-4">
      {/* Progress Bar and Navigation */}
      <div className="w-full max-w-3xl flex items-center justify-between mt-8 mb-8">
        <button
          className="text-gray-500 font-semibold hover:underline"
          onClick={() => navigate("/question2")} // Navigate back to Question 2
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
        <p className="font-funnel text-2xl font-semibold text-gray-700 mb-6 text-center">
          What is your profession?
        </p>

        {/* Profession Selection */}
        <div className="flex flex-wrap gap-6 justify-center mb-8 max-h-80 overflow-y-auto">
          {professions.map((profession) => (
            <button
              key={profession.text}
              className={`inline-flex items-center gap-2 border-2 rounded-full font-semibold transition duration-300 px-6 py-3 ${
                selectedProfession.includes(profession.text)
                  ? "bg-[#4A90E2] text-white"
                  : "border-gray-400 text-gray-500 hover:bg-[#DCD6F7]"
              }`}
              onClick={() => handleProfessionSelect(profession.text)}
            >
              <span className="text-2xl">{profession.emoji}</span>
              <span className="font-funnel text-lg">{profession.text}</span>
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
