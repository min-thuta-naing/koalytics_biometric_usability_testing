// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";

// const TestCalibration = () => {
//     const { usabilityTestingId } = useParams(); 
//     const [usabilityTesting, setUsabilityTesting] = useState(null);
//     const [error, setError] = useState("");

//     // Fetch form details
//     useEffect(() => {
//             const fetchUsabilityTestingDetails = async () => {
//             try {
//                 const response = await fetch(`http://127.0.0.1:8000/api/usability_testing/${usabilityTestingId}/`);
//                 if (!response.ok) {
//                 throw new Error("Failed to fetch usability testing details.");
//                 }
//                 const data = await response.json();
//                 setUsabilityTesting(data);
//             } catch (err) {
//                 setError(err.message);
//             }
//         };
//         fetchUsabilityTestingDetails();
//     }, [usabilityTestingId]);

//     if (error) return <p className="text-red-500">{error}</p>;
//     if (!usabilityTesting) return <p>Loading...</p>;

//     return (
//         <div className="bg-[#F0EEED] h-screen"> 
//             <div className="p-8 border-b border-gray-400">
//                 <p className="font-funnel font-3xl">{usabilityTesting.id}</p>
//                 <p className="font-funnel font-3xl">Title: {usabilityTesting.title}</p>
//                 <p className="font-funnel font-3xl">Task: {usabilityTesting.task}</p>
//                 <p className="font-funnel font-3xl">Duration: {usabilityTesting.duration}</p>
//                 <p className="font-funnel font-3xl">Website: <a href={usabilityTesting.website_link} target="_blank" rel="noopener noreferrer">{usabilityTesting.website_link}</a></p>
//                 {/* "Start Testing" Button */}
//                 <button 
//                     onClick={() => window.open(usabilityTesting.website_link, "_blank")}
//                     className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
//                 >
//                     Start Testing
//                 </button>
//                 <p className="font-funnel font-3xl">Figma Embed Code: {usabilityTesting.figma_embed_code}</p>
//             </div>
//         </div>
//     )
// }

// export default TestCalibration; 

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import React from 'react';
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

const TestCalibration = () => {
  const { usabilityTestingId } = useParams();
  const [usabilityTesting, setUsabilityTesting] = useState(null);
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(true);
  const [consentText, setConsentText] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [checkboxChecked, setCheckboxChecked] = useState(false);

  useEffect(() => {
    const fetchUsabilityTestingDetails = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/usability-testing/${usabilityTestingId}/`);
        if (!response.ok) throw new Error("Failed to fetch usability testing details.");
        const data = await response.json();
        setUsabilityTesting(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchUsabilityTestingDetails();
  }, [usabilityTestingId]);

  // Function to handle checkbox change
  const handleCheckboxChange = () => {
    setCheckboxChecked(!checkboxChecked);
  };

  //fetch the consent 
  useEffect(() => {
    const fetchConsent = async () => {
        try { 
            const response = await fetch(`/usability-testing/${usabilityTestingId}/testingconsent/`);  
            if (!response.ok) {
                throw new Error('Consent not found');
            }
            const data = await response.json();
            console.log('Consent data:', data); // Log the consent data to ensure it's correct
            setConsentText(data.consent_text); // Assuming 'consent_text' is in the response
        } catch (error) {
            console.error('Error fetching consent:', error); // Log any errors
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    fetchConsent();
  }, [usabilityTestingId]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      console.log("Screen capture stream started:", stream);
  
      const mediaRecorder = new MediaRecorder(stream);
      const chunks = [];
  
      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };
  
      mediaRecorder.onstop = async () => {
        console.log("Recording stopped, processing video...");
        const blob = new Blob(chunks, { type: "video/webm" });
        const formData = new FormData();
        formData.append("usability_testing_id", usabilityTestingId);
        formData.append("video", blob, "recording.webm");
  
        // Get logged-in user's email
        const userData = localStorage.getItem("user");
        if (!userData) {
          console.error("User data not found in localStorage!");
          alert("Error: You are not logged in.");
          return;
        }
  
        const parsedUser = JSON.parse(userData);
        const userEmail = parsedUser.email;  // Extract the email
        formData.append("participant_email", userEmail);  // Append participant email to the formData
  
        const uploadResponse = await fetch("http://127.0.0.1:8000/api/save-recording/", {
          method: "POST",
          body: formData,
        });
  
        if (!uploadResponse.ok) {
          console.error("Error uploading the recording.");
        } else {
          console.log("Recording uploaded successfully.");
        }
  
        navigate(-1); // Redirect back to the previous page
      };
  
      mediaRecorder.start();
      console.log("Recording started...");
  
      setTimeout(() => {
        mediaRecorder.stop();
      }, 4000); // Stop recording after 4 seconds
  
      window.open(`/browser-in-browser?url=${encodeURIComponent(usabilityTesting.website_link)}`, "_blank"); // Open website in a new tab
    } catch (error) {
      console.error("Screen recording error:", error);
    }
  };
  

  if (error) return <p className="text-red-500">{error}</p>;
  if (!usabilityTesting) return <p>Loading...</p>;

  return (
    <div className="bg-[#F0EEED] h-screen">
      <div className="p-8 border-b border-gray-400">
        <p className="font-funnel font-3xl">{usabilityTesting.id}</p>
        <p className="font-funnel font-3xl">Title: {usabilityTesting.title}</p>
        <p className="font-funnel font-3xl">Task: {usabilityTesting.task}</p>
        <p className="font-funnel font-3xl">Duration: {usabilityTesting.duration}</p>
        <p className="font-funnel font-3xl">
          Website: <a href={usabilityTesting.website_link} target="_blank" rel="noopener noreferrer">{usabilityTesting.website_link}</a>
        </p>
        <button
          onClick={startRecording}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          Start Testing
        </button>
        <p className="font-funnel font-3xl">Figma Embed Code: {usabilityTesting.figma_embed_code}</p>
      </div>
      
      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center w-full max-w-2xl">
                <h2 className="text-lg font-funnel font-bold mb-4">Welcome to the Usability Testing</h2>
                <p className="font-funnel">Please take a moment to read the following consent forms</p>
                <div className="max-h-96 overflow-y-auto p-4 bg-gray-100 rounded-lg my-4 text-left" >
                    <ReactMarkdown
                        children={consentText}
                        rehypePlugins={[rehypeRaw]} // Allows raw HTML within the markdown
                        remarkPlugins={[remarkGfm]} // Allows GitHub Flavored Markdown (tables, strikethrough, etc.)
                        components={{
                            // Add Tailwind classes to rendered elements
                            h1: ({ node, ...props }) => <h1 className="text-3xl font-bold my-4" {...props} />,
                            h2: ({ node, ...props }) => <h2 className="text-2xl font-bold my-3" {...props} />,
                            ul: ({ node, ...props }) => <ul className="list-disc list-inside my-2" {...props} />,
                            li: ({ node, ...props }) => <li className="my-1" {...props} />,
                        }}
                    />
                </div>

                {/* Checkbox and consent message */}
                <div className="my-4">
                    <label className="flex items-center text-sm">
                        <input
                            type="checkbox"
                            checked={checkboxChecked}
                            onChange={handleCheckboxChange}
                            className="mr-2"
                        />
                        I agree, I consent to take the testing.
                    </label>
                </div>

                {/* Close button */}
                <button
                    onClick={() => setShowPopup(false)}
                    disabled={!checkboxChecked} // Disable button until checkbox is checked and scrolled to bottom
                    className={`mt-4 ${!checkboxChecked ? 'bg-gray-400' : 'bg-blue-600'} text-white px-4 py-2 rounded-lg`}
                >
                    Close
                </button>

                {/* <button
                    onClick={() => setShowPopup(false)}
                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                    Close
                </button> */}
            </div>
        </div>
      )}
    </div>
  );
};

export default TestCalibration;
