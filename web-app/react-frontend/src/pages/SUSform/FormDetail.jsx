import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CreateQuestions from "./CreateQuestions";
import CreateSUSQuestion from "./CreateSUSQuestion"; 
import ViewResults from "./ViewResults";
import SUSQuesionPreview from "./SUSQuestionPreview";

const FormDetail = () => {
  const {formId } = useParams(); // Get form ID from URL
  const [form, setForm] = useState(null);
  const [error, setError] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [questions, setQuestions] = useState([]);
  const [view, setView] = useState("create"); // "create" or "results"

  // Fetch form details
  useEffect(() => {
    const fetchFormDetails = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/${formId}/form-details/`);
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


  // const handleShareForm = async () => {
  //   try {
  //     const response = await fetch(`http://127.0.0.1:8000/forms/${formId}/share/`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });
  
  //     if (!response.ok) {
  //       throw new Error('Failed to share form.');
  //     }
  
  //     alert('Form shared successfully!');
  //   } catch (error) {
  //     alert('Error sharing form: ' + error.message);
  //   }
  // };

  // Fetch questions for the form
  // useEffect(() => {
  //   const fetchQuestions = async () => {
  //     try {
  //       const response = await fetch(`http://127.0.0.1:8000/forms/${formId}/questions/list/`);
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch questions.");
  //       }
  //       const data = await response.json();
  //       setQuestions(data);
  //     } catch (err) {
  //       setError(err.message);
  //     }
  //   };

  //   fetchQuestions();
  // }, [formId]);


  // Send a single question to backend
  // const handleAddQuestion = async () => {
  //   if (!questionText.trim()) return alert("Question text cannot be empty!");

  //   try {
  //     const response = await fetch(`http://127.0.0.1:8000/forms/${formId}/questions/`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         question_text: questionText,
  //         question_type: questionType,
  //       }),
  //     });

  //     if (!response.ok) {
  //       const errorMessage = await response.json();
  //       throw new Error(errorMessage.error || "Failed to save question.");
  //     }

  //     const newQuestion = await response.json();
  //     setQuestions((prevQuestions) => [...prevQuestions, newQuestion]); // Append new question
  //     setQuestionText(""); // Clear input

  //   } catch (err) {
  //     setError(err.message);
  //   }
  // };

  if (!form) {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="text-center">
            <div className="animate-spin border-t-4 border-[#ACA3E3] border-solid rounded-full w-16 h-16 mx-auto"></div>
                <p className="mt-4 text-xl font-funnel font-semibold text-gray-700">Loading SUS form details. Please wait ... </p>
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

  return (
    <div className=" bg-[#F0EEED] h-screen flex flex-col">
      {/* <div className=" p-8 border-b border-gray-400">
        <p className="font-funnel text-3xl">{form.id} - {form.title} </p>
      </div> */}

      <div className="font-funnel border-b border-gray-300 flex flex-col justify-center bg-[#DCD6F7] fixed w-full top-0 z-10 shadow-lg">
        <div className="py-2 px-5">
          {/* <p className="font-funnel font-bold text-base">{form.id} - {form.susform_title} </p> */}
          <p className="font-funnel font-bold text-base">{form.susform_title} </p>
        </div>
        <div className="flex justify-center">
          <div
            onClick={() => setView("create")}
            className={`px-6 py-3 cursor-pointer ${view === "create" ? "border-b-2 border-gray-800 text-gray-800 font-semibold" : "text-gray-500" }`}
          >
            Create Questions
          </div>

          <div
            onClick={() => setView("preview")}
            className={`px-6 py-3 cursor-pointer ${view === "preview" ? "border-b-2 border-gray-800 text-gray-800 font-semibold" : "text-gray-500" }`}
          >
            Preview
          </div>

          <div
            onClick={() => setView("results")}
            className={`px-6 py-3 cursor-pointer ${view === "results" ? "border-b-2 border-gray-800 text-gray-800 font-semibold" : "text-gray-500" }`}
          >
            View Results
          </div>
        </div>
      </div>

      {/* pages displayed based on selected view */}
      <div className="mt-[90px] flex-1 overflow-y-auto">
        {view === "create" ? (
          <CreateSUSQuestion
            form={form}
            formId={formId}
            // handleShareForm={handleShareForm}
            // questions={questions}
            // setQuestions={setQuestions}
            // questionText={questionText}
            // setQuestionText={setQuestionText}
            // handleAddQuestion={handleAddQuestion}
          />
        ) : view === "preview" ? (
          <SUSQuesionPreview />
        ) : view === "results" ? (
          <ViewResults />
        ) : null}
      </div>
      
    </div>
  );
};

export default FormDetail;
