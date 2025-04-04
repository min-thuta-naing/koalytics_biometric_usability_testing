// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";


// const ViewResults = () => {
//     const { formId } = useParams();
//     const [results, setResults] = useState([]);
//     const [questions, setQuestions] = useState([]);

//     useEffect(() => {
//         // Fetch questions for the form
//         fetch(`http://127.0.0.1:8000/api/${formId}/sus-questions/list/`)
//             .then(response => response.json())
//             .then(data => setQuestions(data))
//             .catch(error => console.error("Error fetching questions:", error));

//         // Fetch answers for the form
//         fetch(`http://127.0.0.1:8000/forms/${formId}/answers/`)
//             .then(response => response.json())
//             .then(data => setResults(data))
//             .catch(error => console.error("Error fetching answers:", error));
//     }, [formId]);

//     // Organize answers by participant email
//     const groupedResults = {};
//     results.forEach(answer => {
//         if (!groupedResults[answer.participant_email]) {
//             groupedResults[answer.participant_email] = {};
//         }
//         groupedResults[answer.participant_email][answer.question] = answer.answer_text;
//     });

//     const totalParticipants = Object.keys(groupedResults).length;

//     const ratingQuestions = questions.filter(q => q.question_type === "rating");
    
//     const chartData = ratingQuestions.map(q => {
//         const ratingCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
//         results.forEach(answer => {
//             if (answer.question === q.id) {
//                 const rating = parseInt(answer.answer_text, 10);
//                 if (ratingCounts[rating] !== undefined) {
//                     ratingCounts[rating]++;
//                 }
//             }
//         });
//         return { question: q.question_text, data: Object.entries(ratingCounts).map(([key, value]) => ({ rating: key, count: value })) };
//     });

//     return (
//         <div className="p-8">

//             <div className="p-6 bg-white font-funnel shadow-lg rounded-lg text-center mb-8">
//                 <h2 className="text-4xl font-bold">{totalParticipants}</h2>
//                 <p className="text-lg">participants answered</p>
//             </div>

//             {chartData.length > 0 && (
//                 <div className="mt-8">
//                     <h3 className="text-xl font-bold text-center mb-4">Rating Distributions</h3>
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                         {chartData.map(({ question, data }) => (
//                             <div key={question} className="p-4 bg-white shadow rounded-lg">
//                                 <h4 className="text-lg font-semibold text-center mb-2">{question}</h4>
//                                 <ResponsiveContainer width="100%" height={250}>
//                                     <BarChart data={data}>
//                                         <XAxis dataKey="rating" />
//                                         <YAxis allowDecimals={false} />
//                                         <Tooltip />
//                                         <Bar dataKey="count" fill="#8884d8" />
//                                     </BarChart>
//                                 </ResponsiveContainer>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             )}
//             <h2 className="text-2xl font-bold text-center mb-4">Results</h2>

//             {results.length === 0 ? (
//                 <p className="text-center">No results to display at the moment.</p>
//             ) : (
//                 <div className="overflow-x-auto">
//                     <table className="min-w-full bg-white border border-gray-500 shadow-md">
//                         <thead>
//                             <tr className="bg-[#ACA3E3] ">
//                                 <th className="border p-2">No.</th>
//                                 <th className="border p-2">Email</th>
//                                 {questions.map(q => (
//                                     <th key={q.id} className="border p-2">{q.question_text}-{q.question_type}</th>
//                                 ))}
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {Object.entries(groupedResults).map(([email, answers], index) => (
//                                 <tr key={email} className="border">
//                                     <td className="border p-2">{index + 1}</td>
//                                     <td className="border p-2">{email}</td>
//                                     {questions.map(q => (
//                                         <td key={q.id} className="border p-2">{answers[q.id] || "N/A"}</td>
//                                     ))}
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ViewResults;


import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ViewResults = () => {
  const { formId } = useParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch results when the component mounts
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/${formId}/sus-answers/results/`)
      .then((response) => response.json())
      .then((data) => {
        setResults(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching results:", error);
        setError("Error fetching results");
        setLoading(false);
      });
  }, [formId]);

  if (loading) {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="text-center">
            <div className="animate-spin border-t-4 border-blue-500 border-solid rounded-full w-16 h-16 mx-auto"></div>
            <p className="mt-4 text-xl font-funnel font-semibold text-gray-700">Loading...</p>
            </div>
        </div>
    );
  }
  if (error) return <div>{error}</div>;

  // If results are available, display them in a table
  return (
    <div className="flex h-screen overflow-hidden">
        <div className="flex-grow overflow-y-auto">
            <div className="mx-30 my-10 px-32">
                <div className="flex flex-col font-funnel">
                    <h1 className="text-xl font-bold mb-4">SUS Questionnaire Results</h1>
                    <table className="min-w-full bg-white rounded-lg shadow-lg border border-gray-300 overflow-hidden">
                        <thead>
                            <tr className="bg-[#DCD6F7] text-gray-600">
                                <th className="border border-gray-400 px-4 py-2 text-left font-semibold">Sir No.</th>
                                <th className="border border-gray-400 px-4 py-2 text-left font-semibold">Participant Email</th>
                                {results.length > 0 && Object.keys(results[0]).map((key, idx) => (
                                key !== 'participant_email' && (
                                    <th key={idx} className="border border-gray-400 px-4 py-2 text-left font-semibold">
                                    {key}
                                    </th>
                                )
                                ))}
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {results.map((result, index) => (
                                <tr key={index} className={`hover:bg-gray-100 ${index % 2 === 0 ? 'bg-gray-50' : ''}`}>
                                    <td className="border border-gray-400 px-4 py-2">{index + 1}</td>
                                    <td className="border border-gray-400 px-4 py-2">{result.participant_email}</td>
                                    {Object.keys(result).map((key, idx) => (
                                        key !== 'participant_email' && (
                                        <td key={idx} className="border border-gray-400 px-4 py-2">{result[key]}</td>
                                        )
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
  );
};

export default ViewResults;
