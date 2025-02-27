import { useState } from "react";

const CreateProjects = ({ onCancel, userId, onProjectCreated }) => {

    const [projectName, setProjectName] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const [organization, setOrganization] = useState("");
    const [maxParticipants, setMaxParticipants] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [sideNotes, setSideNotes] = useState("");

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
                    organization: organization,
                    max_participants: maxParticipants ? parseInt(maxParticipants) : null,
                    start_date: startDate,
                    end_date: endDate,
                    side_notes: sideNotes,

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
                    rows="3"
                    required
                />
                <select
                    placeholder ="Organization"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    className="border border-gray-300 p-3 rounded-lg"
                    required
                >
                    <option value="company">Company</option>
                    <option value="school">School</option>
                    <option value="college">College</option>
                    <option value="institution">Institution</option>
                    <option value="university">University</option>
                    <option value="freelance">Freelance</option>
                </select>
                <input
                    type="number"
                    placeholder="Maximun Participant Number"
                    value={maxParticipants}
                    onChange={(e) => setMaxParticipants(e.target.value)}
                    className="border border-gray-300 p-3 rounded-lg"
                    required
                />
                    <div className="flex items-center gap-2">
                    <label className="font-medium">Start Date:</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="border border-gray-300 p-3 rounded-lg flex-1"
                        required
                    />
                </div>

                <div className="flex items-center gap-4">
                    <label className="font-medium">End Date:</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="border border-gray-300 p-3 rounded-lg flex-1"
                        required
                    />
                </div>
                <textarea
                    placeholder="Sidenotes"
                    value={sideNotes}
                    onChange={(e) => setSideNotes(e.target.value)}
                    className="border border-gray-300 p-3 rounded-lg"
                    rows="3"
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

export default CreateProjects;
