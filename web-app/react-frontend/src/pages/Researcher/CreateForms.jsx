// import { useState } from "react";

// const CreateSurveyForms = ({ onCancel, userId, onFormCreated }) => {

//     const [formTitle, setFormTitle] = useState("");

//     const [error, setError] = useState("");

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError("");
    
//         if (!userId) {
//             setError("User not found. Please log in.");
//             return;
//         }
    
//         try {
//             const response = await fetch(`http://127.0.0.1:8000/api/create_form/${userId}/`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "X-CSRFToken": getCSRFToken(),
//                 },
//                 body: JSON.stringify({
//                     title: formTitle,
//                     project_id: projectId, 
//                 }),
//             });
    
//             if (!response.ok) {
//                 const data = await response.json();
//                 throw new Error(data.error || "Failed to create form.");
//             }
    
//             onFormCreated();
//         } catch (err) {
//             setError(err.message || "Error creating form.");
//         }
//     };
    

//     return (
//         <div>
//             <h2 className="font-semibold text-3xl mb-6">Create a New Project</h2>
//             <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//                 <input
//                     type="text"
//                     placeholder="Form Title"
//                     value={projectName}
//                     onChange={(e) => setFormTitle(e.target.value)}
//                     className="border border-gray-300 p-3 rounded-lg"
//                     required
//                 />
                
//                 <div className="flex justify-end gap-4">
//                     <button
//                         type="button"
//                         onClick={onCancel}
//                         className="text-gray-500 hover:underline"
//                     >
//                         Cancel
//                     </button>
//                     <button
//                         type="submit"
//                         className="bg-violet-500 text-white px-4 py-2 rounded-lg hover:bg-violet-600"
//                     >
//                         Submit
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default CreateSurveyForms;
