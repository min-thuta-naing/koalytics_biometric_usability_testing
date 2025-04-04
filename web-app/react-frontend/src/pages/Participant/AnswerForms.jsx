// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";

// const AnswerForm = () => {
//     const { formId } = useParams();
//     const [questions, setQuestions] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [answers, setAnswers] = useState({});
//     const userEmail = localStorage.getItem("userEmail"); // Get logged-in user email
//     const [showPopup, setShowPopup] = useState(true); 
//     const [checkboxChecked, setCheckboxChecked] = useState(false);


//     const userData = localStorage.getItem("user");
//     if (userData) {
//         const parsedUser = JSON.parse(userData); // Convert JSON string to object
//         const userEmail = parsedUser.email; // Extract the email
//         console.log("Extracted email:", userEmail);
//     } else {
//         console.log("User not found in localStorage!");
//     }
    
//     //fetch the question list 
//     useEffect(() => {
//         fetch(`http://127.0.0.1:8000/api/${formId}/sus-questions/list/`)
//             .then(response => response.json())
//             .then(data => setQuestions(data))
//             .catch(error => console.error("Error fetching questions:", error));
//     }, [formId]);


//     // handle answer input change 
//     const handleAnswerChange = (questionId, value) => {
//         setAnswers(prev => ({ ...prev, [questionId]: value }));
//     };

//     // Submit Answers
//     const submitAnswers = async () => {
//         const userData = localStorage.getItem("user");
    
//         if (!userData) {
//             console.error("User data not found in localStorage!");
//             alert("Error: You are not logged in.");
//             return;
//         }
    
//         const parsedUser = JSON.parse(userData);
//         const userEmail = parsedUser.email; // Extract email
    
//         if (!userEmail) {
//             console.error("User email is missing in stored data!");
//             alert("Error: Could not retrieve user email.");
//             return;
//         }
    
//         console.log("Submitting answers for user:", userEmail); // Debugging
    
//         for (const questionId in answers) {
//             const answerData = {
//                 participant_email: userEmail,
//                 answer_text: answers[questionId]
//             };
    
//             try {
//                 const response = await fetch(`http://127.0.0.1:8000/questions/${questionId}/answers/`, {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json"
//                     },
//                     body: JSON.stringify(answerData)
//                 });
    
//                 const data = await response.json();
//                 console.log("Answer submitted:", data);
//             } catch (error) {
//                 console.error("Error submitting answer:", error);
//             }
//         }
    
//         alert("Answers submitted successfully!");
//     };
    

//     return (
//         <div className="fixed inset-0 bg-[#F0EEED]"> {/* Fixed background covering whole screen */}
//             <div className="h-screen w-full flex flex-col items-center pt-8 font-funnel overflow-hidden">
//                 {/* Fixed header */}
//                 <div className="w-full max-w-2xl px-4">
//                     <h1 className="text-xl font-bold mb-4">System Usability Scale (SUS) Questionnaire</h1>
//                 </div>
            
//                 {/* Scrollable questions container */}
//                 <div className="w-full max-w-2xl flex-1 overflow-y-auto px-4">
//                     <h2 className="text-lg font-semibold mb-3">Answer the following ten questions.</h2>
//                     <div className="bg-white rounded-lg shadow-md border border-gray-400 p-6 mb-6">
//                     {questions.map((q, index) => (
//                         <div key={q.id} className="mb-10 last:mb-0"> {/* Increased margin-bottom from mb-8 to mb-10 */}
//                         <div className="flex items-start mb-4"> {/* Added flex container for number and question */}
//                             <span className="font-semibold mr-3 text-gray-700">{index + 1}.</span> {/* Question number */}
//                             <h3 className="font-semibold">{q.question_text}</h3>
//                         </div>
                        
//                         <div className="flex justify-between w-full">
//                             {[1, 2, 3, 4, 5].map((num) => (
//                             <div key={num} className="flex flex-col items-center w-1/5">
//                                 <button
//                                 onClick={() => handleAnswerChange(q.id, num)}
//                                 className={`w-10 h-10 flex items-center justify-center border rounded-full text-lg ${
//                                     answers[q.id] === num ? "bg-[#ACA3E3] text-black" : "border-gray-500"
//                                 }`}
//                                 >
//                                 {num}
//                                 </button>
//                                 <span className="text-xs mt-1 text-gray-600 text-center">
//                                 {num === 1 && "Strongly Disagree"}
//                                 {num === 2 && "Somewhat Disagree"}
//                                 {num === 3 && "Neutral"}
//                                 {num === 4 && "Somewhat Agree"}
//                                 {num === 5 && "Strongly Agree"}
//                                 </span>
//                             </div>
//                             ))}
//                         </div>
//                         </div>
//                     ))}
//                     </div>
//                     <button
//                     onClick={submitAnswers}
//                     className="w-full bg-[#C4BDED] text-black px-6 py-3 rounded-lg shadow-md hover:bg-[#ACA3E3]"
//                     >
//                     Submit Answers
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AnswerForm;


import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const AnswerForm = () => {
    const { formId } = useParams();
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [answers, setAnswers] = useState({});
    const [userEmail, setUserEmail] = useState("");
    const [showPopup, setShowPopup] = useState(true);
    const [checkboxChecked, setCheckboxChecked] = useState(false);

    // Fetch the user email from localStorage or session
    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) {
        const parsedUser = JSON.parse(userData);
        setUserEmail(parsedUser.email); // Extract the email
        } else {
        console.error("User not found in localStorage!");
        }
    }, []);

    // Fetch questions list
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/${formId}/sus-questions/list/`)
        .then((response) => response.json())
        .then((data) => {
            setQuestions(data);
            setLoading(false);
        })
        .catch((error) => {
            setError(error);
            setLoading(false);
        });
    }, [formId]);

    // Handle answer input change
    const handleAnswerChange = (questionId, value) => {
        setAnswers((prev) => ({ ...prev, [questionId]: value }));
    };

    // Submit answers to the backend
    const submitAnswers = async () => {
        if (!userEmail) {
            console.error("User email is missing!");
            alert("Error: You are not logged in.");
            return;
        }

        console.log("Submitting answers for user:", userEmail);

        for (const questionId in answers) {
            const answerData = {
                participant_email: userEmail,
                answer_text: answers[questionId], // Send the answer value
            };

            try {
                const response = await fetch(
                `http://127.0.0.1:8000/api/questions/${questionId}/answers/`,
                {
                    method: "POST",
                    headers: {
                    "Content-Type": "application/json",
                    },
                    body: JSON.stringify(answerData),
                }
                );

                const data = await response.json();
                if (response.ok) {
                console.log("Answer submitted/updated:", data);
                } else {
                console.error("Error submitting answer:", data);
                }
            } catch (error) {
                console.error("Error submitting answer:", error);
            }
        }

        alert("Answers submitted/updated successfully!");
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading questions!</div>;

    return (
        <div 
            className="fixed inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url(/static/images/backgroundform.png)' }}
        >
            <div className="h-screen w-full flex flex-col items-center pt-8 font-funnel overflow-hidden">
                <div className="w-full max-w-2xl px-4">
                <h1 className="text-xl font-bold mb-4">System Usability Scale (SUS) Questionnaire</h1>
                </div>

                <div className="w-full max-w-2xl flex-1 overflow-y-auto px-4 pb-8">
                <h2 className="text-lg font-semibold mb-3">Answer the following ten questions.</h2>
                <div className="bg-white rounded-lg shadow-md border border-gray-400 p-6 mb-6">
                    {questions.map((q, index) => (
                    <div key={q.id} className="mb-10 last:mb-0">
                        <div className="flex items-start mb-4">
                        <span className="font-semibold mr-3 text-gray-700">{index + 1}.</span>
                        <h3 className="font-semibold">{q.question_text}</h3>
                        </div>

                        <div className="flex justify-between w-full">
                        {[1, 2, 3, 4, 5].map((num) => (
                            <div key={num} className="flex flex-col items-center w-1/5">
                            <button
                                onClick={() => handleAnswerChange(q.id, num)}
                                className={`w-10 h-10 flex items-center justify-center border rounded-full text-lg ${
                                answers[q.id] === num ? "bg-[#ACA3E3] text-black" : "border-gray-500"
                                }`}
                            >
                                {num}
                            </button>
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
                    ))}
                </div>
                    <button
                        onClick={submitAnswers}
                        className="w-full bg-[#C4BDED] text-black px-6 py-3 rounded-lg shadow-md hover:bg-[#ACA3E3]"
                    >
                        Submit Answers
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AnswerForm;
