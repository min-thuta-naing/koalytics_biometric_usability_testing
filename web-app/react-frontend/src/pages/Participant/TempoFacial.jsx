// // import React, { useState, useEffect, useRef } from 'react';
// // import { X } from "lucide-react";

// // const HomePage = () => {
// //     const [showCalibrationModal, setShowCalibrationModal] = useState(false);
// //     const [cameraPermission, setCameraPermission] = useState(null);
// //     const videoRef = useRef(null);
// //     const canvasRef = useRef(null);
// //     const animationRef = useRef(null);
// //     const streamRef = useRef(null); // keep track of the stream separately

// //     useEffect(() => {
// //         const startCamera = async () => {
// //             try {
// //                 const stream = await navigator.mediaDevices.getUserMedia({ video: true });
// //                 streamRef.current = stream;
// //                 setCameraPermission('granted');

// //                 if (videoRef.current) {
// //                     videoRef.current.srcObject = stream;

// //                     videoRef.current.onloadedmetadata = () => {
// //                         videoRef.current.play();
// //                         drawToCanvas();
// //                     };
// //                 }
// //             } catch (err) {
// //                 console.warn("Camera access denied:", err);
// //                 setCameraPermission('denied');
// //             }
// //         };

// //         const drawToCanvas = () => {
// //             const video = videoRef.current;
// //             const canvas = canvasRef.current;
// //             const ctx = canvas?.getContext('2d');

// //             const render = () => {
// //                 if (video && canvas && ctx) {
// //                     ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
// //                     animationRef.current = requestAnimationFrame(render);
// //                 }
// //             };

// //             render();
// //         };

// //         if (showCalibrationModal) {
// //             startCamera();
// //         } else {
// //             // Stop camera stream and cancel animation frame
// //             if (animationRef.current) {
// //                 cancelAnimationFrame(animationRef.current);
// //                 animationRef.current = null;
// //             }

// //             if (streamRef.current) {
// //                 streamRef.current.getTracks().forEach(track => track.stop());
// //                 streamRef.current = null;
// //             }

// //             if (videoRef.current) {
// //                 videoRef.current.srcObject = null;
// //             }
// //         }

// //         return () => {
// //             // Extra cleanup on component unmount
// //             if (animationRef.current) {
// //                 cancelAnimationFrame(animationRef.current);
// //             }

// //             if (streamRef.current) {
// //                 streamRef.current.getTracks().forEach(track => track.stop());
// //             }

// //             if (videoRef.current) {
// //                 videoRef.current.srcObject = null;
// //             }
// //         };
// //     }, [showCalibrationModal]);

// //     return (
// //         <div className="flex items-center justify-center min-h-screen bg-gray-100">
// //             <button
// //                 onClick={() => setShowCalibrationModal(true)}
// //                 className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
// //             >
// //                 Click here
// //             </button>

// //             {showCalibrationModal && (
// //                 <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
// //                     <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full relative flex flex-col">
// //                         {/* Header */}
// //                         <div className="flex items-center justify-between p-3 bg-gray-100 rounded-t-lg">
// //                             <h2 className="font-semibold font-funnel text-lg">Camera Calibration</h2>
// //                             <button
// //                                 onClick={() => setShowCalibrationModal(false)}
// //                                 className="text-black bg-white hover:bg-gray-200 rounded-lg border border-gray-300 p-1"
// //                             >
// //                                 <X className="w-4 h-4" />
// //                             </button>
// //                         </div>

// //                         <div className="w-full h-[1px] bg-gray-300"></div>

// //                         {/* Body */}
// //                         <div className="bg-white rounded-lg h-[500px] shadow-lg p-6 w-full">
// //                             {cameraPermission === 'granted' ? (
// //                                 <div className="w-full h-full flex justify-center items-center">
// //                                     <>
// //                                         <video ref={videoRef} style={{ display: 'none' }} />
// //                                         <canvas
// //                                             ref={canvasRef}
// //                                             width={640}
// //                                             height={480}
// //                                             className="border border-gray-300 rounded"
// //                                         />
// //                                     </>
// //                                 </div>
// //                             ) : cameraPermission === 'denied' ? (
// //                                 <div className="text-center text-red-500 font-semibold">
// //                                     Please allow camera access to proceed.
// //                                 </div>
// //                             ) : (
// //                                 <div className="text-center text-gray-500">
// //                                     Requesting camera access...
// //                                 </div>
// //                             )}
// //                         </div>

// //                         <div className="w-full h-[1px] bg-gray-300"></div>

// //                         {/* Footer */}
// //                         <div className="flex items-center font-funnel justify-between p-3 bg-gray-100 rounded-b-lg">
// //                             <h2 className="font-semibold text-base">Koalytics</h2>
// //                         </div>
// //                     </div>
// //                 </div>
// //             )}
// //         </div>
// //     );
// // };

// // export default HomePage;


// import React, { useEffect, useRef, useState, forwardRef } from 'react';


// const Video = forwardRef((props, ref) => {
//     const videoRef = useRef(null);
//     const canvasRef = useRef(null);
//     const streamRef = useRef(null);

//     const [permission, setPermission] = useState(null);


//     const handleStartCamera = async () => {
//         try {
//             const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//             streamRef.current = stream;
//             setPermission("granted");

//             if (videoRef.current) {
//                 videoRef.current.srcObject = stream;
//                 videoRef.current.onloadedmetadata = () => {
//                     videoRef.current.play();
                    
//                 };
//             }
//         } catch (err) {
//             console.warn("Camera access denied:", err);
//             setPermission("denied");
//         }
//     };

//     const handleStopCamera = () => {
//         if (streamRef.current) {
//             streamRef.current.getTracks().forEach(track => track.stop());
//             streamRef.current = null;
//         }

//         if (videoRef.current) {
//             videoRef.current.pause();
//             videoRef.current.srcObject = null;
//         }

//         setPermission(null);
//     };

//     return (
//             <div className="flex flex-col items-center justify-center bg-gray-100 p-4">
//                 <h1 className="text-2xl font-bold mb-4">Camera Lighting Calibration</h1>

//                 {permission === "denied" ? (
//                     <p className="text-red-500">Camera access denied. Please allow access to continue.</p>
//                 ) : (
//                     <>
//                         <video
//                             ref={videoRef}
//                             autoPlay
//                             playsInline
//                             muted
//                             className="w-full max-w-md rounded shadow-lg border border-gray-300"
//                         />
                                         


//                         <div className="flex space-x-4 mb-4">
//                             <button
//                                 onClick={handleStartCamera}
//                                 className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//                             >
//                                 Open Camera
//                             </button>
//                             <button
//                                 onClick={handleStopCamera}
//                                 className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//                             >
//                                 Close Camera
//                             </button>
//                         </div>


//                         {/* Hidden canvas for frame analysis */}
//                         <canvas ref={canvasRef} style={{ display: "none" }} />
//                     </>
//                 )}
//             </div>
//     )
// }); 

// export default Video; 