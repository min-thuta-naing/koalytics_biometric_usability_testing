import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/menu-items/Home';
import Settings from './components/menu-items/Settings';
import Profile from './components/menu-items/Profile';
import './App.css';
import Analyis from './components/menu-items/Analysis';
import AdminList from './components/menu-items/AdminList';
import RolePermission from './components/menu-items/RolePermission';
import OpenAdminAcc from './components/menu-items/OpenAdminAcc';
import UserList from './components/menu-items/UserList';

const App = () => {
  const [theme, setTheme] = useState('light'); // Default theme is light

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Router>
      <div className={`app ${theme}`} style={{ display: 'flex' }} >
        <Sidebar theme={theme} />
        <div className="content" style={{ flex: 1 }}>
          <Topbar toggleTheme={toggleTheme} theme={theme} />
          <div className="main-content" style={{ padding: '20px' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/analysis" element={<Analyis />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/admin-list" element={<AdminList />} />
              <Route path="/role-permission" element={<RolePermission />} />
              <Route path="/open-admin-acc" element={<OpenAdminAcc />} />
              <Route path="/user-list" element={<UserList />} />


            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;


