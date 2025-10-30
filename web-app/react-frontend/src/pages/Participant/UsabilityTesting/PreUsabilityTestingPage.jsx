import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import UsabilityTestingCalibrationPopUp from './UsabilityTestingCalibrationPopUp';

const PreUsabilityTestingPage = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const { usabilityTestingId } = useParams();
  const [usabilityTesting, setUsabilityTesting] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [showCalibrationModal, setShowCalibrationModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsabilityTestingDetails = async () => {
      try {
        const response = await fetch(`${API_URL}usability-testing/${usabilityTestingId}/`);
        if (!response.ok) throw new Error("Failed to fetch usability testing details.");
        const data = await response.json();
        setUsabilityTesting(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsabilityTestingDetails();
  }, [usabilityTestingId]);

  if (loading) return <LoadingScreen message="Loading the testing, please wait..." />;
  if (error) return <ErrorScreen message={error} />;
  if (!usabilityTesting) return null;

  return (
    <div 
      className="fixed inset-0 bg-cover bg-center min-h-screen flex items-center justify-center px-4"
      style={{ backgroundImage: 'url(/static/images/backgroundform.png)' }}
    >
      <div className="font-funnel bg-white rounded-xl shadow-xl w-full max-w-3xl p-8 space-y-6">
        <h2 className="text-3xl font-semibold text-gray-800 text-center">Usability Testing Overview</h2>
        
        {/* Test details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Detail label="Test title" value={usabilityTesting.title} />
          <Detail label="Complete the task within" value={`${usabilityTesting.duration} minutes`} />
          {/* <Detail label="Task to perform during the test" value={usabilityTesting.task} full /> */}
          <Detail
            label="Task steps to perform during the test"
            value={
              Array.isArray(usabilityTesting.task) ? (
                <ol className="list-decimal list-inside space-y-1">
                  {usabilityTesting.task.map((step, index) => (
                    <li key={index} className="text-gray-800">{step}</li>
                  ))}
                </ol>
              ) : (
                <p className="text-gray-800">{usabilityTesting.task}</p>
              )
            }
            full
          />

          
          {usabilityTesting.website_link && (
            <Detail 
              label="Website" 
              value={<a href={usabilityTesting.website_link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-words">{usabilityTesting.website_link}</a>} 
              full 
            />
          )}

          {usabilityTesting.figma_embed_code && (
            <Detail 
              label="Figma Embed Code"
              value={<div className="bg-gray-100 p-3 rounded-lg font-mono text-sm text-gray-700 overflow-auto">{usabilityTesting.figma_embed_code}</div>}
              full
            />
          )}
        </div>

        {/* Start Button */}
        <div className="flex justify-center pt-4">
          <button
            onClick={() => setShowCalibrationModal(true)}
            className="px-6 py-3 bg-[#C4BDED] text-black rounded-lg shadow-md hover:bg-[#ACA3E3] transition duration-300"
          >
            Start the test
          </button>
        </div>

        {showCalibrationModal && (
          <UsabilityTestingCalibrationPopUp 
            usabilityTesting={usabilityTesting}
            usabilityTestingId={usabilityTestingId}
            onClose={() => setShowCalibrationModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default PreUsabilityTestingPage;

const Detail = ({ label, value, full }) => (
  <div className={full ? "col-span-1 sm:col-span-2" : ""}>
    <p className="text-sm text-gray-500 mb-1">{label}</p>
    <p className="text-lg font-medium text-gray-800">{value}</p>
  </div>
);

const LoadingScreen = ({ message }) => (
  <div className="flex justify-center items-center h-screen bg-gray-100">
    <div className="text-center">
      <div className="animate-spin border-t-4 border-[#ACA3E3] border-solid rounded-full w-16 h-16 mx-auto"></div>
      <p className="mt-4 text-xl font-funnel font-semibold text-gray-700">{message}</p>
    </div>
  </div>
);

const ErrorScreen = ({ message }) => (
  <div className="flex justify-center items-center h-screen bg-gray-100">
    <div className="text-center">
      <p className="mt-4 text-xl font-funnel font-semibold text-gray-700">{message}</p>
    </div>
  </div>
);
