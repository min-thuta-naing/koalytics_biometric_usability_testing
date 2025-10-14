import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect} from "react";
import { Info, User, X } from "lucide-react";


const HomePage = () => {
    const API_URL = process.env.REACT_APP_API_URL;
    const [user, setUser] = useState(null);
    const [projects, setProjects] = useState([]);
    const [isSwitching, setIsSwitching] = useState(false);
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);
    const [showSwitchPopup, setShowSwitchPopup] = useState(false);
    const [showLogoutPopup, setShowLogoutPopup] = useState(false);
    const [showBrowserBanner, setShowBrowserBanner] = useState(false);
    

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
        } else {
            navigate("/loginpage");
        }

        // Detect browser
        const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
        if (!isChrome) {
            setShowBrowserBanner(true);
        }

    }, [navigate]);

 
    //feching all projects 
    useEffect(() => {
        fetch(`${API_URL}/api/all-published-projects/`)
            .then(response => response.json())
            .then(data => setProjects(data))
            .catch(error => console.error("Error fetching projects:", error)); 
    }, []); 

    //sign out 
    const handleSignOut = () => {
        localStorage.removeItem("user"); // Clear user session
        navigate("/loginpage"); // Redirect to login page
    };

    //sign out confirmation 
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
        }, 3000); // 3 seconds delay
    };

    return (
        <div className="h-screen flex flex-col">
            {isSwitching ? (
                <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-purple-600 via-blue-600 to-green-600 animate-gradient-move">
                    <h1 className="text-4xl font-funnel font-bold text-white animate-fade-in">Switching to Researcher Dashboard ...</h1>
                </div>
            ) : (
                <>
                    {/* Browser notification banner */}
                    {showBrowserBanner && (
                        <div 
                            className="bg-yellow-300 text-red px-6 flex justify-between items-center items-center"
                            style={{ height: "80px" }}
                        >
                            <span>Warnings! Please use Chrome browser for a better experience.</span>
                            <button 
                                className="p-1 rounded hover:bg-yellow-500"
                                onClick={() => setShowBrowserBanner(false)}
                            >
                                <X size={20} />
                            </button>
                        </div>
                    )}
                    
                    {/* Header bar */}
                    <header className="fixed bg-[#DCD6F7] py-3 px-6 top-0 left-0 w-full z-10 flex justify-between items-center shadow-md"
                        style={{ top: showBrowserBanner ? '5rem' : '0' }}
                    >
                        <div className="flex items-center gap-3">
                            <img src="/static/images/logo.png" alt="Logo" className="h-7 w-auto" />
                            <h1 className="font-funnel font-bold text-xl text-black">Koalytics</h1>
                        </div>

                        <div className="flex gap-4 items-center relative">

                            <button
                                onClick={() => setShowSwitchPopup(!showSwitchPopup)}
                                className="w-40 bg-[#C4BDED] py-1 text-black font-funnel text-sm rounded-lg hover:bg-[#ACA3E3]"
                            >
                                Switch to Researcher
                            </button>
                            {showSwitchPopup && (
                                <div className="absolute right-0 top-full mt-7 w-64 p-4 bg-[#DCD6F7] shadow-lg rounded-lg border border-gray-400">
                                    <p className="text-gray-700 text-sm mb-4">This section is for researchers. <br/>Switch to Researcher to create<br/>and manage SUS forms and biometric usability tests.</p>
                                    <button
                                        onClick={handleSwitch}
                                        className="w-full py-2 bg-[#C4BDED] text-sm text-black rounded-lg hover:bg-[#ACA3E3]"
                                    >
                                        Switch to Researcher
                                    </button>
                                </div>
                            )}

                            {/* Profile */}
                            <div
                                className="h-10 w-10 flex items-center justify-center rounded-full bg-[#C4BDED] cursor-pointer hover:bg-[#ACA3E3]"
                                onClick={() => setShowPopup(!showPopup)}
                            >
                                <User size={24} className="text-black" />
                            </div>

                            {showPopup && (
                                <div className="absolute right-0 top-full mt-7 w-64 bg-[#DCD6F7] shadow-lg rounded-lg py-2  z-50 border border-gray-400">
                                    <div className="flex px-4 py-4 items-center gap-4 border-b border-gray-400">
                                        <div className="h-16 w-16 flex items-center justify-center rounded-full border-2 border-gray-400 bg-[#E5E4F7]">
                                            <User size={40} className="text-black" />
                                        </div>


                                        <p className="block text-gray-700">
                                            Welcome!<br />
                                            {user ? `${user.first_name} ${user.last_name}` : "Loading..."}
                                        </p>
                                    </div>

                                    <Link to="/my-account" className="block px-4 py-2 text-gray-700 text-sm hover:bg-[#ACA3E3]">My Account</Link>
                                    <Link to="/settings" className="block px-4 py-2 text-gray-700 text-sm hover:bg-[#ACA3E3]">Settings</Link>
                                    <Link to="/about-us" className="block px-4 py-2 text-gray-700 text-sm hover:bg-[#ACA3E3]">About us</Link>
                                    <button onClick={() => setShowLogoutPopup(true)} className="block w-full text-left px-4 py-2 text-gray-700 text-sm hover:bg-[#ACA3E3]">Sign Out</button>
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

                    {/* main content */}
                    <main className="flex-1 bg-[#F0EEED] overflow-y-auto pt-[4rem]">
                        <p className='p-4 mx-8 mt-8 font-funnel text-xl border-b border-gray-400'>Welcome!<br/>{user ? `${user.first_name} ${user.last_name}` : "Loading..."}</p>
                        <p className='p-4 mx-8 mt-1 font-funnel '>These are the surveys related to usability of websites and mobile apps from the researchers. <br/>You can choose whatever you like to participate in the survey.<br/>And enjoy your survey! </p>
                        <div className="grid grid-cols-4 gap-6 p-8 place-items-center">
                            {projects.map(project => (
                                <div 
                                    key={project.id}
                                    className="w-80 h-56 relative rounded-lg shadow-md hover:shadow-lg cursor-pointer border border-gray-400 transition-transform duration-300 hover:-translate-y-2 bg-cover bg-center"
                                    onClick={() => navigate(`/all-project/${project.id}`)}
                                    style={{ 
                                        backgroundImage: project.image_path 
                                            ? `url(${API_URL}${project.image_path})`
                                            : "url('/static/images/projectbg.png')"
                                    }}
                                >
                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/100 to-transparent rounded-b-lg"></div>

                                    {/* Text */}
                                    <h2 className="absolute bottom-4 left-4 font-semibold font-funnel text-lg text-white">
                                        {project.name}
                                    </h2>
                                </div>
                            ))}
                        </div>
                    </main>

                    {/* Floating guide Icon */}
                    <div className="fixed bottom-6 right-6">
                        <button
                            className="h-14 w-14 rounded-full bg-[#C4BDED] text-black flex items-center justify-center shadow-lg hover:bg-[#ACA3E3]"
                            onClick={() => navigate("/guide")}
                        >
                            <Info size={28} />
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default HomePage;
