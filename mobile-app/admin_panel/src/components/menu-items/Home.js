import React, { useState, useEffect } from 'react';
import profilePic from '../../assets/profile.jpeg'; // Profile Image
import analysisPhoto from '../../assets/photo.png'; // Analysis Image

const Home = () => {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.container}>
      <h2>System Analysis</h2>
      <p>Welcome back, Julia. Here you can see the system analysis overview.</p>

      {/* Greeting Box */}
      <div style={styles.greetingBox}>
        {/* Left Side: Profile Picture and Welcome Text */}
        <div style={styles.profile}>
          <img src={profilePic} alt="Profile" style={styles.profilePic} />
          <div style={styles.textContainer}>
            <span style={styles.welcomeText}>Welcome back, Julia.</span>
            <span style={styles.timeText}>{currentTime}</span>
          </div>
        </div>

        {/* Right Side: Analysis Photo */}
        <img src={analysisPhoto} alt="Analysis" style={styles.photo} />
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
    background: 'linear-gradient(145deg, #d8c5f0, #c2aedb)',
    borderRadius: '40px',
    marginTop: '20px',
    boxShadow: '8px 8px 16px #b9a1c8, -8px -8px 16px #f1dcff',
    border: '1px solid #cbb2e4',
    width: '100%',
  },
  profile: {
    display: 'flex',
    flexDirection: 'column', // Stack profile pic & text vertically
    alignItems: 'center',
  },
  profilePic: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    boxShadow: '4px 4px 8px #b9a1c8, -4px -4px 8px #f1dcff',
    marginBottom: '10px',
  },
  textContainer: {
    textAlign: 'center',
  },
  welcomeText: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#5a3f80',
    display: 'block',
  },
  timeText: {
    fontSize: '22px',
    fontWeight: 'bold',
    background: 'linear-gradient(90deg, #ff9a9e, #fad0c4, #fad0c4, #ffdde1)', // Gradient colors
    WebkitBackgroundClip: 'text',
    color: 'transparent', // Apply gradient color effect
    textShadow: '2px 2px 10px rgba(255, 140, 140, 0.7)', // Soft glow effect
    transition: 'all 0.3s ease-in-out', // Smooth transition effect
    display: 'block',
    letterSpacing: '1.5px',
  },
  photo: {
    width: '150px',
    height: '150px',
    borderRadius: '12px',
  },
};

export default Home;
