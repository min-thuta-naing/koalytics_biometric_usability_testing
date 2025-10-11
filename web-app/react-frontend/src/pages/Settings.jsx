import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Settings = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-[#F0EEED] min-h-screen flex flex-col items-center justify-center px-6 py-16">
            {/* Back Arrow Button */}
            <button
                onClick={() => navigate("/homepage")}
                className="absolute top-6 left-6 flex items-center text-gray-700 hover:text-[#8B82BB] transition-colors"
            >
                <ArrowLeft size={24} className="mr-2" />
                <span className="font-medium">Back</span>
            </button>

            {/* Content Container */}
            <div className="max-w-4xl text-center">
                <img
                    src="/static/images/logo.png"
                    alt="Logo"
                    className="h-14 w-auto mx-auto mb-6"
                />

                <h1 className="text-4xl font-bold text-gray-800 mb-6">
                    Settings
                </h1>

                <p className="text-lg text-gray-700 leading-relaxed mb-8">
                    Settings soon to be added! 
                </p>

            </div>
        </div>
    );
};

export default Settings;

