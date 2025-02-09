// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Updated import
import HomePage from './pages/Home_dasboard';
// import UserManagement from './pages/UserManagement';
// import ProjectManagement from './pages/ProjectManagement';

function App() {
  return (
    <Router>
      <div>
        <Routes> {/* Updated to Routes */}
          <Route path="/" element={<HomePage />} /> {/* Updated to use element prop */}
          {/* <Route path="/users" element={<UserManagement />} />
          <Route path="/projects" element={<ProjectManagement />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
