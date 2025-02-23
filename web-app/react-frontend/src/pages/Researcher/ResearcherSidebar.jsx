import { useState, useEffect } from "react";
import { Menu, Info, FolderOpenDot, LogOut, CircleUserRound } from "lucide-react";
import ResearcherGuideline from "./ResearcherGuideline";
import Projects from "./Projects";
import {Link, useNavigate} from "react-router-dom"; 
import NewProjectPage from "./CreateProjects";

const ResearcherSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showText, setShowText] = useState(!isCollapsed);
  const [activePage, setActivePage] = useState("home");
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); 
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);


  // side bar collapse and expand 
  useEffect(() => {
    let timeout;
    if (!isCollapsed) {
      timeout = setTimeout(() => setShowText(true), 300);
    } else {
      setShowText(false);
    }
    return () => clearTimeout(timeout);
  }, [isCollapsed]);

  //log in user info 
  useEffect(()=> {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  },[]);
  const handleSignOut = () => {
    localStorage.removeItem("user");
    navigate("/loginpage"); 
  }
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


  const renderContent = () => {
    switch (activePage) {
      // case "home":
      //   return <ResearcherHome />;
      case "projects":
        return <Projects onNewProject={() => setActivePage("new-project")} />;
      case "guideline":
        return <ResearcherGuideline />
      case "new-project":
        return <NewProjectPage onCancel={() => setActivePage("projects")} />;
      default:
        return <Projects />;
    }
  };

  return (
    <div className="flex h-screen bg-[#EEF2FF]">
      <div
        className={`fixed left-0 top-0 h-full bg-white shadow-lg p-4 transition-all duration-300 ease-in-out ${
          isCollapsed ? "w-20" : "w-48"
        }`}
      >
        <div className="flex flex-col h-full relative">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="absolute -right-10 top-2 w-12 h-12 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition-all duration-300 shadow-md border border-gray-400"
          >
            <Menu size={18} />
          </button>

          <nav className="space-y-2 flex-grow mt-20">
            

            <button
              onClick={() => setActivePage("projects")}
              className={`flex items-center p-2 w-full rounded-lg hover:bg-gray-200 cursor-pointer transition-all duration-300 ease-in-out ${activePage === "projects" ? "bg-gray-300" : ""}`}
            >
              <FolderOpenDot size={20} />
              {showText && <span className="ml-3 text-sm">Projects</span>}
            </button>
            
            <button
              onClick={() => setActivePage("guideline")}
              className={`flex items-center p-2 w-full rounded-lg hover:bg-gray-200 cursor-pointer transition-all duration-300 ease-in-out ${activePage === "guideline" ? "bg-gray-300" : ""}`}
            >
              <Info size={20} />
              {showText && <span className="ml-3 text-sm">Guideline</span>}
            </button>


          </nav>

          <div className="flex flex-col items-left mt-auto">
            <div className="w-10 h-10 mb-4 bg-gray-300 rounded-full transition-all duration-300 ease-in-out"></div>
            <p>{user ? `Hey ${user.first_name}` : "loading ..."}</p>
            <div onClick={'/my-account'} className="flex items-center p-2 rounded-lg hover:bg-gray-200 cursor-pointer transition-all duration-300 ease-in-out">
              <CircleUserRound size={20} />
              {showText && <span className="ml-3 text-sm">My Account</span>}
            </div>
            <div onClick={() => setShowLogoutPopup(true)} className="flex items-center p-2 rounded-lg hover:bg-gray-200 cursor-pointer transition-all duration-300 ease-in-out">
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

      <div
        className={`flex-1 p-6 transition-all duration-300 ease-in-out ${
          isCollapsed ? "ml-20" : "ml-64"
        }`}
      >
        {renderContent()}
      </div>
    </div>
  );
};

export default ResearcherSidebar;