// import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';

// const getBrightness = (r, g, b) => 0.299 * r + 0.587 * g + 0.114 * b;

// const LightingCalibration = forwardRef((props, ref) => {
//     const videoRef = useRef(null);
//     const canvasRef = useRef(null);
//     const animationRef = useRef(null);
//     const streamRef = useRef(null);

//     const [lightingStatus, setLightingStatus] = useState("Analyzing lighting...");
//     const [permission, setPermission] = useState(null);

//     // Expose stopCamera function via ref
//     useImperativeHandle(ref, () => ({
//         stopCamera: () => {
//             stopCamera();
//         }
//     }));

//     const stopCamera = () => {
//         if (animationRef.current) {
//             cancelAnimationFrame(animationRef.current);
//             animationRef.current = null;
//         }
//         if (streamRef.current) {
//             streamRef.current.getTracks().forEach(track => {
//                 track.stop();
//             });
//             streamRef.current = null;
//         }
//         if (videoRef.current) {
//             videoRef.current.srcObject = null;
//         }
//     };

//     useEffect(() => {
//         const startCamera = async () => {
//             try {
//                 const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//                 streamRef.current = stream;
//                 setPermission("granted");

//                 if (videoRef.current) {
//                     videoRef.current.srcObject = stream;
//                     videoRef.current.onloadedmetadata = () => {
//                         videoRef.current.play();
//                         analyzeLighting();
//                     };
//                 }
//             } catch (err) {
//                 console.warn("Camera access denied:", err);
//                 setPermission("denied");
//             }
//         };

//         const analyzeLighting = () => {
//             const canvas = canvasRef.current;
//             const ctx = canvas?.getContext("2d");
//             const video = videoRef.current;

//             const render = () => {
//                 if (!video || !ctx || !canvas) return;

//                 canvas.width = video.videoWidth;
//                 canvas.height = video.videoHeight;

//                 ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
//                 const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
//                 const pixels = imageData.data;

//                 let totalBrightness = 0;
//                 for (let i = 0; i < pixels.length; i += 4) {
//                     const r = pixels[i];
//                     const g = pixels[i + 1];
//                     const b = pixels[i + 2];
//                     totalBrightness += getBrightness(r, g, b);
//                 }

//                 const avgBrightness = totalBrightness / (pixels.length / 4);

//                 if (avgBrightness < 50) {
//                     setLightingStatus("Too dark. Move to a well-lit area.");
//                 } else if (avgBrightness > 200) {
//                     setLightingStatus("Too bright or backlit. Avoid direct light.");
//                 } else {
//                     setLightingStatus("Lighting looks good.");
//                 }

//                 animationRef.current = requestAnimationFrame(render);
//             };

//             render();
//         };

//         startCamera();

//         return () => {
//             stopCamera();
//         };
//     }, []);

//     return (
//         <div className="flex flex-col items-center justify-center bg-gray-100 p-4">
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
//                         className="w-full max-w-md rounded shadow-lg border border-gray-300"
//                     />

//                     <p className="mt-4 text-lg font-medium text-gray-700">{lightingStatus}</p>

//                     {/* Hidden canvas for frame analysis */}
//                     <canvas ref={canvasRef} style={{ display: "none" }} />
//                 </>
//             )}
//         </div>
//     );
// });

// export default LightingCalibration;

import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';


const Camera = forwardRef((props, ref) => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const streamRef = useRef(null);

    const [permission, setPermission] = useState(null);


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

    // 👇 This exposes handleStopCamera to the parent via ref
    useImperativeHandle(ref, () => ({
        stopCamera: handleStopCamera
    }));

    return (
        <div className="font-funnel flex flex-col items-center justify-center bg-gray-100 p-4">
            <h1 className="text-2xl font-bold mb-4">Camera Lighting Calibration</h1>

            {permission === "denied" ? (
                <p className="text-red-500">Camera access denied. Please allow access to continue.</p>
            ) : (
                <>
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        style={{
                            width: '330px',
                            height: '250px',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            objectFit: 'cover' // makes it look cleaner, like background-size: cover
                        }}
                        className="shadow-lg border border-gray-300"
                    />
                                        
                    <div className="flex space-x-4 mb-4">
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

                    {/* Hidden canvas for frame analysis */}
                    <canvas ref={canvasRef} style={{ display: "none" }} />
                </>
            )}
        </div>
    )
}); 

export default Camera; 