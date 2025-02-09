import React, { useState } from 'react';
import { FaSun, FaMoon, FaBell, FaUserEdit, FaSignOutAlt } from 'react-icons/fa'; // Import icons
import './Topbar.css';
import profilePic from '../assets/profile.jpeg';

const Topbar = ({ toggleTheme, theme }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className={`topbar ${theme}`}>
        {/* Hamburger menu */}
        <div className="app-name">
            <p>Koalytics Admin Panel</p> 
        </div>
        <div className="topbar-buttons">
            {/* Toggle button with icon */}
            <button className="topbar-button" onClick={toggleTheme}>
            {theme === 'light' ? <FaMoon /> : <FaSun />} {/* Switch between moon and sun */}
            </button>
            {/* Notification bell button */}
            <button className="topbar-button">
              <FaBell size={20} /> {/* Bell icon */}
            </button>
            {/* Profile Picture Button */}
            <button className="profile-button" onClick={() => setShowDropdown(!showDropdown)}>
              <img src={profilePic} alt="Profile" className="profile-pic" />
            </button>
        </div>

        {/* Dropdown Menu */}
        {showDropdown && (
          <div className="profile-dropdown">
            <img src={profilePic} alt="Profile" className="profile-dropdown-pic" />
            <p className="profile-name">Hello, Julia</p>
            <button className="dropdown-item">
              <FaUserEdit /> Edit Profile
            </button>
            <button className="dropdown-item logout">
              <FaSignOutAlt /> Logout
            </button>
          </div>
        )}
    </div>
  );
};

export default Topbar;
