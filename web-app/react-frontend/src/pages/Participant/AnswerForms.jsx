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

const AnswerForm = () => {
    const { formId } = useParams();
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/forms/${formId}/questions/list/`)
            .then(response => response.json())
            .then(data => setQuestions(data))
            .catch(error => console.error("Error fetching questions:", error));
    }, [formId]);

    const handleAnswerChange = (questionId, value) => {
        setAnswers(prev => ({ ...prev, [questionId]: value }));
    };

    return (
        <div className="min-h-screen bg-[#F0EEED] p-8 flex flex-col items-center">
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
        </div>
    );
};

export default AnswerForm;
