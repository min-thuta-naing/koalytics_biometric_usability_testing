import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Pencil, SquarePlus } from 'lucide-react';
// import CreateSurveyForms from './CreateForms'; 

const AddProjectDetail = () => {
    const { projectId } = useParams(); // Get projectId from URL
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);


    const [project, setProject] = useState(null);

    const [projectName, setProjectName] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const [organization, setOrganization] = useState("");
    const [maxParticipants, setMaxParticipants] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [sideNotes, setSideNotes] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddCriteriaModal, setShowAddCriteriaModal] = useState(false);

    const [showSUSForm, setShowSUSForm] = useState(false);


    // Fetch project details on component mount
    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/project/${projectId}/`);
                if (response.ok) {
                    const data = await response.json();
                    setProject(data);
                    setProjectName(data.name || "");
                    setProjectDescription(data.description || "");
                    setOrganization(data.organization || "");
                    setMaxParticipants(data.max_participants || "");
                    setStartDate(data.start_date || "");
                    setEndDate(data.end_date || "");
                    setSideNotes(data.side_notes || "");
                } else {
                    setError("Failed to load project details.");
                }
            } catch (error) {
                console.error("Error fetching project:", error);
                setError("Error fetching project data.");
            }
        };
        fetchProject();
    }, [projectId]);


    // Helper to get CSRF token from cookies
    const getCSRFToken = () => {
        const cookie = document.cookie
            .split("; ")
            .find((row) => row.startsWith("csrftoken="));
        return cookie ? cookie.split("=")[1] : "";
    };

    // Handle form submission to update project details
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/update_project/${projectId}/`, {
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
                throw new Error(data.error || "Failed to update project.");
            }

            setSuccess("Project details updated successfully!");
            setShowEditModal(false);
            setTimeout(() => window.location.reload(), 2000); // Redirect after editing successful
        } catch (err) {
            console.error("Error updating project:", err);
            setError(err.message || "Error updating project.");
        }
    };

    if (!project) return <p>Loading project details...</p>;

    // retrieveing user data from db  
    const fetchForms = async (userId) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/user/${userId}/`);
            if (response.ok) {
                const data = await response.json();
                setProjects(data.projects);
            }
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    };
    // const handleFormCreated = () => {
    //     fetchForms(userId);
    //     setShowSUSForm(false);
    // };

    return (
        <div>
            {/* Project Cover Image */}
            <div className="relative">
                <img
                    src="/static/images/coverphoto.jpg"
                    alt="Project Image"
                    className="w-full h-[20vh] object-cover"
                />
                <h1 className="absolute bottom-4 left-8 text-4xl font-semibold text-white">
                    {project.name}
                </h1>
            </div>


            <div className="grid grid-cols-2 p-8 gap-10"> 
                <div className="bg-violet-100 p-8 rounded-lg" > 
                    <div className="flex justify-between items-center mb-4"> 
                        <h2 className="text-xl font-semibold mb-4">Project Information</h2>
                        <button
                            className="bg-teal-600 text-white p-2 rounded-full hover:bg-teal-700"
                            onClick={() => setShowEditModal(true)}
                        >
                            <Pencil />
                        </button>
                    </div>
                    <p><strong>Project Name:</strong> {project.name}</p>
                    <p><strong>Project Description:</strong> {project.description}</p>
                    <p><strong>Organization:</strong> {project.organization}</p>
                    <p><strong>Maximum Participant:</strong> {project.max_participants}</p>
                    <p><strong>Project Start Date:</strong> {project.start_date}</p>
                    <p><strong>Project End Date:</strong> {project.end_date}</p>
                    <p><strong>Side Note:</strong> {project.side_notes}</p>
                </div>

                {/* Edit Project Modal */}
                {showEditModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full relative">
                            <button
                                className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
                                onClick={() => setShowEditModal(false)}
                            >
                                ✕
                            </button>
                            <h2 className="text-xl font-semibold mb-6">Edit Project Details</h2>

                            {error && <p className="text-red-500 mb-4">{error}</p>}
                            {success && <p className="text-green-500 mb-4">{success}</p>}

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

                                <button
                                    type="submit"
                                    className="bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700"
                                >
                                    Save Changes
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                <div className="bg-violet-100 p-8 rounded-lg" > 
                    <div className="flex justify-between items-center mb-4"> 
                        <h2 className="text-xl font-semibold mb-4">Project Criteria</h2>
                        <button
                            className="bg-teal-600 text-white p-2 rounded-full hover:bg-teal-700"
                            onClick={() => setShowAddCriteriaModal(true)}
                        >
                            <SquarePlus />
                        </button>
                    </div>
                </div>
                {showAddCriteriaModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"> 
                        <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full relative">
                            <button
                                className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
                                onClick={() => setShowAddCriteriaModal(false)}
                            >
                                ✕
                            </button>
                            <h2 className="text-xl font-semibold mb-6">Add Project Criteria</h2>

                            {error && <p className="text-red-500 mb-4">{error}</p>}
                            {success && <p className="text-green-500 mb-4">{success}</p>}
                            <form>

                            </form>
                        </div>
                    </div> 
                )}
            </div>

            <div className="grid grid-cols-2 p-8 gap-10"> 
                <div> 
                    <div className="flex justify-between items-center py-3 px-12 border-b border-gray-300">
                        <div className="flex flex-col gap-2">
                            <h1 className="font-semibold text-xl">Create a Survey Form</h1>
                            <p>You can create forms using questions.</p>
                        </div>
                        <button
                            onClick={() => setShowSUSForm(true)}
                            className="bg-violet-400 text-black text-sm px-4 py-2 w-40 h-12 rounded-lg hover:bg-violet-500 border border-gray-400"
                        >
                            Create Survey Form
                        </button>
                    </div>
                    {/* Popup Modal */}
                    {showSUSForm && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                            <div className="bg-white p-8 rounded-lg shadow-xl max-w-2xl w-full relative">
                                <button
                                    onClick={() => setShowSUSForm(false)}
                                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
                                >
                                    ✕
                                </button>
                                {/* <CreateSurveyForms
                                    onCancel={() => setShowSUSForm(false)} 
                                    userId={userId} 
                                    onFormCreated={handleFormCreated}
                                /> */}
                            </div>
                        </div>
                    )}
                </div>
                <div>
                    {/* <div className="flex justify-between items-center py-3 px-12 border-b border-gray-300">
                        <div className="flex flex-col gap-2">
                            <h1 className="font-semibold text-xl">Create a Survey Form</h1>
                            <p>You can create forms using questions.</p>
                        </div>
                        <button
                            onClick={() => setShowSUSForm(true)}
                            className="bg-violet-400 text-black text-sm px-4 py-2 w-40 h-12 rounded-lg hover:bg-violet-500 border border-gray-400"
                        >
                            Create Biometric Usability Testing
                        </button>
                    </div> */}
                </div>
            </div> 

        </div>
    );
};

export default AddProjectDetail;
