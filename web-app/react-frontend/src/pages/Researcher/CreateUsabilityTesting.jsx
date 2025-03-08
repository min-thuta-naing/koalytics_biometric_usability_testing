import { useState } from "react";

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
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full relative">
                <button
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
                    onClick={onClose}
                >
                    ✕
                </button>
                <h2 className="text-xl font-semibold mb-6">Create Usability Testing</h2>

                {error && <p className="text-red-500 mb-4">{error}</p>}
                {success && <p className="text-green-500 mb-4">{success}</p>}

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

                    <button
                        type="submit"
                        className="bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700"
                    >
                        Create Usability Testing
                    </button>
                </form>
            </div>
        </div>
    )
}
export default CreateUsabilityTesting; 