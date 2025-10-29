import { useEffect, useState,useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Pencil, SquarePlus, EllipsisVertical, ClipboardType, FlaskConical, X, UsersRound, Share, Ban } from 'lucide-react';
import CreateSUSForms from './SUS/CreateForms'; 
import EditProjectDetail from "./EditProjectDetail";
import AddCriteriaForm from './AddCriteriaForm';
import CreateUsabilityTesting from "./UsabilityTest/CreateUsabilityTesting";

const ProjectDashboard = () => {
    const API_URL = process.env.REACT_APP_API_URL;
    const { projectId } = useParams(); 
    const navigate = useNavigate();
    const [project, setProject] = useState(null);

    const [projectName, setProjectName] = useState("");
    const [projectCategory, setProjectCategory] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const [organization, setOrganization] = useState("");
    const [maxParticipants, setMaxParticipants] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [sideNotes, setSideNotes] = useState("");
    const [imagePath, setImagePath] = useState("");
    const [isPublished, setIsPublished] = useState(""); 
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [showCollaboratePopUp, setShowCollaboratePopUp] = useState(false); 
    const [showPublishPopup, setShowPublishPopup] = useState(false);
    const [showUnpublishPopup, setShowUnpublishPopup] = useState(false);

    const [showEditModal, setShowEditModal] = useState(false);
    
    const [showSurveyFormModal, setShowSurveyFormModal] = useState(false);
    const [showUsabilityTestingModal, setShowUsabilityTestingModal] = useState(false); 

    const [showDropdown, setShowDropdown] = useState(null);
    const [formToDelete, setFormToDelete] = useState(null); 
    const [showConfirmModalForm, setShowConfirmModalForm] = useState(false);
    const [usabilityTestingsToDelete, setUsabilityTestingsToDelete] = useState(null); 
    const [showConfirmModalUT, setShowConfirmModalUT] = useState(false);

    const [susforms, setSUSForms] = useState([]);
    const [usabilityTestings, setUsabilityTestings] = useState([]);

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

    // Helper to get CSRF token from cookies
    const getCSRFToken = () => {
        const cookie = document.cookie
            .split("; ")
            .find((row) => row.startsWith("csrftoken="));
        return cookie ? cookie.split("=")[1] : "";
    };

////////////////////////////////////////////// PUBLISH or UN-PUBLISH PROJECT FUNCTIONS //////////////////////////////////////////////
    const handlePublishProject = async () => {
        try {
            const response = await fetch(`${API_URL}projects/${projectId}/publish/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        
            if (!response.ok) {
                throw new Error('Failed to publish project.');
            }
        
            alert('Project Publish successfully!');
            setIsPublished(true); //set the state to true 
            setShowPublishPopup(false);
        } catch (error) {
            alert('Error publish project: ' + error.message);
        }
    };

    const handleUnpublishProject = async () => {
        try {
            const response = await fetch(`${API_URL}projects/${projectId}/unpublish/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (!response.ok) {
                throw new Error('Failed to unpublish project.');
            }
    
            alert('Project unpublished successfully!');
            setIsPublished(false); //set state to false
            setShowUnpublishPopup(false);
        } catch (error) {
            alert('Error unpublishing project: ' + error.message);
        }
    };

////////////////////////////////////////////// COLLABORATION FUNCTIONS //////////////////////////////////////////////
    //search related 
    const [searchQuery, setSearchQuery] = useState("");
    const [results, setResults] = useState([]);
    const [showMailDropdown, setShowMailDropdown] = useState(false);
    const dropdownRef = useRef();
    //currently logged in user retrieved (to be stored as researcher id and email)
    const [userId, setUserId] = useState(null);
    const [userEmail,setUserEmail] = useState(null);
    //for fectching and deletion of collaborators 
    const [collaborators, setCollaborators] = useState([]);
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);

    //search function 
    useEffect(() => {
        if (searchQuery.trim() === "") {
            setResults([]);
            setShowDropdown(false);
            return;
        }

        const delayDebounce = setTimeout(() => {
            fetch(`${API_URL}search-users-by-email?q=${encodeURIComponent(searchQuery)}`)
                .then(res => res.json())
                .then(data => {
                    setResults(data);
                    setShowDropdown(true);
                })
                .catch(err => {
                    console.error("Error fetching users:", err);
                    setShowDropdown(false);
                });
        }, 300);

        return () => clearTimeout(delayDebounce);
    }, [searchQuery]);

    // Close dropdown if click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    //retrieve currently logged in user
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user && user.id) {
            setUserId(user.id);
            setUserEmail(user.email)
        }
    }, []);

    //submit the collaborator 
    const handleAddCollaborator = async () => {
        const selectedUser = results.find(user => user.email === searchQuery);
        if (!selectedUser) {
            alert("Please select a valid user from the list.");
            return;
        }
    
        console.log("Researcher ID:", userId);
        console.log("Researcher Email:", userEmail);

        if (!userId || !userEmail) {
            alert("You must be logged in.");
            return;
        }

        try {
            const res = await fetch(`${API_URL}add-collaborator/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    project_id: projectId,
                    collaborator_id: selectedUser.id,
                    researcher_id: userId,
                    researcher_email: userEmail,
                })
            });
    
            if (res.ok) {
                const data = await res.json();
                //alert(`✅ Added ${data.collaborator_email} as a collaborator.`);
                setSearchQuery("");
                setResults([]);
                setShowDropdown(false);
                fetchCollaborators(); // update real time on the current collaborator list 
            } else {
                const error = await res.json();
                alert("❌ Error: " + error.error);
            }
        } catch (error) {
            console.error("Fetch error:", error);
            alert("Something went wrong.");
        }
    };

    //fetch the collaborators 
    const fetchCollaborators = async () => {
        try {
            const res = await fetch(`${API_URL}get-collaborators/${projectId}/`);
            const data = await res.json();
            setCollaborators(data);
        } catch (err) {
            console.error("Error fetching collaborators", err);
        }
    };
    
    useEffect(() => {
        if (showCollaboratePopUp) {
            fetchCollaborators();
        }
    }, [showCollaboratePopUp]);


    //delete the collaborator 
    const handleRemoveCollaborator = async (collabId) => {
        try {
            await fetch(`${API_URL}delete-collaborator/${collabId}/`, {
                method: "DELETE"
            });
            fetchCollaborators(); // Refresh list after deletion
        } catch (err) {
            console.error("Error removing collaborator", err);
        }
    };

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
    const confirmCriteria = async () => {
        setSelectedCriteria(tempSelectedCriteria); // update local state
        setShowAddCriteriaModal(false); // close modal
    
        try {
            const response = await fetch(`${API_URL}project/${projectId}/save-criteria/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": getCSRFToken(),
                },
                body: JSON.stringify(tempSelectedCriteria),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error saving criteria:", errorData);
            } else {
                const result = await response.json();
                fetchProjectCriteria();
            }
        } catch (err) {
            console.error("Error:", err);
        }
    };

    // Function to fetch the criteria from db 
    useEffect(() => {
        fetchProjectCriteria();
    }, [projectId]);
    
    const fetchProjectCriteria = async () => {
        try {
            const response = await fetch(`${API_URL}project/${projectId}/get-criteria/`);
            if (response.ok) {
                const data = await response.json();
                setSelectedCriteria({
                    gender: data.gender || [],
                    ageGroup: data.age_group || [],
                    interest: data.interest || [],
                });
            } else {
                console.error("No criteria set for this project.");
            }
        } catch (error) {
            console.error("Error fetching project criteria:", error);
        }
    };
    
    
////////////////////////////////////////////// FETCH FORMS //////////////////////////////////////////////
    useEffect(() => {
        fetchSUSForms();
    }, [projectId]);

    const fetchSUSForms = async () => {
        try {
            const response = await fetch(`${API_URL}projects/${projectId}/get-susforms/`);
            if (response.ok) {
                const data = await response.json();
                setSUSForms(data.susforms);
            } else {
                console.error("Failed to fetch forms");
            }
        } catch (error) {
            console.error("Error fetching forms:", error);
        }
    };

////////////////////////////////////////////// FETCH Usability Testings //////////////////////////////////////////////
    useEffect(() => {
        fetchUsabilityTesting();
    }, [projectId]);

    const fetchUsabilityTesting = async () => {
        try {
            const response = await fetch(`${API_URL}projects/${projectId}/usability-testings/`);
            if (response.ok) {
                const data = await response.json();
                setUsabilityTestings(data.usability_testings);
            } else {
                console.error("Failed to fetch usability testings");
            }
        } catch (error) {
            console.error("Error fetching usability testings:", error);
        }
    };

////////////////////////////////////////////// FETCH PROJECT //////////////////////////////////////////////
    // fetch project with fetchProject function and display the project in the project detail page with useEffect
    const fetchProject = async () => {
        try {
            const response = await fetch(`${API_URL}project/${projectId}/`);
            if (response.ok) {
                const data = await response.json();
                console.log("Fetched project:", data); // 👈 check here
                setProject(data);
                setProjectName(data.name || "");
                setProjectCategory(data.category || "");
                setProjectDescription(data.description || "");
                setOrganization(data.organization || "");
                setMaxParticipants(data.max_participants || "");
                setStartDate(data.start_date || "");
                setEndDate(data.end_date || "");
                setSideNotes(data.side_notes || "");
                setImagePath(data.image_path || "")
                setIsPublished(data.is_shared || "")
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
    if (!project) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <div className="text-center">
                <div className="animate-spin border-t-4 border-[#ACA3E3] border-solid rounded-full w-16 h-16 mx-auto"></div>
                    <p className="mt-4 text-xl font-funnel font-semibold text-gray-700">Loading the project, please wait ...</p>
                </div>
            </div>
        );
    }


////////////////////////////////////////////// HANDLE EDIT PROJECT //////////////////////////////////////////////
    const handleProjectEdited = () => {
        fetchProject()
        setShowEditModal(false);
    };

////////////////////////////////////////////// HANDLE CREATE + DELETE SUS FORM //////////////////////////////////////////////
    const handleFormCreated = () => {
        fetchSUSForms(projectId); 
        setShowSurveyFormModal(false);
    }

    const handleDeleteForm = (formId) => {
        setFormToDelete(formId); 
        setShowConfirmModalForm(true); 
    }

    const confirmDeleteForm = async () => {
        if (!formToDelete) return;

        try {
            const response = await fetch(`${API_URL}forms/delete-susforms/${formToDelete}/`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": getCSRFToken(),
                },
            });

            if (response.ok) {
                setSUSForms(susforms.filter((susform) => susform.id !== formToDelete));
                setShowConfirmModalForm(false);
                setFormToDelete(null);
            } else {
                console.error("Failed to delete project");
            }
        } catch (error) {
            console.error("Error deleting project:", error);
        }
    };

////////////////////////////////////////////// HANDLE CREATION + DELETE Usability Testings //////////////////////////////////////////////
    const handleUsabilityTestingCreated = () => {
        fetchUsabilityTesting(projectId);
        setShowUsabilityTestingModal(false);
    }

    const handleDeleteUsabilityTesting = (usabilityTestingId) => {
        setUsabilityTestingsToDelete(usabilityTestingId); 
        setShowConfirmModalUT(true); 
    }

    const confirmDeleteUsabilityTesting = async () => {
        if (!usabilityTestingsToDelete) return;

        try {
            const response = await fetch(`${API_URL}usability-testing/delete/${usabilityTestingsToDelete}/`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                setUsabilityTestings(usabilityTestings.filter((usabilityTesting) => usabilityTesting.id !== usabilityTestingsToDelete));
                setShowConfirmModalUT(false);
                setUsabilityTestingsToDelete(null);
            } else {
                console.error("Failed to delete UT");
            }
        } catch (error) {
            console.error("Error deleting UT:", error);
        }
    };

    const DetailCard = ({ icon, label, value }) => (
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
            <div className="text-sm text-gray-500 flex items-center gap-2 mb-1">
                <span className="text-lg">{icon}</span>
                <span>{label}</span>
            </div>
            <p className="text-base font-medium text-gray-800 break-words">{value}</p>
        </div>
    );
    const formatDate = (dateStr) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateStr).toLocaleDateString('en-US', options);
    };

    const CriteriaCard = ({ label, options, icon }) => (
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
            <div className="text-sm text-gray-500 flex items-center gap-2 mb-2">
                <span className="text-lg">{icon}</span>
                <span>{label}</span>
            </div>
            <div className="flex flex-wrap gap-2">
                {options.length > 0 ? (
                    options.map((option) => (
                        <span
                            key={option}
                            className="bg-[#DCD6F7] text-black px-3 py-1 rounded-full text-sm font-medium"
                        >
                            {option}
                        </span>
                    ))
                ) : (
                    <span className="text-gray-400 italic">No criteria set</span>
                )}
            </div>
        </div>
    );
    
    return (
        <div className="bg-[#F0EEED] h-screen overflow-hidden">
            {/* Project Cover Image */}
            <div className="fixed top-0 left-0 w-full h-full z-10">
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                {/* <img src={`${API_URL}/${project.image_path}`} alt="Project Image" /> */}
                <img
                    src={project.image_path ? `${API_URL}/${project.image_path}` : "/static/images/projectbg.png"}
                    alt="Project Image"
                />
            </div>

            {/* scrollable content */}
            <div className="mx-44 relative z-20 overflow-y-auto h-screen pt-[22vh]-30 font-funnel hide-scrollbar scroll-smooth">
                <div className="flex justify-between items-center mt-32 px-10">
                    <h1 className="font-bold text-5xl text-white drop-shadow-xl">
                        {project.name}
                    </h1>
                    
                    <div className="flex items-center gap-4">
                        {/* collaboratiion means adding other researchers on your project */}
                        <button 
                            className="flex items-center gap-2 px-5 py-2 bg-[#9EC6F3] rounded-xl shadow-md hover:opacity-90 transition"
                            onClick={() => setShowCollaboratePopUp(true)}
                        >
                            <UsersRound className="w-4 h-4" />
                            <span>Collaborate</span>
                        </button>
                        {showCollaboratePopUp && (
                            <div className="font-funnel fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                                <div className="bg-white rounded-lg shadow-lg max-w-xl w-full">
                                    {/* Title and Close Button Section */}
                                    <div className="flex items-center justify-between p-3 bg-gray-100 rounded-t-lg relative">
                                        <h2 className="font-semibold font-funnel text-lg">Add Collabrators to your project</h2>
                                        <button
                                            onClick={() => setShowCollaboratePopUp(false)}
                                            className="text-black bg-white hover:bg-gray-200 rounded-lg border border-gray-300 p-1"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>

                                    {/* Divider */}
                                    <div className="w-full h-[1px] bg-gray-300"/>

                                    {/* main content */} 
                                    <div className="bg-white w-full p-6">
                                        <div className="flex flex-row justify-center items-center gap-2" ref={dropdownRef}>
                                            <div className="relative w-96">
                                                <input
                                                    type="text"
                                                    className="w-full px-6 py-2 border border-gray-300 rounded-full"
                                                    placeholder="Search other researchers by their emails ..."
                                                    value={searchQuery}
                                                    onChange={(e) => setSearchQuery(e.target.value)}
                                                    onFocus={() => {
                                                        if (results.length > 0) setShowDropdown(true);
                                                    }}
                                                />

                                                {showDropdown && results.length > 0 && (
                                                    <ul className="absolute z-10 w-96 mt-1 bg-white border border-gray-300 rounded shadow max-h-48 overflow-y-auto">
                                                        {results.map((user) => (
                                                            <li
                                                                key={user.id}
                                                                className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                                                                onClick={() => {
                                                                    setSearchQuery(user.email);
                                                                    setShowDropdown(false);
                                                                }}
                                                            >
                                                                {user.email}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                            <button
                                                className="bg-[#9EC6F3] text-black px-4 py-2 rounded-md hover:opacity-90 "
                                                onClick={handleAddCollaborator}
                                            >
                                                Add 
                                            </button>
                                        </div>
                                        {collaborators.length > 0 && (
                                            <div className="mt-6">
                                                <h4 className="text-sm font-semibold mb-2">Current Collaborators</h4>
                                                <ul className="max-h-40 overflow-y-auto border rounded p-2 text-sm">
            
                                                    {collaborators.map((c) => (
                                                        <div key={c.id} className="mb-2">
                                                            <div className="flex justify-between items-center py-2">
                                                                <span>{c.collaborator_email}</span>
                                                                <button
                                                                    onClick={() => setConfirmDeleteId(c.id === confirmDeleteId ? null : c.id)}
                                                                    className="text-red-500 text-xs hover:underline"
                                                                >
                                                                    {confirmDeleteId === c.id ? "Cancel" : "Remove"}
                                                                </button>
                                                            </div>

                                                            {/* Expandable confirm delete section */}
                                                            <div
                                                                className={`overflow-hidden transition-all duration-300 ${
                                                                    confirmDeleteId === c.id ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0"
                                                                }`}
                                                            >
                                                                <div className="bg-red-50 p-2 rounded shadow text-xs">
                                                                    <p className="mb-2 text-red-700">Are you sure you want to delete this collaborator?</p>
                                                                    <div className="flex justify-end gap-2">
                                                                        <button
                                                                            onClick={() => setConfirmDeleteId(null)}
                                                                            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
                                                                        >
                                                                            No
                                                                        </button>
                                                                        <button
                                                                            onClick={() => {
                                                                            handleRemoveCollaborator(c.id);
                                                                            setConfirmDeleteId(null);
                                                                            }}
                                                                            className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
                                                                        >
                                                                            Yes, Delete
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>

                                    {/* Divider */}
                                    <div className="w-full h-[1px] bg-gray-300"></div>

                                    {/* Bottom and Close Button Section */}
                                    <div className="flex items-center font-funnel justify-between p-3 bg-gray-100 rounded-b-lg relative">
                                        <h2 className="font-semibold text-base">Koalytics</h2>
                                    </div>
                                </div>
                            </div>
                        )}


                        {/* changing buttons for publish and unpublishing the project based on the state  */}
                        {!isPublished ? (
                            <>
                                <button 
                                    className="flex items-center gap-2 px-5 py-2 bg-[#A1EEBD] rounded-xl shadow-md hover:opacity-90 transition"
                                    onClick={() => setShowPublishPopup(true)}
                                >
                                    <Share className="w-4 h-4" />
                                    <span>Publish</span>
                                </button>

                                {showPublishPopup && (
                                    <div className="font-funnel fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                                        <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                                            <h2 className="text-lg font-semibold mb-4">Confirm Publish</h2>
                                            <p className="text-gray-700 mb-6">Are you sure you want to publish this project?</p>
                                            <div className="flex justify-end gap-4">
                                                <button
                                                    onClick={() => setShowPublishPopup(false)}
                                                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    onClick={handlePublishProject}
                                                    className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
                                                >
                                                    Publish
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </>
                        ) : (
                            <>
                                <button 
                                    className="flex items-center gap-2 px-5 py-2 bg-red-300 rounded-xl shadow-md hover:opacity-90 transition"
                                    onClick={() => setShowUnpublishPopup(true)}
                                >
                                    <Ban className="w-4 h-4" /> {/* 👈 Make sure to import this icon from Lucide */}
                                    <span>Unpublish</span>
                                </button>

                                {showUnpublishPopup && (
                                    <div className="font-funnel fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                                        <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                                            <h2 className="text-lg font-semibold mb-4">Confirm Unpublish</h2>
                                            <p className="text-gray-700 mb-6">Are you sure you want to unpublish this project?</p>
                                            <div className="flex justify-end gap-4">
                                                <button
                                                    onClick={() => setShowUnpublishPopup(false)}
                                                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    onClick={handleUnpublishProject}
                                                    className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
                                                >
                                                    Unpublish
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}

                    </div>
                </div>

                {/* Project Details */}
                <div className="mx-10 my-10 bg-white p-8 rounded-2xl shadow-md border border-gray-100">
                    <div className="flex justify-between items-center border-b pb-4 mb-6">
                        <h2 className="text-2xl font-semibold text-gray-800">Project Overview</h2>
                        <button
                            className="flex items-center gap-2 bg-[#C4BDED] hover:bg-[#ACA3E3] text-black px-4 py-2 rounded-lg rounded-lg shadow transition"
                            onClick={() => setShowEditModal(true)}
                        >
                            <Pencil className="w-4 h-4" />
                            <span>Edit</span>
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-gray-700">
                        {/* First row: 2 columns */}
                        <DetailCard label="Project Name" value={project.name} />
                        <div className="lg:col-span-2">
                            <DetailCard label="Category" value={project.category} />
                        </div>

                        {/* Second row: 3 columns */}
                        <DetailCard label="Organization" value={project.organization} />
                        <DetailCard
                            label="Project Duration"
                            value={
                                <>
                                    <span className="block"><strong>Start:</strong> {formatDate(project.start_date)}</span>
                                    <span className="block"><strong>End:</strong> {formatDate(project.end_date)}</span>
                                </>
                            }
                        />
                        <DetailCard label="Max Participants" value={project.max_participants} />


                        {/* Full-width rows */}
                        <div className="lg:col-span-3">
                            <DetailCard label="Description" value={project.description} />
                        </div>
                        <div className="lg:col-span-3">
                            <DetailCard label="Side Note" value={project.side_notes || "—"} />
                        </div>
                    </div>
                </div>
                {showEditModal && (
                    <EditProjectDetail 
                        onCancel={()=> setShowEditModal(false)}
                        projectId={projectId}
                        onProjectEdited={handleProjectEdited}
                        project={project} // pass the data to pop up to prevent empty field when open the edit pop up 
                        setShowEditModal={setShowEditModal}
                    />    
                )}

                {/* project criteria */}
                <div className="mx-10 my-10 bg-white p-8 rounded-2xl shadow-md border border-gray-100">
                    <div className="flex justify-between items-center border-b pb-4 mb-6">
                        <h2 className="text-2xl font-semibold text-gray-800">Project Criteria</h2>
                        <button
                            className="flex items-center gap-2 bg-[#C4BDED] hover:bg-[#ACA3E3] text-black px-4 py-2 rounded-lg rounded-lg shadow transition"
                            onClick={() => {
                                setTempSelectedCriteria(selectedCriteria); // this line is for the previously selected criteria (from the first time you saved) to be pre-checked in the modal the next time you open the pop up.
                                setShowAddCriteriaModal(true);             
                            }}
                        >
                            <SquarePlus className="w-4 h-4" />
                            <span>Add Project Criteria</span>
                        </button>
                    </div>

                    <h3 className="text-xl font-medium text-gray-700 mb-6">Edit Project Criteria</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700">
                        <CriteriaCard label="Gender" options={selectedCriteria.gender} />
                        <CriteriaCard label="Age Group" options={selectedCriteria.ageGroup}/>
                        <div className="sm:col-span-2">
                            <CriteriaCard label="Interest" options={selectedCriteria.interest} />
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

                <div className="mx-10 my-10 bg-white p-8 rounded-2xl shadow-md border border-gray-100">
                    {/* Header */}
                    <div className="flex justify-between items-center border-b pb-6 mb-6">
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-800">Create SUS Questionnaire</h1>
                            <p className="text-gray-500 mt-1">You can create System Usability Scale (SUS) forms using ten questions.</p>
                        </div>
                        <button
                            className="flex items-center gap-2 bg-[#C4BDED] hover:bg-[#ACA3E3] text-black px-4 py-2 rounded-lg shadow transition"
                            onClick={() => setShowSurveyFormModal(true)}
                        >
                            <ClipboardType className="w-4 h-4" />
                            <span>Create SUS Form</span>
                        </button>
                    </div>

                    {/* Form List */}
                    <div>
                        <p className="text-gray-700 font-medium mb-2">Current Forms:</p>

                        {susforms.length === 0 ? (
                            <p className="text-gray-400 italic">No forms available.</p>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-4">
                                {susforms.map((susform) => (
                                    <div
                                        key={susform.id}
                                        className="relative p-5 bg-[#DCD6F7] border border-[#C4BDED] rounded-xl shadow-sm hover:shadow-md transition cursor-pointer group"
                                        onClick={() => navigate(`/form/${susform.id}`)}
                                    >
                                        {/* Dropdown */}
                                        <div className="absolute top-3 right-3">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setShowDropdown(showDropdown === susform.id ? null : susform.id);
                                                }}
                                                className="p-2 rounded-full bg-[#C4BDED] hover:bg-[#ACA3E3]"
                                            >
                                                <EllipsisVertical size={20} />
                                            </button>

                                            {showDropdown === susform.id && (
                                                <div
                                                    className="absolute right-0 mt-2 bg-white border rounded shadow-md z-10"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <button
                                                        onClick={() => handleDeleteForm(susform.id)}
                                                        className="block w-full px-4 py-2 text-red-600 hover:bg-gray-100 text-left"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="mt-2">
                                            <h3 className="text-md font-semibold text-gray-800 truncate">{susform.susform_title}</h3>
                                            {/* <p className="text-sm text-gray-500 mt-1">Form ID: {susform.id}</p> */}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                {showSurveyFormModal && (
                    <CreateSUSForms 
                        onClose={() => setShowSurveyFormModal(false)} 
                        projectId={projectId} 
                        onFormCreated = {handleFormCreated}
                    />
                )}
                {/* Delete Confirmation Pop up */}
                {showConfirmModalForm && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <p className="text-lg font-semibold">Are you sure you want to delete this form?</p>
                            <div className="flex justify-end gap-4 mt-4">
                                <button onClick={() => setShowConfirmModalForm(false)} className="px-4 py-2 bg-gray-300 rounded-lg">
                                    Cancel
                                </button>
                                <button onClick={confirmDeleteForm} className="px-4 py-2 bg-red-500 text-white rounded-lg">
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="mx-10 my-10 bg-white p-8 rounded-2xl shadow-md border border-gray-100">
                    {/* Header */}
                    <div className="flex justify-between items-center border-b pb-6 mb-6">
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-800">Create Usability Testings</h1>
                            <p className="text-gray-500 mt-1">You can create and manage biometric usability tests.</p>
                        </div>
                        <button
                            className="flex items-center gap-2 bg-[#C4BDED] hover:bg-[#ACA3E3] text-black px-4 py-2 rounded-lg rounded-lg shadow transition"
                            onClick={() => setShowUsabilityTestingModal(true)}
                        >
                            <FlaskConical className="w-4 h-4" />
                            <span>Create Usability Testing</span>
                        </button>
                    </div>

                    {/* Testing List */}
                    <div>
                        <p className="text-gray-700 font-medium mb-2">Current Usability Testings:</p>

                        {usabilityTestings.length === 0 ? (
                            <p className="text-gray-400 italic">No usability testings available.</p>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-4">
                                {usabilityTestings.map((usabilityTesting) => {
                                    const typeLabel = usabilityTesting.website_link
                                        ? "(Website)"
                                        : usabilityTesting.figma_embed_code
                                        ? "(Prototype)"
                                        : "(Unknown)";

                                    return (
                                        <div
                                            key={usabilityTesting.id}
                                            className="relative p-5 bg-[#DCD6F7] border border-[#C4BDED] rounded-xl shadow-sm hover:shadow-md transition cursor-pointer group"
                                            onClick={() => navigate(`/usability_testing/${usabilityTesting.id}`)}
                                        >
                                            {/* Dropdown */}
                                            <div className="absolute top-3 right-3 z-10">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setShowDropdown(showDropdown === usabilityTesting.id ? null : usabilityTesting.id);
                                                    }}
                                                    className="p-2 rounded-full bg-[#C4BDED] hover:bg-[#ACA3E3]"
                                                >
                                                    <EllipsisVertical size={20} />
                                                </button>

                                                {showDropdown === usabilityTesting.id && (
                                                    <div
                                                        className="absolute right-0 mt-2 bg-white border rounded shadow-md z-20"
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        <button
                                                            onClick={() => handleDeleteUsabilityTesting(usabilityTesting.id)}
                                                            className="block w-full px-4 py-2 text-red-600 hover:bg-gray-100 text-left"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Card Content */}
                                            <div className="mt-2">
                                                <h3 className="text-md font-semibold text-gray-800 truncate">
                                                    {usabilityTesting.title}
                                                </h3>
                                                <p className="text-sm text-gray-600 mt-1 italic">{typeLabel}</p>
                                                {/* <p className="text-sm text-gray-500 mt-1">Test ID: {usabilityTesting.id}</p> */}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )} 

                    </div>
                </div>
                {showUsabilityTestingModal && (
                    <CreateUsabilityTesting 
                        onClose={() => setShowUsabilityTestingModal(false)} 
                        projectId={projectId} 
                        onUsabilityTestingCreated = {handleUsabilityTestingCreated}
                    />
                )}
                {/* Delete Confirmation Pop up */}
                {showConfirmModalUT && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <p className="text-lg font-semibold">Are you sure you want to delete this usability testing?</p>
                            <div className="flex justify-end gap-4 mt-4">
                                <button onClick={() => setShowConfirmModalUT(false)} className="px-4 py-2 bg-gray-300 rounded-lg">
                                    Cancel
                                </button>
                                <button onClick={confirmDeleteUsabilityTesting} className="px-4 py-2 bg-red-500 text-white rounded-lg">
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                
            </div>
        </div>
    );
};

export default ProjectDashboard;

