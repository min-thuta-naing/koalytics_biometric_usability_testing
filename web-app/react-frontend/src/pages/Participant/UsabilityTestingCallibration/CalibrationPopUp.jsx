import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import { X } from "lucide-react";
import CameraCalibration from './CameraCalibration';
import ScreenShareInstruction from './ScreenShareInstruction';

const CalibrationPopUp = () => {
    const [showCalibrationModal, setShowCalibrationModal] = useState(false);
    const [step, setStep] = useState(1);
    const [isFrameValid, setIsFrameValid] = useState(false);
    const cameraRef = useRef(null); 
    const handleClose = () => {
        if (cameraRef.current) {
            cameraRef.current.stopCamera(); 
        }
        setStep(1); 
        setShowCalibrationModal(false);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <button
                onClick={() => setShowCalibrationModal(true)}
                className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
                Click here
            </button>

            {showCalibrationModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full relative flex flex-col">
                        {/* Header */}
                        <div className="flex items-center justify-between p-3 bg-gray-100 rounded-t-lg">
                            <h2 className="font-semibold font-funnel text-lg">Let's check your camera!</h2>
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
                                            ③ Next
                                        </button>

                                        {/* 👇 Conditional Message */}
                                        {!isFrameValid && (
                                            <p className="text-sm text-red-500">
                                                Please pass all camera checks to continue.
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
                                <div className="flex justify-between">
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
    );
};

export default CalibrationPopUp;
