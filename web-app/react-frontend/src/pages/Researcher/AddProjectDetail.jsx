import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const AddProjectDetail = () => {
    const { projectId } = useParams(); // Get projectId from URL
    const [project, setProject] = useState(null);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/project/${projectId}/`);
                if (response.ok) {
                    const data = await response.json();
                    setProject(data);
                }
            } catch (error) {
                console.error("Error fetching project:", error);
            }
        };
        fetchProject();
    }, [projectId]);

    if (!project) return <p>Loading project details...</p>;

    return (
        <div>
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

            <div>
                <div className="py-8 px-12 ">
                    {/* <h3>Project Description</h3>
                    <p className="mt-4 text-gray-600">{project.description}</p> */}
                    <h3>Welcome to the project information detail page.</h3>
                </div>

                <div className="grid grid-cols-3 gap-4 p-8">

                    <div className="bg-violet-100 p-4 rounded-lg">
                        <h2 className="text-xl font-semibold mb-4">Project Details Form</h2>
                        <form>
                            <label className="block mb-2 font-medium" htmlFor="organization">
                                Organization
                            </label>
                            <select 
                                id="organization" 
                                name="organization" 
                                className="w-full p-2 mb-4 rounded border"
                            >
                                <option value="company">Company</option>
                                <option value="school">School</option>
                                <option value="college">College</option>
                                <option value="institution">Institution</option>
                                <option value="university">University</option>
                                <option value="freelance">Freelance</option>
                            </select>

                            <label className="block mb-2 font-medium" htmlFor="maxParticipants">
                                Max Number of Participants
                            </label>
                            <input 
                                type="number" 
                                id="maxParticipants" 
                                name="maxParticipants" 
                                className="w-full p-2 mb-4 rounded border" 
                                placeholder="Enter maximum participants"
                            />

                            <label className="block mb-2 font-medium" htmlFor="startDate">
                                Start Date
                            </label>
                            <input 
                                type="date" 
                                id="startDate" 
                                name="startDate" 
                                className="w-full p-2 mb-4 rounded border"
                            />

                            <label className="block mb-2 font-medium" htmlFor="endDate">
                                End Date
                            </label>
                            <input 
                                type="date" 
                                id="endDate" 
                                name="endDate" 
                                className="w-full p-2 mb-4 rounded border"
                            />

                            <label className="block mb-2 font-medium" htmlFor="sidenotes">
                                Side Notes
                            </label>
                            <textarea 
                                id="sidenotes" 
                                name="sidenotes" 
                                className="w-full p-2 mb-4 rounded border" 
                                rows="3" 
                                placeholder="Add additional notes..."
                            ></textarea>

                            <button 
                                type="submit" 
                                className="bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700 transition"
                            >
                                Submit
                            </button>
                        </form>
                    </div>

                    <div className="bg-violet-100 p-4 rounded-lg">
                        <h2 className="text-xl font-semibold mb-4">Project Information</h2>
                        <h3>Project Name: </h3>
                        <p className="mt-4 text-gray-600">{project.name}</p>
                        <h3>Project Description: </h3>
                        <p className="mt-4 text-gray-600">{project.description}</p>
                    </div>
                    
                    <div className="bg-violet-100 p-4 rounded-lg">Column 3</div>
                </div>
            </div>
        </div>

       
    );
};

export default AddProjectDetail;
