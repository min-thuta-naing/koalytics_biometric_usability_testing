// import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';


// const Camera = forwardRef((props, ref) => {
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

//     // 👇 This exposes handleStopCamera to the parent via ref
//     useImperativeHandle(ref, () => ({
//         stopCamera: handleStopCamera
//     }));

//     return (
//         <div className="font-funnel flex flex-col items-center justify-center p-4">
//             <h1 className="text-2xl font-bold mb-4">Camera Lighting Calibration</h1>

//             {permission === "denied" ? (
//                 <p className="text-red-500">Camera access denied. Please allow access to continue.</p>
//             ) : (
//                 <>
//                     <video
//                         ref={videoRef}
//                         autoPlay
//                         playsInline
//                         muted
//                         style={{
//                             width: '330px',
//                             height: '250px',
//                             borderRadius: '12px',
//                             overflow: 'hidden',
//                             objectFit: 'cover' // makes it look cleaner, like background-size: cover
//                         }}
//                         className="shadow-lg border border-gray-300"
//                     />
                                        
//                     <div className="flex space-x-4 mb-4">
//                         <button
//                             onClick={handleStartCamera}
//                             className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//                         >
//                             Open Camera
//                         </button>
//                         <button
//                             onClick={handleStopCamera}
//                             className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//                         >
//                             Close Camera
//                         </button>
//                     </div>

//                     {/* Hidden canvas for frame analysis */}
//                     <canvas ref={canvasRef} style={{ display: "none" }} />
//                 </>
//             )}
//         </div>
//     )
// }); 

// export default Camera; 



//second code 
// import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';

// const Camera = forwardRef((props, ref) => {
//     const videoRef = useRef(null);
//     const canvasRef = useRef(null);
//     const streamRef = useRef(null);

//     const [permission, setPermission] = useState(null);
//     const [validationResult, setValidationResult] = useState(null);

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

//     const handleValidateFrame = async () => {
//         if (!videoRef.current || !canvasRef.current) return;

//         const canvas = canvasRef.current;
//         const ctx = canvas.getContext('2d');
//         canvas.width = videoRef.current.videoWidth;
//         canvas.height = videoRef.current.videoHeight;
//         ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

//         const dataUrl = canvas.toDataURL('image/jpeg');
        
//         const response = await fetch('/api/validate-frame/', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ image: dataUrl }),
//         });

//         const result = await response.json();
//         setValidationResult(result);
//     };

//     useImperativeHandle(ref, () => ({
//         stopCamera: handleStopCamera
//     }));

//     return (
//         <div className="font-funnel flex flex-col items-center justify-center p-4">
//             <h1 className="text-2xl font-bold mb-4">Camera Lighting Calibration</h1>

//             {permission === "denied" ? (
//                 <p className="text-red-500">Camera access denied. Please allow access to continue.</p>
//             ) : (
//                 <>
//                     <video
//                         ref={videoRef}
//                         autoPlay
//                         playsInline
//                         muted
//                         style={{
//                             width: '330px',
//                             height: '250px',
//                             borderRadius: '12px',
//                             objectFit: 'cover'
//                         }}
//                         className="shadow-lg border border-gray-300"
//                     />

//                     <div className="flex space-x-4 mt-4">
//                         <button
//                             onClick={handleStartCamera}
//                             className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//                         >
//                             Open Camera
//                         </button>
//                         <button
//                             onClick={handleStopCamera}
//                             className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//                         >
//                             Close Camera
//                         </button>
//                         <button
//                             onClick={handleValidateFrame}
//                             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                         >
//                             Validate Frame
//                         </button>
//                     </div>

//                     <canvas ref={canvasRef} style={{ display: "none" }} />

//                     {validationResult && (
//                         <div className="mt-4 text-left">
//                             <h2 className="font-bold">Validation Results:</h2>
//                             <pre className="bg-gray-100 p-2 rounded text-sm">{JSON.stringify(validationResult, null, 2)}</pre>
//                         </div>
//                     )}
//                 </>
//             )}
//         </div>
//     );
// });

// export default Camera;

import React, { useRef, useState, forwardRef, useImperativeHandle } from 'react';

const renderValidationIndicator = (label, status) => {
    let symbol = "⬜"; // Neutral
    let color = "text-gray-500";
  
    if (status === true) {
      symbol = "✅";
      color = "text-green-600";
    } else if (status === false) {
      symbol = "❌";
      color = "text-red-500";
    }
  
    return (
      <div className={`flex items-center space-x-2 ${color}`}>
        <span className="text-xl">{symbol}</span>
        <span>{label}</span>
      </div>
    );
};
  
const Camera = forwardRef(({ onValidationChange }, ref) => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const streamRef = useRef(null);

    const [permission, setPermission] = useState(null);
    const [validationResult, setValidationResult] = useState(null);

    const handleStartCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            streamRef.current = stream;
            setPermission("granted");

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.onloadedmetadata = () => {
                    videoRef.current.play();
                };
            }
        } catch (err) {
            console.warn("Camera access denied:", err);
            setPermission("denied");
        }
    };

    const handleStopCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }

        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.srcObject = null;
        }

        setPermission(null);
    };

    const handleValidateFrame = async () => {
        if (!videoRef.current || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

        const dataUrl = canvas.toDataURL('image/jpeg');

        const response = await fetch('/api/validate-frame/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image: dataUrl }),
        });

        const result = await response.json();
        setValidationResult(result);
        // Notify parent of current validation state
        if (onValidationChange) {
            const isValid = (
                result?.face_detected === true &&
                result?.multiple_faces === false &&
                result?.blurry === false &&
                result?.too_dark === false &&
                result?.too_bright === false
            );
            onValidationChange(isValid);
        }
    };

    useImperativeHandle(ref, () => ({
        stopCamera: handleStopCamera, 
        isFrameValid: () => {
            return (
                validationResult?.face_detected === true &&
                validationResult?.multiple_faces === false &&
                validationResult?.blurry === false &&
                validationResult?.too_dark === false &&
                validationResult?.too_bright === false
            );
        }
    }));

    return (
        <div className="font-funnel flex flex-col items-center justify-center p-4">
            <h1 className="text-2xl font-bold mb-4">Check your camera</h1>

            {permission === "denied" ? (
                <p className="text-red-500">Camera access denied. Please allow access to continue.</p>
            ) : (
                <div className="flex flex-row items-start space-x-6">
                    {/* Video Frame */}
                    <div className="flex flex-col items-center">
                        <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            muted
                            style={{
                                width: '330px',
                                height: '250px',
                                borderRadius: '12px',
                                objectFit: 'cover'
                            }}
                            className="shadow-lg border border-gray-300"
                        />

                            <div className="flex space-x-4 mt-4">
                            <button
                                onClick={handleStartCamera}
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                            >
                                Open Camera
                            </button>
                            <button
                                onClick={handleStopCamera}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            >
                                Close Camera
                            </button>
                            </div>
                    </div>

                    {/* Validation Checkboxes */}
                    <div className="space-y-2 text-sm mt-3">
                        {renderValidationIndicator("Face Detected", validationResult?.face_detected)}
                        {renderValidationIndicator("Only One Face", validationResult?.multiple_faces === false)}
                        {renderValidationIndicator("Clear (Not Blurry)", validationResult?.blurry === false)}
                        {renderValidationIndicator("No Dark Lighting", validationResult?.too_dark === false)}
                        {renderValidationIndicator("No Bright Lighting", validationResult?.too_bright === false)}
                        <button
                            onClick={handleValidateFrame}
                            className="bg-blue-500 text-white mt-2 px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Validate Frame
                        </button>
                    </div>
                </div>
            )}

            <canvas ref={canvasRef} style={{ display: "none" }} />
        </div>

    );
});

export default Camera;
