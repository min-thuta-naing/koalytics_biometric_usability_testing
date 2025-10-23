import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const ChooseTest = () => {
    const API_URL = process.env.REACT_APP_API_URL;
    const { projectId } = useParams(); // Get project ID from URL
    const [forms, setForms] = useState([]);
    const [usabilityTestings, setUsabilityTestings] = useState([]);
    const [showPopup, setShowPopup] = useState(true);
    const [agreed, setAgreed] = useState(false);
    const [consentText, setConsentText] = useState(false); 

    const navigate = useNavigate();

    // fetch the consent form from the project
    useEffect(() => {
        fetch(`${API_URL}/api/projects/${projectId}/details/`)
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
        fetch(`${API_URL}/api/projects/${projectId}/related_forms/`)
            .then(response => {
                if (!response.ok) throw new Error("Failed to fetch forms");
                return response.json();
            })
            .then(data => setForms(data))
            .catch(error => console.error("Error fetching forms:", error));
    }, [projectId]);


    // Fetch usability testings when the page loads
    useEffect(() => {
        fetch(`${API_URL}/api/projects/${projectId}/related_usability_testing/`)
            .then(response => {
                if (!response.ok) throw new Error("Failed to fetch usability testing");
                return response.json();
            })
            .then(data => setUsabilityTestings(data))
            .catch(error => console.error("Error fetching usability testing:", error));
    }, [projectId]);

    return (
        <div 
            className="bg-cover bg-center min-h-screen px-4 py-10 overflow-y-auto"
            style={{ backgroundImage: 'url(/static/images/backgroundform.png)' }}
        >
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
                            <p className="font-semibold text-[#8A78C1] mb-2">
                                Before proceeding with the usability testing and SUS questionnaire, please read the following carefully:
                            </p>
                            <div className="max-h-80 overflow-y-auto mb-4 text-sm">
                                
                                <div className="p-5 text-gray-800 rounded-lg">
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
                                    I consented to continue answering.
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
                        <div className="flex items-center font-funnel p-3 bg-gray-100 rounded-b-lg relative">
                            <h2 className="text-base mr-2">Don't want to answer yet, </h2>
                            <Link to="/homepage">
                                <button className="underline font-semibold text-red-400">Click here to quit.</button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
            
            <div className="max-w-6xl mx-auto space-y-12">

                {/*usability testing section */}
                <div className="font-funnel bg-white rounded-xl shadow-lg p-8 space-y-6">  
                    <h1 className="text-2xl font-semibold mb-6">Biometric Usability Testing</h1>
                    <p className="text-gray-700 text-lg leading-relaxed">
                        Usability testing helps evaluate how user-friendly and intuitive a website or application is. 
                        Participants are asked to perform specific tasks while observers watch, listen, and take notes. 
                        The goal is to identify usability issues, collect qualitative and quantitative data, and determine 
                        the user’s satisfaction with the product. Select a usability test below to begin the process.
                    </p>
                    <div className="border-b border-gray-300" />

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
                        {usabilityTestings.length > 0 ? (
                            usabilityTestings.map((usabilityTesting) => (
                                <div 
                                    key={usabilityTesting.id} 
                                    className="p-10 relative bg-cover bg-center rounded-lg shadow-md hover:shadow-lg cursor-pointer text-center border border-gray-400 flex items-center justify-center"
                                    style={{ backgroundImage: "url('/static/images/choosetest/usabilitytesting.png')" }}                                    
                                    onClick={() => navigate(`/related-usability-testing/${usabilityTesting.id}`)}
                                >
                                    <h2 className="font-semibold text-xl text-black">{usabilityTesting.title}</h2>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">No usability testing available for this project.</p>
                        )}
                    </div>
                </div>

                {/*sus form section*/}
                <div className="font-funnel bg-white rounded-xl shadow-lg p-8 space-y-6">
                    <h1 className="text-2xl font-semibold mb-6">System Usability Scale (SUS) Questionnaire</h1>
                    <p className="text-gray-700 text-lg leading-relaxed">
                        The SUS questionnaire is a quick and reliable tool for measuring the usability of a system. 
                        It consists of a set of standardized questions rated on a scale from 1 (Strongly Disagree) to 5 (Strongly Agree). 
                        Your responses help us understand your experience and make improvements. There are no right or wrong answers—just your honest feedback.
                    </p>
                    <div className="border-b border-gray-300" />

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
                        {forms.length > 0 ? (
                            forms.map((form) => (
                                <div 
                                    key={form.id} 
                                    className="p-10 relative bg-cover bg-center rounded-lg shadow-md hover:shadow-lg cursor-pointer text-center border border-gray-400 flex items-center justify-center"
                                    style={{ backgroundImage: "url('/static/images/choosetest/susform.png')" }}
                                    onClick={() => navigate(`/related-form/${form.id}/${projectId}`)}
                                >
                                    <h2 className="font-semibold text-xl text-black">{form.susform_title}</h2>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">No forms available for this project.</p>
                        )}
                    </div>
                </div>
                
            </div>
            
        </div>
    );
};

export default ChooseTest;
