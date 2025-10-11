import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Guide = () => {
    const navigate = useNavigate();

    return (
        <div className="p-6 relative">
            {/* Back Arrow Button */}
            <button
                onClick={() => navigate("/homepage")}
                className="absolute top-6 left-6 flex items-center text-gray-700 hover:text-blue-600 transition-colors"
            >
                <ArrowLeft size={24} className="mr-2" />
                <span className="font-medium">Back</span>
            </button>

            <h1 className="text-3xl font-bold text-center mb-8">Koalytics User Guide</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Researcher Guide */}
                <div className="border rounded-2xl shadow-md p-6 bg-white">
                    <h2 className="text-2xl font-semibold mb-4 text-blue-600 text-center">
                        For Researchers
                    </h2>
                    <ul className="list-disc list-inside space-y-3 text-gray-700">
                        <li>
                            Create a project for participants to test the usability of a
                            <strong> website</strong> or a <strong>Figma prototype</strong>.
                        </li>
                        <li>
                            Collaborate with other researchers by inviting them to work on projects.
                        </li>
                        <li>
                            Analyze and use the biometric and survey results to upgrade and improve
                            the overall <strong>User Experience (UX)</strong>.
                        </li>
                    </ul>

                    {/* Screenshot Section */}
                    <div className="mt-6">
                        <h3 className="text-lg font-medium mb-2">Sample Screenshots</h3>
                        <div className="space-y-4">
                            <div className="border rounded-lg p-3 text-center text-gray-500 bg-gray-100">
                                <p>Screenshot of project creation page here</p>
                            </div>
                            <div className="border rounded-lg p-3 text-center text-gray-500 bg-gray-100">
                                <p>Screenshot of project analytics page here</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Participant Guide */}
                <div className="border rounded-2xl shadow-md p-6 bg-white">
                    <h2 className="text-2xl font-semibold mb-4 text-green-600 text-center">
                        For Participants
                    </h2>
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
        </div>
    );
};

export default Guide;