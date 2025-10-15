import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TestingResults from "./UsabilityTestingResults";
import TestingInfo from "./UsabilityTestingInfo";
import BIBPreview from "./BIBPreview"; 

const UsabilityTestingDetail = () => {
    const API_URL = process.env.REACT_APP_API_URL;
    const { usabilityTestingId } = useParams();
    const [usabilityTesting, setUsabilityTesting] = useState(null);
    const [error, setError] = useState("");
    const [view, setView] = useState("testingdetails");

    // Fetch usability testing details and recordings
    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await fetch(`${API_URL}/usability-testing/${usabilityTestingId}/`);
                if (!response.ok) throw new Error("Failed to fetch usability testing details.");
                const data = await response.json();
                setUsabilityTesting(data);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchDetails();
        // fetchRecordings();
    }, [usabilityTestingId]);


    if (!usabilityTesting) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <div className="text-center">
                <div className="animate-spin border-t-4 border-[#ACA3E3] border-solid rounded-full w-16 h-16 mx-auto"></div>
                    <p className="mt-4 text-xl font-funnel font-semibold text-gray-700">Loading usability testing details. Please wait ... </p>
                </div>
            </div>
        );
    }
    if (error) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <div className="text-center">
                <div className="animate-spin border-t-4 border-[#ACA3E3] border-solid rounded-full w-16 h-16 mx-auto"></div>
                    <div className="mt-4 text-xl font-funnel font-semibold text-gray-700">{error}</div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#F0EEED] h-screen flex flex-col">

        <div className="font-funnel border-b border-gray-300 flex flex-col justify-center bg-[#DCD6F7] fixed w-full top-0 z-10 shadow-lg">
            <div className="py-2 px-5">
                {/* <p className="font-funnel font-bold text-base">{usabilityTesting.id} - {usabilityTesting.title} </p> */}
                <p className="font-funnel font-bold text-base">{usabilityTesting.title} </p>
            </div>
            <div className="flex justify-center">
                <div
                    onClick={() => setView("testingdetails")}
                    className={`px-6 py-3 cursor-pointer ${view === "testingdetails" ? "border-b-2 border-gray-800 text-gray-800 font-semibold" : "text-gray-500" }`}
                >
                    Usability Testing Details
                </div>

                <div
                    onClick={() => setView("preview")}
                    className={`px-6 py-3 cursor-pointer ${view === "preview" ? "border-b-2 border-gray-800 text-gray-800 font-semibold" : "text-gray-500" }`}
                >
                    Preview
                </div>

                <div
                    onClick={() => setView("results")}
                    className={`px-6 py-3 cursor-pointer ${view === "results" ? "border-b-2 border-gray-800 text-gray-800 font-semibold" : "text-gray-500" }`}
                >
                    Testing Results
                </div>
            </div>
        </div>

            <div className="mt-[90px] flex-1 overflow-y-auto">
                {view === "testingdetails" ? (
                    <TestingInfo
                        usabilityTesting={usabilityTesting}
                        usabilityTestingId={usabilityTestingId}
                    />
                ) : view === "preview" ? (
                    <BIBPreview
                        usabilityTesting={usabilityTesting}
                    />
                ) : view === "results" ? (
                    <TestingResults/>
                ) : null}
            </div>

        </div>
    );
};

export default UsabilityTestingDetail;
