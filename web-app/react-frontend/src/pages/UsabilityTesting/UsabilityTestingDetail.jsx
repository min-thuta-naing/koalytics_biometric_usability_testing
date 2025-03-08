import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UsabilityTestingDetail = () => {
    const { usabilityTestingId } = useParams(); 
    const [usabilityTesting, setUsabilityTesting] = useState(null);
    const [error, setError] = useState("");

    // Fetch form details
    useEffect(() => {
            const fetchUsabilityTestingDetails = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/usability_testing/${usabilityTestingId}/`);
                if (!response.ok) {
                throw new Error("Failed to fetch usability testing details.");
                }
                const data = await response.json();
                setUsabilityTesting(data);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchUsabilityTestingDetails();
    }, [usabilityTestingId]);

    if (error) return <p className="text-red-500">{error}</p>;
    if (!usabilityTesting) return <p>Loading...</p>;

    return (
        <div className="bg-[#F0EEED] h-screen"> 
            <div className="p-8 border-b border-gray-400">
                <p className="font-funnel font-3xl">{usabilityTesting.id}</p>
                <p className="font-funnel font-3xl">Title: {usabilityTesting.title}</p>
                <p className="font-funnel font-3xl">Task: {usabilityTesting.task}</p>
                <p className="font-funnel font-3xl">Duration: {usabilityTesting.duration}</p>
                <p className="font-funnel font-3xl">Website: <a href={usabilityTesting.website_link} target="_blank" rel="noopener noreferrer">{usabilityTesting.website_link}</a></p>
                <p className="font-funnel font-3xl">Figma Embed Code: {usabilityTesting.figma_embed_code}</p>
            </div>

            {/* Display Video */}
            {usabilityTesting.recording && usabilityTesting.recording.video ? (
                <div className="mt-6">
                    <p className="text-2xl font-semibold">Recorded Video:</p>
                    <video controls className="w-full max-w-lg mt-4">
                        <source src={`http://127.0.0.1:8000${usabilityTesting.recording.video}`} type="video/webm" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            ) : (
                <p className="mt-6 text-gray-600">No recording available.</p>
            )}

        </div>
        
    )
}

export default UsabilityTestingDetail; 