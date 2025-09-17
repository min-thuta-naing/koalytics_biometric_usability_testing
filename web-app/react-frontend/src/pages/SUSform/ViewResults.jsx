import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import Plot from 'react-plotly.js';
import createPlotlyComponent from 'react-plotly.js/factory';
import Plotly from 'plotly.js/lib/core';

// Only import the trace types you need
import box from 'plotly.js/lib/box';
import scatter from 'plotly.js/lib/scatter'; // used for line charts

// Register only these with Plotly
Plotly.register([box, scatter]);

const Plot = createPlotlyComponent(Plotly);


const ViewResults = () => {
   const { formId } = useParams();
   const [questions, setQuestions] = useState([]);
   const [answers, setAnswers] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);


   useEffect(() => {


       //Fetch questions for the form
       fetch(`http://127.0.0.1:8000/api/${formId}/sus-questions/list/`)
           .then(response => response.json())
           .then(data => setQuestions(data))
           .catch(error => console.error("Error fetching questions:", error));


       //fetch answers corresponding with each question
       fetch(`http://127.0.0.1:8000/api/${formId}/sus-answers/results/`)
           .then((response) => response.json())
           .then((data) => {
               setAnswers(data);
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




   // if answers are available, the table will be displayed
   return (
       <div className="flex h-screen overflow-hidden">
           <div className="flex-grow overflow-y-auto">
               <div className="mx-5 my-10 px-1">


                   <h1 className="text-xl font-funnel font-bold mb-4">Results Dashboard</h1>
                   {/* display */}
                   <div className="font-funnel grid grid-cols-3 gap-5 pb-5 h-[400px]">
                       <div className="grid gap-5 h-full">
                            <div className="bg-white flex flex-col items-center justify-center p-4 h-full rounded-lg shadow-lg">
                                <span className="text-4xl font-bold">{answers.length}</span>
                                <span className="text-base">participants answered</span>
                            </div>
                            <div className="bg-white flex flex-col items-center justify-center p-4 h-full rounded-lg shadow-lg">
                                {answers.length > 0 ? (
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
                           data={getBoxPlotTraces(questions, answers, true)}
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
                           data={getBoxPlotTraces(questions, answers, false)}
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


                   <div className="flex flex-col font-funnel">
                       <h1 className="text-xl font-bold mb-4">SUS Questionnaire Results Table</h1>
                       {/* horizontally scrollable table */}
                       <div className="overflow-x-auto">
                           <table className="w-full bg-white rounded-lg shadow-lg border border-gray-300 overflow-hidden">
                               <thead>
                                   <tr className="bg-[#DCD6F7] text-gray-600">
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
                                   {answers.map((answer, index) => (
                                       <tr key={index} className={`hover:bg-gray-100 ${index % 2 === 0 ? 'bg-gray-50' : ''}`}>
                                           <td className="border border-gray-400 px-4 py-2">{index + 1}</td>
                                           <td className="border border-gray-400 px-4 py-2">{answer.participant_email}</td>
                                           {/* <td className="border border-gray-400 px-4 py-2">{answer.sus_score}</td> */}
                                           {Object.keys(answer).map((key, idx) => (
                                               key !== 'participant_email' && (
                                               <td key={idx} className="border border-gray-400 px-4 py-2">{answer[key]}</td>
                                               )
                                           ))}
                                           <td className="border border-gray-400 px-4 py-2">
                                               {calculateSUSScore(questions, answer)}
                                           </td>
                                       </tr>
                                   ))}
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


