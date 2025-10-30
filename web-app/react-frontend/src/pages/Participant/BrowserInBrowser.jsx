import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

const BrowserInBrowser = () => {
    const API_URL = process.env.REACT_APP_API_URL;
    const location = useLocation();
    const urlParams = new URLSearchParams(location.search);
    const url = urlParams.get('url'); // Get the URL from query parameters
    const [usabilityTesting, setUsabilityTesting] = useState(null);

    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const [dominantEmotion, setDominantEmotion] = useState('');
    const [emotionProbabilities, setEmotionProbabilities] = useState({});
    const [boundingBox, setBoundingBox] = useState(null);

    //for the task and time of the usability testing
    const [task, setTask] = useState('');
    const [duration, setDuration] = useState(0);
    const [timeLeft, setTimeLeft] = useState(0);
    const [userEmail, setUserEmail] = useState(null); // State to store user email
    
    // Fetch the user email from localStorage or session
    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) {
        const parsedUser = JSON.parse(userData);
        setUserEmail(parsedUser.email); // Extract the email
        } else {
        console.error("User not found in localStorage!");
        }
    }, []);

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                console.log("Webcam stream started");
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

    // with the id passed from TestCalibration page, fetch the usability testing detail (task and duration) of that id 
    const id = urlParams.get('id');
    useEffect(() => {
        if (!id) return;
        const fetchUsabilityTest = async () => {
            try {
                const res = await fetch(`${API_URL}usability-testing/${id}/`);
                const data = await res.json();
                setUsabilityTesting(data);
                setTask(data.task);
                setDuration(data.duration);
                setTimeLeft(data.duration * 60 * 1000); // convert minutes to seconds
            } catch (err) {
                console.error("Failed to fetch usability test details", err);
            }
        };
        fetchUsabilityTest();
    }, [id]);

    // Countdown Timer (this updates every second)
    useEffect(() => {
        if (timeLeft <= 0) return;

        console.log("⏱️ Starting interval for capturing frames");
        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1000);
        }, 1000);
    
        return () => clearInterval(timer);
    }, [timeLeft]);

    // Stop the webcam when timeLeft is 0
    useEffect(() => {
        if (timeLeft <= 0) {
            stopWebcam(); // Stop the webcam after the countdown reaches 0
        }
    }, [timeLeft]);

    // Function to stop the webcam
    const stopWebcam = () => {
        if (videoRef.current?.srcObject) {
            videoRef.current.srcObject.getTracks().forEach(track => track.stop());
        }
    };
    

    // Function to capture a frame and send it to the backend
    const captureAndSendFrame = async () => {
        if (!videoRef.current || !canvasRef.current || !userEmail) {
            console.error("videoRef or canvasRef is not available");
            return;
        }

        // Log the video dimensions
        console.log("Video dimensions:", videoRef.current.videoWidth, videoRef.current.videoHeight);

        console.log("Submitting answers for user:", userEmail);

        // const video = videoRef.current;
        // const canvas = canvasRef.current;
        // const ctx = canvas.getContext('2d');

        // canvas.width = video.videoWidth;
        // canvas.height = video.videoHeight;
        // ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        // Set canvas size based on the video
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;

        const ctx = canvasRef.current.getContext('2d');
        ctx.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);

        // const imageData = canvas.toDataURL('image/jpeg'); // Convert to base64
        const imageData = canvasRef.current.toDataURL('image/jpeg');
        console.log("📸 Sending image to backend, size:", imageData.length);
        

        // Check if the base64 string is valid
        if (!imageData || imageData.length === 0) {
            console.error("Captured image is empty or invalid");
            return;
        }
        
        console.log(imageData);
        console.log("📸 Sending image to backend, size:", imageData.length);


        try {
            const response = await fetch(`${API_URL}emotion-detection/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    image: imageData, 
                    test_id:id, 
                    participant_email: userEmail,
                }),
            });

            const data = await response.json();
            console.log("🎯 Server response:", data);
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

    const intervalRef = useRef(null);

    useEffect(() => {
        const startCapture = () => {
            if (intervalRef.current) return; // Prevent multiple intervals

            console.log("📽️ Video metadata loaded, starting capture interval.");
            intervalRef.current = setInterval(captureAndSendFrame, 1000);
        };

        if (videoRef.current) {
            if (videoRef.current.readyState >= 1) {
                startCapture();
            } else {
                videoRef.current.onloadedmetadata = startCapture;
            }
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [userEmail]); // Make sure email is available before starting

    

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
                    <h3 className="text-md font-semibold text-gray-700 mb-2">Task</h3>
                    {Array.isArray(task) ? (
                    <ol className="list-decimal list-inside text-sm text-gray-600 space-y-1 text-left">
                        {task.map((step, index) => (
                        <li key={index}>{step}</li>
                        ))}
                    </ol>
                    ) : (
                    <p className="text-sm text-gray-600">{task}</p>
                    )}

                    <div className="mt-2">
                        <h3 className="text-md font-semibold text-gray-700">Time Left</h3>
                        <p className="text-sm text-red-500">
                            {/* {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')} */}
                            {Math.floor(timeLeft / 60 / 1000)}:{((timeLeft / 1000) % 60).toString().padStart(2, '0')}
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Side (Iframe Section) */}
            <div className="w-4/5 h-full">
                {usabilityTesting?.website_link && !usabilityTesting?.figma_embed_code && (
                    <iframe
                        src={usabilityTesting.website_link}
                        title="Website Preview"
                        className="w-full h-full"
                    />
                )}

                {usabilityTesting?.figma_embed_code && !usabilityTesting?.website_link && (
                    <iframe
                        style={{ border: '1px solid rgba(0, 0, 0, 0.1)' }}
                        className="w-full h-full"
                        src={`https://www.figma.com/embed?embed_host=share&url=${usabilityTesting.figma_embed_code}`}
                        allowFullScreen
                        title="Figma Prototype"
                    />
                )}
            </div>
        </div>
    );
};

export default BrowserInBrowser;
