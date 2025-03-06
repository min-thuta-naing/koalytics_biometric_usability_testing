import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect} from "react";
import { ArrowLeftRight } from "lucide-react";

const HomePage = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [showSwitchPopup, setShowSwitchPopup] = useState(false);
    const [isSwitching, setIsSwitching] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [showLogoutPopup, setShowLogoutPopup] = useState(false);

    // log in user info 
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            navigate("/homepage"); // Redirect if no user data
        }
    }, [navigate]);
    const handleSignOut = () => {
        localStorage.removeItem("user"); // Clear user session
        navigate("/loginpage"); // Redirect to login page
    };
    const LogoutConfirmation = ({ onConfirm, onCancel }) => (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-semibold mb-4">Confirm Logout</h2>
            <p className="text-gray-700 mb-6">Are you sure you want to log out?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={onCancel}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
    );


    //switch to researcher mode 
    const handleSwitch = () => {
        setIsSwitching(true);
        setTimeout(() => {
            navigate("/researcher-dashboard");
        }, 4000); // 4 seconds delay
    };

    return (
        <div className="h-screen flex flex-col">
            {isSwitching ? (
                <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-red-600 via-green-400 to-blue-600 animate-gradient-move">
                    <h1 className="text-4xl font-bold text-white animate-fade-in">Switching to Researcher Mode...</h1>
                </div>
            ) : (
                <>

                    {/* Header bar */}
                    <header className="fixed bg-[#E0FBE2] py-3 px-6 top-0 left-0 w-full z-10 flex justify-between items-center shadow-md">
                        <div className="flex items-center gap-3">
                            <img src="/static/images/logo.png" alt="Logo" className="h-7 w-auto" />
                            <h1 className="font-funnel font-bold text-xl text-black">Koalytics</h1>
                        </div>

                        <div className="flex gap-4 items-center relative">

                            <button
                                onClick={handleSwitch}
                                className="w-40 bg-[#ACE1AF] py-1 text-black text-sm rounded-lg hover:bg-[#91C79B]"
                            >
                                Switch to Researcher
                            </button>

                            
                            <img
                                src="/static/images/profile.jpg"
                                alt="Profile"
                                className="h-10 w-10 rounded-full border-2 border-gray-300 object-cover cursor-pointer"
                                onClick={() => setShowPopup(!showPopup)}
                            />
                            {showPopup && (
                                <div className="absolute right-0 top-full mt-4 w-64 bg-purple-100 shadow-lg rounded-lg py-2  z-50">
                                    {/* <img
                                        src="/images/profile.jpg"
                                        alt="Profile"
                                        className="h-20 w-20 p-3 rounded-full border-2 border-gray-300 object-cover"
                                    />
                                    <p className="block px-4 py-4 text-gray-700 text-center border-b border-gray-400">Welcome back!<br/>{user ? `${user.first_name} ${user.last_name}` : "Loading..."}</p> */}
                                    <div className="flex px-4 py-4 items-center gap-4 border-b border-gray-400">
                                        <img
                                            src="/images/profile.jpg"
                                            alt="Profile"
                                            className="h-16 w-16 rounded-full border-2 border-gray-400 object-cover"
                                        />
                                        <p className="block text-gray-700">
                                            Welcome back!<br />
                                            {user ? `${user.first_name} ${user.last_name}` : "Loading..."}
                                        </p>
                                    </div>

                                    <Link to="/my-account" className="block px-4 py-2 text-gray-700 text-sm hover:bg-gray-100">My Account</Link>
                                    <Link to="/settings" className="block px-4 py-2 text-gray-700 text-sm hover:bg-gray-100">Settings</Link>
                                    <Link to="/about-us" className="block px-4 py-2 text-gray-700 text-sm hover:bg-gray-100">About us</Link>
                                    <button onClick={() => setShowLogoutPopup(true)} className="block w-full text-left px-4 py-2 text-gray-700 text-sm hover:bg-gray-100">Sign Out</button>
                                    {showLogoutPopup && (
                                        <LogoutConfirmation
                                            onConfirm={handleSignOut}
                                            onCancel={() => setShowLogoutPopup(false)}
                                        />
                                    )}
                                </div>
                            )}
                        </div>
                    </header>

                    <main className="flex-1 bg-[#F0EEED] overflow-y-auto pt-[4rem]">
                        <p className='p-10 font-funnel text-xl'>Welcome back!<br/>{user ? `${user.first_name} ${user.last_name}` : "Loading..."}</p>
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
                            <div className="absolute bottom-20 right-0 w-64 p-4 bg-white shadow-lg rounded-lg border border-gray-400">
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
