import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {X} from 'lucide-react';

const ChooseTest = () => {
    const { projectId } = useParams(); // Get project ID from URL
    const [forms, setForms] = useState([]);
    const [usabilityTestings, setUsabilityTestings] = useState([]);
    const [showPopup, setShowPopup] = useState(true);
    const [agreed, setAgreed] = useState(false);
    const [consentText, setConsentText] = useState(false); 

    const navigate = useNavigate();

    // fetch the consent form from the project
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/projects/${projectId}/details/`)
            .then(response => {
                if (!response.ok) throw new Error("Failed to fetch project details");
                return response.json();
            })
            .then(data => {
                setConsentText(data.consent_text);
            })
            .catch(error => console.error("Error fetching project details:", error));
    }, [projectId]);
    

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
            {/* Modal Popup */}
            {showPopup && (
                <div className="font-funnel fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-xl w-full">
                        {/* Title and Close Button Section */}
                        <div className="flex items-center justify-between p-3 bg-gray-100 rounded-t-lg relative">
                            <h2 className="font-semibold font-funnel text-lg">Consent Form</h2>
                        </div>

                        {/* Divider */}
                        <div className="w-full h-[1px] bg-gray-300"></div>

                        <div className="bg-white w-full p-6">
                            <div className="max-h-80 overflow-y-auto mb-4 text-sm">
                                <p className="font-semibold text-black">
                                    Before proceeding with the usability testing and SUS questionnaire, please read the following carefully:
                                </p>
                                <div className="border border-gray-200 text-gray-800 rounded-lg">
                                    {consentText ? (
                                        <div dangerouslySetInnerHTML={{ __html: consentText }} />
                                    ) : (
                                        <p>Loading consent form...</p>
                                    )}
                                </div>
                                
                            </div>
                            <div className="flex items-center mb-4">
                                <input 
                                    type="checkbox" 
                                    id="agree" 
                                    checked={agreed} 
                                    onChange={(e) => setAgreed(e.target.checked)} 
                                    className="mr-2"
                                />
                                <label htmlFor="agree" className="text-sm">
                                    I consented to continue
                                </label>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    className={`px-4 py-2 rounded bg-[#C4BDED] text-black font-semibold transition ${
                                        agreed ? "hover:bg-[#ACA3E3]" : "opacity-50 cursor-not-allowed"
                                    }`}
                                    onClick={() => setShowPopup(false)}
                                    disabled={!agreed}
                                >
                                    Continue
                                </button>
                            </div>

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
                                    <h2 className="font-semibold text-lg">{form.susform_title}</h2>
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
