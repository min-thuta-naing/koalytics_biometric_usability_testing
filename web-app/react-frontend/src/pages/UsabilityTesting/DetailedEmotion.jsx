import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

const DetailedEmotion = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { testingName, participantEmail, usabilityTestingId } = location.state || {};
    const [emotionData, setEmotionData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!usabilityTestingId || !participantEmail) {
            navigate('/'); // Redirect if missing required data
            return;
        }

        const fetchEmotionData = async () => {
            try {
                const response = await fetch(
                    `http://127.0.0.1:8000/api/usability-testing/${usabilityTestingId}/emotion-data/?participant=${participantEmail}`
                );
                if (!response.ok) throw new Error("Failed to fetch emotion data.");
                const data = await response.json();
                setEmotionData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEmotionData();
    }, [usabilityTestingId, participantEmail, navigate]);

    if (loading) return <div>Loading emotion data...</div>;
    if (error) return <div className="text-red-500">Error: {error}</div>;
    if (!emotionData.length) return <div>No emotion data found for this participant.</div>;

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Emotion Details</h1>
            <h2 className="text-xl mb-2">Test: {testingName}</h2>
            <h3 className="text-lg mb-6">Participant: {participantEmail}</h3>
            
            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                    <thead>
                        <tr className="bg-[#ACA3E3]">
                            <th className="border px-4 py-2">Timestamp</th>
                            <th className="border px-4 py-2">Dominant</th>
                            <th className="border px-4 py-2">Happy</th>
                            <th className="border px-4 py-2">Sad</th>
                            <th className="border px-4 py-2">Angry</th>
                            <th className="border px-4 py-2">Surprise</th>
                            <th className="border px-4 py-2">Neutral</th>
                            <th className="border px-4 py-2">Fear</th>
                            <th className="border px-4 py-2">Disgust</th>
                        </tr>
                    </thead>
                    <tbody>
                        {emotionData.map((emotion) => (
                            <tr key={emotion.id}>
                                <td className="border px-4 py-2">
                                    {new Date(emotion.timestamp).toLocaleString()}
                                </td>
                                <td className="border px-4 py-2">{emotion.dominant}</td>
                                <td className="border px-4 py-2">{emotion.happy?.toFixed(2) ?? 'N/A'}</td>
                                <td className="border px-4 py-2">{emotion.sad?.toFixed(2) ?? 'N/A'}</td>
                                <td className="border px-4 py-2">{emotion.angry?.toFixed(2) ?? 'N/A'}</td>
                                <td className="border px-4 py-2">{emotion.surprise?.toFixed(2) ?? 'N/A'}</td>
                                <td className="border px-4 py-2">{emotion.neutral?.toFixed(2) ?? 'N/A'}</td>
                                <td className="border px-4 py-2">{emotion.fear?.toFixed(2) ?? 'N/A'}</td>
                                <td className="border px-4 py-2">{emotion.disgust?.toFixed(2) ?? 'N/A'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DetailedEmotion;