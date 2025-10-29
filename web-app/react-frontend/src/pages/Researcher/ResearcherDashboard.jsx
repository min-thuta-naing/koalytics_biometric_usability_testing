import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CreateProjects from "./Project/CreateProjects";
import { EllipsisVertical,X, Trash, Trash2, Trash2Icon, Menu, Pencil } from "lucide-react";

const ResearcherDashboard = () => {
    const API_URL = process.env.REACT_APP_API_URL;
    const [user, setUser] = useState(null);
    const [userId, setUserId] = useState(null);
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [projects, setProjects] = useState([]);
    const [sharedProjects, setSharedProjects] = useState([]);
    const [showDropdown, setShowDropdown] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [projectToDelete, setProjectToDelete] = useState(null);
    const [selectedTab, setSelectedTab] = useState("projects");
    const navigate = useNavigate();

    // Helper to get CSRF token from cookies
    const getCSRFToken = () => {
        const cookie = document.cookie
            .split("; ")
            .find((row) => row.startsWith("csrftoken="));
        return cookie ? cookie.split("=")[1] : "";
    };

    // Retrive user from local storage ////////////////////////////////////////////////
    useEffect(() => {
        const getUserData = async () => {
            try {
                const storedUser = localStorage.getItem("user");
                if (!storedUser) {
                    console.error("No user data found in localStorage");
                    return;
                }

                const userData = JSON.parse(storedUser);
                let userId;
                
                // Handle both nested and direct user structures
                if (userData.user && userData.user.id) {
                    userId = userData.user.id;
                    setUser(userData.user);
                } else if (userData.id) {
                    userId = userData.id;
                    setUser(userData); 
                } else {
                    console.error("User ID not found in stored data");
                    return;
                }

                setUserId(userId);
                await fetchProjects(userId);
                await fetchSharedProjects(userId);
                
            } catch (error) {
                console.error("Error retrieving user data:", error);
            }
        };

        getUserData();
    }, []);

    // FETCH PROJECTS with user id ////////////////////////////////////////////////
    const fetchProjects = async (userId) => {
        try {
            const response = await fetch(`${API_URL}user/${userId}/`);
            if (response.ok) {
                const data = await response.json();
                setProjects(data.projects);
            }
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    };

    // FETCH PROJECT from collaboration ////////////////////////////////////////////
    const fetchSharedProjects = async (userId) => {
        try {
            const response = await fetch(`${API_URL}shared_projects/${userId}/`);
            if (response.ok) {
                const data = await response.json();
                setSharedProjects(data);
            }
        } catch (error) {
            console.error("Error fetching shared projects:", error);
        }
    };
    
    // handle project creation ///////////////////////////////////////
    const handleProjectCreated = () => {
        fetchProjects(userId);
        //setShowProjectForm(false);
    };

    // handle project deletion //////////////////////////////////////
    const handleDeleteClick = (projectId) => {
        setProjectToDelete(projectId);
        setShowConfirmModal(true);
    };

    const confirmDeleteProject = async () => {
        if (!projectToDelete) return;

        try {
            const response = await fetch(`${API_URL}delete_project/${projectToDelete}/`, {
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
            {/* New project creation button */}
            <div className="flex justify-between items-center py-3 px-12 border-b border-gray-400">
                <div className="flex flex-col gap-2">
                    <h1 className="font-funnel font-semibold text-xl">{user ? `Welcome Back ${user.first_name}!` : "loading ..."}</h1>
                    <h1 className="font-funnel font-semibold text-xl">Create your new projects here.</h1>
                    <p className="font-funnel">Let's get started with Koalytics!</p>
                </div>
                <button
                    onClick={() => setShowProjectForm(true)}
                    className="bg-[#C4BDED] font-funnel text-black text-sm px-4 py-2 rounded-lg shadow hover:bg-[#ACA3E3]"
                >
                    Create New Project
                </button>
            </div>

            {/* Tabs Section */}
            <div className="px-12 mt-8">
                <div className="flex gap-6 border-b border-gray-300 mb-6">
                    <button
                        onClick={() => setSelectedTab("projects")}
                        className={`pb-2 font-funnel font-semibold text-lg ${
                            selectedTab === "projects" ? "border-b-2 border-[#C4BDED]" : "text-gray-500"
                        }`}
                    >
                        Projects
                    </button>
                    <button
                        onClick={() => setSelectedTab("shared")}
                        className={`pb-2 font-funnel font-semibold text-lg ${
                            selectedTab === "shared" ? "border-b-2 border-[#C4BDED]" : "text-gray-500"
                        }`}
                    >
                        Shared Projects
                    </button>
                </div>

                {/* Tab Content */}
                {selectedTab === "projects" && (
                    <>
                        {/* <h1 className="font-funnel font-semibold text-xl gap-2">Projects</h1> */}
                        <p className="font-funnel">Here are your own current projects...</p>
                        <div className="relative z-0 grid grid-cols-3 gap-6 mt-6">
                            {projects.map((project) => (
                                <div
                                    key={project.id}
                                    className="w-80 relative cursor-pointer transition-transform duration-300 hover:-translate-y-2 shadow-xl rounded-3xl overflow-hidden bg-white"
                                    onClick={() => navigate(`/project/${project.id}`)}
                                >
                                    <div className="absolute top-2 right-2 z-10">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation(); // Prevent navigating to project page
                                                setShowDropdown(showDropdown === project.id ? null : project.id);
                                            }}
                                            className="p-2 rounded-full bg-white border border-gray-500 hover:bg-gray-200"
                                        >
                                            <Menu size={22}/>
                                        </button>

                                        {showDropdown === project.id && (
                                            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden animate-fadeIn z-30">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation(); // Prevent navigating to project page
                                                        navigate(`/project/${project.id}`);
                                                        setShowDropdown(null);
                                                    }}
                                                    className="flex items-center gap-2 w-full px-4 py-2 text-left text-gray-700 hover:bg-[#ACA3E3] transition"
                                                >
                                                    <Pencil size={18} />
                                                    <span>Edit project</span>
                                                </button>
                                                <div className="h-px bg-gray-200"></div>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation(); // Prevent navigating to project page
                                                        handleDeleteClick(project.id);
                                                        setShowDropdown(null);
                                                    }}
                                                    className="flex items-center gap-2 w-full px-4 py-2 text-left text-red-600 hover:bg-red-200 transition"
                                                >
                                                    <Trash2 size={18} />
                                                    <span>Delete project</span>
                                                </button>                                                
                                            </div>
                                        )}
                                    </div>
        
                                    <div
                                        className="h-56 rounded-t-3xl shadow-md hover:shadow-lg border border-gray-400 bg-cover bg-center"
                                        style={{ 
                                            backgroundImage: project.image_path 
                                                ? `url(${project.image_path})`
                                                : `url(${API_URL}/static/images/projectbg.png)`
                                        }}
                                    />

                                    <div className="h-14 flex items-center justify-center bg-[#C4BDED] rounded-b-3xl border border-t-0 border-gray-400">
                                        <h2 className="font-semibold font-funnel text-lg text-black text-center truncate px-3">
                                        {project.name}
                                        </h2>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {selectedTab === "shared" && (
                    <>
                        {/* <h1 className="font-funnel font-semibold text-xl gap-2">Shared Projects</h1> */}
                        <p className="font-funnel">Here are the projects shared by other researchers with you ...</p>
                        <div className="relative z-0 grid grid-cols-3 gap-6 mt-6">
                            {sharedProjects.map((project) => (
                                <div 
                                    key={project.id} 
                                    className="w-80 relative cursor-pointer transition-transform duration-300 hover:-translate-y-2 shadow-xl rounded-3xl overflow-hidden bg-white"
                                    onClick={() => navigate(`/project/${project.id}`)}
                                >
                                    {/* <div  className="cursor-pointer">
                                        <h2 className="text-xl font-semibold">{project.name}</h2>
                                        <p className="text-gray-600 mt-2">{project.description}</p>
                                    </div> */}
                                    <div
                                        className="h-56 rounded-t-3xl shadow-md hover:shadow-lg border border-gray-400 bg-cover bg-center"
                                        style={{ 
                                            backgroundImage: project.image_path 
                                                ? `url(${API_URL}${project.image_path})`
                                                : `url(${API_URL}/static/images/projectbg.png)`
                                        }}
                                    />

                                    <div className="h-14 flex items-center justify-center bg-[#C4BDED] rounded-b-3xl border border-t-0 border-gray-400">
                                        <h2 className="font-semibold font-funnel text-lg text-black text-center truncate px-3">
                                        {project.name}
                                        </h2>
                                    </div>
                                    <div className="h-10 flex items-center justify-center bg-white rounded-b-3xl border border-t-0 border-gray-400">
                                        <div className="mt-2 text-sm text-gray-500 text-center italic">Shared by another researcher</div>
                                    </div>
                                    
                                </div>

                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* Delete Confirmation Pop up */}
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
            {showProjectForm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-5xl w-full relative flex flex-col">
                        {/* Project Creation Form Section */}
                        <div>
                            <CreateProjects 
                                onCancel={() => setShowProjectForm(false)} 
                                userId={userId} 
                                onProjectCreated={handleProjectCreated}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ResearcherDashboard;