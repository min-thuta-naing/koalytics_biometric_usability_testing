import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const SUSQuestionPreview = () => {
    const API_URL = process.env.REACT_APP_API_URL;
    const { formId } = useParams();
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch questions list
    useEffect(() => {
        fetch(`${API_URL}${formId}/sus-questions/list/`)
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

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <div className="text-center">
                <div className="animate-spin border-t-4 border-[#ACA3E3] border-solid rounded-full w-16 h-16 mx-auto"></div>
                    <p className="mt-4 text-xl font-funnel font-semibold text-gray-700">Loading...</p>
                </div>
            </div>
        );
    }

    if (error) return <div>Error loading questions!</div>;

    return (
        <div 
            className="fixed inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url(/static/images/backgroundform.png)' }}
        >
            <div className="h-screen w-full flex flex-col items-center pt-8 font-funnel overflow-hidden">
            <div className="mt-[65px] w-full max-w-2xl px-4">
                <h1 className="text-xl font-bold mb-4">System Usability Scale (SUS) Questionnaire Preview</h1>
                </div>

                <div className="w-full max-w-2xl flex-1 overflow-y-auto px-4 pb-8">
                <h2 className="text-lg font-semibold mb-3">The following ten questions will be presented to participants:</h2>
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
                            <div
                                className={`w-10 h-10 flex items-center justify-center border rounded-full text-lg border-gray-300 bg-gray-100`}
                            >
                                {num}
                            </div>
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
                </div>
            </div>
        </div>
    );
};

export default SUSQuestionPreview;