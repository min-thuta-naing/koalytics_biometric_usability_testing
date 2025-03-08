// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// const FormDetail = () => {
//   const { formId } = useParams(); // Get form ID from URL
//   const [form, setForm] = useState(null);
//   const [error, setError] = useState("");
//   const [questionText, setQuestionText] = useState("");
//   const [questionType, setQuestionType] = useState("text");
//   const [questions, setQuestions] = useState([]);

//   // Fetch form details
//   useEffect(() => {
//     const fetchFormDetails = async () => {
//       try {
//         const response = await fetch(`http://127.0.0.1:8000/api/forms/${formId}/`);
//         if (!response.ok) {
//           throw new Error("Failed to fetch form details.");
//         }
//         const data = await response.json();
//         setForm(data);
//       } catch (err) {
//         setError(err.message);
//       }
//     };

//     fetchFormDetails();
//   }, [formId]);

//   // Fetch questions for the form
//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const response = await fetch(`http://127.0.0.1:8000/api/forms/${formId}/questions/list/`);
//         if (!response.ok) {
//           throw new Error("Failed to fetch questions.");
//         }
//         const data = await response.json();
//         setQuestions(data);
//       } catch (err) {
//         setError(err.message);
//       }
//     };

//     fetchQuestions();
//   }, [formId]);

//   // Send a single question to backend
//   const handleAddQuestion = async () => {
//     if (!questionText.trim()) return alert("Question text cannot be empty!");

//     try {
//       const response = await fetch(`http://127.0.0.1:8000/api/forms/${formId}/questions/`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           question_text: questionText,
//           question_type: questionType,
//         }),
//       });

//       if (!response.ok) {
//         const errorMessage = await response.json();
//         throw new Error(errorMessage.error || "Failed to save question.");
//       }

//       const newQuestion = await response.json();
//       setQuestions((prevQuestions) => [...prevQuestions, newQuestion]); // Append new question
//       setQuestionText(""); // Clear input

//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   if (error) return <p className="text-red-500">{error}</p>;
//   if (!form) return <p>Loading...</p>;

//   return (
//     <div className="bg-[#F0EEED] h-screen">
//       <div className="p-8 border-b border-gray-400">
//         <p className="font-funnel font-3xl">{form.id}</p>
//         <p className="font-funnel font-3xl">{form.title}</p>
//       </div>

//       <div className="flex gap-8 p-4 mx-10">
//         {/* Column 1: Add Question */}
//         <div className="w-1/3 bg-[#DCD6F7] p-4 rounded-xl shadow-xl">
//           <h2 className="text-lg font-funnel font-bold">Add Question</h2>
//           <div className="mt-6 mx-8">
//             <input
//               type="text"
//               placeholder="Enter question"
//               value={questionText}
//               onChange={(e) => setQuestionText(e.target.value)}
//               className="w-full p-2 border rounded-lg my-2"
//             />
//             <select
//               value={questionType}
//               onChange={(e) => setQuestionType(e.target.value)}
//               className="w-full p-2 border rounded-lg"
//             >
//               <option value="text">Text</option>
//               <option value="mcq">Multiple Choice</option>
//               <option value="rating">Rating</option>
//             </select>
//             <button
//               onClick={handleAddQuestion}
//               className="mt-2 bg-blue-500 text-white px-4 py-2 rounded justify-items-end"
//             >
//               Add Question
//             </button>
//           </div>
//         </div>

//         {/* Column 2: Display Questions from Backend */}
//         <div className="w-2/3 bg-[#DCD6F7] p-4 rounded-xl shadow-xl">
//           <h2 className="text-lg font-funnel font-bold">Questions Preview</h2>
//           <div className="px-6 py-6 mt-6 mx-8 rounded-xl bg-white shadow-inner-xl h-[500px] overflow-y-auto">
//             {questions.length === 0 ? (
//               <p>No questions available.</p>
//             ) : (
//               <ul>
//                 {questions.map((q) => (
//                   <li key={q.id} className="border border-gray-400 py-3 px-2 my-2 rounded-xl bg-[#F0EEED]">
//                     <div className="p-2 ">
//                       <p className="font-semibold pb-4">{q.question_text}</p>
//                       {/* Render different inputs based on question type */}
//                       {q.question_type === "text" && (
//                         <input
//                           type="text"
//                           placeholder="Your answer..."
//                           className="w-full p-2 border border-gray-400 rounded-xl mt-2"
//                           disabled
//                         />
//                       )}

//                       {/* {q.question_type === "rating" && (
//                         <div className="flex gap-2 mt-2">
//                           {[1, 2, 3, 4, 5].map((num) => (
//                             <label key={num} className="cursor-pointer">
//                               <input type="radio" name={`rating-${q.id}`} disabled />
//                               <span className="ml-1">{num}</span>
//                             </label>
//                           ))}
//                         </div>
//                       )}     */}
//                       {q.question_type === "rating" && (
//                         <div className="flex flex-col items-center mt-2 w-full">
//                           {/* Likert Scale */}
//                           <div className="flex justify-between w-full">
//                             {[1, 2, 3, 4, 5].map((num) => (
//                               <div key={num} className="flex flex-col items-center w-1/5">
//                                 {/* Circle Button */}
//                                 <div className="w-10 h-10 flex items-center justify-center border border-gray-500 rounded-full text-lg">
//                                   {num}
//                                 </div>
//                                 {/* Labels */}
//                                 <span className="text-xs mt-1 text-gray-600 text-center">
//                                   {num === 1 && "Strongly Disagree"}
//                                   {num === 2 && "Somewhat Disagree"}
//                                   {num === 3 && "Neutral"}
//                                   {num === 4 && "Somewhat Agree"}
//                                   {num === 5 && "Strongly Agree"}
//                                 </span>
//                               </div>
//                             ))}
//                           </div>
//                         </div>
//                       )}

//                     </div>
                    
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
          
//         </div>

//       </div>
//     </div>
//   );
// };

// export default FormDetail;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CreateQuestions from "./CreateQuestions";
import ViewResults from "./ViewResults";

const FormDetail = () => {
  const { formId } = useParams(); // Get form ID from URL
  const [form, setForm] = useState(null);
  const [error, setError] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [questionType, setQuestionType] = useState("text");
  const [questions, setQuestions] = useState([]);
  const [view, setView] = useState("create"); // "create" or "results"

  // Fetch form details
  useEffect(() => {
    const fetchFormDetails = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/forms/${formId}/`);
        if (!response.ok) {
          throw new Error("Failed to fetch form details.");
        }
        const data = await response.json();
        setForm(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchFormDetails();
  }, [formId]);

  // Fetch questions for the form
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/forms/${formId}/questions/list/`);
        if (!response.ok) {
          throw new Error("Failed to fetch questions.");
        }
        const data = await response.json();
        setQuestions(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchQuestions();
  }, [formId]);

  // Send a single question to backend
  const handleAddQuestion = async () => {
    if (!questionText.trim()) return alert("Question text cannot be empty!");

    try {
      const response = await fetch(`http://127.0.0.1:8000/forms/${formId}/questions/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question_text: questionText,
          question_type: questionType,
        }),
      });

      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.error || "Failed to save question.");
      }

      const newQuestion = await response.json();
      setQuestions((prevQuestions) => [...prevQuestions, newQuestion]); // Append new question
      setQuestionText(""); // Clear input

    } catch (err) {
      setError(err.message);
    }
  };

  if (error) return <p className="text-red-500">{error}</p>;
  if (!form) return <p>Loading...</p>;

  return (
    <div className="bg-[#F0EEED] h-screen">
      <div className="p-8 border-b border-gray-400">
        <p className="font-funnel font-3xl">{form.id}</p>
        <p className="font-funnel font-3xl">{form.title}</p>
      </div>

      {/* Toggle between Create Questions and View Results */}
      <div className="flex justify-center mt-8 mb-4">
        <button
          onClick={() => setView("create")}
          className={`px-6 py-2 mr-4 rounded-3xl ${view === "create" ? "bg-[#ACA3E3] font-funnel text-sm text-black" : "font-funnel text-sm border border-[#ACA3E3]"}`}
        >
          Create Questions
        </button>
        <button
          onClick={() => setView("results")}
          className={`px-6 py-2 rounded-3xl ${view === "results" ? "bg-[#ACA3E3] font-funnel text-sm text-black" : "font-funnel text-sm border border-[#ACA3E3]"}`}
        >
          View Results
        </button>
      </div>

      {/* Conditionally render based on selected view */}
      {view === "create" ? (
        <CreateQuestions
          formId={formId}
          questions={questions}
          setQuestions={setQuestions}
          questionText={questionText}
          setQuestionText={setQuestionText}
          questionType={questionType}
          setQuestionType={setQuestionType}
          handleAddQuestion={handleAddQuestion}
        />
      ) : (
        <ViewResults />
      )}
    </div>
  );
};

export default FormDetail;
