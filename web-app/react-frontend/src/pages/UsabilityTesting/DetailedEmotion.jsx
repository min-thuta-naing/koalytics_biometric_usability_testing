import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import Plot from "react-plotly.js"; // ✅ Import Plotly
import createPlotlyComponent from 'react-plotly.js/factory';
import Plotly from 'plotly.js/lib/core';

// Import only what you need
import box from 'plotly.js/lib/box';
import scatter from 'plotly.js/lib/scatter'; // scatter = line charts

// Register them with Plotly
Plotly.register([box, scatter]);

const Plot = createPlotlyComponent(Plotly);


const DetailedEmotion = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { testingName, participantEmail, usabilityTestingId } = location.state || {};
    const [emotionData, setEmotionData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!usabilityTestingId || !participantEmail) {
            navigate('/');
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

    // ✅ Prepare data for the line chart
    const timestamps = emotionData.map((d) => new Date(d.timestamp).toLocaleTimeString());
    const emotions = ['happy', 'sad', 'angry', 'surprise', 'neutral', 'fear', 'disgust'];

    // ✅ Prepare CSV data for the graph
    const graphCsvData = emotionData.map((emotion) => [
        new Date(emotion.timestamp).toLocaleString(),
        emotion.dominant,
        emotion.happy?.toFixed(2) ?? 'N/A',
        emotion.sad?.toFixed(2) ?? 'N/A',
        emotion.angry?.toFixed(2) ?? 'N/A',
        emotion.surprise?.toFixed(2) ?? 'N/A',
        emotion.neutral?.toFixed(2) ?? 'N/A',
        emotion.fear?.toFixed(2) ?? 'N/A',
        emotion.disgust?.toFixed(2) ?? 'N/A'
    ]);

    const downloadGraphCSV = () => {
        const headers = ['Timestamp', 'Dominant', 'Happy', 'Sad', 'Angry', 'Surprise', 'Neutral', 'Fear', 'Disgust'];
        const csvRows = [
            headers.join(','), // CSV Header
            ...graphCsvData.map(row => row.join(','))
        ];
        const csvString = csvRows.join('\n');
        
        // Create a link element
        const link = document.createElement('a');
        const blob = new Blob([csvString], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        link.href = url;
        link.download = 'graph_emotion_data.csv'; // Name of the file
        link.click(); // Trigger download
    };

    const layout = {
        xaxis: {
            title: 'Timestamp',
            tickangle: -60, // Slant the labels to the left (negative value)
            tickmode: 'array',
            tickvals: timestamps, // Make sure this uses the actual timestamps as ticks
            ticktext: timestamps, // Display actual timestamp values
            showgrid: true,
            gridwidth: 1,
        },
        yaxis: {
            title: 'Intensity',
            range: [0, 100], // Ensure range from 0 to 100
            tickmode: 'array',
            tickvals: [0, 20, 40, 60, 80, 100], // Set intervals of 20
            showgrid: true,
            gridwidth: 1,
        },
        margin: { t: 30, l: 50, r: 30, b: 100 }, // Increased bottom margin for better visibility
        legend: { orientation: 'h', y: -0.3 },
        plot_bgcolor: '#fff',
        paper_bgcolor: '#fff',
    };

    const emotionTraces = emotions.map((emotion) => ({
        x: timestamps,
        y: emotionData.map((d) => d[emotion]),
        type: 'scatter',
        mode: 'lines',
        name: emotion.charAt(0).toUpperCase() + emotion.slice(1),
        line: {
            shape: 'spline', // 🟢 makes the line smooth!
            width: 2
        }
    }));

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Emotion Details</h1>
            <h2 className="text-xl mb-2">Test: {testingName}</h2>
            <h3 className="text-lg mb-6">Participant: {participantEmail}</h3>

            {/* ✅ Line Chart for Emotions */}
            <div className="mb-4 bg-white p-4 rounded-lg shadow-lg">
                <h2 className="text-lg font-semibold mb-2 text-center">Emotions Over Time</h2>
                <Plot
                    data={emotionTraces}
                    layout={layout}
                    config={{ responsive: true }}
                    style={{ width: '100%', height: '600px' }}  // Increased height for more space
                />
            </div>

            {/* CSV Download Button */}
            <button
                onClick={downloadGraphCSV}
                className="mb-4 px-4 py-2 bg-[#C4BDED] text-black rounded-lg shadow-md hover:bg-[#ACA3E3]"
                style={{ position: 'relative', left: 0 }}
            >
                Download Graph CSV
            </button>

            {/* Table */}
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