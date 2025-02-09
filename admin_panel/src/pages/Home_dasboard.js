// src/pages/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, AppBar, Toolbar, Typography } from '@mui/material';

const HomePage = () => {
  return (
    <div>
        {/* App Bar */}
        <AppBar position="static">
            <Toolbar>
            <Typography variant="h6" style={styles.title}>
                Koalytics
            </Typography>
            </Toolbar>
        </AppBar>

        {/* Content */}
        <div style={styles.container}>
            <h1 style={styles.heading}>Welcome to the Admin Panel</h1>
            <p style={styles.description}>
            This is the dashboard for managing the biometric usability testing app. From here, you can manage users, track projects, and more!
            </p>
        </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '50px',
  },
  heading: {
    fontSize: '36px',
    marginBottom: '20px',
  },
  description: {
    fontSize: '18px',
    marginBottom: '30px',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
  },
  button: {
    width: '200px',
  },
  title: {
    flexGrow: 1,
  },
};

export default HomePage;
