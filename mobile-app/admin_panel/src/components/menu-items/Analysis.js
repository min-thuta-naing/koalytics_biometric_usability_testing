import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'iOS', value: 60, color: '#ff6b6b' },
  { name: 'Android', value: 40, color: '#4d96ff' },
];

const Analysis = () => {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>System Analysis</h2>
      <h3>User Engagement Analysis</h3>
      <div style={styles.gridContainer}>
        {/* Device Types Pie Chart */}

        {/* Total Users */}
        <div style={styles.box}>
          <p style={styles.bigNumber}>1,245</p>
          <h3>Total Users</h3>
        </div>

        {/* Active Users */}
        <div style={styles.box}>
          <p style={styles.bigNumber}>980</p>
          <h3>Active Users</h3>
        </div>

        {/* New Users (Last 30 Days) */}
        <div style={styles.box}>
          <p style={styles.bigNumber}>120</p>
          <h3>New Users (30 Days)</h3>
        </div>

        {/* Retention Rate */}
        <div style={styles.box}>
          <p style={styles.bigNumber}>45%</p>
          <h3>30-Day Retention</h3>
        </div>

        <div style={styles.box}>
          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={50}
                innerRadius={30} // Added innerRadius for a donut effect
                label
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={20} />
            </PieChart>
          </ResponsiveContainer>
          <h3>Device Types</h3>
        </div>

        {/* DAU/MAU Ratio */}
        <div style={styles.box}>
          <p style={styles.bigNumber}>0.65</p>
          <h3>DAU/MAU Ratio</h3>
        </div>

        {/* Average Session Duration */}
        <div style={styles.box}>
          <p style={styles.bigNumber}>5m 23s</p>
          <h3>Avg. Session Duration</h3>
        </div>

        {/* Most Used Features */}
        <div style={styles.box}>
          <h3>Most Used Features</h3>
          <ul style={styles.list}>
            <li>Dashboard</li>
            <li>Profile</li>
            <li>Reports</li>
          </ul>
        </div>

        
      </div>
    </div>
  );
};

const styles = {
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)', // 4 equal columns in one row
    gap: '20px',
    marginTop: '20px',
    alignItems: 'center',
  },
  box: {
    background: 'linear-gradient(145deg, #f0f0f0, #dcdcdc)',
    borderRadius: '12px',
    padding: '20px',
    textAlign: 'center',
    boxShadow: '5px 5px 10px rgba(0,0,0,0.1), -5px -5px 10px rgba(255,255,255,0.5)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '180px',
  },
  bigNumber: {
    fontSize: '38px',
    fontWeight: 'bold',
    color: '#333',
    margin: '0',
    textAlign: 'center',
  },
  list: {
    listStyleType: 'none',
    padding: '0',
    margin: '10px 0 0 0',
  },
};

export default Analysis;
