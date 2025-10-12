import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HobbyQuestion() {
  const [selectedHobbies, setSelectedHobbies] = useState([]);
  const navigate = useNavigate();

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

  // const handleConfirm = async () => {
  //   try {
  //     const userId = localStorage.getItem('user_id');
      
  //     if (!userId) {
  //       alert('User ID not found. Please sign up again.');
  //       navigate("/signup");
  //       return;
  //     }

  //     const response = await fetch(`/api/save-hobbies/${userId}/`, {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ hobbies: selectedHobbies }),
  //     });

  //     if (response.ok) {
  //       alert('Hobbies saved successfully!');
  //       navigate("/question2");
  //     } else {
  //       const data = await response.json();
  //       alert(`Error: ${data.error}`);
  //     }
  //   } catch (error) {
  //     alert('Something went wrong. Please try again.');
  //     console.error('Save Hobbies Error:', error);
  //   }
  // };

  const handleConfirm = async () => {
    try {
      // Get user data from localStorage
      const storedUser = localStorage.getItem("user");
      let userId;
      
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        // Handle both nested and direct user structures
        if (userData.user && userData.user.id) {
          userId = userData.user.id;
        } else if (userData.id) {
          userId = userData.id;
        } else {
          // Try to get from user_id storage
          userId = localStorage.getItem('user_id');
        }
      } else {
        // Fallback to user_id
        userId = localStorage.getItem('user_id');
      }
      
      if (!userId) {
        alert('User ID not found. Please sign up again.');
        navigate("/signup");
        return;
      }

      const response = await fetch(`/api/save-hobbies/${userId}/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hobbies: selectedHobbies }),
      });

      if (response.ok) {
        alert('Hobbies saved successfully!');
        navigate("/question2");
      } else {
        const data = await response.json();
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      alert('Something went wrong. Please try again.');
      console.error('Save Hobbies Error:', error);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-[#F0EEED] p-4">
      <div className="w-full max-w-3xl flex items-center justify-between mt-8 mb-8">
        <button
          className="text-gray-500 font-semibold hover:underline"
          onClick={() => navigate("/signup")}
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

      <div className="w-full max-w-3xl h-[70vh] p-10 bg-white shadow-md rounded-md flex flex-col justify-center items-center mt-8">
        <p className="text-2xl font-funnel font-semibold text-gray-700 mb-6 text-center">
          What is your favorite hobby?
        </p>

        <div className="flex flex-wrap gap-6 justify-center mb-8">
          {hobbies.map((hobby) => (
            <button
              key={hobby.text}
              className={`inline-flex items-center gap-2 border-2 rounded-full font-semibold transition duration-300 px-6 py-3 ${
                selectedHobbies.includes(hobby.text)
                  ? "bg-[#4A90E2] text-white"
                  : "border-gray-400 text-gray-500 hover:bg-[#DCD6F7]"
              }`}
              onClick={() => handleHobbySelect(hobby.text)}
            >
              <span className="text-2xl">{hobby.emoji}</span>
              <span className="font-funnel text-lg">{hobby.text}</span>
            </button>
          ))}
        </div>

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
