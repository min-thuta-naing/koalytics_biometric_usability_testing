import { useState } from "react";
import { X } from "lucide-react";

const CreateUsabilityTesting = ({ onClose, projectId, onUsabilityTestingCreated }) => {
    const API_URL = process.env.REACT_APP_API_URL;
    const [step, setStep] = useState(1); // Track the step in the process
    const [testingType, setTestingType] = useState(""); // Track the selected type (Prototype or Website)
    const [title, setTitle] = useState("");
    // const [task, setTask] = useState("");
    const [task, setTask] = useState([""]);
    const [duration, setDuration] = useState("");  
    const [websiteLink, setWebsiteLink] = useState("");  
    const [figmaEmbedCode, setFigmaEmbedCode] = useState(""); 
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const getCSRFToken = () => {
        const cookie = document.cookie
            .split("; ")
            .find((row) => row.startsWith("csrftoken="));
        return cookie ? cookie.split("=")[1] : "";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const body = {
                title,
                task,
                duration,
                website_link: testingType === "website" ? websiteLink : undefined,
                figma_embed_code: testingType === "prototype" ? figmaEmbedCode : undefined,
            };

            const response = await fetch(`${API_URL}/api/projects/${projectId}/create-usability-testing/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": getCSRFToken(),
                },
                body: JSON.stringify(body),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to create usability testing.");
            }

            setTitle("");
            setTask("");
            setDuration("");
            setWebsiteLink("");
            setFigmaEmbedCode("");
            onUsabilityTestingCreated();
            onClose(); 
        } catch (err) {
            console.error("Error creating usability testing:", err);
            setError(err.message || "Error creating usability testing.");
        }
    };

    const handleNextStep = () => {
        if (testingType) {
            setStep(2);
        } else {
            setError("Please select either Prototype or Website.");
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-xl w-full">
                {/* Title and Close Button Section */}
                <div className="flex items-center justify-between p-3 bg-gray-100 rounded-t-lg relative">
                    <h2 className="font-semibold font-funnel text-lg">Create Usability Testing</h2>
                    <button
                        onClick={onClose}
                        className="text-black bg-white hover:bg-gray-200 rounded-lg border border-gray-300 p-1"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Divider */}
                <div className="w-full h-[1px] bg-gray-300"></div>

                {/* Step 1: Choose Testing Type */}
                {step === 1 && (
                    <div className="bg-white w-full p-6 h-[420px] overflow-y-auto">
                        <h3 className="text-lg mt-4 mb-4">What do you perform usability testing on?</h3>
                        <div className="flex gap-4">
                            <div
                                onClick={() => setTestingType("prototype")}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => e.key === "Enter" && setTestingType("prototype")}
                                className={`border w-1/2 aspect-square rounded-lg overflow-hidden bg-cover bg-center cursor-pointer ${
                                    testingType === "prototype" ? "ring-2 ring-[#C4BDED]" : "hover:bg-gray-100"
                                }`}
                                style={{
                                    backgroundImage: "url('/static/images/prototype.png')",
                                }}
                            >
                                <div className="flex items-end h-full p-4 text-black font-semibold">
                                    Prototype
                                </div>
                            </div>

                            <div
                                onClick={() => setTestingType("website")}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => e.key === "Enter" && setTestingType("website")}
                                className={`border w-1/2 aspect-square rounded-lg overflow-hidden bg-cover bg-center cursor-pointer ${
                                    testingType === "website" ? "ring-2 ring-[#C4BDED]" : "hover:bg-gray-100"
                                }`}
                                style={{
                                    backgroundImage: "url('/static/images/website.png')",
                                }}
                            >
                                <div className="flex items-end h-full p-4 text-black font-semibold">
                                    Website
                                </div>
                            </div>

                        </div>

                        {error && (
                            <div className="text-red-500 font-funnel mb-4 p-2 bg-red-50 rounded-md">
                                {error}
                            </div>
                        )}
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={handleNextStep}
                                className="bg-[#C4BDED] text-black py-2 px-4 rounded-lg hover:bg-[#ACA3E3]"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 2: Form based on selected type */}
                {step === 2 && (
                    <div className="bg-white w-full p-6 h-[510px] overflow-y-auto">  
                        <form onSubmit={handleSubmit}>
                            <label className="block mb-2">Title:</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full p-2 mb-4 rounded border"
                                required
                            />

                            <label className="block mb-2">Task Steps:</label>
                            {task.map((step, index) => (
                                <div key={index} className="flex items-center mb-2">
                                    <input
                                        type="text"
                                        value={step}
                                        onChange={(e) => {
                                            const newTasks = [...task];
                                            newTasks[index] = e.target.value;
                                            setTask(newTasks);
                                        }}
                                        className="w-full p-2 rounded border"
                                        placeholder={`Step ${index + 1}`}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const newTasks = task.filter((_, i) => i !== index);
                                            setTask(newTasks);
                                        }}
                                        className="ml-2 text-red-500 hover:text-red-700"
                                    >
                                    ✕
                                    </button>
                                </div>
                            ))}

                            <button
                                type="button"
                                onClick={() => setTask([...task, ""])}
                                className="mt-2 mb-4 bg-[#C4BDED] text-black py-1 px-3 rounded-lg hover:bg-[#ACA3E3]"
                            >
                                + Add Step
                            </button>

                            <label className="block mb-2">Duration of the test:</label>
                            <input
                                type="number"
                                value={duration}
                                min="1"
                                //onChange={(e) => setDuration(e.target.value)}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    // Prevent negative or zero values
                                    if (val === "" || parseInt(val) >= 1) {
                                        setDuration(val);
                                    }
                                }}
                                className="w-full p-2 mb-4 rounded border"
                                required
                            />

                            {testingType === "website" && (
                                <>
                                    <label className="block mb-2">Website Link:</label>
                                    <input
                                        type="url"
                                        value={websiteLink}
                                        onChange={(e) => setWebsiteLink(e.target.value)}
                                        className="w-full p-2 mb-4 rounded border"
                                        required
                                    />
                                </>
                            )}

                            {testingType === "prototype" && (
                                <>
                                    <label className="block mb-2">Figma Protoype Link:</label>
                                    <textarea
                                        value={figmaEmbedCode}
                                        onChange={(e) => setFigmaEmbedCode(e.target.value)}
                                        className="w-full p-2 mb-4 rounded border"
                                        required
                                    />
                                </>
                            )}

                            {error && (
                                <div className="text-red-500 font-funnel mb-4 p-2 bg-red-50 rounded-md">
                                    {error}
                                </div>
                            )}
                            {success && <p className="text-green-500 mb-4">{success}</p>}

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="bg-[#C4BDED] text-black py-2 px-4 rounded-lg hover:bg-[#ACA3E3]"
                                >
                                    Create Usability Testing
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Divider */}
                <div className="w-full h-[1px] bg-gray-300"></div>

                {/* Bottom and Close Button Section */}
                <div className="flex items-center font-funnel justify-between p-3 bg-gray-100 rounded-b-lg relative">
                    <h2 className="font-semibold text-base">Koalytics</h2>
                </div>
            </div>
        </div>
    )
}
export default CreateUsabilityTesting; 