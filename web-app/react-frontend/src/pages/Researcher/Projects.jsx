import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CreateProjects from "./CreateProjects";
import { EllipsisVertical } from "lucide-react";

const Projects = () => {
    const [userId, setUserId] = useState(null);
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [projects, setProjects] = useState([]);
    const [showDropdown, setShowDropdown] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [projectToDelete, setProjectToDelete] = useState(null);
    const navigate = useNavigate();

    // retrieve user from local storage
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user && user.id) {
            setUserId(user.id);
            fetchProjects(user.id);
        }
    }, []);

    // retrieveing user data from db  
    const fetchProjects = async (userId) => {
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

    const handleProjectCreated = () => {
        fetchProjects(userId);
        setShowProjectForm(false);
    };

    const handleDeleteClick = (projectId) => {
        setProjectToDelete(projectId);
        setShowConfirmModal(true);
    };

    // Helper to get CSRF token from cookies
    const getCSRFToken = () => {
        const cookie = document.cookie
            .split("; ")
            .find((row) => row.startsWith("csrftoken="));
        return cookie ? cookie.split("=")[1] : "";
    };

    const confirmDeleteProject = async () => {
        if (!projectToDelete) return;

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/delete_project/${projectToDelete}/`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": getCSRFToken(),
                },
            });

            if (response.ok) {
                setProjects(projects.filter((project) => project.id !== projectToDelete));
                setShowConfirmModal(false);
                setProjectToDelete(null);
            } else {
                console.error("Failed to delete project");
            }
        } catch (error) {
            console.error("Error deleting project:", error);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center py-3 px-12 border-b border-gray-300">
                <div className="flex flex-col gap-2">
                    <h1 className="font-semibold text-xl">Create a New Project</h1>
                    <p>Let's get started with Koalytics!</p>
                </div>
                <button
                    onClick={() => setShowProjectForm(true)}
                    className="bg-violet-400 text-black text-sm px-4 py-2 w-40 h-12 rounded-lg hover:bg-violet-500 border border-gray-400"
                >
                    New Project
                </button>
            </div>

            <div className="px-12 mt-8">
                <h1 className="font-semibold text-xl gap-2">Projects</h1>
                <p>Here are your current projects...</p>
                <div className="grid grid-cols-3 gap-6 mt-6">
                    {projects.map((project) => (
                        // <div
                        //     key={project.id}
                        //     className="p-6 bg-white border rounded-lg shadow-md cursor-pointer hover:shadow-lg"
                        //     onClick={() => navigate(`/project/${project.id}`)}
                        // >
                        //     <h2 className="text-xl font-semibold">{project.name}</h2>
                        //     <p className="text-gray-600 mt-2">{project.description}</p>
                        // </div>
                        <div key={project.id} className="relative p-6 bg-white border rounded-lg shadow-md">
                            {/* Three-dot dropdown button */}
                            <div className="absolute top-3 right-3">
                                <button onClick={() => setShowDropdown(showDropdown === project.id ? null : project.id)} className="p-2 rounded-full hover:bg-gray-200">
                                    <EllipsisVertical size={20} />
                                </button>
                                {showDropdown === project.id && (
                                    <div className="absolute right-0 mt-2 bg-white border rounded shadow-md">
                                        <button
                                            onClick={() => handleDeleteClick(project.id)}
                                            className="block w-full px-4 py-2 text-red-600 hover:bg-gray-100"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div onClick={() => navigate(`/project/${project.id}`)} className="cursor-pointer">
                                <h2 className="text-xl font-semibold">{project.name}</h2>
                                <p className="text-gray-600 mt-2">{project.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {showConfirmModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <p className="text-lg font-semibold">Are you sure you want to delete this project?</p>
                        <div className="flex justify-end gap-4 mt-4">
                            <button onClick={() => setShowConfirmModal(false)} className="px-4 py-2 bg-gray-300 rounded-lg">
                                Cancel
                            </button>
                            <button onClick={confirmDeleteProject} className="px-4 py-2 bg-red-500 text-white rounded-lg">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Popup Modal */}
            {showProjectForm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-8 rounded-lg shadow-xl max-w-2xl w-full relative">
                        <button
                            onClick={() => setShowProjectForm(false)}
                            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
                        >
                            ✕
                        </button>
                        <CreateProjects 
                            onCancel={() => setShowProjectForm(false)} 
                            userId={userId} 
                            onProjectCreated={handleProjectCreated}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Projects;
