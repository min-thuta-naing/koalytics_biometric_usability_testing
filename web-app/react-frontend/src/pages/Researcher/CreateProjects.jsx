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

    // submit the form logic 
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!userId) {
            setError("User not found. Please log in.");
            return;
        }

        try {
            const response = await fetch(`http://127.0.0.1:8000/create_project/${userId}/`, { //create_project from view.py 
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

                <div className="flex items-center gap-4">
                    <label className="font-medium w-24">Name:</label>
                    <input
                        type="text"
                        placeholder="Add Project Name"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        className="border border-gray-300 p-3 rounded-lg flex-1"
                        required
                    />
                </div>

                <div className="flex items-center gap-4">
                    <label className="font-medium w-24">Description:</label>
                    <textarea
                        placeholder="Add Project Description"
                        value={projectDescription}
                        onChange={(e) => setProjectDescription(e.target.value)}
                        className="border border-gray-300 p-3 rounded-lg flex-1"
                        rows="3"
                        required
                    />
                </div>

                <div className="flex items-center gap-4">
                    <label className="font-medium w-24">Organization:</label>
                    <select
                        value={organization}
                        onChange={(e) => setOrganization(e.target.value)}
                        className="border border-gray-300 p-3 rounded-lg flex-1"
                        required
                        style={{ color: organization ? 'black' : '#9CA3AF' }}
                    >
                        <option value="" disabled >
                            Select Organization
                        </option>
                        <option value="company">Company</option>
                        <option value="school">School</option>
                        <option value="college">College</option>
                        <option value="institution">Institution</option>
                        <option value="university">University</option>
                        <option value="freelance">Freelance</option>
                    </select>
                </div>

                <div className="flex items-center gap-4">
                    <label className="font-medium w-24">Participant number:</label>
                    <input
                        type="number"
                        placeholder="Maximun Participant Number"
                        value={maxParticipants}
                        onChange={(e) => setMaxParticipants(e.target.value)}
                        className="border border-gray-300 p-3 rounded-lg flex-1"
                        required
                    />
                </div>
                    
                <div className="flex items-center gap-4">
                    <label className="font-medium w-24">Start Date:</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="border border-gray-300 p-3 rounded-lg flex-1"
                        required
                    />
                </div>

                <div className="flex items-center gap-4">
                    <label className="font-medium w-24">End Date:</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="border border-gray-300 p-3 rounded-lg flex-1"
                        required
                    />
                </div>
               

                <div className="flex items-center gap-4">
                    <label className="font-medium w-24">Side Notes:</label>
                    <textarea
                        placeholder="Add Sidenotes"
                        value={sideNotes}
                        onChange={(e) => setSideNotes(e.target.value)}
                        className="border border-gray-300 p-3 rounded-lg flex-1"
                        rows="2"
                        required
                    />
                </div>
                

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
