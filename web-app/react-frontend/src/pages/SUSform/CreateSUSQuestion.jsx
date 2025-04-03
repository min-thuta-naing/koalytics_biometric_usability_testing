// CreateQuestions.js
import { useState, useEffect, useRef } from "react";
import {Trash2} from "lucide-react"; 

const CreateSUSQuestion = ({ form, formId, handleShareForm, questions, setQuestions, questionText, setQuestionText, questionType, setQuestionType, handleAddQuestion, onSave }) => {

    // for the progress bar steps 
    const [step, setStep] = useState(1);
    const steps = ["Add Consent", "Add Questions", "Share"];
    const previews = ["Consent Preview", "Questions Preview", "Share"];

    // Function to delete a question
    const handleDeleteQuestion = async (questionId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this question?");
        if (!confirmDelete) return;

        try {
        const response = await fetch(`http://127.0.0.1:8000/forms/${formId}/questions/${questionId}/`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error("Failed to delete the question.");
        }

        // Update state by removing the deleted question
        setQuestions((prevQuestions) => prevQuestions.filter((q) => q.id !== questionId));

        } catch (error) {
        console.error("Error deleting question:", error);
        }
    };


    return (
        <div className="flex gap-8 p-4 mx-10 bg-[#F0EEED]">
            {/* Column 1: Adding quetion panel*/}
            <div className="w-2/4 h-[650px] bg-white p-4 rounded-lg shadow-xl relative flex flex-col">
                {/* Progress bar */}
                <div className="flex items-center justify-between mt-3 mb-6 relative">
                    {steps.map((label, index) => (
                        <div key={index} className="relative flex flex-col items-center w-1/3">
                        {/* Circle */}
                        <div
                            className={`w-10 h-10 flex items-center justify-center rounded-full font-bold z-10 ${
                            step >= index + 1 ? "bg-[#DCD6F7] text-black" : "bg-gray-200 text-gray-400"
                            }`}
                        >
                            {index + 1}
                        </div>

                        {/* Connecting line (only between circles) */}
                        {index !== 0 && (
                            <div
                                className={`absolute h-1 w-full top-5 -left-1/2 ${
                                step > index ? "bg-[#DCD6F7]" : "bg-gray-200"
                            }`}
                            />
                        )}

                        {/* Label */}
                        <span className="text-sm mt-1">{label}</span>
                        </div>
                    ))}
                </div>

                {/* 3 steps of column 1 */}
                <div className="flex-grow overflow-y-auto p-4">
                    {step === 1 && (
                        <div className="flex flex-col">
                            <div className="mt-3 mx-3 border border-gray-400 p-4 rounded-lg">
                                <h2 className="text-lg font-bold font-funnel">SUS Form Information</h2>

                                <p className="mt-2 mb-2 font-funnel">Id: {form.id}</p>
                                <p className="mt-2 mb-2 font-funnel">Title: {form.title}</p>


                                {/* <button
                                    className="mt-3 mx-3 bg-transparent border border-[#C4BDED] text-black px-4 py-2 rounded-lg self-end"
                                    onClick={() => setStep(2)}
                                >
                                    Next →
                                </button> */}
                                
                            </div>                          
                        </div>
                    )}

                    {step === 2 && (
                        <div className="flex flex-col">
                            <div className="mt-3 mx-3 border border-gray-400 p-4 rounded-lg">
                                <h2 className="text-lg font-bold">Add Question</h2>
                                <input
                                    type="text"
                                    placeholder="Enter question"
                                    value={questionText}
                                    onChange={(e) => setQuestionText(e.target.value)}
                                    className="w-full p-2 border rounded-lg my-2"
                                />
                                <select
                                    value={questionType}
                                    onChange={(e) => setQuestionType(e.target.value)}
                                    className="w-full p-2 border rounded-lg"
                                >
                                    <option value="text">Text</option>
                                    <option value="rating">Rating</option>
                                </select>
                                <button
                                    onClick={handleAddQuestion}
                                    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded justify-items-end"
                                >
                                    Add Question
                                </button>
                            </div>
                            {/* <div className="flex justify-between">
                                <button
                                    className="mt-3 mx-3 bg-transparent border border-[#C4BDED] text-black px-4 py-2 rounded-lg self-start"
                                    onClick={() => setStep(1)}
                                >
                                    ← Back
                                </button>
                                <button
                                    className="mt-3 mx-3 bg-transparent border border-[#C4BDED] text-black px-4 py-2 rounded-lg self-end"
                                    onClick={() => setStep(3)}
                                >
                                    Next →
                                </button>
                            </div> */}
                        </div>
                    )}

                    {step === 3 && (
                        <div className="flex flex-col">
                            <div className="mt-3 mx-3 border border-gray-400 p-4 rounded-lg">
                                <h2 className="text-lg font-bold">Add Something</h2>
                                <button
                                    onClick={handleShareForm}
                                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
                                >
                                    Share Form
                                </button>
                            </div>
                            {/* <button
                                className="mt-3 mx-3 bg-transparent border border-[#C4BDED] text-black px-4 py-2 rounded-lg self-start"
                                onClick={() => setStep(2)}
                            >
                                ← Back
                            </button> */}
                        </div>
                    )}
                </div>


                <div className={`p-4 mt-auto flex w-full ${step > 1 ? "justify-between" : "justify-end"}`}>
                    {step > 1 && (
                        <button
                            className="bg-transparent border border-[#C4BDED] text-black px-4 py-2 rounded-lg"
                            onClick={() => setStep(step - 1)}
                        >
                            ← Back
                        </button>
                    )}
                    {step < 3 && (
                        <button
                            className="bg-transparent border border-[#C4BDED] text-black px-4 py-2 rounded-lg"
                            onClick={() => setStep(step + 1)}
                        >
                            Next →
                        </button>
                    )}
                </div>



            </div>

            {/* Column 2: Display Questions from Backend */}
            <div className="w-2/4 h-[650px] bg-white p-4 rounded-lg shadow-xl">


            </div>
        </div>
    );
};

export default CreateSUSQuestion;
