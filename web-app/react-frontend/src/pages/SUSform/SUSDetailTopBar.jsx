import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import CreateSUSQuestion from "./CreateSUSQuestion"; 
import ViewResults from "./ViewResults";
import SUSQuesionPreview from "./SUSQuestionPreview";

const SUSDetailTopBar = () => {
  const {formId } = useParams(); 
  const [form, setForm] = useState(null);
  const [error, setError] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const currentView = searchParams.get("view") || "create";
  const [questionText, setQuestionText] = useState("");
  const [questions, setQuestions] = useState([]);
  //const [view, setView] = useState("create");
  const setView = (viewName) => {
    setSearchParams({ view: viewName });
  };

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

      <div className="font-funnel border-b border-gray-300 flex flex-col justify-center bg-[#DCD6F7] fixed w-full top-0 z-10 shadow-lg">
        <div className="py-2 px-5 mt-4">
          <p className="font-funnel font-bold text-base">{form.susform_title} </p>
        </div>
        <div className="flex justify-center">
          <div
            onClick={() => setView("create")}
            className={`px-6 py-3 cursor-pointer ${currentView === "create" ? "border-b-2 border-gray-800 text-gray-800 font-semibold" : "text-gray-500" }`}
          >
            Create Questions
          </div>

          <div
            onClick={() => setView("preview")}
            className={`px-6 py-3 cursor-pointer ${currentView === "preview" ? "border-b-2 border-gray-800 text-gray-800 font-semibold" : "text-gray-500" }`}
          >
            Preview
          </div>

          <div
            onClick={() => setView("results")}
            className={`px-6 py-3 cursor-pointer ${currentView === "results" ? "border-b-2 border-gray-800 text-gray-800 font-semibold" : "text-gray-500" }`}
          >
            View Results
          </div>
        </div>
      </div>

      {/* pages displayed based on selected view */}
      <div className="mt-[90px] flex-1 overflow-y-auto">
        {currentView === "create" ? (
          <CreateSUSQuestion
            form={form}
            formId={formId}
          />
        ) : currentView === "preview" ? (
          <SUSQuesionPreview />
        ) : currentView === "results" ? (
          <ViewResults />
        ) : null}
      </div>
      
    </div>
  );
};

export default SUSDetailTopBar;
