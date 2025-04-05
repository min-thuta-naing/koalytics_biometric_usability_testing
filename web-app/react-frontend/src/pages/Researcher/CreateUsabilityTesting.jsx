import { useState } from "react";
import { X } from "lucide-react";

const CreateUsabilityTesting = ({ onClose, projectId, onUsabilityTestingCreated }) => {

    const [title, setTitle] = useState("");
    const [task, setTask] = useState("");
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

    // Handle usability testing submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const response = await fetch(`http://127.0.0.1:8000/projects/${projectId}/usability-testing/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": getCSRFToken(),
                },
                body: JSON.stringify({ 
                    title, 
                    task, 
                    duration,
                    website_link: websiteLink,
                    figma_embed_code: figmaEmbedCode
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to create usability testing.");
            }

            //alert("Usability testing created successfully!");
            setTitle("");
            setTask(""); 
            setDuration(""); 
            setWebsiteLink(""); 
            setFigmaEmbedCode(""); 
            onUsabilityTestingCreated(); 
            onClose(); // Close modal after success
        } catch (err) {
            console.error("Error creating usability testing:", err);
            setError(err.message || "Error creating usability testing.");
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">

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
                
                <div className="bg-white w-full p-6 h-[600px] overflow-y-auto">  
                    <form onSubmit={handleSubmit}>
                        <label className="block mb-2">Title:</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-2 mb-4 rounded border"
                            required
                        />

                        <label className="block mb-2">Task:</label>
                        <textarea
                            type="text"
                            value={task}
                            onChange={(e) => setTask(e.target.value)}
                            className="w-full p-2 mb-4 rounded border"
                            required
                        />

                        <label className="block mb-2">Duration of the test:</label>
                        <input
                            type="number"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            className="w-full p-2 mb-4 rounded border"
                            required
                        />

                        <label className="block mb-2">Website Link:</label>
                        <input
                            type="url"
                            value={websiteLink}
                            onChange={(e) => setWebsiteLink(e.target.value)}
                            className="w-full p-2 mb-4 rounded border"
                            required
                        />

                        <label className="block mb-2">Figma Embed Code:</label>
                        <textarea
                            value={figmaEmbedCode}
                            onChange={(e) => setFigmaEmbedCode(e.target.value)}
                            className="w-full p-2 mb-4 rounded border"
                            required
                        />

                        {error && <p className="text-red-500 mb-4">{error}</p>}
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