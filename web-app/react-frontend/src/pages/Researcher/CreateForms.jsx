import { useState } from "react";

const CreateSurveyForms = ({ onClose, projectId }) => {
    const [title, setTitle] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Function to get CSRF token
    const getCSRFToken = () => {
        const cookie = document.cookie
            .split("; ")
            .find((row) => row.startsWith("csrftoken="));
        return cookie ? cookie.split("=")[1] : "";
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/project/${projectId}/create_form/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": getCSRFToken(),
                },
                body: JSON.stringify({ title }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to create form.");
            }

            alert("Form created successfully!");
            setTitle("");
            onClose(); // Close modal after success
        } catch (err) {
            console.error("Error creating form:", err);
            setError(err.message || "Error creating form.");
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
                <h2 className="text-xl font-semibold mb-6">Create Survey Form</h2>

                {error && <p className="text-red-500 mb-4">{error}</p>}
                {success && <p className="text-green-500 mb-4">{success}</p>}

                <form onSubmit={handleSubmit}>
                    <label className="block mb-2">Form Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2 mb-4 rounded border"
                        required
                    />

                    <button
                        type="submit"
                        className="bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700"
                    >
                        Create Form
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateSurveyForms;
