import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import React from 'react';

const TestCalibration = () => {
  const { usabilityTestingId } = useParams();
  const [usabilityTesting, setUsabilityTesting] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  //fetching the details of usability testing
  useEffect(() => {
    const fetchUsabilityTestingDetails = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/usability-testing/${usabilityTestingId}/`);
        if (!response.ok) throw new Error("Failed to fetch usability testing details.");
        const data = await response.json();
        setUsabilityTesting(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchUsabilityTestingDetails();
  }, [usabilityTestingId]);

  // screen recording start and save
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
  
      // setTimeout(() => {
      //   mediaRecorder.stop();
      // }, 4000); // Stop recording after 4 seconds

      // Stop recording after usabilityTesting.duration minutes
      setTimeout(() => {
        mediaRecorder.stop();
      }, usabilityTesting.duration * 60 * 1000); // Convert duration from minutes to milliseconds

      window.open(`/browser-in-browser?url=${encodeURIComponent(usabilityTesting.website_link)}&id=${usabilityTestingId}`, "_blank"); // Open website in a new tab
    } catch (error) {
      console.error("Screen recording error:", error);
    }
  };
  

  if (error) {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="text-center">
            <div className="animate-spin border-t-4 border-[#ACA3E3] border-solid rounded-full w-16 h-16 mx-auto"></div>
                <p className="mt-4 text-xl font-funnel font-semibold text-gray-700">{error}</p>
            </div>
        </div>
    );
  }
  if (!usabilityTesting) {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="text-center">
            <div className="animate-spin border-t-4 border-[#ACA3E3] border-solid rounded-full w-16 h-16 mx-auto"></div>
                <p className="mt-4 text-xl font-funnel font-semibold text-gray-700">Loading the testing, please wait ...</p>
            </div>
        </div>
    );
  }
  if (loading) {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="text-center">
            <div className="animate-spin border-t-4 border-[#ACA3E3] border-solid rounded-full w-16 h-16 mx-auto"></div>
                <p className="mt-4 text-xl font-funnel font-semibold text-gray-700">Loading the testing, please wait ...</p>
            </div>
        </div>
    );
  }

  // return (
  //   <div className="bg-[#F0EEED] h-screen">
  //     <div className="p-8 border-b border-gray-400">
  //       <p className="font-funnel font-3xl">{usabilityTesting.id}</p>
  //       <p className="font-funnel font-3xl">Title: {usabilityTesting.title}</p>
  //       <p className="font-funnel font-3xl">Task: {usabilityTesting.task}</p>
  //       <p className="font-funnel font-3xl">Duration: {usabilityTesting.duration}</p>
  //       <p className="font-funnel font-3xl">
  //         Website: <a href={usabilityTesting.website_link} target="_blank" rel="noopener noreferrer">{usabilityTesting.website_link}</a>
  //       </p>
  //       <p className="font-funnel font-3xl">Figma Embed Code: {usabilityTesting.figma_embed_code}</p>
  //       <button
  //         onClick={startRecording}
  //         className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
  //       >
  //         Start Testing
  //       </button>
  //     </div>
  //   </div>
  // );
  return (
    <div 
            className="fixed inset-0 bg-cover bg-center min-h-screen flex items-center justify-center px-4"
            style={{ backgroundImage: 'url(/static/images/backgroundform.png)' }}
    >
      <div className="font-funnel bg-white rounded-xl shadow-xl w-full max-w-3xl p-8 space-y-6">
        <h2 className="text-3xl font-semibold text-gray-800 text-center">Usability Testing Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-500 mb-1">Test title</p>
            {/* <p className="text-lg font-medium text-gray-800">{usabilityTesting.id}</p> */}
            <p className="text-lg font-medium text-gray-800">{usabilityTesting.title}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Complete the task within</p>
            <p className="text-lg font-medium text-gray-800">{usabilityTesting.duration} minutes</p>
          </div>
          <div className="col-span-1 sm:col-span-2">
            <div>
              <p className="text-sm text-gray-500 mb-1">Task to perform during the test</p>
              <p className="text-lg font-medium text-gray-800">{usabilityTesting.task}</p>
            </div>
          </div>
          
          {/* display only if website link exist  */}
          {usabilityTesting.website_link && (
            <div className="col-span-1 sm:col-span-2">
              <p className="text-sm text-gray-500 mb-1">Website</p>
              <a 
                href={usabilityTesting.website_link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline break-words"
              >
                {usabilityTesting.website_link}
              </a>
            </div>
          )}
          
          {/* display only if figma prototype link exist  */}
          {usabilityTesting.figma_embed_code && (
            <div className="col-span-1 sm:col-span-2">
              <p className="text-sm text-gray-500 mb-1">Figma Embed Code</p>
              <div className="bg-gray-100 p-3 rounded-lg font-mono text-sm text-gray-700 overflow-auto">
                {usabilityTesting.figma_embed_code}
              </div>
            </div>
          )}
        
        </div>
  
        <div className="flex justify-center pt-4">
          <button
            onClick={startRecording}
            className="px-6 py-3 bg-[#C4BDED] text-black rounded-lg shadow-md hover:bg-[#ACA3E3] transition duration-300"
          >
            🚀 Start Testing
          </button>
        </div>

      </div>
    </div>
  );
  
};

export default TestCalibration;
