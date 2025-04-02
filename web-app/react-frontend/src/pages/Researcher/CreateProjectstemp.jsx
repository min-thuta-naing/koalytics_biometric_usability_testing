import { useState } from "react";
import { X } from "lucide-react";

const CreateProjects = ({ onCancel, userId, onProjectCreated }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [projectName, setProjectName] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const [organization, setOrganization] = useState("");
    const [maxParticipants, setMaxParticipants] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [sideNotes, setSideNotes] = useState("");
    const [error, setError] = useState("");

    const steps = [
        {
            id: 1,
            title: "Guideline",
            description: "Please read the guidelines and information before creating your project.",
            content: (
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Project Creation Guidelines</h3>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Provide a clear and descriptive project name</li>
                        <li>Include all necessary details in the description</li>
                        <li>Set realistic dates for your project timeline</li>
                        <li>Consider the number of participants carefully</li>
                        <li>Review all information before submission</li>
                    </ul>
                </div>
            )
        },
        {
            id: 2,
            title: "Basic Information",
            description: "Fill in the basic details about your project.",
            content: (
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Project Name</label>
                        <input
                            type="text"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                            placeholder="Enter project name"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            value={projectDescription}
                            onChange={(e) => setProjectDescription(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                            rows={3}
                            placeholder="Enter project description"
                        />
                    </div>
                </div>
            )
        },
        {
            id: 3,
            title: "Additional Details",
            description: "Provide additional information about your project.",
            content: (
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Organization</label>
                        <input
                            type="text"
                            value={organization}
                            onChange={(e) => setOrganization(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                            placeholder="Enter organization name"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Max Participants</label>
                            <input
                                type="number"
                                value={maxParticipants}
                                onChange={(e) => setMaxParticipants(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                                placeholder="Enter maximum participants"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Side Notes</label>
                            <input
                                type="text"
                                value={sideNotes}
                                onChange={(e) => setSideNotes(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                                placeholder="Any additional notes"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Start Date</label>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">End Date</label>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                            />
                        </div>
                    </div>
                </div>
            )
        }
    ];

    const handleNext = () => {
        if (currentStep < steps.length) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!userId) {
            setError("User not found. Please log in.");
            return;
        }

        try {
            const response = await fetch(`http://127.0.0.1:8000/create_project/${userId}/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
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
                throw new Error(data.message || "Failed to create project.");
            }

            alert("Project Created!");
            onProjectCreated();
            onCancel();
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Title and Close Button Section */}
            <div className="flex items-center justify-between p-3 bg-gray-100 rounded-t-lg relative">
                <h2 className="font-semibold font-funnel text-lg">Create a New Project</h2>
                <button
                    onClick={onCancel}
                    className="text-black bg-white hover:bg-gray-200 rounded-lg border border-gray-300 p-1"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>

            {/* Divider */}
            <div className="w-full h-[1px] bg-gray-300"></div>

            <div className="flex h-[600px]">
                {/* Sidebar Partition */}
                <div className="w-1/4 bg-gray-100 rounded-l-lg p-6">
                    <ul className="space-y-6">
                        {steps.map((step, index) => (
                            <li key={step.id} className="progress-step relative flex gap-4">
                                <div className="flex flex-col items-center">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-medium 
                                        ${currentStep > step.id ? 'bg-green-500 border-2 border-green-500 text-white' : 
                                          currentStep === step.id ? 'border-2 border-green-500 bg-white text-green-500' : 
                                          'border-2 border-gray-300 bg-white text-gray-400'}`}>
                                        {currentStep > step.id ? '✓' : step.id}
                                    </div>
                                    {index < steps.length - 1 && (
                                        <div className={`progress-connector w-0.5 h-full mt-2 
                                            ${currentStep > step.id ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                                    )}
                                </div>
                                <div className="flex-1 pb-6">
                                    <h3 className={`font-semibold ${currentStep >= step.id ? 'text-gray-900' : 'text-gray-500'}`}>
                                        {step.title}
                                    </h3>
                                    <p className={`text-sm mt-1 ${currentStep >= step.id ? 'text-gray-500' : 'text-gray-400'}`}>
                                        {step.description}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Main Form Section */}
                <div className="w-3/4 p-6 px-12 font-funnel overflow-y-auto">
                    {error && <div className="text-red-500 mb-4">{error}</div>}
                    
                    <div className="mb-8">
                        {steps[currentStep - 1].content}
                    </div>

                    <div className="flex justify-between mt-8">
                        <button
                            type="button"
                            onClick={handleBack}
                            disabled={currentStep === 1}
                            className={`px-4 py-2 rounded-md ${currentStep === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                        >
                            Back
                        </button>
                        
                        {currentStep < steps.length ? (
                            <button
                                type="button"
                                onClick={handleNext}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                Next
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                            >
                                Submit Project
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div className="w-full h-[1px] bg-gray-300"></div>

            {/* Bottom and Close Button Section */}
            <div className="flex items-center font-funnel justify-between p-3 bg-gray-100 rounded-b-lg relative">
                <h2 className="font-semibold text-base">Koalytics</h2>
            </div>
        </div>
    );
};

export default CreateProjects;