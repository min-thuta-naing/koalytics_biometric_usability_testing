import { Link } from "react-router-dom";
import { Home, Settings, User, Menu, X } from "lucide-react";

const Sidebar = ({ isOpen, setIsOpen }) => {
  return (
    <div className={`bg-gray-900 text-white h-screen p-5 transition-all duration-300 fixed left-0 top-0 ${isOpen ? "w-60" : "w-16"} z-20`}>
      <div className="flex justify-between items-center">
        <h1 className={`text-xl font-bold ${isOpen ? "block" : "hidden"}`}>Admin</h1>
        <button onClick={() => setIsOpen(!isOpen)} className="p-2">
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>
      
      <nav className="mt-10">
        <Link to="/" className="flex items-center p-3 hover:bg-gray-700 rounded">
          <Home className="w-5 h-5" />
          <span className={`ml-3 ${isOpen ? "block" : "hidden"}`}>Dashboard</span>
        </Link>
        <Link to="/settings" className="flex items-center p-3 hover:bg-gray-700 rounded">
          <Settings className="w-5 h-5" />
          <span className={`ml-3 ${isOpen ? "block" : "hidden"}`}>Settings</span>
        </Link>
        <Link to="/profile" className="flex items-center p-3 hover:bg-gray-700 rounded">
          <User className="w-5 h-5" />
          <span className={`ml-3 ${isOpen ? "block" : "hidden"}`}>Profile</span>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
