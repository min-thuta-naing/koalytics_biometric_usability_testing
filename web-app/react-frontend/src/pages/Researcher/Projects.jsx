import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CreateProjects from "./CreateProjects";

const Projects = () => {
    const [userId, setUserId] = useState(null);
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Retrieve user from local storage
        const user = JSON.parse(localStorage.getItem("user"));
        if (user && user.id) {
            setUserId(user.id);
            fetchProjects(user.id);
        }
    }, []);

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
                        <div
                            key={project.id}
                            className="p-6 bg-white border rounded-lg shadow-md cursor-pointer hover:shadow-lg"
                            onClick={() => navigate(`/project/${project.id}`)}
                        >
                            <h2 className="text-xl font-semibold">{project.name}</h2>
                            <p className="text-gray-600 mt-2">{project.description}</p>
                        </div>
                    ))}
                </div>
            </div>

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
