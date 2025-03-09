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

const TestCalibration = () => {
  const { usabilityTestingId } = useParams();
  const [usabilityTesting, setUsabilityTesting] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
  
      window.open(usabilityTesting.website_link, "_blank"); // Open website in a new tab
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
    </div>
  );
};

export default TestCalibration;
