import { useState, useEffect } from "react";
import { Menu, Info, FolderOpenDot, LogOut, CircleUserRound } from "lucide-react";
import ResearcherGuideline from "./ResearcherGuideline";
import ResearcherDashboard from "./ResearcherDashboard";
import { Link, useNavigate } from "react-router-dom";
import NewProjectPage from "./Project/CreateProjects";


const SideandTopBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showText, setShowText] = useState(!isCollapsed);
  const [activePage, setActivePage] = useState("home");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [isSwitching, setIsSwitching] = useState(false);
  const profilePic = localStorage.getItem("profilePic") || "/static/images/user1.png";


 // Sidebar collapse and expand
  useEffect(() => {
    let timeout;
    if (!isCollapsed) {
      timeout = setTimeout(() => setShowText(true), 300);
    } else {
      setShowText(false);
    }
    return () => clearTimeout(timeout);
  }, [isCollapsed]);


  // Retrieve logged-in user info
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);


  // Handle logout
  const handleSignOut = () => {
    localStorage.removeItem("user");
    navigate("/loginpage");
  };


  // Logout confirmation popup
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


  // Handle content rendering
  const renderContent = () => {
    switch (activePage) {
      case "projects":
        return <ResearcherDashboard onNewProject={() => setActivePage("new-project")} />;
      case "guideline":
        return <ResearcherGuideline />;
      case "new-project":
        return <NewProjectPage onCancel={() => setActivePage("projects")} />;
      default:
        return <ResearcherDashboard />;
    }
  };


  // Switch to participant mode
  const handleSwitch = () => {
    setIsSwitching(true);
    setTimeout(() => {
      navigate("/homepage");
    }, 4000);
  };


  return (
    <div className="flex h-screen bg-[#F0EEED]">
      {isSwitching ? (
        <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-purple-600 via-blue-600 to-green-600 animate-gradient-move">
          <h1 className="text-4xl font-funnel font-bold text-white animate-fade-in">
            Switching to Participant Home ...
          </h1>
        </div>
      ) : (
        <>
          {/* Top Bar */}
          <div className="fixed w-full bg-transparent p-4 pl-8 flex justify-between items-center">
            <h1 className="text-xl pl-20 font-semibold"></h1>
            <div className="flex items-center gap-6">
              <button
                onClick={handleSwitch}
                className="w-40 bg-[#C4BDED] py-1 text-black font-funnel text-sm rounded-lg hover:bg-[#ACA3E3]"
              >
                Switch to Participant
              </button>
              {/* Profile Picture */}
              <img
                src={profilePic}
                alt="User Profile"
                className="w-10 h-10 rounded-full cursor-pointer border border-gray-300"
                onClick={() => navigate("/my-account")}
              />
            </div>
          </div>


          {/* Sidebar */}
          <div
            className={`fixed left-0 top-0 h-full bg-[#DCD6F7] shadow-lg p-4 transition-all duration-300 ease-in-out ${
              isCollapsed ? "w-20" : "w-48"
            }`}
          >
            <div className="flex flex-col h-full relative">
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="absolute -right-10 top-5 w-12 h-12 flex items-center justify-center rounded-full bg-[#C4BDED] hover:bg-[#ACA3E3] transition-all duration-300 shadow-md border border-gray-400"
              >
                <Menu size={18} />
              </button>


              <nav className="space-y-2 flex-grow mt-20">
                <button
                  onClick={() => setActivePage("projects")}
                  className={`flex items-center p-2 w-full rounded-lg hover:bg-[#ACA3E3] cursor-pointer transition-all duration-300 ease-in-out ${
                    activePage === "projects" ? "bg-gray-300" : ""
                  }`}
                >
                  <FolderOpenDot size={20} />
                  {showText && <span className="ml-3 text-sm">Projects</span>}
                </button>


                <button
                  onClick={() => setActivePage("guideline")}
                  className={`flex items-center p-2 w-full rounded-lg hover:bg-[#ACA3E3] cursor-pointer transition-all duration-300 ease-in-out ${
                    activePage === "guideline" ? "bg-gray-300" : ""
                  }`}
                >
                  <Info size={20} />
                  {showText && <span className="ml-3 text-sm">Guideline</span>}
                </button>
              </nav>


              {/* User Info */}
              <div className="flex flex-col items-left mt-auto">
                
                <p>{user ? `Hey ${user.first_name}` : "loading ..."}</p>


                <div
                  onClick={() => navigate("/my-account")}
                  className="flex items-center p-2 rounded-lg hover:bg-gray-200 cursor-pointer transition-all duration-300 ease-in-out"
                >
                  <CircleUserRound size={20} />
                  {showText && <span className="ml-3 text-sm">My Account</span>}
                </div>


                <div
                  onClick={() => setShowLogoutPopup(true)}
                  className="flex items-center p-2 rounded-lg hover:bg-gray-200 cursor-pointer transition-all duration-300 ease-in-out"
                >
                  <LogOut size={20} />
                  {showText && <span className="ml-3 text-sm">Log Out</span>}
                </div>


                {showLogoutPopup && (
                  <LogoutConfirmation
                    onConfirm={handleSignOut}
                    onCancel={() => setShowLogoutPopup(false)}
                  />
                )}
              </div>
            </div>
          </div>


          {/* Main Content */}
          <div
            className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
              isCollapsed ? "ml-20" : "ml-48"
            }`}
          >
            <div className="p-6 mt-20">{renderContent()}</div>
          </div>
        </>
      )}
    </div>
  );
};


export default SideandTopBar;
