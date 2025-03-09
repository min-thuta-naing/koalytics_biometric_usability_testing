// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// const UsabilityTestingDetail = () => {
//     const { usabilityTestingId } = useParams(); 
//     const [usabilityTesting, setUsabilityTesting] = useState(null);
//     const [error, setError] = useState("");

//     // Fetch usability testing details
//     useEffect(() => {
//             const fetchUsabilityTestingDetails = async () => {
//             try {
//                 const response = await fetch(`http://127.0.0.1:8000/usability-testing/${usabilityTestingId}/`);
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
//                 <p className="font-funnel font-3xl">Figma Embed Code: {usabilityTesting.figma_embed_code}</p>
//             </div>

//             {/* Display table */}
            

//         </div>
        
//     )
// }

// export default UsabilityTestingDetail; 


// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// const UsabilityTestingDetail = () => {
//     const { usabilityTestingId } = useParams();
//     const [usabilityTesting, setUsabilityTesting] = useState(null);
//     const [recordings, setRecordings] = useState([]);
//     const [error, setError] = useState("");
//     const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
//     const [selectedVideo, setSelectedVideo] = useState(null);

//     // Fetch usability testing details and recordings
//     useEffect(() => {
//         const fetchDetails = async () => {
//             try {
//                 const response = await fetch(`http://127.0.0.1:8000/usability-testing/${usabilityTestingId}/`);
//                 if (!response.ok) throw new Error("Failed to fetch usability testing details.");
//                 const data = await response.json();
//                 setUsabilityTesting(data);
//             } catch (err) {
//                 setError(err.message);
//             }
//         };

//         const fetchRecordings = async () => {
//             try {
//                 const response = await fetch(`http://127.0.0.1:8000/usability-testing/${usabilityTestingId}/recordings/`);
//                 if (!response.ok) throw new Error("Failed to fetch recordings.");
//                 const data = await response.json();
//                 setRecordings(data);
//             } catch (err) {
//                 setError(err.message);
//             }
//         };

//         fetchDetails();
//         fetchRecordings();
//     }, [usabilityTestingId]);

//     const openVideoModal = (videoUrl) => {
//         setSelectedVideo(videoUrl);
//         setIsVideoModalOpen(true);
//     };

//     const closeVideoModal = () => {
//         setIsVideoModalOpen(false);
//         setSelectedVideo(null);
//     };

//     if (error) return <p className="text-red-500">{error}</p>;
//     if (!usabilityTesting) return <p>Loading...</p>;

//     return (
//         <div className="bg-[#F0EEED] h-screen">
//             <div className="p-8 border-b border-gray-400">
//                 <p className="font-funnel font-3xl">{usabilityTesting.id}</p>
//                 <p className="font-funnel font-3xl">Title: {usabilityTesting.title}</p>
//                 <p className="font-funnel font-3xl">Task: {usabilityTesting.task}</p>
//                 <p className="font-funnel font-3xl">Duration: {usabilityTesting.duration}</p>
//                 <p className="font-funnel font-3xl">
//                     Website: <a href={usabilityTesting.website_link} target="_blank" rel="noopener noreferrer">{usabilityTesting.website_link}</a>
//                 </p>
//                 <p className="font-funnel font-3xl">Figma Embed Code: {usabilityTesting.figma_embed_code}</p>
//             </div>

//             {/* Display table of recordings */}
//             <div className="p-8">
//                 <table className="min-w-full table-auto border-collapse">
//                     <thead>
//                         <tr>
//                             <th className="border px-4 py-2">Sir No.</th>
//                             <th className="border px-4 py-2">Participant Email</th>
//                             <th className="border px-4 py-2">Video</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {recordings.map((recording, index) => (
//                             <tr key={recording.id}>
//                                 <td className="border px-4 py-2">{index + 1}</td>
//                                 <td className="border px-4 py-2">{recording.participant_email}</td>
//                                 <td className="border px-4 py-2">
//                                     <button
//                                         className="text-blue-600"
//                                         onClick={() => openVideoModal(recording.video)}
//                                     >
//                                         Click to View
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>

//             {/* Modal for Video */}
//             {isVideoModalOpen && (
//                 <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
//                     <div className="bg-white p-4 rounded-lg">
//                         <button
//                             className="absolute top-2 right-2 text-xl font-bold"
//                             onClick={closeVideoModal}
//                         >
//                             X
//                         </button>
//                         <video controls>
//                             <source src={`http://127.0.0.1:8000/media/${selectedVideo}`} type="video/webm" />
//                             Your browser does not support the video tag.
//                         </video>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default UsabilityTestingDetail;



import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { X } from "lucide-react";


const UsabilityTestingDetail = () => {
    const { usabilityTestingId } = useParams();
    const [usabilityTesting, setUsabilityTesting] = useState(null);
    const [recordings, setRecordings] = useState([]);
    const [error, setError] = useState("");
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState(null);

    // Fetch usability testing details and recordings
    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/usability-testing/${usabilityTestingId}/`);
                if (!response.ok) throw new Error("Failed to fetch usability testing details.");
                const data = await response.json();
                setUsabilityTesting(data);
            } catch (err) {
                setError(err.message);
            }
        };

        const fetchRecordings = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/usability-testing/${usabilityTestingId}/recordings/`);
                if (!response.ok) throw new Error("Failed to fetch recordings.");
                const data = await response.json();
                setRecordings(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchDetails();
        fetchRecordings();
    }, [usabilityTestingId]);

    const openVideoModal = (videoUrl) => {
        setSelectedVideo(videoUrl);
        setIsVideoModalOpen(true);
    };

    const closeVideoModal = () => {
        setIsVideoModalOpen(false);
        setSelectedVideo(null);
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
                <p className="font-funnel font-3xl">Figma Embed Code: {usabilityTesting.figma_embed_code}</p>
            </div>

            {/* Display table of recordings */}
            <div className="p-8">
                <table className="min-w-full table-auto border-collapse">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">Sir No.</th>
                            <th className="border px-4 py-2">Participant Email</th>
                            <th className="border px-4 py-2">Video</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recordings.map((recording, index) => (
                            <tr key={recording.id}>
                                <td className="border px-4 py-2">{index + 1}</td>
                                <td className="border px-4 py-2">{recording.participant_email}</td>
                                <td className="border px-4 py-2">
                                    <button
                                        className="text-blue-600"
                                        onClick={() => openVideoModal(recording.video)}
                                    >
                                        Click to View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal for Video */}
            {isVideoModalOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-4 rounded-lg w-3/4 max-w-4xl">
                        {/* <button
                            className="absolute top-2 bg-white right-2 text-xl font-bold"
                            onClick={closeVideoModal}
                        >
                            X
                        </button> */}
                        <button
                            className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition"
                            onClick={closeVideoModal}
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <video controls className="w-full h-full">
                            <source 
                                src={selectedVideo} 
                                type="video/webm" 
                            />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UsabilityTestingDetail;
