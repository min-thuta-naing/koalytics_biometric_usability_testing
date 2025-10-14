import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import HeaderBar from "../components/HeaderBar";

const Guide = () => {
    const navigate = useNavigate();

    return (
        <div className="font-funnel p-6 relative">
            <HeaderBar />

            {/* Participant Guide Section */}
            <div className="pt-20 max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold text-center mb-8">Participants User Guide</h1>
                <ul className="list-disc list-inside space-y-3 text-gray-700">
                    <li>
                        Participate in tests posted by researchers, including:
                        <ul className="list-inside list-disc ml-5 mt-2">
                            <li>SUS Survey (System Usability Scale)</li>
                            <li>Biometric Usability Test</li>
                        </ul>
                    </li>
                    <li>
                        Provide feedback through tasks and tests to help improve the
                        usability of products or services.
                    </li>
                </ul>

                {/* Screenshot Section */}
                <div className="mt-6">
                    <h3 className="text-lg font-medium mb-2">Sample Screenshots</h3>
                    <div className="space-y-4">
                        <div className="border rounded-lg p-3 text-center text-gray-500 bg-gray-100">
                            <p>Screenshot of SUS survey page here</p>
                        </div>
                        <div className="border rounded-lg p-3 text-center text-gray-500 bg-gray-100">
                            <p>Screenshot of biometric test page here</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Guide;