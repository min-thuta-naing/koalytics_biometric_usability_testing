import { useState } from "react";

const NewProjectPage = ({ onCancel, userId, onProjectCreated }) => {

    const [projectName, setProjectName] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!userId) {
            setError("User not found. Please log in.");
            return;
        }

        try {
            const response = await fetch(`http://127.0.0.1:8000/create_project/${userId}/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: projectName,
                    description: projectDescription,
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error("Failed to create project.");
            }

            alert("Project Created!");
            onProjectCreated();
            onCancel();
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <h2 className="font-semibold text-3xl mb-6">Create a New Project</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Project Name"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="border border-gray-300 p-3 rounded-lg"
                    required
                />
                <textarea
                    placeholder="Project Description"
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    className="border border-gray-300 p-3 rounded-lg"
                    required
                />
                <div className="flex justify-end gap-4">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="text-gray-500 hover:underline"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-violet-500 text-white px-4 py-2 rounded-lg hover:bg-violet-600"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NewProjectPage;
