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
                <p className="font-funnel font-3xl">{usabilityTesting.title}</p>
                <p className="font-funnel font-3xl">{usabilityTesting.task}</p>
            </div>
        </div>
    )
}

export default UsabilityTestingDetail; 