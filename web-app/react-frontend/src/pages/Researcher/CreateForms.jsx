import { useState } from "react";
import { X } from "lucide-react";


const CreateSurveyForms = ({ onClose, projectId, onFormCreated }) => {
    const [sustitle, setSUSTitle] = useState("");
    const [susdescription, setSUSDescription] = useState(""); 
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    

    // Function to get CSRF token
    const getCSRFToken = () => {
        const cookie = document.cookie
            .split("; ")
            .find((row) => row.startsWith("csrftoken="));
        return cookie ? cookie.split("=")[1] : "";
    };


    const validateFields = () => {

        // validate if the user don't fill all the fields
        if (!sustitle.trim()) {
            setError("SUS title is required");
            return false;
        }
        if (!susdescription.trim()) {
            setError("SUS description is required");
            return false;
        }

        setError("");
        return true;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!validateFields()) {
            return; // Don't proceed if validation fails
        }

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/projects/${projectId}/create-susform/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": getCSRFToken(),
                },
                body: JSON.stringify({ 
                    susform_title: sustitle, 
                    susform_description: susdescription
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to create form.");
            }

            // alert("Form created successfully!");
            setSUSTitle("");
            setSUSDescription(""); 
            onFormCreated(); 
            onClose(); // Close modal after success
        } catch (err) {
            console.error("Error creating form:", err);
            setError(err.message || "Error creating form.");
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"> 
            <div className="bg-white rounded-lg shadow-xl max-w-xl w-full relative flex flex-col">
                {/* Title and Close Button Section */}
                <div className="flex items-center justify-between p-3 bg-gray-100 rounded-t-lg relative">
                    <h2 className="font-semibold font-funnel text-lg">Create a New SUS Form </h2>
                    {!isSubmitted && ( // Only show close button if not on thank you page
                        <button
                            onClick={onClose}
                            className="text-black bg-white hover:bg-gray-200 rounded-lg border border-gray-300 p-1"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>

                {/* Divider */}
                <div className="w-full h-[1px] bg-gray-300"></div>

                <div className="bg-white p-8 w-full h-[400px] overflow-y-auto">

                    {/* {error && <p className="text-red-500 mb-4">{error}</p>}
                    {success && <p className="text-green-500 mb-4">{success}</p>} */}

                    <form onSubmit={handleSubmit}>
                        <label className="block mb-2">Form Title:</label>
                        <input
                            type="text"
                            value={sustitle}
                            onChange={(e) => setSUSTitle(e.target.value)}
                            className="w-full p-2 mb-4 rounded border"
                            required
                        />

                        <label className="block mb-2">Instruction:</label>
                        <textarea
                            value={susdescription}
                            onChange={(e) => setSUSDescription(e.target.value)}
                            className="w-full p-2 mb-4 rounded border"
                            rows="5"
                            required
                        />
                        <p className="py-2">* Please provide instruction about SUS form to participant *</p>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="bg-[#C4BDED] text-black py-2 px-4 rounded-lg hover:bg-[#ACA3E3]"
                            >
                                Create SUS Form
                            </button>
                        </div>

                        {error && (
                            <div className="text-red-500 font-funnel mb-4 p-2 bg-red-50 rounded-md">
                                {error}
                            </div>
                        )}
                    </form>
                </div>

                {/* Divider */}
                <div className="w-full h-[1px] bg-gray-300"></div>

                {/* Bottom and Close Button Section */}
                <div className="flex items-center font-funnel justify-between p-3 bg-gray-100 rounded-b-lg relative">
                    <h2 className="font-semibold text-base">Koalytics</h2>
                </div>
            </div>
        </div>
    );
};

export default CreateSurveyForms;
