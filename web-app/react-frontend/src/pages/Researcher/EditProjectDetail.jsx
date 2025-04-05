import { useState, useEffect } from "react";
import {X} from "lucide-react"; 

const EditProjectDetail = ({onCancel, projectId, onProjectEdited, project, setShowEditModal}) => {

    const [projectName, setProjectName] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const [organization, setOrganization] = useState("");
    const [maxParticipants, setMaxParticipants] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [sideNotes, setSideNotes] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    // this pass the data from ProjectDetail and helps prevent the empty form when open the pop up
    useEffect(() => {
        if (project) {
            setProjectName(project.name || "");
            setProjectDescription(project.description || "");
            setOrganization(project.organization || "");
            setMaxParticipants(project.max_participants || "");
            setStartDate(project.start_date || "");
            setEndDate(project.end_date || "");
            setSideNotes(project.side_notes || "");
        }
    }, [project]); 


    // Helper to get CSRF token from cookies
    const getCSRFToken = () => {
        const cookie = document.cookie
            .split("; ")
            .find((row) => row.startsWith("csrftoken="));
        return cookie ? cookie.split("=")[1] : "";
    };

    // submit the form logic 
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/update_project/${projectId}/`, { //update_project from view.py 
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": getCSRFToken(), 
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

            setSuccess("Project details updated successfully.");
            onProjectEdited();
            onCancel();
            setTimeout(() => window.location.reload(), 2000); // Redirect after editing successful
        } catch (err) {
            console.error("Error updating project:", err);
            setError(err.message || "Error updating project.");
        }
    };


    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">

                {/* Title and Close Button Section */}
                <div className="flex items-center justify-between p-3 bg-gray-100 rounded-t-lg relative">
                    <h2 className="font-semibold font-funnel text-lg">Edit Project Details</h2>
                    <button
                        onClick={() => setShowEditModal(false)}
                        className="text-black bg-white hover:bg-gray-200 rounded-lg border border-gray-300 p-1"
                    >
                        <X className="w-4 h-4" />
                    </button>

                </div>

                {/* Divider */}
                <div className="w-full h-[1px] bg-gray-300"></div>

                <div className="bg-white w-full p-6 h-[600px] overflow-y-auto"> 
                    <form onSubmit={handleSubmit}>
                        <label>Project Name:</label>
                        <input
                            type="text"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                            className="w-full p-2 mb-4 rounded border"
                        />

                        <label>Project Description:</label>
                        <textarea
                            value={projectDescription}
                            onChange={(e) => setProjectDescription(e.target.value)}
                            className="w-full p-2 mb-4 rounded border"
                            rows="2"
                        />

                        <label>Organization:</label>
                        <select
                            value={organization}
                            onChange={(e) => setOrganization(e.target.value)}
                            className="w-full p-2 mb-4 rounded border"
                        >
                            <option value="company">Company</option>
                            <option value="school">School</option>
                            <option value="college">College</option>
                            <option value="institution">Institution</option>
                            <option value="university">University</option>
                            <option value="freelance">Freelance</option>
                        </select>

                        <label>Max Participants:</label>
                        <input
                            type="number"
                            value={maxParticipants}
                            onChange={(e) => setMaxParticipants(e.target.value)}
                            className="w-full p-2 mb-4 rounded border"
                        />

                        <label>Start Date:</label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="w-full p-2 mb-4 rounded border"
                        />

                        <label>End Date:</label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="w-full p-2 mb-4 rounded border"
                        />

                        <label>Side Notes:</label>
                        <textarea
                            value={sideNotes}
                            onChange={(e) => setSideNotes(e.target.value)}
                            className="w-full p-2 mb-4 rounded border"
                            rows="2"
                        />

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="bg-[#C4BDED] text-black py-2 px-4 rounded-lg hover:bg-[#ACA3E3]"
                            >
                                Save Changes
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

export default EditProjectDetail; 

