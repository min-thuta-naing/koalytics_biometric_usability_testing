import React, { useRef, useState } from "react";
import { X } from "lucide-react";
import CameraCalibration from "./UsabilityTestingCallibration/CameraCalibration";
import ScreenShareInstruction from "./UsabilityTestingCallibration/ScreenShareInstruction";
import { createPortal } from "react-dom";


const UsabilityTestingCalibrationPopUp = ({ usabilityTesting, usabilityTestingId, onClose }) => {
    const API_URL = process.env.REACT_APP_API_URL;
    const [step, setStep] = useState(1);
    const [isFrameValid, setIsFrameValid] = useState(false);
    const cameraRef = useRef(null);

    const handleClose = () => {
        if (cameraRef.current) cameraRef.current.stopCamera();
        setStep(1);
        onClose();
    };

    const startRecording = async () => {
        try {
        const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        const mediaRecorder = new MediaRecorder(stream);
        const chunks = [];

        mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
        mediaRecorder.onstop = async () => {
            const blob = new Blob(chunks, { type: "video/webm" });
            const formData = new FormData();
            formData.append("usability_testing_id", usabilityTestingId);
            formData.append("video", blob, "recording.webm");

            const userData = localStorage.getItem("user");
            if (!userData) {
            alert("Error: You are not logged in.");
            return;
            }

            const userEmail = JSON.parse(userData).email;
            formData.append("participant_email", userEmail);

            await fetch(`${API_URL}/api/save-recording/`, { method: "POST", body: formData });
        };

        mediaRecorder.start();
        setTimeout(() => mediaRecorder.stop(), usabilityTesting.duration * 60 * 1000);
        window.open(`/browser-in-browser?url=${encodeURIComponent(usabilityTesting.website_link)}&id=${usabilityTestingId}`, "_blank");
        } catch (error) {
        console.error("Screen recording error:", error);
        }
    };

    return createPortal (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full relative flex flex-col">
                
                {/* Header */}
                <div className="flex items-center justify-between p-3 bg-gray-100 rounded-t-lg">
                    <h2 className="font-semibold font-funnel text-lg">Camera Calibration</h2>
                    <button onClick={handleClose} className="text-black bg-white hover:bg-gray-200 rounded-lg border border-gray-300 p-1">
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <div className="w-full h-[1px] bg-gray-300"></div>

                {/* Body */}
                {/* <div className="flex-1 overflow-y-auto h-[440px] p-6"> */}
                <div className="bg-white rounded-lg h-[500px] shadow-lg p-6 w-full">
                {step === 1 && (
                    <div className="overflow-auto max-h-[500px]">
                        <CameraCalibration ref={cameraRef} onValidationChange={setIsFrameValid} />
                        <div className="mt-4 flex flex-col items-end space-y-2">
                            <button
                            onClick={() => {
                                if (cameraRef.current) cameraRef.current.stopCamera();
                                setStep(2);
                            }}
                            disabled={!isFrameValid}
                            className={`px-4 py-2 rounded transition 
                                ${isFrameValid 
                                ? 'bg-gray-300 hover:bg-gray-400' 
                                : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
                            >
                            Next
                            </button>
                            {!isFrameValid && <p className="text-sm text-red-500">Please pass all validation checks to continue.</p>}
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div>
                    <ScreenShareInstruction />
                    <div className="mt-4 flex justify-between">
                        <button onClick={() => setStep(1)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Back</button>
                        <button onClick={() => setStep(3)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Next</button>
                    </div>
                    </div>
                )}
                {step === 3 && (
                    <div className="flex flex-col justify-between h-full p-8">
                        <div className="flex flex-col items-center gap-8 mt-8">
                            <p className="text-3xl font-bold text-gray-800 text-center">
                                Are you ready for the test?
                            </p>
                            <button
                                onClick={startRecording}
                                className="px-6 py-3 bg-[#C4BDED] text-black rounded-lg shadow-md hover:bg-[#ACA3E3] transition duration-300"
                            >
                                Start Testing
                            </button>
                        </div>
                        <div className="flex justify-start mt-auto">
                            <button
                                onClick={() => setStep(2)}
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
        </div>,
        document.body
    );
};

export default UsabilityTestingCalibrationPopUp;
