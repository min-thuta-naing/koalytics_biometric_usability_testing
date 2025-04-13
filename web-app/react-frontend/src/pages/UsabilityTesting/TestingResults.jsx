import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import createPlotlyComponent from 'react-plotly.js/factory';
import Plotly from 'plotly.js/lib/core';
import box from 'plotly.js/lib/box';
import scatter from 'plotly.js/lib/scatter';
import bar from 'plotly.js/lib/bar'; 

Plotly.register([box, scatter, bar]);

const Plot = createPlotlyComponent(Plotly);

const TestingResults = () => {
    const navigate = useNavigate();
    const { usabilityTestingId } = useParams();
    const [usabilityTesting, setUsabilityTesting] = useState(null);
    const [recordings, setRecordings] = useState([]);
    const [emotion, setEmotions] = useState([]);
    const [error, setError] = useState("");
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [summary, setSummary] = useState({ totalFrames: 0, dominantCounts: {} });

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

        const fetchEmotions = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/usability-testing/${usabilityTestingId}/emotion-data/`);
                if (!response.ok) throw new Error("Failed to fetch emotion data.");
                const data = await response.json();
                setEmotions(data);

                const dominantCounts = {};
                data.forEach((d) => {
                    const emotion = d.dominant;
                    if (emotion) {
                        dominantCounts[emotion] = (dominantCounts[emotion] || 0) + 1;
                    }
                });

                setSummary({
                    totalFrames: data.length,
                    dominantCounts
                });
            } catch (err) {
                setError(err.message);
            }
        };

        fetchDetails();
        fetchRecordings();
        fetchEmotions();
    }, [usabilityTestingId]);

    const openVideoModal = (videoUrl) => {
        setSelectedVideo(videoUrl);
        setIsVideoModalOpen(true);
    };

    const closeVideoModal = () => {
        setIsVideoModalOpen(false);
        setSelectedVideo(null);
    };

    const handleEmotionDetailClick = (participantEmail) => {
        navigate(`/usability-testing/${usabilityTestingId}/emotion-details`, {
            state: {
                testingName: usabilityTesting?.title,
                participantEmail: participantEmail,
                usabilityTestingId: usabilityTestingId
            }
        });
    };

    // Prepare data for the bar chart
    const emotionLabels = ['neutral', 'fear', 'angry', 'sad', 'happy', 'surprise'];
    const emotionCounts = emotionLabels.map(emotion => summary.dominantCounts[emotion] || 0);
    const emotionColors = [
        '#636EFA', // Neutral
        '#EF553B', // Fear
        '#AB63FA', // Angry
        '#19D3F3', // Sad
        '#00CC96', // Happy
        '#FFA15A'  // Surprise
    ];

    const barChartData = [{
        x: emotionLabels.map(label => label.charAt(0).toUpperCase() + label.slice(1)),
        y: emotionCounts,
        type: 'bar',
        marker: {
            color: emotionColors,
            line: {
                color: '#333',
                width: 1
            }
        },
        text: emotionCounts.map(count => count.toString()),
        textposition: 'auto',
        hoverinfo: 'y+text'
    }];

    const barChartLayout = {
        title: {
            text: 'Dominant Emotion Distribution',
            font: {
                size: 18,
                family: 'Arial, sans-serif'
            }
        },
        xaxis: {
            title: {
                text: 'Emotion',
                font: {
                    size: 14
                }
            },
            tickangle: -45
        },
        yaxis: {
            title: {
                text: 'Frame Count',
                font: {
                    size: 14
                }
            },
            gridcolor: '#f0f0f0'
        },
        plot_bgcolor: '#fff',
        paper_bgcolor: '#fff',
        margin: {
            l: 60,
            r: 40,
            b: 80,
            t: 80,
            pad: 4
        },
        bargap: 0.2,
        hoverlabel: {
            bgcolor: '#fff',
            bordercolor: '#333',
            font: {
                family: 'Arial, sans-serif',
                size: 12,
                color: '#333'
            }
        }
    };

    if (error) return <p className="text-red-500">{error}</p>;
    if (!usabilityTesting) return <p>Loading...</p>;

    return (
        <div className="flex h-screen overflow-hidden">
            <div className="flex-grow overflow-y-auto">
            <div className="mx-5 my-20 px-1">
  {/* Summary Section (Top) */}
  <div className="p-8 bg-white rounded-lg shadow-md mb-6">
    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Overall Emotion Analysis Summary</h2>
    <div className="flex flex-col md:flex-row gap-6">
      {/* Left side - Stats */}
      <div className="bg-gray-50 p-4 rounded-lg flex flex-col md:flex-row gap-4">
        <div className="flex items-center gap-2">
          <span className="font-semibold">Participants:</span>
          <span>{new Set(emotion.map(e => e.participant_email)).size}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-semibold">Frames Analyzed:</span>
          <span>{summary.totalFrames}</span>
        </div>
      </div>

      {/* Right side - Dominant emotions */}
      <div className="bg-gray-50 p-4 rounded-lg flex-1">
        <h3 className="text-lg font-medium text-gray-800 mb-2">Dominant Emotions:</h3>
        <div className="flex flex-wrap gap-2">
          {Object.entries(summary.dominantCounts)
            .sort((a, b) => b[1] - a[1])
            .map(([emotion, count]) => {
              const colorIndex = emotionLabels.indexOf(emotion);
              const color = emotionColors[colorIndex] || '#CCCCCC';
              
              return (
                <div 
                  key={emotion} 
                  className="flex items-center px-3 py-1 rounded-full shadow-sm"
                  style={{
                    backgroundColor: `${color}20`,
                    border: `1px solid ${color}`,
                    color: '#333'
                  }}
                >
                  <span className="capitalize mr-1">{emotion}:</span>
                  <span className="font-medium">{count}</span>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  </div>

  {/* Visualization Section (Bottom) */}
  <div className="p-8 bg-white rounded-lg shadow-md mb-6">
    <h3 className="text-xl font-medium mb-4 text-gray-800">Emotion Distribution Visualization</h3>
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Bar Chart */}
      <div className="flex-1">
        <div className="w-full h-96">
          <Plot
            data={barChartData}
            layout={{
              ...barChartLayout,
              showlegend: false,
              margin: { l: 60, r: 20, b: 80, t: 40, pad: 4 }
            }}
            config={{
              responsive: true,
              displayModeBar: true,
              displaylogo: false,
              modeBarButtonsToRemove: ['toImage', 'sendDataToCloud']
            }}
          />
        </div>
      </div>
      
      {/* Color Legend */}
      <div className="lg:w-64 flex-shrink-0">
        <h3 className="text-xl font-medium mb-4 text-gray-800">Emotion Colors</h3>
        <div className="space-y-2">
          {emotionLabels.map((label, index) => (
            <div key={label} className="flex items-center">
              <div 
                className="w-4 h-4 rounded-full mr-2" 
                style={{ backgroundColor: emotionColors[index] }}
              ></div>
              <span className="capitalize">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>

                    {/* Recordings Table */}
                    <div className="p-8 bg-white rounded-lg shadow-md">
                        <h3 className="text-xl font-medium mb-4 text-gray-800">Participant Recordings</h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full table-auto border-collapse">
                                <thead>
                                    <tr className="bg-[#ACA3E3]">
                                        <th className="border px-4 py-2 text-left">No.</th>
                                        <th className="border px-4 py-2 text-left">Participant Email</th>
                                        <th className="border px-4 py-2">Screen Recording</th>
                                        <th className="border px-4 py-2">Emotion Detail</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recordings.map((recording, index) => {
                                        const emotionData = emotion.find(e => e.participant_email === recording.participant_email);

                                        return (
                                            <tr key={recording.id} className="hover:bg-gray-50">
                                                <td className="border px-4 py-2">{index + 1}</td>
                                                <td className="border px-4 py-2">{recording.participant_email}</td>
                                                <td className="border px-4 py-2 text-center">
                                                    <button
                                                        className="text-black bg-[#C4BDED] hover:bg-[#B3AAE6] px-6 py-2 rounded-lg shadow-md transition-colors"
                                                        onClick={() => openVideoModal(recording.video)}
                                                    >
                                                        View Recording
                                                    </button>
                                                </td>
                                                <td className="border px-4 py-2 text-center">
                                                    <div className="flex flex-col items-center justify-center gap-2">
                                                        <button
                                                            className="text-black bg-[#C4BDED] hover:bg-[#B3AAE6] px-6 py-2 rounded-lg shadow-md transition-colors"
                                                            onClick={() => handleEmotionDetailClick(recording.participant_email)}
                                                        >
                                                            Emotion Details
                                                        </button>
                                                        {emotionData && (
                                                            <span className="text-sm text-gray-600 italic">
                                                                {emotionData.emotion_summary}
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Modal for Video */}
                    {isVideoModalOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
                            <div className="bg-white rounded-lg w-full max-w-4xl relative">
                                <button
                                    className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
                                    onClick={closeVideoModal}
                                >
                                    <X className="w-6 h-6" />
                                </button>
                                <video 
                                    controls 
                                    autoPlay
                                    className="w-full rounded-lg"
                                    style={{ maxHeight: '80vh' }}
                                >
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
            </div>
        </div>
    );
}

export default TestingResults;