// import React, { useEffect, useRef } from 'react';
// import { useLocation } from 'react-router-dom';

// const BrowserInBrowser = () => {
//     const location = useLocation();
//     const urlParams = new URLSearchParams(location.search);
//     const url = urlParams.get('url'); // Get the URL from query parameters

//     const videoRef = useRef(null);

//     useEffect(() => {
//         // Access the user's webcam
//         navigator.mediaDevices.getUserMedia({ video: true })
//             .then((stream) => {
//                 if (videoRef.current) {
//                     videoRef.current.srcObject = stream;
//                 }
//             })
//             .catch((error) => {
//                 console.error("Error accessing webcam:", error);
//             });

//         return () => {
//             // Cleanup: stop the webcam stream when the component unmounts
//             if (videoRef.current && videoRef.current.srcObject) {
//                 const tracks = videoRef.current.srcObject.getTracks();
//                 tracks.forEach(track => track.stop());
//             }
//         };
//     }, []);

//     return (
//         <div className="flex h-screen">

//             {/* Left Side (Content Section with Camera) */}
//             <div className="w-1/5 p-4 bg-gray-100 flex flex-col items-center">
//                 <h2 className="text-xl font-bold">Facial</h2>
//                 {/* <p className="mb-2 text-center">This space can be used to provide instructions or any other content.</p> */}

//                 {/* Camera Frame */}
//                 <div className="w-full bg-black rounded-lg overflow-hidden flex justify-center">
//                     <video ref={videoRef} autoPlay playsInline className="w-full h-auto"></video>
//                 </div>
//             </div>

//             {/* Right Side (Iframe Section) */}
//             <div className="w-4/5 h-full">
//                 {url ? (
//                     <iframe
//                         src={url}
//                         title="Embedded Browser"
//                         className="w-full h-full border-none"
//                     />
//                 ) : (
//                     <p className="text-center mt-10">No URL provided</p>
//                 )}
//             </div>

//         </div>
//     );
// };

// export default BrowserInBrowser;


import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

const BrowserInBrowser = () => {
    const location = useLocation();
    const urlParams = new URLSearchParams(location.search);
    const url = urlParams.get('url'); // Get the URL from query parameters

    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const [dominantEmotion, setDominantEmotion] = useState('');
    const [emotionProbabilities, setEmotionProbabilities] = useState({});
    const [boundingBox, setBoundingBox] = useState(null);

    //for the task and time of the usability testing
    const [task, setTask] = useState('');
    const [duration, setDuration] = useState(0);
    const [timeLeft, setTimeLeft] = useState(0);

    // with the id passed from TestCalibration page, fetch the usability testing detail of that id 
    const id = urlParams.get('id');
    useEffect(() => {
        if (!id) return;
        const fetchUsabilityTest = async () => {
            try {
                const res = await fetch(`http://127.0.0.1:8000/usability-testing/${id}/`);
                const data = await res.json();
                setTask(data.task);
                setDuration(data.duration);
                setTimeLeft(data.duration * 60); // convert minutes to seconds
            } catch (err) {
                console.error("Failed to fetch usability test details", err);
            }
        };
        fetchUsabilityTest();
    }, [id]);

    // to manage the time of the task 
    useEffect(() => {
        if (timeLeft <= 0) return;
    
        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);
    
        return () => clearInterval(timer);
    }, [timeLeft]);
    


    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            })
            .catch(error => console.error("Error accessing webcam:", error));

        return () => {
            if (videoRef.current?.srcObject) {
                videoRef.current.srcObject.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    // Function to capture a frame and send it to the backend
    const captureAndSendFrame = async () => {
        if (!videoRef.current || !canvasRef.current) return;

        const video = videoRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageData = canvas.toDataURL('image/jpeg'); // Convert to base64
        console.log(imageData);

        try {
            const response = await fetch('http://127.0.0.1:8000/emotion-detection/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ image: imageData }),
            });

            const data = await response.json();
            if (data.error) {
                console.error(data.error);
                return;
            }

            setDominantEmotion(data.emotion);
            setEmotionProbabilities(data.emotion_probabilities);
            setBoundingBox(data.bounding_box);
            drawBoundingBox(data.bounding_box, data.emotion);
        } catch (error) {
            console.error('Error sending frame:', error);
        }
    };

    // Function to draw bounding box and display dominant emotion
    const drawBoundingBox = (box, emotion) => {
        if (!canvasRef.current || !box) return;
        
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = 'green';
        ctx.lineWidth = 2;
        ctx.strokeRect(box.x, box.y, box.width, box.height);

        ctx.font = '20px Arial';
        ctx.fillStyle = 'red';
        ctx.textAlign = 'center';
        ctx.fillText(emotion, box.x + box.width / 2, box.y - 10);
    };

    useEffect(() => {
        const interval = setInterval(captureAndSendFrame, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex h-screen">
            {/* Left Side (Camera & Emotion Display) */}
            <div className="w-1/5 p-4 bg-gray-100 flex flex-col items-center">
                <h2 className="text-xl font-bold">Instructions</h2>
                <p className="mb-2 text-center">Your facial emotions will be detected in real-time.</p>

                <div className="relative w-full bg-black rounded-lg overflow-hidden flex justify-center">
                    {/* Webcam Video */}
                    <video ref={videoRef} autoPlay playsInline className="w-full h-auto"></video>

                    {/* Overlay Canvas for Bounding Box */}
                    <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full"></canvas>
                </div>

                {/* Display Emotion Probabilities */}
                <div className="mt-4 w-full text-center">
                    {Object.entries(emotionProbabilities).map(([emotion, probability]) => (
                        <p key={emotion} className="text-sm">
                            <strong>{emotion}</strong>: {(probability * 100).toFixed(2)}%
                        </p>
                    ))}
                </div>

                {/* Display task and countdown */}
                <div className="mt-6 w-full text-center">
                    <h3 className="text-md font-semibold text-gray-700">Task</h3>
                    <p className="text-sm text-gray-600">{task}</p>
                    
                    <div className="mt-2">
                        <h3 className="text-md font-semibold text-gray-700">Time Left</h3>
                        <p className="text-sm text-red-500">
                            {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Side (Iframe Section) */}
            <div className="w-4/5 h-full">
                <iframe
                    style={{ border: '1px solid rgba(0, 0, 0, 0.1)' }}
                    className="w-full h-full"
                    src="https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/proto/MksDrp3YRsaKqrjrdLZQYO/Mobile-E-Commerce-App-Prototype--Community-?node-id=0-1&t=oEKe0PSG0MnJFSxL-1"
                    allowfullscreen
                />
                {/* {url ? (
                    <iframe src={url} title="Embedded Browser" className="w-full h-full border-none" />
                ) : (
                    <p className="text-center mt-10">No URL provided</p>
                )} */}
            </div>
        </div>
    );
};

export default BrowserInBrowser;

