import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ChooseTest = () => {
    const { projectId } = useParams(); // Get project ID from URL
    const [forms, setForms] = useState([]);
    const [usabilityTestings, setUsabilityTestings] = useState([]);

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


    // Fetch usability testings when the page loads
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/projects/${projectId}/related_usability_testing/`)
            .then(response => {
                if (!response.ok) throw new Error("Failed to fetch usability testing");
                return response.json();
            })
            .then(data => setUsabilityTestings(data))
            .catch(error => console.error("Error fetching usability testing:", error));
    }, [projectId]);

    return (
        <div className="h-screen bg-[#F0EEED] p-8">
            <div class="grid grid-cols-2 gap-8 p-8">
                {/*form section*/}
                <div className="pr-8 border-r border-gray-400">
                    <h1 className="text-2xl font-funnel font-semibold mb-6">
                        System Usability Scale (SUS) Questionnaire
                    </h1>
                    <ul className="list-disc font-funnel list-inside space-y-2 mb-6">
                        <li>The survey contains <strong>questions</strong> about your experience using the website or system.</li>
                        <li>Each question asks you to rate from <strong>1 (Strongly Disagree) to 5 (Strongly Agree)</strong> how you feel about the system’s usability.</li>
                        <li>There are <strong>no right or wrong answers</strong>—just answer based on your honest experience.</li>
                        <li>Your feedback helps improve the system so it becomes <strong>easier and more efficient</strong> for users like you.</li>
                    </ul>
                    <div className="grid grid-cols-2 gap-6">
                        
                        {forms.length > 0 ? (
                            forms.map((form) => (
                                <div 
                                    key={form.id} 
                                    //className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg cursor-pointer text-center border border-gray-400"
                                    // className="w-80 h-56 relative bg-cover bg-center rounded-lg shadow-md hover:shadow-lg cursor-pointer text-center border border-gray-400"
                                    // style={{ 
                                    //     backgroundImage: "url('/static/images/sus_pic.png')",
                                    // }}
                                    className="p-10 relative bg-cover bg-center rounded-lg shadow-md hover:shadow-lg cursor-pointer text-center border border-gray-400 flex items-center justify-center"
                                    style={{ backgroundImage: "url('/static/images/sus_pic.png')" }}
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

                {/*usability testing section */}
                <div className="pl-8">  
                    <h1 className="text-2xl font-semibold mb-6">Select a usability </h1>
                    <div className="grid grid-cols-2 gap-6"> 
                        {usabilityTestings.length > 0 ? (
                            usabilityTestings.map((usabilityTesting) => (
                                <div 
                                    key={usabilityTesting.id} 
                                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg cursor-pointer text-center border border-gray-400"
                                    onClick={() => navigate(`/related-usability-testing/${usabilityTesting.id}`)}
                                >
                                    <h2 className="font-semibold text-lg">{usabilityTesting.title}</h2>
                                </div>
                            ))
                        ) : (
                            <p>No usability testing available for this project.</p>
                        )}
                    </div>
                </div>
                
            </div>
            
        </div>
    );
};

export default ChooseTest;
