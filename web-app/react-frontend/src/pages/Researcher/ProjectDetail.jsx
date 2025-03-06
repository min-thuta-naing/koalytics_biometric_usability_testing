import { useEffect, useState,useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Pencil, SquarePlus } from 'lucide-react';
import CreateSurveyForms from './CreateForms'; 
import EditProjectDetail from "./EditProjectDetail";
import AddCriteriaForm from './AddCriteriaForm';

const ProjectDetail = () => {
    const { projectId } = useParams(); // Get projectId from URL
    const navigate = useNavigate();
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
    const [showSurveyFormModal, setShowSurveyFormModal] = useState(false);

    const [forms, setForms] = useState([]);

    const [selectedCriteria, setSelectedCriteria] = useState({
        gender: [],
        ageGroup: [],
        interest: [],
    });
    const [tempSelectedCriteria, setTempSelectedCriteria] = useState({
        gender: [],
        ageGroup: [],
        interest: [],
    });
    const [showAddCriteriaModal, setShowAddCriteriaModal] = useState(false);


////////////////////////////////////////////// CRITERIA FUNCTIONS //////////////////////////////////////////////
    // Function to handle checkbox changes in the popup
    const handleCheckboxChange = useCallback((category, value) => {
        setTempSelectedCriteria((prev) => {
            const updatedCategory = prev[category].includes(value)
                ? prev[category].filter((item) => item !== value) // Remove if already selected
                : [...prev[category], value]; // Add if not selected
            return { ...prev, [category]: updatedCategory };
        });
    }, []);
    // Function to confirm the selected criteria
    const confirmCriteria = () => {
        setSelectedCriteria(tempSelectedCriteria);
        setShowAddCriteriaModal(false); // Close the popup
    };

////////////////////////////////////////////// FETCH FORMS //////////////////////////////////////////////
    useEffect(() => {
        const fetchForms = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/project/${projectId}/forms/`);
                if (response.ok) {
                    const data = await response.json();
                    setForms(data.forms);
                } else {
                    console.error("Failed to fetch forms");
                }
            } catch (error) {
                console.error("Error fetching forms:", error);
            }
        };
        fetchForms();
    }, [projectId]);



////////////////////////////////////////////// FETCH PROJECT //////////////////////////////////////////////
    // fetch project with fetchProject function and display the project in the project detail page with useEffect
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

    useEffect(() => {
        fetchProject();
    }, [projectId]);

    // will display this when there is no project 
    if (!project) return <p>Loading project details...</p>;


////////////////////////////////////////////// HANDLE PROJECT EDITION //////////////////////////////////////////////
    const handleProjectEdited = () => {
        fetchProject()
        setShowEditModal(false);
    };




    return (
        <div className="bg-[#F0EEED]">
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

            {/* 2 columns */}
            <div className="grid grid-cols-2 p-8 gap-10"> 
                {/* left column - project details */}
                <div className="bg-white p-8 rounded-lg shadow-md" > 
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
                            <EditProjectDetail 
                                onCancel={()=> setShowEditModal(false)}
                                projectId={projectId}
                                onProjectEdited={handleProjectEdited}
                                project={project} // pass the data to pop up to prevent empty field when open the edit pop up 
                            />
                        </div>
                    </div>
                )}

                {/* right column - project criteria */}
                <div className="bg-white p-8 rounded-lg shadow-md" > 
                    <div className="flex justify-between items-center mb-4"> 
                        <h2 className="text-xl font-semibold mb-4">Project Criteria</h2>
                        <button
                            className="bg-teal-600 text-white p-2 rounded-full hover:bg-teal-700"
                            onClick={() => setShowAddCriteriaModal(true)}
                        >
                            <SquarePlus />
                        </button>
                    </div>

                    <h2 className="text-xl font-semibold mb-6">Edit Project Criteria</h2>

                    <div className="mb-4">
                        <h3 className="font-medium">Gender:</h3>
                        <div className="flex gap-2">
                            {selectedCriteria.gender.map((option) => (
                                <span key={option} className="bg-gray-200 px-2 py-1 rounded">
                                    {option}
                                </span>
                            ))}
                        </div>
                    </div>
                    {/* Age Group */}
                    <div className="mb-4">
                        <h3 className="font-medium">Age Group:</h3>
                        <div className="flex gap-2">
                            {selectedCriteria.ageGroup.map((option) => (
                                <span key={option} className="bg-gray-200 px-2 py-1 rounded">
                                    {option}
                                </span>
                            ))}
                        </div>
                    </div>
                    {/* Interest */}
                    <div className="mb-4">
                        <h3 className="font-medium">Interest:</h3>
                        <div className="flex gap-2">
                            {selectedCriteria.interest.map((option) => (
                                <span key={option} className="bg-gray-200 px-2 py-1 rounded">
                                    {option}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
                {showAddCriteriaModal && (
                    <AddCriteriaForm
                        tempSelectedCriteria={tempSelectedCriteria}
                        handleCheckboxChange={handleCheckboxChange}
                        confirmCriteria={confirmCriteria}
                        setShowAddCriteriaModal={setShowAddCriteriaModal}
                    />
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
                            className="bg-violet-400 text-black text-sm px-4 py-2 w-40 h-12 rounded-lg hover:bg-violet-500 border border-gray-400"
                            onClick={() => setShowSurveyFormModal(true)}

                        >
                            Create Survey Form
                        </button>
                    </div>
                    <div>
                        <p>Here are your current forms:</p>
                        {forms.length === 0 ? (
                            <p>No forms available.</p>
                        ) : (
                            <div className="flex flex-wrap gap-4 mt-4">
                                {forms.map((form) => (
                                    <div 
                                        key={form.id} 
                                        className="p-4 border rounded-lg shadow-md bg-white w-64"
                                    >
                                        {/* <h3 className="text-lg font-semibold">{form.id}</h3>
                                        <h3 className="text-lg font-semibold">{form.title}</h3> */}
                                        <div onClick={()=> navigate(`/form/${form.id}`)}> 
                                            <h3 className="text-lg font-semibold">{form.id}</h3>
                                            <h3 className="text-lg font-semibold">{form.title}</h3>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>


                </div>
                <div>
                    <h1> this is another portion </h1>
                </div>
            </div> 
            {showSurveyFormModal && (
                <CreateSurveyForms 
                    onClose={() => setShowSurveyFormModal(false)} 
                    projectId={projectId} 
                />
            )}
        </div>
    );
};

export default ProjectDetail;

