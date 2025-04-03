import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CreateQuestions from "./CreateQuestions";
import CreateSUSQuestion from "./CreateSUSQuestion"; 
import ViewResults from "./ViewResults";

const FormDetail = () => {
  const {formId } = useParams(); // Get form ID from URL
  const [form, setForm] = useState(null);
  const [error, setError] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [questionType, setQuestionType] = useState("text");
  const [questions, setQuestions] = useState([]);
  const [view, setView] = useState("create"); // "create" or "results"

  // Fetch form details
  useEffect(() => {
    const fetchFormDetails = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/forms/${formId}/`);
        if (!response.ok) {
          throw new Error("Failed to fetch form details.");
        }
        const data = await response.json();
        setForm(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchFormDetails();
  }, [formId]);


  const handleShareForm = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/forms/${formId}/share/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to share form.');
      }
  
      alert('Form shared successfully!');
    } catch (error) {
      alert('Error sharing form: ' + error.message);
    }
  };

  // Fetch questions for the form
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/forms/${formId}/questions/list/`);
        if (!response.ok) {
          throw new Error("Failed to fetch questions.");
        }
        const data = await response.json();
        setQuestions(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchQuestions();
  }, [formId]);


  // Send a single question to backend
  const handleAddQuestion = async () => {
    if (!questionText.trim()) return alert("Question text cannot be empty!");

    try {
      const response = await fetch(`http://127.0.0.1:8000/forms/${formId}/questions/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question_text: questionText,
          question_type: questionType,
        }),
      });

      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.error || "Failed to save question.");
      }

      const newQuestion = await response.json();
      setQuestions((prevQuestions) => [...prevQuestions, newQuestion]); // Append new question
      setQuestionText(""); // Clear input

    } catch (err) {
      setError(err.message);
    }
  };

  if (error) return <p className="text-red-500">{error}</p>;
  if (!form) return <p>Loading...</p>;

  return (
    <div className=" bg-[#F0EEED] h-screen flex flex-col">
      {/* <div className=" p-8 border-b border-gray-400">
        <p className="font-funnel text-3xl">{form.id} - {form.title} </p>
      </div> */}

      <div className="font-funnel border-b border-gray-300 flex justify-center bg-[#DCD6F7] fixed w-full top-0 z-10">
        <div
          onClick={() => setView("create")}
          className={`px-6 py-3 cursor-pointer ${view === "create" ? "border-b-2 border-gray-800 bg-gradient-to-t from-[#C4BDED] to-transparent text-gray-800 font-semibold" : "text-gray-500" }`}
        >
          Create Questions
        </div>
        <div
          onClick={() => setView("results")}
          className={`px-6 py-3 cursor-pointer ${view === "results" ? "border-b-2 border-gray-800 bg-gradient-to-t from-[#C4BDED] to-transparent text-gray-800 font-semibold" : "text-gray-500" }`}
        >
          View Results
        </div>
      </div>

      {/* pages displayed based on selected view */}
      <div className="mt-[50px] flex-1 overflow-y-auto">
        {view === "create" ? (
          <CreateSUSQuestion
            form={form}
            formId={formId}
            handleShareForm={handleShareForm}
            questions={questions}
            setQuestions={setQuestions}
            questionText={questionText}
            setQuestionText={setQuestionText}
            questionType={questionType}
            setQuestionType={setQuestionType}
            handleAddQuestion={handleAddQuestion}
          />
        ) : (
          <ViewResults />
        )}
      </div>
      
    </div>
  );
};

export default FormDetail;
