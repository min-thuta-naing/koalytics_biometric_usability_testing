import { useState, useEffect } from "react";
import { Menu, House, FolderOpenDot, LogOut } from "lucide-react";
import ResearcherHome from "./ResearcherHome";
import ResearcherProjects from "./ResearcherProjects";
import NewProjectPage from "./NewProjectPage";

const ResearcherSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showText, setShowText] = useState(!isCollapsed);
  const [activePage, setActivePage] = useState("home");

  useEffect(() => {
    let timeout;
    if (!isCollapsed) {
      timeout = setTimeout(() => setShowText(true), 300);
    } else {
      setShowText(false);
    }
    return () => clearTimeout(timeout);
  }, [isCollapsed]);

  const renderContent = () => {
    switch (activePage) {
      case "home":
        return <ResearcherHome />;
      case "projects":
        return <ResearcherProjects onNewProject={() => setActivePage("new-project")} />;
      case "new-project":
        return <NewProjectPage onCancel={() => setActivePage("projects")} />;
      default:
        return <ResearcherHome />;
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

          <nav className="space-y-2 flex-grow mt-14">
            <button
              onClick={() => setActivePage("home")}
              className={`flex items-center p-2 w-full rounded-lg hover:bg-gray-200 cursor-pointer transition-all duration-300 ease-in-out ${activePage === "home" ? "bg-gray-300" : ""}`}
            >
              <House size={20} />
              {showText && <span className="ml-3 text-sm">Home</span>}
            </button>

            <button
              onClick={() => setActivePage("projects")}
              className={`flex items-center p-2 w-full rounded-lg hover:bg-gray-200 cursor-pointer transition-all duration-300 ease-in-out ${activePage === "projects" ? "bg-gray-300" : ""}`}
            >
              <FolderOpenDot size={20} />
              {showText && <span className="ml-3 text-sm">Projects</span>}
            </button>
          </nav>

          <div className="flex flex-col items-left mt-auto">
            <div className="w-10 h-10 mb-4 bg-gray-300 rounded-full transition-all duration-300 ease-in-out"></div>
            <div className="flex items-center p-2 rounded-lg hover:bg-gray-200 cursor-pointer transition-all duration-300 ease-in-out">
              <LogOut size={20} />
              {showText && <span className="ml-3 text-sm">Log Out</span>}
            </div>
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
