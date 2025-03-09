// ViewResults.js
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ViewResults = () => {
    const { formId } = useParams();
    const [results, setResults] = useState([]);
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        // Fetch questions for the form
        fetch(`http://127.0.0.1:8000/forms/${formId}/questions/list/`)
            .then(response => response.json())
            .then(data => setQuestions(data))
            .catch(error => console.error("Error fetching questions:", error));

        // Fetch answers for the form
        fetch(`http://127.0.0.1:8000/forms/${formId}/answers/`)
            .then(response => response.json())
            .then(data => setResults(data))
            .catch(error => console.error("Error fetching answers:", error));
    }, [formId]);

    // Organize answers by participant email
    const groupedResults = {};
    results.forEach(answer => {
        if (!groupedResults[answer.participant_email]) {
            groupedResults[answer.participant_email] = {};
        }
        groupedResults[answer.participant_email][answer.question] = answer.answer_text;
    });

    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold text-center mb-4">Results</h2>

            {results.length === 0 ? (
                <p className="text-center">No results to display at the moment.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-500 shadow-md">
                        <thead>
                            <tr className="bg-[#ACA3E3] ">
                                <th className="border p-2">No.</th>
                                <th className="border p-2">Email</th>
                                {questions.map(q => (
                                    <th key={q.id} className="border p-2">{q.question_text}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(groupedResults).map(([email, answers], index) => (
                                <tr key={email} className="border">
                                    <td className="border p-2">{index + 1}</td>
                                    <td className="border p-2">{email}</td>
                                    {questions.map(q => (
                                        <td key={q.id} className="border p-2">{answers[q.id] || "N/A"}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ViewResults;

  