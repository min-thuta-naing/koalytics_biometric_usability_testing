import { useState } from "react";
import NewProjectPage from "./NewProjectPage"; // Import the modal component

const ResearcherProjects = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div>
            <div className="flex justify-between items-center py-3 px-12 border-b border-gray-300">
                <div className="flex flex-col gap-2">
                    <h1 className="font-semibold text-xl">Create a New Project</h1>
                    <p>Let's get started with Koalytics!</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-violet-400 text-black text-sm px-4 py-2 w-40 h-12 rounded-lg hover:bg-violet-500 border border-gray-400"
                >
                    New Project
                </button>
            </div>

            <div className="px-12 mt-8">
                <h1 className="font-semibold text-3xl">Projects</h1>
                <p>Here are your current projects...</p>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-[500px]">
                        <NewProjectPage onCancel={() => setIsModalOpen(false)} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ResearcherProjects;
