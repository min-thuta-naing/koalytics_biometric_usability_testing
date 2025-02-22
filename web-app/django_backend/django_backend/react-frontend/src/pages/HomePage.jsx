import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowLeftRight } from "lucide-react";

const HomePage = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [showSwitchPopup, setShowSwitchPopup] = useState(false);
    const [isSwitching, setIsSwitching] = useState(false);
    const navigate = useNavigate();

    const handleSwitch = () => {
        setIsSwitching(true);
        setTimeout(() => {
            navigate("/researcher-dashboard");
        }, 4000); // 2 seconds delay
    };

    return (
        <div className="min-h-screen flex flex-col">
            {isSwitching ? (
                <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-blue-400 via-violet-400 to-pink-400 animate-gradient-move">
                    <h1 className="text-4xl font-bold text-white animate-fade-in">Switching to Researcher Mode...</h1>
                </div>
            ) : (
                <>
                    <header className="bg-white py-3 px-6 sticky top-0 z-10 flex justify-between items-center border-b border-gray-300">
                        <div className="flex items-center gap-3">
                            <img src="/images/logo.png" alt="Logo" className="h-7 w-auto" />
                            <h1 className="font-funnel font-bold text-3xl text-black">Koalytics</h1>
                        </div>

                        <div className="flex gap-4 relative">
                            <img
                                src="/images/profile.jpg"
                                alt="Profile"
                                className="h-10 w-10 rounded-full border-2 border-gray-300 object-cover cursor-pointer"
                                onClick={() => setShowPopup(!showPopup)}
                            />
                            {showPopup && (
                                <div className="absolute right-0 mt-16 w-48 bg-white shadow-lg rounded-lg py-2 border border-gray-400 ">
                                    <Link to="/my-account" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">My Account</Link>
                                    <Link to="/settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Settings</Link>
                                    <Link to="/about-us" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">About us</Link>
                                    <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">Sign Out</button>
                                </div>
                            )}
                        </div>
                    </header>

                    <main className="flex-1 overflow-y-auto">
                        {/* Main content */}
                    </main>

                    {/* Floating Switch Icon */}
                    <div className="fixed bottom-6 right-6">
                        <button
                            className="h-14 w-14 rounded-full bg-violet-400 text-white flex items-center justify-center shadow-lg hover:bg-violet-500"
                            onClick={() => setShowSwitchPopup(!showSwitchPopup)}
                        >
                            <ArrowLeftRight size={28} />
                        </button>

                        {showSwitchPopup && (
                            <div className="absolute bottom-20 right-0 w-64 p-4 bg-white shadow-xl rounded-lg">
                                <p className="text-gray-700 mb-4">Switch to Researcher Mode <br/>to create and manage biometric usability tests.</p>
                                <button
                                    onClick={handleSwitch}
                                    className="w-full py-2 bg-violet-400 text-white rounded-lg hover:bg-violet-500"
                                >
                                    Switch to Researcher Mode
                                </button>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default HomePage;
