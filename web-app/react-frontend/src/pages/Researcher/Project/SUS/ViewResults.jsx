import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import Plot from 'react-plotly.js';
import createPlotlyComponent from 'react-plotly.js/factory';
import Plotly from 'plotly.js/lib/core';

import box from 'plotly.js/lib/box';
import scatter from 'plotly.js/lib/scatter';

// Register only these with Plotly
Plotly.register([box, scatter]);
const Plot = createPlotlyComponent(Plotly);


const ViewResults = () => {
    const API_URL = process.env.REACT_APP_API_URL;
    const { formId } = useParams();
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState([]); 
    const [selectAll, setSelectAll] = useState(true); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        //Fetch questions for the form
        fetch(`${API_URL}/api/${formId}/sus-questions/list/`)
            .then(response => response.json())
            .then(data => setQuestions(data))
            .catch(error => console.error("Error fetching questions:", error));

        //fetch answers corresponding with each question
        fetch(`${API_URL}/api/${formId}/sus-answers/results/`)
            .then((response) => response.json())
            .then((data) => {
                setAnswers(data);
                setSelectedAnswers(data); // select all user responses by default
                setLoading(false);
        })
        .catch((error) => {
            console.error("Error fetching answers:", error);
            setError("Error fetching answers");
            setLoading(false);
        });
    }, [formId]);


    const getBoxPlotTraces = (questions, answers, isOdd) => {
        const traces = [];
    
        questions.forEach((question, index) => {
            const isQuestionOdd = (index + 1) % 2 === 1;
            if (isOdd !== isQuestionOdd) return;
    
            const qKey = `Q${question.id}`;
            const values = answers
                .map((a) => a[qKey])
                .filter((v) => v !== undefined && v !== null);
    
            if (values.length > 0) {
                traces.push({
                    y: values,
                    name: `Q${index + 1}`,
                    type: 'box',
                    boxpoints: 'all',
                    jitter: 0.5,
                    whiskerwidth: 0.2,
                    fillcolor: isOdd ? '#ACA3E3' : '#F8BBD0',
                    marker: { size: 4 },
                    line: { width: 1 }
                });
            }
        });
    
        return traces;
    };
  
    const calculateSUSScore = (questions, answerData) => {
        let X = 0, Y = 0;
        questions.forEach((question, idx) => {
            const answer = answerData[`Q${question.id}`];
            if (answer !== null && answer !== undefined) {
            if ((idx + 1) % 2 === 1) {
                X += answer - 1;
            } else {
                Y += 5 - answer;
            }
            }
        });
        // return ((X + Y) * 2.5).toFixed(2);
        return (X + Y) * 2.5; // Return as number
    };

    const getSUSRating = (score) => {
        if (score < 51) return { 
            scoreColor: 'text-red-600', 
            labelColor: 'text-red-600', 
            label: 'Awful' 
        };
        if (score < 68) return { 
            scoreColor: 'text-orange-500', 
            labelColor: 'text-orange-500', 
            label: 'Poor' 
        };
        if (score < 80.3) return { 
            scoreColor: 'text-lime-500', 
            labelColor: 'text-lime-500', 
            label: 'Good' 
        };
        return { 
            scoreColor: 'text-emerald-700', 
            labelColor: 'text-emerald-700', 
            label: 'Excellent' 
        };
    };


    const calculateAverageSUS = (questions, answers) => {
        if (answers.length === 0) return 0;
        const total = answers.reduce((sum, answerData) => {
            return sum + calculateSUSScore(questions, answerData);
        }, 0);
        return (total / answers.length).toFixed(2);
    };

    const toggleSelectAll = () => {
        if (selectAll) {
        setSelectedAnswers([]);
        } else {
        setSelectedAnswers(answers);
        }
        setSelectAll(!selectAll);
    };

    const toggleSelectRow = (answer) => {
        const isSelected = selectedAnswers.includes(answer);
        if (isSelected) {
            const newSelected = selectedAnswers.filter((a) => a !== answer);
            setSelectedAnswers(newSelected);
            setSelectAll(newSelected.length === answers.length);
        } else {
            const newSelected = [...selectedAnswers, answer];
            setSelectedAnswers(newSelected);
            setSelectAll(newSelected.length === answers.length);
        }
    };


    const downloadCSV = () => {
        // if (!answers.length) return;
        if (!selectedAnswers.length) return;

        const headers = ['Participant Email', ...questions.map((q, i) => `Q${i + 1}`), 'Individual SUS Score'];

        // Create CSV rows
        const rows = answers.map((answer) => {
            const row = [
                answer.participant_email,
                ...questions.map((q) => answer[`Q${q.id}`] ?? ''),
                calculateSUSScore(questions, answer)
            ];
            return row.join(',');
        });

        // Combine headers and rows
        const csvContent = [headers.join(','), ...rows].join('\n');

        // Create blob & trigger download
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `SUS_Results_${formId}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

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
    if (error) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <div className="text-center">
                <div className="animate-spin border-t-4 border-[#ACA3E3] border-solid rounded-full w-16 h-16 mx-auto"></div>
                    <div className="mt-4 text-xl font-funnel font-semibold text-gray-700">{error}</div>
                </div>
            </div>
        );
    }


    // if there are no answers yet, these test will be displayed
    if (answers.length === 0) {
        return (
            <div className="font-funnel fixed inset-0 flex justify-center items-center">
                <div className="text-center p-8 max-w-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">No responses yet</h2>
                <p className="text-gray-600">Please wait for participants to answer your questionnaire</p>
                </div>
            </div>
        );
    }

    const displayedAnswers = selectedAnswers;
    const displayedCount = displayedAnswers.length;



   // if answers are available, the table will be displayed
   return (
        <div className="flex h-screen overflow-hidden">
            <div className="flex-grow overflow-y-auto">
                <div className="mx-5 my-10 px-1">
                    {/* <h1 className="text-xl font-funnel font-bold mb-4">Results Dashboard</h1> */}

                    {/* result dashboard */}
                    <div className="font-funnel grid grid-cols-3 gap-5 pb-5 h-[400px]">
                        <div className="grid gap-5 h-full">
                            <div className="bg-white flex flex-col items-center justify-center p-4 h-full rounded-lg shadow-lg">
                                {/* <span className="text-4xl font-bold">{answers.length}</span> */}
                                <span className="text-4xl font-bold">{displayedCount}</span>
                                <span className="text-base">participants answered</span>
                            </div>
                            <div className="bg-white flex flex-col items-center justify-center p-4 h-full rounded-lg shadow-lg">
                                {/* {answers.length > 0 ? ( */}
                                {displayedCount > 0 ? (
                                    <>
                                        <div className="flex items-baseline gap-2">
                                            <span className={`text-4xl font-bold ${getSUSRating(calculateAverageSUS(questions, answers)).scoreColor}`}>
                                                {calculateAverageSUS(questions, answers)}
                                            </span>
                                            <span className={`text-4xl font-bold ${getSUSRating(calculateAverageSUS(questions, answers)).labelColor}`}>
                                                ({getSUSRating(calculateAverageSUS(questions, answers)).label})
                                            </span>
                                        </div>
                                        <span className="text-base">Average SUS Score</span>
                                    </>
                                ) : (
                                    <span className="text-4xl font-bold">0</span>
                                )}
                            </div>                      
                        </div>

                        {/* Odd Questions Box Plot */}
                        <div className="bg-white p-4 rounded-lg shadow-lg">
                            <h2 className="font-semibold mb-2 text-center">Odd Questions Box Plot</h2>
                            <Plot
                                data={getBoxPlotTraces(questions, displayedAnswers, true)}
                                layout={{
                                    title: '',
                                    yaxis: { title: 'Score', range: [1, 5] },
                                    margin: { t: 10, r: 20, l: 40, b: 40 },
                                    paper_bgcolor: '#fff',
                                    plot_bgcolor: '#fff',
                                    showlegend: false,
                                }}
                                config={{ responsive: true }}
                                style={{ width: '100%', height: '300px' }}
                            />
                        </div>


                        {/* Even Questions Box Plot */}
                        <div className="bg-white p-4 rounded-lg shadow-lg">
                            <h2 className="font-semibold mb-2 text-center">Even Questions Box Plot</h2>
                            <Plot
                                data={getBoxPlotTraces(questions, displayedAnswers, false)}
                                layout={{
                                    title: '',
                                    yaxis: { title: 'Score', range: [1, 5] },
                                    margin: { t: 10, r: 20, l: 40, b: 40 },
                                    paper_bgcolor: '#fff',
                                    plot_bgcolor: '#fff',
                                    showlegend: false,
                                }}
                                config={{ responsive: true }}
                                style={{ width: '100%', height: '300px' }}
                            />
                        </div>
                    </div>


                    {/* SUS Results Table */}
                    <div className="flex flex-col font-funnel">
                        <div className="flex justify-between items-center mb-4">
                            <h1 className="text-xl font-bold">SUS Questionnaire Results Table</h1>
                            <button
                                onClick={downloadCSV}
                                className="bg-[#ACA3E3] hover:bg-[#8F85D7] text-black font-semibold px-4 py-2 rounded-lg shadow-md transition"
                            >
                                Download CSV file
                            </button>
                        </div>
                        {/* horizontally scrollable table */}
                        <div className="overflow-x-auto">
                            <table className="w-full bg-white rounded-lg shadow-lg border border-gray-300 overflow-hidden">
                                <thead>
                                    <tr className="bg-[#DCD6F7] text-gray-600">
                                        <th className="border border-gray-400 px-2 py-2 text-center">
                                            <input
                                                type="checkbox"
                                                checked={selectAll}
                                                onChange={toggleSelectAll}
                                                className="w-4 h-4"
                                            />
                                        </th>
                                        <th className="border border-gray-400 px-4 py-2 text-left font-semibold">No.</th>
                                        <th className="border border-gray-400 px-4 py-2 text-left font-semibold">Participant<br/>Email</th>
                                        {/* Dynamically render question columns */}
                                        {questions.map((question, idx) => (
                                            <th key={idx} className="border border-gray-400 px-4 py-2 text-left font-semibold">
                                                {/* {question.question_text} */}
                                                {`Q${idx+1}. ${question.question_text}`}
                                            </th>
                                        ))}
                                        <th className="border border-gray-400 px-4 py-2 text-left font-semibold">Individual<br/>sus<br/>score</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-700">
                                    {/* {answers.map((answer, index) => (
                                        <tr key={index} className={`hover:bg-gray-100 ${index % 2 === 0 ? 'bg-gray-50' : ''}`}>
                                            <td className="border border-gray-400 px-4 py-2">{index + 1}</td>
                                            <td className="border border-gray-400 px-4 py-2">{answer.participant_email}</td>
                                            {Object.keys(answer).map((key, idx) => (
                                                key !== 'participant_email' && (
                                                <td key={idx} className="border border-gray-400 px-4 py-2">{answer[key]}</td>
                                                )
                                            ))}
                                            <td className="border border-gray-400 px-4 py-2">
                                                {calculateSUSScore(questions, answer)}
                                            </td>
                                        </tr>
                                    ))} */}
                                    {answers.map((answer, index) => {
                                        const isSelected = selectedAnswers.includes(answer);
                                        return (
                                        <tr
                                            key={index}
                                            className={`hover:bg-gray-100 ${
                                            index % 2 === 0 ? "bg-gray-50" : ""
                                            } ${!isSelected ? "opacity-50" : ""}`}
                                        >
                                            <td className="border border-gray-400 px-2 py-2 text-center">
                                            <input
                                                type="checkbox"
                                                checked={isSelected}
                                                onChange={() => toggleSelectRow(answer)}
                                                className="w-4 h-4"
                                            />
                                            </td>
                                            <td className="border border-gray-400 px-4 py-2">{index + 1}</td>
                                            <td className="border border-gray-400 px-4 py-2">
                                            {answer.participant_email}
                                            </td>
                                            {questions.map((q, idx) => (
                                            <td key={idx} className="border border-gray-400 px-4 py-2">
                                                {answer[`Q${q.id}`]}
                                            </td>
                                            ))}
                                            <td className="border border-gray-400 px-4 py-2">
                                            {calculateSUSScore(questions, answer)}
                                            </td>
                                        </tr>
                                        );
                                    })}
                                </tbody>
                                <tr className="bg-[#DCD6F7] font-semibold">
                                    <td className="border border-gray-400 px-4 py-2 text-center" colSpan={2 + questions.length}>
                                        Average SUS Score
                                    </td>
                                    <td className="border border-gray-400 px-4 py-2 text-left">
                                        {answers.length > 0 ? (
                                            <div className="flex items-baseline">
                                                <span className={`mr-2 ${getSUSRating(calculateAverageSUS(questions, answers)).scoreColor}`}>
                                                    {calculateAverageSUS(questions, answers)}
                                                </span>
                                                <span className={`${getSUSRating(calculateAverageSUS(questions, answers)).labelColor}`}>
                                                    ({getSUSRating(calculateAverageSUS(questions, answers)).label})
                                                </span>
                                            </div>
                                        ) : (
                                            '0'
                                        )}
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </div>
   );
};


export default ViewResults;


