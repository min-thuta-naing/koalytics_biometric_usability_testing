import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const AnswerForm = () => {
    const API_URL = process.env.REACT_APP_API_URL;
    const { formId, projectId } = useParams();
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [answers, setAnswers] = useState({});
    const [userEmail, setUserEmail] = useState("");
    const [currentStep, setCurrentStep] = useState(0);
    const [showValidationMessage, setShowValidationMessage] = useState(false);
    const navigate = useNavigate();

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
        fetch(`${API_URL}/api/${formId}/sus-questions/list/`)
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
                `${API_URL}/api/questions/${questionId}/answers/`,
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
        navigate(`../all-project/${projectId}`);
    };

    if (loading || !questions.length) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <div className="text-center">
                <div className="animate-spin border-t-4 border-[#ACA3E3] border-solid rounded-full w-16 h-16 mx-auto"></div>
                    <p className="mt-4 text-xl font-funnel font-semibold text-gray-700">Loading the questionnaire, please wait ...</p>
                </div>
            </div>
        );
    }
    if (error) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <div className="text-center">
                <div className="animate-spin border-t-4 border-red-500 border-solid rounded-full w-16 h-16 mx-auto"></div>
                    <p className="mt-4 text-xl font-funnel font-semibold text-gray-700">Error loading questionnaire!</p>
                </div>
            </div>
        );
    }

    const currentQuestion = questions[currentStep];
    const isLastStep = currentStep === questions.length - 1;

    return (
        <div 
            className="fixed inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url(/static/images/backgroundform.png)' }}
        >
            <div className="min-h-screen flex flex-col justify-center items-center">
                {/* Progress Bar */}
                <div className="w-[45vw] mb-5 flex items-center justify-between">
                    <div className="w-full bg-gray-200 rounded-full h-3 mr-4">
                        <div
                            className="bg-[#ACA3E3] h-3 rounded-full transition-all duration-300"
                            style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                        ></div>
                    </div>
                    <p className="text-sm text-gray-600 whitespace-nowrap">
                        {currentStep + 1} / {questions.length}
                    </p>
                </div>
                <div 
                    className="bg-cover bg-center w-[50vw] h-[70vh] rounded-lg shadow-md flex flex-col p-8 justify-between font-funnel"
                    style={{backgroundImage: 'url(/static/images/answercover.png)'}}
                >
                    
                    {/*questions*/}
                    <div>

                        <blockquote className="border-l-4 border-[#ACA3E3] pl-4 text-gray-800 mb-6 bg-white/70 py-2 px-3">
                            <h2 className="text-md font-bold mb-3">
                                Question {currentStep + 1} of {questions.length}
                            </h2>

                            <h3 className="text-4xl font-semibold mb-6">
                                {currentQuestion.question_text}
                            </h3>
                        </blockquote>
                        

                        <div className="flex justify-between">
                            {[1, 2, 3, 4, 5].map((num) => (
                                <div key={num} className="flex flex-col items-center w-1/5">
                                    <button
                                        onClick={() => handleAnswerChange(currentQuestion.id, num)}
                                        className={`w-10 h-10 flex items-center justify-center border rounded-xl text-lg ${
                                            answers[currentQuestion.id] === num
                                                ? "bg-[#ACA3E3] border border-[#ACA3E3] text-black"
                                                : "bg-white border-gray-500"
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

                    <div className="flex justify-between mt-6">
                        <button
                            onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
                            className="bg-gray-200 px-4 py-2 rounded-md text-gray-700"
                            disabled={currentStep === 0}
                        >
                            Back
                        </button>

                        {isLastStep ? (
                            <button
                                onClick={submitAnswers}
                                className="bg-[#C4BDED] px-6 py-2 rounded-md text-black hover:bg-[#ACA3E3]"
                            >
                                Submit
                            </button>
                        ) : (
                            <button
                                onClick={() => setCurrentStep((prev) => prev + 1)}
                                className="bg-[#C4BDED] px-6 py-2 rounded-md text-black hover:bg-[#ACA3E3]"
                                disabled={!answers[currentQuestion.id]}
                            >
                                Next
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnswerForm;
