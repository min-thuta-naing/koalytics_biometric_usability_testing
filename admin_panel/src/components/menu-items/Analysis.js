import shadows from '@mui/material/styles/shadows';
import React from 'react';
//import profilePic from '../assets/profile.jpeg';

const Analysis = () => {
  return (
    <div style={styles.container}>
      <h2>System Analysis</h2>
      <p>Welcome back, Julia. Here you can see the system analysis overview.</p>

      {/* Greeting Box */}
      <div style={styles.greetingBox}>
        {/* Left Side: Profile Picture and Welcome Text */}
        <div style={styles.profile}>
          <span style={styles.welcomeText}>Welcome back, Julia.</span>
        </div>

        {/* Right Side: Photo */}
        <img src="photo.png" alt="Analysis" style={styles.photo} />
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
  },
  greetingBox: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#d4c1ec',
    borderRadius: '40px',
    marginTop: '20px',
  },
  profile: {
    display: 'flex',
    alignItems: 'center',
  },
  profilePic: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    marginRight: '10px',
  },
  welcomeText: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
  },
  photo: {
    width: '100px',
    height: '100px',
    borderRadius: '8px',
  },
};

export default Analysis;
