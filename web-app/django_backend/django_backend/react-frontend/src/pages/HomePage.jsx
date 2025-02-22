import { Link } from "react-router-dom";
import { useState } from "react";
import { RotateCcw } from "lucide-react";

const HomePage = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [showSwitchPopup, setShowSwitchPopup] = useState(false);

    return (
        <div className="min-h-screen flex flex-col">
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
                        <div className="absolute right-0 mt-12 w-48 bg-white shadow-lg rounded-lg py-2">
                            <Link to="/account" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">My Account</Link>
                            <Link to="/settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Settings</Link>
                            <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">Sign Out</button>
                        </div>
                    )}
                </div>
            </header>

            <main className="flex-1 overflow-y-auto ">

            </main>

            {/* Floating Switch Icon */}
            <div className="fixed bottom-6 right-6">
                <button
                    className="h-14 w-14 rounded-full bg-violet-400 text-white flex items-center justify-center shadow-lg hover:bg-violet-500"
                    onClick={() => setShowSwitchPopup(!showSwitchPopup)}
                >
                    <RotateCcw size={28} />
                </button>

                {showSwitchPopup && (
                    <div className="absolute bottom-20 right-0 w-64 p-4 bg-white shadow-xl rounded-lg">
                        <p className="text-gray-700 mb-4">Switch to Researcher Mode to create and manage biometric usability tests.</p>
                        <button className="w-full py-2 bg-violet-400 text-white rounded-lg hover:bg-violet-500">Switch to Researcher Mode</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default HomePage;
