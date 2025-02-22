import { useState } from "react";
import { Menu, User, Shield } from "lucide-react";

const ResearcherPage = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-[#EEF2FF]">
      {/* Sidebar */}
      <div
        className={`bg-white shadow-lg h-full p-4 transition-all duration-300 ${isCollapsed ? "w-20" : "w-64"}`}
      >
        {/* Toggle Button */}
        <button onClick={() => setIsCollapsed(!isCollapsed)} className="mb-4">
          <Menu size={24} />
        </button>

        {/* Profile Section */}
        <div className="flex items-center space-x-2 mb-6">
          <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
          {!isCollapsed && <span className="font-semibold">Researcher</span>}
        </div>

        {/* Menu Items */}
        <nav className="space-y-2">
          <div className="flex items-center p-2 rounded-lg hover:bg-gray-200 cursor-pointer">
            <User size={24} />
            {!isCollapsed && <span className="ml-3">User Management</span>}
          </div>
          <div className="flex items-center p-2 rounded-lg hover:bg-gray-200 cursor-pointer">
            <Shield size={24} />
            {!isCollapsed && <span className="ml-3">Admin</span>}
          </div>
        </nav>
      </div>

      {/* Main Content Area - Left Blank */}
      <div className="flex-1 p-6"> </div>
    </div>
  );
};

export default ResearcherPage;
