import { useNavigate } from "react-router-dom";
const ResearcherProjects = ({ onNewProject }) => {
    return (
        <div>
            <div className="flex justify-between items-center py-3 px-12 border-b border-gray-300">
                <div className="flex flex-col gap-2">
                    <h1 className="font-semibold text-xl">Create a New Project</h1>
                    <p>Let's get started with Koalytics!</p>
                </div>
                <button
                    onClick={onNewProject}
                    className="bg-violet-400 text-black text-sm px-4 py-2 w-40 h-12 rounded-lg hover:bg-violet-500 border border-gray-400"
                >
                    New Project
                </button>
            </div>
            <div className="px-12 mt-8">
                <h1 className="font-semibold text-3xl">Projects</h1>
                <p>Here are your current projects...</p>
            </div>
        </div>
    );
};

export default ResearcherProjects;