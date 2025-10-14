import React, { useEffect, useRef, useState, } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import CameraCalibration from './UsabilityTestingCallibration/CameraCalibration';
import ScreenShareInstruction from './UsabilityTestingCallibration/ScreenShareInstruction';

const TestInfo = () => {
  const { usabilityTestingId } = useParams();
  const [usabilityTesting, setUsabilityTesting] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [showCalibrationModal, setShowCalibrationModal] = useState(false);
  const [step, setStep] = useState(1);
  const [isFrameValid, setIsFrameValid] = useState(false);
  const cameraRef = useRef(null); // 👈 reference to access stopCamera

  const handleClose = () => {
      if (cameraRef.current) {
          cameraRef.current.stopCamera(); // 👈 stop the camera when modal closes
      }
      setStep(1); // Reset to step 0 when closing
      setShowCalibrationModal(false);
  };

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
  
        //navigate(-1); // Redirect back to the previous page *************
      };
  
      mediaRecorder.start();
      console.log("Recording started...");

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
            onClick={() => setShowCalibrationModal(true)}
            className="px-6 py-3 bg-[#C4BDED] text-black rounded-lg shadow-md hover:bg-[#ACA3E3] transition duration-300"
          >
            Start
          </button>
          {showCalibrationModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full relative flex flex-col">
                        {/* Header */}
                        <div className="flex items-center justify-between p-3 bg-gray-100 rounded-t-lg">
                            <h2 className="font-semibold font-funnel text-lg">Camera Calibration</h2>
                            <button
                                onClick={handleClose}
                                className="text-black bg-white hover:bg-gray-200 rounded-lg border border-gray-300 p-1"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="w-full h-[1px] bg-gray-300"></div>

                        {/* Body */}
                        <div className="bg-white rounded-lg h-[500px] shadow-lg p-6 w-full">
                            {step === 1 && (
                                <div className="overflow-auto max-h-[500px]">
                                    <CameraCalibration ref={cameraRef} onValidationChange={setIsFrameValid} />
                                    <div className="mt-4 flex flex-col items-end space-y-2">
                                        <button
                                            onClick={() => {
                                                if (cameraRef.current) {
                                                    cameraRef.current.stopCamera(); // 👈 stop the camera when Next is clicked
                                                }
                                                setStep(step + 1);
                                            }}
                                            disabled={!isFrameValid}
                                            className={`px-4 py-2 rounded transition 
                                                ${isFrameValid 
                                                    ? 'bg-gray-300 hover:bg-gray-400' 
                                                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
                                        >
                                            Next
                                        </button>

                                        {/* 👇 Conditional Message */}
                                        {!isFrameValid && (
                                            <p className="text-sm text-red-500">
                                                Please pass all validation checks to continue.
                                            </p>
                                        )}
 
                                    </div>
                                </div>
                            )}
                            {step === 2 && (
                                <div>
                                    <ScreenShareInstruction />
                                    <div className="mt-4 flex justify-between">
                                        <button
                                            onClick={() => setStep(step - 1)}
                                            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                        >
                                            Back
                                        </button>
                                        <button
                                            onClick={() => setStep(step + 1)}
                                            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            )}
                            {step === 3 && (
                                <div className="flex flex-col items-center gap-8 p-8 max-w-xl mx-auto">
                                  <p className="text-3xl font-bold text-gray-800 text-center">Are you ready for the test?</p>
                                  {/* <img 
                                    src="/static/images/welcomeback.png" 
                                    alt="Test illustration" 
                                    className="w-64 h-auto rounded-xl shadow-md" 
                                  /> */}
                                  <div className="flex flex-col items-center mt-6 px-6 py-2">
                                    <button
                                      onClick={startRecording}
                                      className="px-6 py-3 bg-[#C4BDED] text-black rounded-lg shadow-md hover:bg-[#ACA3E3] transition duration-300"
                                    >
                                      🚀 Start Testing
                                    </button>
                                  </div>
                                  
                                  <div className="flex justify-between mt-6">
                                      <button
                                          onClick={() => setStep(step - 1)}
                                          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                      >
                                          Back
                                      </button>
                                  </div>
                                </div>
                                
                            )}

                        </div>

                        <div className="w-full h-[1px] bg-gray-300"></div>

                        {/* Footer */}
                        <div className="flex items-center font-funnel justify-between p-3 bg-gray-100 rounded-b-lg">
                            <h2 className="font-semibold text-base">Koalytics</h2>
                            
                        </div>
                    </div>
                </div>
            )}
        </div>

      </div>
    </div>
  );
  
};

export default TestInfo;
