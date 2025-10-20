import { useState, useEffect, useRef } from "react";

const CreateSUSQuestion = ({ form, formId }) => {
  const API_URL = process.env.REACT_APP_API_URL;

    const defaultQuestions = [
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

    const [susQuestions, setSusQuestions] = useState(defaultQuestions);
    const [message, setMessage] = useState("");

    const handleQuestionChange = (index, value) => {
        const updatedQuestions = [...susQuestions];
        updatedQuestions[index] = value;
        setSusQuestions(updatedQuestions);
    };

    const handleSubmit = async () => {
        try {
        const response = await fetch(`${API_URL}/api/${formId}/sus-questions/`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ questions: susQuestions }),
        });

        const data = await response.json();

        if (response.ok) {
            setMessage("✅ " + data.message);
        } else {
            setMessage("❌ " + data.error || "Something went wrong");
        }
        } catch (error) {
        setMessage("❌ Failed to submit questions.");
        }
    };

    return (
        <div className="flex h-screen overflow-hidden">
          <div className="flex-grow overflow-y-auto">
            <div className="mx-80 my-10 px-32">
              <div className="flex flex-col">
                <h2 className="mx-3 px-4 pt-3 text-lg font-bold font-funnel">SUS Form Information</h2>
                <div className="font-funnel mt-3 mx-3 p-4 bg-white rounded-lg shadow-lg">
                  <div className="mb-2">
                    <p className="font-semibold text-gray-600 mb-1">Title:</p>
                    <div className="bg-gray-50 border border-gray-100 rounded-lg px-4 py-2 text-gray-800">
                        {form.susform_title}
                    </div>
                  </div>
                  {/* <p className="mt-2 mb-2 font-funnel">Id: {form.id}</p> */}
                  <div className="mb-2">
                    <p className="font-semibold text-gray-600 mb-1">Description:</p>
                    <div className="bg-gray-50 border border-gray-100 rounded-lg px-4 py-2 text-gray-800">
                        {form.susform_description}
                    </div>
                  </div>
                </div>
              </div>
    
              <div className="flex flex-col">
                <h2 className="mx-3 px-4 pt-3 text-lg font-bold font-funnel">10 SUS Questions</h2>
                <div className="mt-3 mx-3 p-4 font-funnel bg-white rounded-lg shadow-lg">
                  <p className="mt-2 mb-4">Please add your system name in place of "the system" in the following ten SUS questions.</p>
    
                  {susQuestions.map((question, index) => (
                    <div key={index} className="flex items-center my-2">
                      <span className="font-semibold mr-5 min-w-[20px] text-right">{index + 1}.</span>
                      <textarea
                        value={question}
                        onChange={(e) => handleQuestionChange(index, e.target.value)}
                        className="flex-grow p-2 border rounded-lg"
                      />
                    </div>
                  ))}

                  <div className="flex justify-end">
                    <button
                      onClick={handleSubmit}
                      className="mt-4 bg-[#C4BDED] text-black px-6 py-3 rounded-lg hover:bg-[#ACA3E3] transition"
                    >
                      Create Questions
                    </button>
                  </div>
                  
    
                  {message && <p className="mt-3 text-sm">{message}</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
    );
};

export default CreateSUSQuestion;
