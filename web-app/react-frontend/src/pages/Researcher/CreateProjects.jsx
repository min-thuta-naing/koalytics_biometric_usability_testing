// import { useState } from "react";
// import { X } from "lucide-react";

// const CreateProjects = ({ onCancel, userId, onProjectCreated }) => {
//     const [currentStep, setCurrentStep] = useState(1);
//     const [projectName, setProjectName] = useState("");
//     const [projectDescription, setProjectDescription] = useState("");
//     const [organization, setOrganization] = useState("");
//     const [maxParticipants, setMaxParticipants] = useState("");
//     const [startDate, setStartDate] = useState("");
//     const [endDate, setEndDate] = useState("");
//     const [sideNotes, setSideNotes] = useState("");
//     const [error, setError] = useState("");


//     // submit the form logic 
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError("");

//         if (!userId) {
//             setError("User not found. Please log in.");
//             return;
//         }

//         try {
//             const response = await fetch(`http://127.0.0.1:8000/create_project/${userId}/`, { //create_project from view.py 
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                     name: projectName,
//                     description: projectDescription,
//                     organization: organization,
//                     max_participants: maxParticipants ? parseInt(maxParticipants) : null,
//                     start_date: startDate,
//                     end_date: endDate,
//                     side_notes: sideNotes,
//                 }),
//             });

//             if (!response.ok) {
//                 const data = await response.json();
//                 throw new Error("Failed to create project.");
//             }

//             alert("Project Created!");
//             onProjectCreated();
//             onCancel();
//         } catch (err) {
//             setError(err.message);
//         }
//     };

//     const steps = [
//         {
//             id: 1,
//             title: "Guideline",
//             description: "Please read the guidelines and information before creating your project.",
//             content: (
//                 <div className="space-y-4">
//                     <h3 className="text-xl font-semibold">Project Creation Guidelines</h3>
//                     <ul className="list-disc pl-5 space-y-2">
//                         <li>Provide a clear and descriptive project name</li>
//                         <li>Include all necessary details in the description</li>
//                         <li>Set realistic dates for your project timeline</li>
//                         <li>Consider the number of participants carefully</li>
//                         <li>Review all information before submission</li>
//                     </ul>
//                 </div>
//             )
//         },
//         {
//             id: 2,
//             title: "Basic Information",
//             description: "Fill in the basic details about your project.",
//             content: (
//                 <div className="space-y-4">
//                     <p className="font-semibold text-xl">Enter Project Information</p>
//                     <p className="text-base">Please fill in all the information related to your project.</p>
//                     <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-10 ">
//                         <div className="flex flex-col gap-2">
//                             <label className="font-medium">Name:</label>
//                             <input
//                                 type="text"
//                                 placeholder="Add Project Name"
//                                 value={projectName}
//                                 onChange={(e) => setProjectName(e.target.value)}
//                                 className="border border-gray-300 p-3 rounded-lg flex-1"
//                                 required
//                             />
//                         </div>

//                         <div className="flex flex-col gap-2">
//                             <label className="font-medium">Description:</label>
//                             <textarea
//                                 placeholder="Add Project Description"
//                                 value={projectDescription}
//                                 onChange={(e) => setProjectDescription(e.target.value)}
//                                 className="border border-gray-300 p-3 rounded-lg flex-1"
//                                 rows="5"
//                                 required
//                             />
//                         </div>

//                         <div className="flex flex-col gap-2">
//                             <label className="font-medium">Organization:</label>
//                             <select
//                                 value={organization}
//                                 onChange={(e) => setOrganization(e.target.value)}
//                                 className="border border-gray-300 p-3 rounded-lg flex-1"
//                                 required
//                                 style={{ color: organization ? 'black' : '#9CA3AF' }}
//                             >
//                                 <option value="" disabled >
//                                     Select Organization
//                                 </option>
//                                 <option value="company">Company</option>
//                                 <option value="school">School</option>
//                                 <option value="college">College</option>
//                                 <option value="institution">Institution</option>
//                                 <option value="university">University</option>
//                                 <option value="freelance">Freelance</option>
//                             </select>
//                         </div>

//                         <div className="flex flex-col gap-2">
//                             <label className="font-medium">Participant number:</label>
//                             <input
//                                 type="number"
//                                 placeholder="Maximun Participant Number"
//                                 value={maxParticipants}
//                                 onChange={(e) => setMaxParticipants(e.target.value)}
//                                 className="border border-gray-300 p-3 rounded-lg flex-1"
//                                 required
//                             />
//                         </div>
                            
//                         <div className="flex flex-col gap-2">
//                             <label className="font-medium">Start Date:</label>
//                             <input
//                                 type="date"
//                                 value={startDate}
//                                 onChange={(e) => setStartDate(e.target.value)}
//                                 className="border border-gray-300 p-3 rounded-lg flex-1"
//                                 required
//                             />
//                         </div>

//                         <div className="flex flex-col gap-2">
//                             <label className="font-medium">End Date:</label>
//                             <input
//                                 type="date"
//                                 value={endDate}
//                                 onChange={(e) => setEndDate(e.target.value)}
//                                 className="border border-gray-300 p-3 rounded-lg flex-1"
//                                 required
//                             />
//                         </div>
                    
//                         <div className="flex flex-col gap-2">
//                             <label className="font-medium">Side Notes:</label>
//                             <textarea
//                                 placeholder="Add Sidenotes"
//                                 value={sideNotes}
//                                 onChange={(e) => setSideNotes(e.target.value)}
//                                 className="border border-gray-300 p-3 rounded-lg flex-1"
//                                 rows="4"
//                                 required
//                             />
//                         </div>
                        

//                         <div className="flex justify-end gap-4">
//                             <button
//                                 type="button"
//                                 onClick={onCancel}
//                                 className="text-gray-500 hover:underline"
//                             >
//                                 Cancel
//                             </button>
//                             <button
//                                 type="submit"
//                                 className="bg-violet-500 text-white px-4 py-2 rounded-lg hover:bg-violet-600"
//                             >
//                                 Continue
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             )
//         },
//         {
//             id: 3,
//             title: "Thanks",
//             description: "Your project is now created.",
//             content: (
//                 <div className="space-y-4">
//                     <p>now you got it. </p>
//                 </div>
//             )
//         }
//     ];

//     const handleNext = () => {
//         if (currentStep < steps.length) {
//             setCurrentStep(currentStep + 1);
//         }
//     };

//     const handleBack = () => {
//         if (currentStep > 1) {
//             setCurrentStep(currentStep - 1);
//         }
//     };


//     return (
//         <div>
//             {/* Title and Close Button Section */}
//             <div className="flex items-center justify-between p-3 bg-gray-100 rounded-t-lg relative">
//                 <h2 className="font-semibold font-funnel text-lg">Create a New Project</h2>
//                 <button
//                     onClick={onCancel}
//                     className="text-black bg-white hover:bg-gray-200 rounded-lg border border-gray-300 p-1"
//                 >
//                     <X className="w-4 h-4" />
//                 </button>
//             </div>

//             {/* Divider */}
//             <div className="w-full h-[1px] bg-gray-300"></div>

//             <div className="flex h-[600px]">

//                 {/* Sidebar Partition */}
//                 <div className="w-1/4 bg-gray-100 rounded-l-lg p-6">
//                     <ul className="space-y-6">
//                         {steps.map((step, index) => (
//                             <li key={step.id} className="progress-step relative flex gap-4">
//                                 <div className="flex flex-col items-center">
//                                     <div className={`w-8 h-8 rounded-full flex items-center justify-center font-medium 
//                                         ${currentStep > step.id ? 'bg-green-500 border-2 border-green-500 text-white' : 
//                                           currentStep === step.id ? 'border-2 border-green-500 bg-white text-green-500' : 
//                                           'border-2 border-gray-300 bg-white text-gray-400'}`}>
//                                         {currentStep > step.id ? '✓' : step.id}
//                                     </div>
//                                     {index < steps.length - 1 && (
//                                         <div className={`progress-connector w-0.5 h-full mt-2 
//                                             ${currentStep > step.id ? 'bg-green-500' : 'bg-gray-200'}`}></div>
//                                     )}
//                                 </div>
//                                 <div className="flex-1 pb-6">
//                                     <h3 className={`font-semibold ${currentStep >= step.id ? 'text-gray-900' : 'text-gray-500'}`}>
//                                         {step.title}
//                                     </h3>
//                                     <p className={`text-sm mt-1 ${currentStep >= step.id ? 'text-gray-500' : 'text-gray-400'}`}>
//                                         {step.description}
//                                     </p>
//                                 </div>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>

//                 {/* Main Form Section */}
//                 <div className="w-3/4 p-6 px-12 font-funnel overflow-y-auto">
//                     {error && <div className="text-red-500 mb-4">{error}</div>}
                    
//                     <div className="mb-8">
//                         {steps[currentStep - 1].content}
//                     </div>

//                     <div className="flex justify-between mt-8">
//                         <button
//                             type="button"
//                             onClick={handleBack}
//                             disabled={currentStep === 1}
//                             className={`px-4 py-2 rounded-md ${currentStep === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
//                         >
//                             Back
//                         </button>
                        
//                         {currentStep < steps.length ? (
//                             <button
//                                 type="button"
//                                 onClick={handleNext}
//                                 className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//                             >
//                                 Next
//                             </button>
//                         ) : (
//                             <button
//                                 type="button"
//                                 onClick={handleSubmit}
//                                 className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
//                             >
//                                 Submit Project
//                             </button>
//                         )}
//                     </div>
//                 </div>
//             </div>

//             {/* Divider */}
//             <div className="w-full h-[1px] bg-gray-300"></div>

//             {/* Bottom and Close Button Section */}
//             <div className="flex items-center font-funnel justify-between p-3 bg-gray-100 rounded-b-lg relative">
//                 <h2 className="font-semibold text-base">Koalytics</h2>
                
//             </div>

//         </div>
//     );
// };

// export default CreateProjects;



import React, { useState, useRef } from "react";
import { X, RefreshCcw } from "lucide-react";
import WYSIWYGEditor from "./WYSIWYGEditor";
import {getConsentTemplate} from "./templates";


const CreateProjects = ({ onCancel, userId, onProjectCreated }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [projectName, setProjectName] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const [category, setCategory] = useState(""); 
    const [organization, setOrganization] = useState("");
    const [maxParticipants, setMaxParticipants] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [sideNotes, setSideNotes] = useState("");
    const [error, setError] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
   
    const [consentContent, setConsentContent] = useState(getConsentTemplate('biometric'));

    const getRandomImages = () => {
        const allImages = Array.from({ length: 44 }, (_, i) => `/static/images/projectcategory/${i + 1}.png`);
        return allImages.sort(() => Math.random() - 0.5);
    };
    const [images, setImages] = useState(getRandomImages());
    const refreshImages = () => {
        setImages(getRandomImages());
    };


    const steps = [
        {
            id: 1,
            title: "Guideline",
            description: "Please read the guidelines before creating project.",
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
            title: "Project Details",
            description: "Fill in the details about your project.",
            content: (
                <div className="space-y-4">
                    <p className="font-semibold text-xl">Enter Project Information</p>
                    <p className="text-base">Please fill in all the information related to your project.</p>
                    <form className="flex flex-col gap-6 mt-10">
                        <div className="flex flex-col gap-2">
                            <label className="font-medium">Name:</label>
                            <input
                                type="text"
                                placeholder="Add Project Name"
                                value={projectName}
                                onChange={(e) => setProjectName(e.target.value)}
                                className="border border-gray-300 p-3 rounded-lg flex-1"
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="font-medium">Description:</label>
                            <textarea
                                placeholder="Add Project Description"
                                value={projectDescription}
                                onChange={(e) => setProjectDescription(e.target.value)}
                                className="border border-gray-300 p-3 rounded-lg flex-1"
                                rows="5"
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="font-medium">Category:</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="border border-gray-300 p-3 rounded-lg flex-1"
                                required
                                style={{ color: category ? 'black' : '#9CA3AF' }}
                            >
                                <option value="" disabled>Select Category of your project</option>
                                <optgroup label="Commerce & Finance">
                                <option value="shopping-and-ecommerce">Shopping & E-commerce</option>
                                <option value="finance-and-investment">Finance & Investment</option>
                                <option value="real-estate-and-property">Real Estate & Property</option>
                                <option value="business-and-productivity">Business & Productivity</option>
                                </optgroup>

                                <optgroup label="Learning & Career">
                                <option value="education-and-learning">Education & Learning</option>
                                <option value="careers-and-jobs">Careers & Jobs</option>
                                </optgroup>

                                <optgroup label="Creativity & Media">
                                <option value="arts-and-design">Arts & Design</option>
                                <option value="entertainment-and-media">Entertainment & Media</option>
                                <option value="news-and-information">News & Information</option>
                                <option value="technology-and-software">Technology & Software</option>
                                </optgroup>

                                <optgroup label="Health & Lifestyle">
                                <option value="health-and-wellness">Health & Wellness</option>
                                <option value="lifestyle-and-hobbies">Lifestyle & Hobbies</option>
                                <option value="home-and-garden">Home & Garden</option>
                                <option value="pets-and-animals">Pets & Animals</option>
                                </optgroup>

                                <optgroup label="Sports & Recreation">
                                <option value="sports-and-fitness">Sports & Fitness</option>
                                <option value="gaming">Gaming</option>
                                </optgroup>

                                <optgroup label="Travel & Utilities">
                                <option value="travel-and-navigation">Travel & Navigation</option>
                                <option value="tools-and-utilities">Tools & Utilities</option>
                                </optgroup>

                                <optgroup label="Social & Communication">
                                <option value="social-and-communication">Social & Communication</option>
                                </optgroup>

                            </select>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="font-medium">Organization:</label>
                            <select
                                value={organization}
                                onChange={(e) => setOrganization(e.target.value)}
                                className="border border-gray-300 p-3 rounded-lg flex-1"
                                required
                                style={{ color: organization ? 'black' : '#9CA3AF' }}
                            >
                                <option value="" disabled>Select Organization </option>
                                <option value="company">Company</option>
                                <option value="school">School</option>
                                <option value="college">College</option>
                                <option value="institution">Institution</option>
                                <option value="university">University</option>
                                <option value="freelance">Freelance</option>
                            </select>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="font-medium">Participant number:</label>
                            <input
                                type="number"
                                placeholder="Maximun Participant Number"
                                value={maxParticipants}
                                onChange={(e) => setMaxParticipants(e.target.value)}
                                className="border border-gray-300 p-3 rounded-lg flex-1"
                                required
                            />
                        </div>
                            
                        <div className="flex flex-col gap-2">
                            <label className="font-medium">Start Date:</label>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="border border-gray-300 p-3 rounded-lg flex-1"
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="font-medium">End Date:</label>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="border border-gray-300 p-3 rounded-lg flex-1"
                                required
                            />
                        </div>
                    
                        <div className="flex flex-col gap-2">
                            <label className="font-medium">Side Notes:</label>
                            <textarea
                                placeholder="Add Sidenotes"
                                value={sideNotes}
                                onChange={(e) => setSideNotes(e.target.value)}
                                className="border border-gray-300 p-3 rounded-lg flex-1"
                                rows="4"
                                required
                            />
                        </div>

                        {error && (
                            <div className="text-red-500 font-funnel mb-4 p-2 bg-red-50 rounded-md">
                                {error}
                            </div>
                        )}

                    </form>
                </div>
            )
        },
        {
            id: 3,
            title: "Consent",
            description: "Create consent form for your project.",
            content: (
                <div className="space-y-4">
                    <p className="font-semibold text-xl">Consent Form</p>
                    <p className="text-base">You can modify the following consent template.</p>
                    <div className="flex flex-col gap-6 mt-10">
                        <WYSIWYGEditor
                            content={consentContent}  
                            onUpdate={(html) => {
                                console.log("Consent content updated:", html); // Debug log
                                setConsentContent(html);
                            }} 
                        />

                        {error && (
                            <div className="text-red-500 font-funnel mb-4 p-2 bg-red-50 rounded-md">
                                {error}
                            </div>
                        )}
                    </div>
                </div>
            )
        },
        {
            id: 4,
            title: "Cover Photo",
            description: "Choose a cover photo for your project.",
            content: (
                <div className="space-y-4">
                    <p className="font-semibold text-xl">Project Cover Photo</p>
                    <p className="text-base">Choose a cover photo for your project.</p>

                    {/* Scrollable Masonry Layout */}
                    <div className="relative h-[390px] overflow-hidden">
                        {/* Fading top and bottom */}
                        <div className="pointer-events-none absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-white to-transparent z-10" />
                        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white to-transparent z-10" />

                        {/* Scrollable area */}
                        <div className="overflow-y-auto h-full px-4 pt-10 pb-20 hide-scrollbar scroll-smooth">
                            <div className="columns-2 sm:columns-3 md:columns-4 gap-4 space-y-4">
                                {images.map((src, index) => (
                                <div key={index} className="break-inside-avoid overflow-hidden rounded-lg shadow-md">
                                    <img
                                    src={src}
                                    alt={`Image ${index + 1}`}
                                    className="w-full object-cover rounded-lg"
                                    />
                                </div>
                                ))}
                            </div>
                        </div>

                        {/* Floating Refresh Button */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
                        <button
                            onClick={refreshImages}
                            className="inline-flex items-center gap-2 px-4 py-1 bg-gray-200 text-gray-700 text-sm rounded-full hover:bg-gray-400 border border-gray-700 transition"
                        >
                            <RefreshCcw className="w-3 h-3" />
                            Refresh
                        </button>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 5,
            title: "Finish",
            description: "Your project is now created.",
            content: (
                <div className="flex flex-col items-center justify-center h-full">
                    <div className="text-center space-y-4">
                        <svg className="w-16 h-16 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <h3 className="text-2xl font-semibold">Project Created Successfully!</h3>
                        <p className="text-gray-600">Thank you for creating your project. You can now manage it from your dashboard.</p>
                        <button
                            onClick={onCancel}
                            className="mt-6 px-6 py-2 bg-violet-500 text-white rounded-lg hover:bg-violet-600"
                        >
                            Return to Dashboard
                        </button>
                    </div>
                </div>
            )
        }
    ];

    const validateFields = () => {
        // Reset error first
        setError("");
        let isValid = true;
        const requiredErrors = [];
        const otherErrors = [];
    
        // Check required fields
        if (!projectName.trim()) {
            requiredErrors.push("Project name");
            isValid = false;
        }
        if (!projectDescription.trim()) {
            requiredErrors.push("Project description");
            isValid = false;
        }
        if (!category){
            requiredErrors.push("Category");
            isValid = false; 
        }
        if (!organization) {
            requiredErrors.push("Organization");
            isValid = false;
        }
        if (!maxParticipants) {
            requiredErrors.push("Participant number");
            isValid = false;
        } else if (isNaN(maxParticipants) || parseInt(maxParticipants) <= 0) {
            otherErrors.push("Participant number must be a positive number");
            isValid = false;
        }
        if (!startDate) {
            requiredErrors.push("Start date");
            isValid = false;
        }
        if (!endDate) {
            requiredErrors.push("End date");
            isValid = false;
        } else if (startDate && new Date(startDate) > new Date(endDate)) {
            otherErrors.push("End date must be after start date");
            isValid = false;
        }
        if (!sideNotes.trim()) {
            requiredErrors.push("Side notes");
            isValid = false;
        }
    
        // Format error messages
        let errorMessage = "";
        if (requiredErrors.length > 0) {
            errorMessage = requiredErrors.join(", ");
            // Add "are required" or "is required" based on number of errors
            errorMessage += requiredErrors.length > 1 ? " are required." : " is required.";
        }
        
        // Add other validation errors
        if (otherErrors.length > 0) {
            if (errorMessage) errorMessage += " ";
            errorMessage += otherErrors.join(". ");
        }
    
        if (errorMessage) {
            setError(errorMessage);
        }
        return isValid;
    };

    const validateConsent = () =>{
        setError("");
        let isValid = true;
        const requiredErrors = [];
        let errorMessage = "";

        if (!consentContent.trim()) {
            requiredErrors.push("Consent Form is required");
            isValid = false;
        }

        if (errorMessage) {
            setError(errorMessage);
        }
        return isValid;
    }


    const handleNext = (e) => {
        if (currentStep === 2) {
            // Only validate when we're on the Project Details step
            const isValid = validateFields();
            if (!isValid) {
                return; // Don't proceed if validation fails
            }
            // Clear any previous errors if validation passes
            setError("");
        } else if (currentStep === 3) {
            const isValid = validateConsent();
            if (!isValid){
                return; 
            }
        }

        if (currentStep < steps.length ) { 
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

        if (!validateFields()) {
            return; // don't proceed to the next step if validation fails
        }

        if (!userId) {
            setError("User not found. Please log in.");
            return;
        }

        console.log("Submitting with consent:", consentContent);

        try {
            const response = await fetch(`http://127.0.0.1:8000/create_project/${userId}/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: projectName,
                    description: projectDescription,
                    category: category,
                    organization: organization,
                    max_participants: maxParticipants ? parseInt(maxParticipants) : null,
                    start_date: startDate,
                    end_date: endDate,
                    side_notes: sideNotes,
                    consent_text: consentContent || "",
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || "Failed to create project.");
            }

            const data = await response.json();
            console.log("API Success:", data); // Debug log

            // On successful submission:
            setIsSubmitted(true);
            setCurrentStep(5); // Go to thank you page
            onProjectCreated();
            
        } catch (err) {
            console.error("Submission Error:", err); // Debug log
            setError(err.message);
        }
    };

    return (
        <div>
            {/* Title and Close Button Section */}
            <div className="flex items-center justify-between p-3 bg-gray-100 rounded-t-lg relative">
                <h2 className="font-semibold font-funnel text-lg">Create a New Project</h2>
                {!isSubmitted && ( // Only show close button if not on thank you page
                    <button
                        onClick={onCancel}
                        className="text-black bg-white hover:bg-gray-200 rounded-lg border border-gray-300 p-1"
                    >
                        <X className="w-4 h-4" />
                    </button>
                )}
            </div>

            {/* Divider */}
            <div className="w-full h-[1px] bg-gray-300"></div>

            <div className="flex h-[600px]">
                {/* Sidebar Partition */}
                <div className="w-1/4 bg-gray-100 rounded-l-lg p-6">
                    <ul className="space-y-0">
                        {steps.map((step, index) => (
                            <li key={step.id} className="progress-step relative flex gap-4 py-2">
                                <div className="flex flex-col items-center ">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-medium 
                                        ${currentStep > step.id ? 'bg-[#ACA3E3] border-2 border-[#ACA3E3] text-white' : 
                                          currentStep === step.id ? 'border-2 border-[#ACA3E3] bg-white font-funnel text-[#ACA3E3]' : 
                                          'border-2 border-gray-300 bg-white text-[#ACA3E3'}`}>
                                        {currentStep > step.id ? '✓' : step.id}
                                    </div>
                                    {index < steps.length - 1 && (
                                        <div className={`progress-connector w-0.5 h-full mt-2 absolute top-8 left-3.5
                                            ${currentStep > step.id ? 'bg-[#ACA3E3]' : 'bg-gray-200'}`}></div>
                                    )}
                                </div>
                                <div className="flex-1 pb-6">
                                    <h3 className={`font-funnel font-semibold ${currentStep >= step.id ? 'text-gray-900' : 'text-gray-500'}`}>
                                        {step.title}
                                    </h3>
                                    <p className={`font-funnel text-sm mt-1 ${currentStep >= step.id ? 'text-gray-500' : 'text-black'}`}>
                                        {step.description}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Main Form Section */}
                <div className="w-3/4 p-6 px-12 font-funnel overflow-y-auto">
                    
                    <div className="mb-8">
                        {steps[currentStep - 1].content}
                    </div>

                    {currentStep !== 5 && (
                        <div className="flex justify-between mt-8">
                            <button
                                type="button"
                                onClick={handleBack}
                                className={`px-4 py-2 rounded-md ${currentStep === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                                disabled={currentStep === 1}
                            >
                                Back
                            </button>

         
                            <button
                                type="button"
                                onClick={currentStep === 4 ? handleSubmit : handleNext}
                                className={`px-4 py-2 ${currentStep === 2 && 3 ? 'bg-[#C4BDED] hover:bg-[#ACA3E3]' : 'bg-[#C4BDED] hover:bg-[#ACA3E3]'} text-black rounded-md`}
                            >
                                {currentStep === 4 ? 'Submit' : 'Next'}
                            </button>
                        </div>
                    )}
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