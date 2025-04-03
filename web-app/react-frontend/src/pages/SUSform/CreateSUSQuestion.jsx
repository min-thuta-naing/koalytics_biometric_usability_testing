// CreateQuestions.js
import { useState, useEffect, useRef } from "react";

const CreateSUSQuestion = ({ form, formId, handleShareForm, questions, setQuestions, questionText, setQuestionText, questionType, setQuestionType, handleAddQuestion }) => {

    const susQuestions = [
        "I think that I would like to use this system frequently.",
        "I found the system unnecessarily complex.",
        "I thought the system was easy to use.",
        "I think that I would need the support of a technical person to be able to use this system.",
        "I found the various functions in this system were well integrated.",
        "I thought there was too much inconsistency in this system.",
        "I would imagine that most people would learn to use this system very quickly.",
        "I found the system very cumbersome to use.",
        "I felt very confident using the system.",
        "I needed to learn a lot of things before I could get going with this system.",
    ];

    return (
        <div className="flex h-screen overflow-hidden">
            <div className="flex-grow overflow-y-auto">
                <div className="mx-80 my-10 px-32">
                    <div className="flex flex-col">
                        <h2 className="mx-3 px-4 pt-3 text-lg font-bold font-funnel">SUS Form Information</h2>
                        <div className="mt-3 mx-3 p-4 bg-white rounded-lg shadow-lg">
                            <p className="mt-2 mb-2 font-funnel">Id: {form.id}</p>
                            <p className="mt-2 mb-2 font-funnel">Title: {form.susform_title}</p>
                            <p className="mt-2 mb-2 font-funnel">Description: {form.susform_description}</p>
                        </div>
                    </div>
        
                    <div className="flex flex-col">
                        <h2 className="mx-3 px-4 pt-3 text-lg font-bold font-funnel">10 SUS Questions</h2>
                        <div className="mt-3 mx-3 p-4 font-funnel bg-white rounded-lg shadow-lg">
                            <p className="mt-2 mb-4 ">Please add your system name in place of "the system" in the following ten SUS questions.</p>
                            
                            {susQuestions.map((question, index) => (
                                <div key={index} className="flex items-center my-2">
                                    <span className="font-semibold mr-5 min-w-[20px] text-right">{index + 1}.</span>
                                    <textarea
                                    defaultValue={question}
                                    className="flex-grow p-2 border rounded-lg"
                                    />
                                </div>
                            ))}
            
                            <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
                            Add Question
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateSUSQuestion;
