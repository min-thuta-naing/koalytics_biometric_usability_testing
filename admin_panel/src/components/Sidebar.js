// import React from 'react';
// import { Link } from 'react-router-dom';
// import { FaTachometerAlt, FaCog, FaUser } from 'react-icons/fa';
// import './Sidebar.css'; 

// const Sidebar = ({ theme }) => {
//   return (
//     <div className={`sidebar ${theme}`}>
//         { /* Website Title */}
//         <h2 className="sidebar-title">Koalytics</h2>
//         <div className="sidebar-menu">
//             <Link to="/" className="sidebar-item">
//                 <FaTachometerAlt className="sidebar-icon" /> Dashboard
//             </Link>
//             <Link to="/settings" className="sidebar-item">
//                 <FaCog className="sidebar-icon" /> Settings
//             </Link>
//             <Link to="/profile" className="sidebar-item">
//                 <FaUser className="sidebar-icon" /> Profile
//             </Link>
//         </div>
//     </div>
//   );
// };

// export default Sidebar;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaCog, FaUser, FaChevronDown, FaChevronUp, FaChartLine, FaEllipsisH, FaHome, FaPeopleArrows, FaReply, FaOpenid } from 'react-icons/fa';
import { HiUserAdd } from "react-icons/hi";
import { HiMiniUserPlus, HiMiniUsers, HiMiniUserGroup, HiMiniHandRaised, HiFaceSmile, HiMiniRectangleGroup, HiChartPie, HiHome, HiMiniCog6Tooth, HiMiniUser, HiChevronDown, HiChevronUp } from "react-icons/hi2";
import './Sidebar.css';

const Sidebar = ({ theme }) => {
    // Separate state for each dropdown
    const [isDashboardOpen, setIsDashboardOpen] = useState(false);
    const [isUserManagementOpen, setIsUserManagementOpen] = useState(false);
    const [isAdminManagementOpen, setIsAdminManagementOpen] = useState(false);


    return (
        <div className={`sidebar ${theme}`}>
            
            <div className="sidebar-menu">
                {/* Home link */}
                <Link to="/" className="sidebar-item">
                    <HiHome className="sidebar-icon" /> Home
                </Link>
                
                {/* Dashboard dropdown */}
                <div className="sidebar-dropdown">
                    <button className="sidebar-item" onClick={() => setIsDashboardOpen(!isDashboardOpen)}>
                        <HiMiniRectangleGroup className="sidebar-icon" /> Dashboard
                        {isDashboardOpen ? <HiChevronUp className="dropdown-icon" /> : <HiChevronDown className="dropdown-icon" />}
                    </button>
                    {isDashboardOpen && (
                        <div className="dropdown-menu">
                            <Link to="/analysis" className="dropdown-item">
                                <HiChartPie className="sidebar-icon" /> Analysis
                            </Link>
                            <Link to="/others" className="dropdown-item">
                                <FaEllipsisH className="sidebar-icon" /> Others
                            </Link>
                        </div>
                    )}
                </div>

                {/* User Management dropdown */}
                <div className="sidebar-dropdown">
                    <button className="sidebar-item" onClick={() => setIsUserManagementOpen(!isUserManagementOpen)}>
                        <HiMiniUserGroup className="sidebar-icon" /> User Management
                        {isUserManagementOpen ? <HiChevronUp className="dropdown-icon" /> : <HiChevronDown className="dropdown-icon" />}
                    </button>
                    {isUserManagementOpen && (
                        <div className="dropdown-menu">
                            <Link to="/user-list" className="dropdown-item">
                                <HiMiniUserGroup className="sidebar-icon" /> Account Information
                            </Link>
                            <Link to="/others" className="dropdown-item">
                                <HiFaceSmile className="sidebar-icon" /> Feedback & Reports
                            </Link>
                        </div>
                    )}
                </div>

                {/* Admin Management dropdown */}
                <div className="sidebar-dropdown">
                    <button className="sidebar-item" onClick={() => setIsAdminManagementOpen(!isAdminManagementOpen)}>
                        <HiMiniUsers className="sidebar-icon" /> Admins
                        {isAdminManagementOpen ? <HiChevronUp className="dropdown-icon" /> : <HiChevronDown className="dropdown-icon" />}
                    </button>
                    {isAdminManagementOpen && (
                        <div className="dropdown-menu">
                            <Link to="/admin-list" className="dropdown-item">
                                <HiMiniUsers className="sidebar-icon" /> Admin Lists
                            </Link>
                            <Link to="/role-permission" className="dropdown-item">
                                <HiMiniHandRaised className="sidebar-icon" /> Roles & Permission
                            </Link>
                            <Link to="/open-admin-acc" className="dropdown-item">
                                <HiMiniUserPlus className="sidebar-icon" /> Open Admin Account
                            </Link>
                        </div>
                    )}
                </div>

                {/* Other Sidebar Items */}
                <Link to="/settings" className="sidebar-item">
                    <HiMiniCog6Tooth className="sidebar-icon" /> Settings
                </Link>
                <Link to="/profile" className="sidebar-item">
                    <HiMiniUser className="sidebar-icon" /> Profile
                </Link>
            </div>
        </div>
    );
};

export default Sidebar;
