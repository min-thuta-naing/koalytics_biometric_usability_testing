// ViewResults.js
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";


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

    const totalParticipants = Object.keys(groupedResults).length;

    const ratingQuestions = questions.filter(q => q.question_type === "rating");
    
    const chartData = ratingQuestions.map(q => {
        const ratingCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        results.forEach(answer => {
            if (answer.question === q.id) {
                const rating = parseInt(answer.answer_text, 10);
                if (ratingCounts[rating] !== undefined) {
                    ratingCounts[rating]++;
                }
            }
        });
        return { question: q.question_text, data: Object.entries(ratingCounts).map(([key, value]) => ({ rating: key, count: value })) };
    });

    return (
        <div className="p-8">

            <div className="p-6 bg-white font-funnel shadow-lg rounded-lg text-center mb-8">
                <h2 className="text-4xl font-bold">{totalParticipants}</h2>
                <p className="text-lg">participants answered</p>
            </div>

            {chartData.length > 0 && (
                <div className="mt-8">
                    <h3 className="text-xl font-bold text-center mb-4">Rating Distributions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {chartData.map(({ question, data }) => (
                            <div key={question} className="p-4 bg-white shadow rounded-lg">
                                <h4 className="text-lg font-semibold text-center mb-2">{question}</h4>
                                <ResponsiveContainer width="100%" height={250}>
                                    <BarChart data={data}>
                                        <XAxis dataKey="rating" />
                                        <YAxis allowDecimals={false} />
                                        <Tooltip />
                                        <Bar dataKey="count" fill="#8884d8" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        ))}
                    </div>
                </div>
            )}
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
                                    <th key={q.id} className="border p-2">{q.question_text}-{q.question_type}</th>
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

  