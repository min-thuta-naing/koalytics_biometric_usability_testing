import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ChooseTest = () => {
    const { projectId } = useParams(); // Get project ID from URL
    const [forms, setForms] = useState([]);
    const navigate = useNavigate();

    // Fetch forms when the page loads
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/projects/${projectId}/related_forms/`)
            .then(response => {
                if (!response.ok) throw new Error("Failed to fetch forms");
                return response.json();
            })
            .then(data => setForms(data))
            .catch(error => console.error("Error fetching forms:", error));
    }, [projectId]);

    return (
        <div className="h-screen bg-gray-100 p-8">
            <h1 className="text-2xl font-semibold mb-6">Select a Form for This Project</h1>
            <div className="grid grid-cols-4 gap-6">
                {forms.length > 0 ? (
                    forms.map((form) => (
                        <div 
                            key={form.id} 
                            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg cursor-pointer text-center border border-gray-400"
                            onClick={() => navigate(`/related-form/${form.id}`)}
                        >
                            <h2 className="font-semibold text-lg">{form.title}</h2>
                        </div>
                    ))
                ) : (
                    <p>No forms available for this project.</p>
                )}
            </div>
        </div>
    );
};

export default ChooseTest;
