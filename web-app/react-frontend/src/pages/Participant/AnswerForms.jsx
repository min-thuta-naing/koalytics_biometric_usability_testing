// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";

// const AnswerForm = () => {
//     const { formId } = useParams();
//     const [questions, setQuestions] = useState([]);

//     useEffect(() => {
//         fetch(`http://127.0.0.1:8000/api/forms/${formId}/questions/list/`) // Update with actual backend URL
//             .then(response => response.json())
//             .then(data => setQuestions(data))
//             .catch(error => console.error("Error fetching questions:", error));
//     }, [formId]);

//     return (
//         <div className="min-h-screen bg-[#F0EEED] p-8">
//             <h1 className="text-xl font-bold mb-6">Form Questions</h1>
//             <div className="grid grid-cols-2 gap-6">
//                 {questions.map(q => (
//                     <div key={q.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-400">
//                         <h3 className="font-semibold">{q.question_text}</h3>
//                         <p className="text-gray-500 mt-2">Type: {q.question_type}</p>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default AnswerForm;

// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";

// const AnswerForm = () => {
//     const { formId } = useParams();
//     const [questions, setQuestions] = useState([]);
//     const [answers, setAnswers] = useState({});

//     useEffect(() => {
//         fetch(`http://127.0.0.1:8000/api/forms/${formId}/questions/list/`) // Update with actual backend URL
//             .then(response => response.json())
//             .then(data => setQuestions(data))
//             .catch(error => console.error("Error fetching questions:", error));
//     }, [formId]);

//     // Handle answer changes
//     const handleAnswerChange = (questionId, value) => {
//         setAnswers(prev => ({ ...prev, [questionId]: value }));
//     };

//     return (
//         <div className="min-h-screen bg-[#F0EEED] p-8 flex flex-col items-center">
//             <h1 className="text-xl font-bold mb-6">Answer the Questions</h1>

//             <div className="w-full max-w-2xl flex flex-col gap-6">
//                 {questions.map(q => (
//                     <div key={q.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-400 w-full">
//                         <h3 className="font-semibold">{q.question_text}</h3>

//                         {/* Text Question */}
//                         {q.question_type === "text" && (
//                             <input
//                                 type="text"
//                                 className="w-full mt-3 p-2 border border-gray-400 rounded-lg"
//                                 placeholder="Your answer..."
//                                 value={answers[q.id] || ""}
//                                 onChange={(e) => handleAnswerChange(q.id, e.target.value)}
//                             />
//                         )}

//                         {/* Rating Question */}
//                         {q.question_type === "rating" && (
//                             <div className="mt-3 flex flex-col items-center">
//                                 <div className="flex justify-between w-full">
//                                     {[1, 2, 3, 4, 5].map((num) => (
//                                         <button
//                                             key={num}
//                                             onClick={() => handleAnswerChange(q.id, num)}
//                                             className={`w-12 h-12 flex items-center justify-center border rounded-full text-lg ${
//                                                 answers[q.id] === num ? "bg-blue-500 text-white" : "border-gray-500"
//                                             }`}
//                                         >
//                                             {num}
//                                         </button>
//                                     ))}
//                                 </div>
//                                 {/* Labels under rating scale */}
//                                 <div className="flex justify-between text-center text-xs text-gray-600 mt-2 w-full">
//                                     <span>Strongly Disagree</span>
//                                     <span>Somewhat Disagree</span>
//                                     <span>Neutral</span>
//                                     <span>Somewhat Agree</span>
//                                     <span>Strongly Agree</span>
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default AnswerForm;


import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

const AnswerForm = () => {
    const { formId } = useParams();
    const [questions, setQuestions] = useState([]);
    const [consentText, setConsentText] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [answers, setAnswers] = useState({});
    const userEmail = localStorage.getItem("userEmail"); // Get logged-in user email
    const [showPopup, setShowPopup] = useState(true); 
    const [checkboxChecked, setCheckboxChecked] = useState(false);
    const [scrolledToBottom, setScrolledToBottom] = useState(false);


    const userData = localStorage.getItem("user");
    if (userData) {
        const parsedUser = JSON.parse(userData); // Convert JSON string to object
        const userEmail = parsedUser.email; // Extract the email
        console.log("Extracted email:", userEmail);
    } else {
        console.log("User not found in localStorage!");
    }

    //fetch the consent 
    useEffect(() => {
        const fetchConsent = async () => {
            try {
                const response = await fetch(`/forms/${formId}/consent/`);
                if (!response.ok) {
                    throw new Error('Consent not found');
                }
                const data = await response.json();
                console.log('Consent data:', data); // Log the consent data to ensure it's correct
                setConsentText(data.consent_text); // Assuming 'consent_text' is in the response
            } catch (error) {
                console.error('Error fetching consent:', error); // Log any errors
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
    
        fetchConsent();
    }, [formId]);
    
    //fetch the question list 
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/forms/${formId}/questions/list/`)
            .then(response => response.json())
            .then(data => setQuestions(data))
            .catch(error => console.error("Error fetching questions:", error));
    }, [formId]);


    // Function to handle checkbox change
    const handleCheckboxChange = () => {
        setCheckboxChecked(!checkboxChecked);
    };

    // Function to handle scroll event
    const handleScroll = (e) => {
        const scrollableDiv = e.target;
        setScrolledToBottom(
            scrollableDiv.scrollHeight - scrollableDiv.scrollTop === scrollableDiv.clientHeight
        );
    };


    // handle answer input change 
    const handleAnswerChange = (questionId, value) => {
        setAnswers(prev => ({ ...prev, [questionId]: value }));
    };

    // Submit Answers
    const submitAnswers = async () => {
        const userData = localStorage.getItem("user");
    
        if (!userData) {
            console.error("User data not found in localStorage!");
            alert("Error: You are not logged in.");
            return;
        }
    
        const parsedUser = JSON.parse(userData);
        const userEmail = parsedUser.email; // Extract email
    
        if (!userEmail) {
            console.error("User email is missing in stored data!");
            alert("Error: Could not retrieve user email.");
            return;
        }
    
        console.log("Submitting answers for user:", userEmail); // Debugging
    
        for (const questionId in answers) {
            const answerData = {
                participant_email: userEmail,
                answer_text: answers[questionId]
            };
    
            try {
                const response = await fetch(`http://127.0.0.1:8000/questions/${questionId}/answers/`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(answerData)
                });
    
                const data = await response.json();
                console.log("Answer submitted:", data);
            } catch (error) {
                console.error("Error submitting answer:", error);
            }
        }
    
        alert("Answers submitted successfully!");
    };
    

    return (
        <div className="min-h-screen bg-[#F0EEED] p-8 flex flex-col items-center">

            {/* Popup */}
            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center w-full max-w-2xl">
                        <h2 className="text-lg font-funnel font-bold mb-4">Welcome to the Survey</h2>
                        <p className="font-funnel">Please take a moment to read the following consent forms</p>
                        <div className="max-h-96 overflow-y-auto p-4 bg-gray-100 rounded-lg my-4 text-left" onScroll={handleScroll}>
                            <ReactMarkdown
                                children={consentText}
                                rehypePlugins={[rehypeRaw]} // Allows raw HTML within the markdown
                                remarkPlugins={[remarkGfm]} // Allows GitHub Flavored Markdown (tables, strikethrough, etc.)
                                components={{
                                    // Add Tailwind classes to rendered elements
                                    h1: ({ node, ...props }) => <h1 className="text-3xl font-bold my-4" {...props} />,
                                    h2: ({ node, ...props }) => <h2 className="text-2xl font-bold my-3" {...props} />,
                                    ul: ({ node, ...props }) => <ul className="list-disc list-inside my-2" {...props} />,
                                    li: ({ node, ...props }) => <li className="my-1" {...props} />,
                                }}
                            />
                        </div>

                        {/* Checkbox and consent message */}
                        <div className="my-4">
                            <label className="flex items-center text-sm">
                                <input
                                    type="checkbox"
                                    checked={checkboxChecked}
                                    onChange={handleCheckboxChange}
                                    className="mr-2"
                                />
                                I agree, I consent to answer the survey.
                            </label>
                        </div>

                        {/* Close button */}
                        <button
                            onClick={() => setShowPopup(false)}
                            disabled={!checkboxChecked || !scrolledToBottom} // Disable button until checkbox is checked and scrolled to bottom
                            className={`mt-4 ${!checkboxChecked || !scrolledToBottom ? 'bg-gray-400' : 'bg-blue-600'} text-white px-4 py-2 rounded-lg`}
                        >
                            Close
                        </button>

                        {/* <button
                            onClick={() => setShowPopup(false)}
                            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
                        >
                            Close
                        </button> */}
                    </div>
                </div>
            )}

            <h1 className="text-xl font-bold mb-6">Answer the Questions</h1>

            <div className="w-full max-w-2xl flex flex-col gap-6">
                {questions.map(q => (
                    <div key={q.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-400 w-full">
                        <h3 className="font-semibold">{q.question_text}</h3>

                        {/* Text Question */}
                        {q.question_type === "text" && (
                            <input
                                type="text"
                                className="w-full mt-3 p-2 border border-gray-400 rounded-lg"
                                placeholder="Your answer..."
                                value={answers[q.id] || ""}
                                onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                            />
                        )}

                        {/* Rating Question */}
                        {q.question_type === "rating" && (
                            <div className="mt-3 flex flex-col items-center w-full">
                                <div className="flex justify-between w-full">
                                    {[1, 2, 3, 4, 5].map((num) => (
                                        <div key={num} className="flex flex-col items-center w-1/5">
                                            {/* Circle Button */}
                                            <button
                                                onClick={() => handleAnswerChange(q.id, num)}
                                                className={`w-10 h-10 flex items-center justify-center border rounded-full text-lg ${
                                                    answers[q.id] === num ? "bg-blue-500 text-white" : "border-gray-500"
                                                }`}
                                            >
                                                {num}
                                            </button>
                                            {/* Labels */}
                                            <span className="text-xs mt-1 text-gray-600 text-center">
                                                {num === 1 && "Strongly Disagree"}
                                                {num === 2 && "Somewhat Disagree"}
                                                {num === 3 && "Neutral"}
                                                {num === 4 && "Somewhat Agree"}
                                                {num === 5 && "Strongly Agree"}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <button
                onClick={submitAnswers}
                className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700"
            >
                Submit Answers
            </button>

        </div>
    );
};

export default AnswerForm;