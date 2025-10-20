// // CreateQuestions.js not use this file
// import { useState, useEffect, useRef } from "react";
// import {Trash2} from "lucide-react"; 

// const CreateQuestions = ({ form, formId, handleShareForm, questions, setQuestions, questionText, setQuestionText, questionType, setQuestionType, handleAddQuestion, onSave }) => {

//     // for the progress bar steps 
//     const [step, setStep] = useState(1);
//     const steps = ["Add Consent", "Add Questions", "Share"];
//     const previews = ["Consent Preview", "Questions Preview", "Share"];

//     // Function to delete a question
//     const handleDeleteQuestion = async (questionId) => {
//         const confirmDelete = window.confirm("Are you sure you want to delete this question?");
//         if (!confirmDelete) return;

//         try {
//         const response = await fetch(`http://127.0.0.1:8000/forms/${formId}/questions/${questionId}/`, {
//             method: "DELETE",
//         });

//         if (!response.ok) {
//             throw new Error("Failed to delete the question.");
//         }

//         // Update state by removing the deleted question
//         setQuestions((prevQuestions) => prevQuestions.filter((q) => q.id !== questionId));

//         } catch (error) {
//         console.error("Error deleting question:", error);
//         }
//     };


//     return (
//         <div className="flex gap-8 p-4 mx-10 bg-[#F0EEED]">
//             {/* Column 1: Adding quetion panel*/}
//             <div className="w-1/3 h-[700px] bg-white p-4 rounded-xl shadow-xl relative flex flex-col">
//                 {/* Progress bar */}
//                 <div className="flex items-center justify-between mb-6 relative">
//                     {steps.map((label, index) => (
//                         <div key={index} className="relative flex flex-col items-center w-1/3">
//                         {/* Circle */}
//                         <div
//                             className={`w-10 h-10 flex items-center justify-center rounded-full font-bold z-10 ${
//                             step >= index + 1 ? "bg-[#DCD6F7] text-black" : "bg-gray-200 text-gray-400"
//                             }`}
//                         >
//                             {index + 1}
//                         </div>

//                         {/* Connecting line (only between circles) */}
//                         {index !== 0 && (
//                             <div
//                                 className={`absolute h-1 w-full top-5 -left-1/2 ${
//                                 step > index ? "bg-[#DCD6F7]" : "bg-gray-200"
//                             }`}
//                             />
//                         )}

//                         {/* Label */}
//                         <span className="text-sm mt-1">{label}</span>
//                         </div>
//                     ))}
//                 </div>

//                 {/* 3 steps of column 1 */}
//                 <div className="flex-grow overflow-y-auto p-4">
//                     {step === 1 && (
//                         <div className="flex flex-col">
//                             <div className="mt-3 mx-3 border border-gray-400 p-4 rounded-lg">
//                                 <h2 className="text-lg font-bold font-funnel">Add Consent</h2>

//                                 <p className="mt-2 mb-2 font-funnel">{form.id} - {form.title}</p>
                                
//                             </div>                          
//                         </div>
//                     )}

//                     {step === 2 && (
//                         <div className="flex flex-col">
//                             <div className="mt-3 mx-3 border border-gray-400 p-4 rounded-lg">
//                                 <h2 className="text-lg font-bold">Add Question</h2>
//                                 <input
//                                     type="text"
//                                     placeholder="Enter question"
//                                     value={questionText}
//                                     onChange={(e) => setQuestionText(e.target.value)}
//                                     className="w-full p-2 border rounded-lg my-2"
//                                 />
//                                 <select
//                                     value={questionType}
//                                     onChange={(e) => setQuestionType(e.target.value)}
//                                     className="w-full p-2 border rounded-lg"
//                                 >
//                                     <option value="text">Text</option>
//                                     <option value="rating">Rating</option>
//                                 </select>
//                                 <button
//                                     onClick={handleAddQuestion}
//                                     className="mt-2 bg-blue-500 text-white px-4 py-2 rounded justify-items-end"
//                                 >
//                                     Add Question
//                                 </button>
//                             </div>
//                             {/* <div className="flex justify-between">
//                                 <button
//                                     className="mt-3 mx-3 bg-transparent border border-[#C4BDED] text-black px-4 py-2 rounded-lg self-start"
//                                     onClick={() => setStep(1)}
//                                 >
//                                     ← Back
//                                 </button>
//                                 <button
//                                     className="mt-3 mx-3 bg-transparent border border-[#C4BDED] text-black px-4 py-2 rounded-lg self-end"
//                                     onClick={() => setStep(3)}
//                                 >
//                                     Next →
//                                 </button>
//                             </div> */}
//                         </div>
//                     )}

//                     {step === 3 && (
//                         <div className="flex flex-col">
//                             <div className="mt-3 mx-3 border border-gray-400 p-4 rounded-lg">
//                                 <h2 className="text-lg font-bold">Add Something</h2>
//                                 <button
//                                     onClick={handleShareForm}
//                                     className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
//                                 >
//                                     Share Form
//                                 </button>
//                             </div>
//                             {/* <button
//                                 className="mt-3 mx-3 bg-transparent border border-[#C4BDED] text-black px-4 py-2 rounded-lg self-start"
//                                 onClick={() => setStep(2)}
//                             >
//                                 ← Back
//                             </button> */}
//                         </div>
//                     )}
//                 </div>


//                 <div className={`p-4 mt-auto flex w-full ${step > 1 ? "justify-between" : "justify-end"}`}>
//                     {step > 1 && (
//                         <button
//                             className="bg-transparent border border-[#C4BDED] text-black px-4 py-2 rounded-lg"
//                             onClick={() => setStep(step - 1)}
//                         >
//                             ← Back
//                         </button>
//                     )}
//                     {step < 3 && (
//                         <button
//                             className="bg-transparent border border-[#C4BDED] text-black px-4 py-2 rounded-lg"
//                             onClick={() => setStep(step + 1)}
//                         >
//                             Next →
//                         </button>
//                     )}
//                 </div>



//             </div>

//             {/* Column 2: Display Questions from Backend */}
//             <div className="w-2/3 h-[700px] bg-white p-4 rounded-xl shadow-xl">

//                 {/* Progress bar */}
//                 <div className="flex items-center justify-between mb-6 relative">
//                     {previews.map((label, index) => (
//                         <div key={index} className="relative flex flex-col items-center w-1/3">
//                         {/* Circle */}
//                         <div
//                             className={`w-10 h-10 flex items-center justify-center rounded-full font-bold z-10 ${
//                             step >= index + 1 ? "bg-[#DCD6F7] text-black" : "bg-gray-200 text-gray-400"
//                             }`}
//                         >
//                             {index + 1}
//                         </div>

//                         {/* Connecting line (only between circles) */}
//                         {index !== 0 && (
//                             <div
//                             className={`absolute h-1 w-full top-5 -left-1/2 ${
//                                 step > index ? "bg-[#DCD6F7]" : "bg-gray-200"
//                             }`}
//                             />
//                         )}

//                         {/* Label */}
//                         <span className="text-sm mt-1">{label}</span>
//                         </div>
//                     ))}
//                 </div>

//                 {step === 1 && (
//                     <div> 
//                         <div className="mt-3 mx-3 border border-gray-400 p-4 rounded-lg">
//                             <h2 className="text-lg font-bold font-funnel">Consent Preview</h2>
                            
//                         </div>                        
//                     </div>
//                 )}

//                 {step === 2 && (
//                     <div> 
//                         <h2 className="text-lg font-funnel font-bold">Questions Preview</h2>
//                         <div className="px-6 py-6 mt-6 mx-8 rounded-xl bg-white shadow-inner-xl h-[450px] overflow-y-auto">
//                             {questions.length === 0 ? (
//                                 <p>No questions available.</p>
//                             ) : (
//                                 <ul className="space-y-2">
//                                     {questions.map((q) => (
//                                         <div className="flex gap-2">
//                                             {/* Left Side: Question Content */}
//                                             <div key={q.id} className="w-5/6 border border-gray-400 py-3 px-2 my-2 rounded-xl bg-[#F0EEED]">
                                                
//                                                 <div className="p-2">
//                                                     <p className="font-semibold pb-4">{q.question_text}</p>
//                                                     {/* Render different inputs based on question type */}
//                                                     {q.question_type === "text" && (
//                                                         <input
//                                                             type="text"
//                                                             placeholder="Your answer..."
//                                                             className="w-full p-2 border border-gray-400 rounded-xl mt-2"
//                                                             disabled
//                                                         />
//                                                     )}
//                                                     {q.question_type === "rating" && (
//                                                         <div className="flex flex-col items-center mt-2 w-full">
//                                                             {/* Likert Scale */}
//                                                             <div className="flex justify-between w-full">
//                                                                 {[1, 2, 3, 4, 5].map((num) => (
//                                                                     <div key={num} className="flex flex-col items-center w-1/5">
//                                                                         {/* Circle Button */}
//                                                                         <div className="w-10 h-10 flex items-center justify-center border border-gray-500 rounded-full text-lg">
//                                                                             {num}
//                                                                         </div>
//                                                                         {/* Labels */}
//                                                                         <span className="text-xs mt-1 text-gray-600 text-center">
//                                                                             {num === 1 && "Strongly Disagree"}
//                                                                             {num === 2 && "Somewhat Disagree"}
//                                                                             {num === 3 && "Neutral"}
//                                                                             {num === 4 && "Somewhat Agree"}
//                                                                             {num === 5 && "Strongly Agree"}
//                                                                         </span>
//                                                                     </div>
//                                                                 ))}
//                                                             </div>
//                                                         </div>
//                                                     )}
//                                                 </div>
//                                             </div>


//                                             {/* right side Delete Button */}
//                                             <div className="w-1/6 flex justify-center items-center"> 
//                                                 <button onClick={() => handleDeleteQuestion(q.id)}     className="w-10 h-10 flex items-center justify-center rounded-full bg-red-400 text-white hover:bg-red-500 transition duration-300"
//                                                 >
//                                                     <Trash2 size={24} />
//                                                 </button>
//                                             </div>

//                                         </div>
//                                     ))}
//                                 </ul>
//                             )}
                        
//                         </div>
//                     </div> 
//                 )}

//                 {step === 3 && (
//                     <div> 
//                         <div className="flex flex-col items-center justify-center"> 
//                             <img src="/static/images/share.png" alt="share the form" className="h-80 w-80" />
//                             <p className="text-xl font-funnel">Let's share the form!</p>
//                         </div>
//                     </div>
//                 )}

//             </div>
//         </div>
//     );
// };

// export default CreateQuestions;
