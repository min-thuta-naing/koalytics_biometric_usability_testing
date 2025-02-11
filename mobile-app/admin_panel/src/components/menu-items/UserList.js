import React, { useState } from 'react';

const UserList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const users = [
    { id: '001', username: 'John Doe', email: 'john.doe@example.com', role: 'Researcher', status: 'Active' },
    { id: '002', username: 'Jane Smith', email: 'jane.smith@example.com', role: 'Participant', status: 'Deactivated' },
    { id: '003', username: 'Alice Johnson', email: 'alice.johnson@example.com', role: 'Researcher', status: 'Active' },
    { id: '004', username: 'Bob Brown', email: 'bob.brown@example.com', role: 'Participant', status: 'Deleted' },
    { id: '005', username: 'Charlie White', email: 'charlie.white@example.com', role: 'Researcher', status: 'Active' },
    { id: '006', username: 'Dave Green', email: 'dave.green@example.com', role: 'Participant', status: 'Deactivated' },
    { id: '007', username: 'Eva Black', email: 'eva.black@example.com', role: 'Researcher', status: 'Active' },
    { id: '008', username: 'Frank Wilson', email: 'frank.wilson@example.com', role: 'Participant', status: 'Deactivated' },
    { id: '009', username: 'Grace Lee', email: 'grace.lee@example.com', role: 'Researcher', status: 'Active' },
    { id: '010', username: 'Henry Kim', email: 'henry.kim@example.com', role: 'Participant', status: 'Active' },
    { id: '011', username: 'Ivy Adams', email: 'ivy.adams@example.com', role: 'Researcher', status: 'Active' },
    { id: '012', username: 'Jack Daniels', email: 'jack.daniels@example.com', role: 'Participant', status: 'Deactivated' },
    { id: '013', username: 'Kara Stone', email: 'kara.stone@example.com', role: 'Researcher', status: 'Active' },
    { id: '014', username: 'Leo Smith', email: 'leo.smith@example.com', role: 'Participant', status: 'Deleted' },
    { id: '015', username: 'Mia Davis', email: 'mia.davis@example.com', role: 'Researcher', status: 'Active' },
    { id: '016', username: 'Nathan Wright', email: 'nathan.wright@example.com', role: 'Participant', status: 'Deactivated' },
    { id: '017', username: 'Olivia Brown', email: 'olivia.brown@example.com', role: 'Researcher', status: 'Active' },
    { id: '018', username: 'Paul Clark', email: 'paul.clark@example.com', role: 'Participant', status: 'Deactivated' },
    { id: '019', username: 'Quincy Hill', email: 'quincy.hill@example.com', role: 'Researcher', status: 'Active' },
    { id: '020', username: 'Rachel King', email: 'rachel.king@example.com', role: 'Participant', status: 'Active' },
    { id: '021', username: 'Samuel Scott', email: 'samuel.scott@example.com', role: 'Researcher', status: 'Active' },
    { id: '022', username: 'Tina Lewis', email: 'tina.lewis@example.com', role: 'Participant', status: 'Deleted' },
    { id: '023', username: 'Ursula Harris', email: 'ursula.harris@example.com', role: 'Researcher', status: 'Active' },
    { id: '024', username: 'Vince Moore', email: 'vince.moore@example.com', role: 'Participant', status: 'Deactivated' },
    { id: '025', username: 'Wendy Young', email: 'wendy.young@example.com', role: 'Researcher', status: 'Active' },
    { id: '026', username: 'Xander Taylor', email: 'xander.taylor@example.com', role: 'Participant', status: 'Deactivated' },
    { id: '027', username: 'Yara Martinez', email: 'yara.martinez@example.com', role: 'Researcher', status: 'Active' },
    { id: '028', username: 'Zane Wilson', email: 'zane.wilson@example.com', role: 'Participant', status: 'Active' },
    { id: '029', username: 'Aaron Miller', email: 'aaron.miller@example.com', role: 'Researcher', status: 'Active' },
    { id: '030', username: 'Bethany Thomas', email: 'bethany.thomas@example.com', role: 'Participant', status: 'Deactivated' },
    { id: '031', username: 'Chad Evans', email: 'chad.evans@example.com', role: 'Researcher', status: 'Active' },
    { id: '032', username: 'Diana Roberts', email: 'diana.roberts@example.com', role: 'Participant', status: 'Deactivated' },
    { id: '033', username: 'Ethan Carter', email: 'ethan.carter@example.com', role: 'Researcher', status: 'Active' },
    { id: '034', username: 'Felicia Perez', email: 'felicia.perez@example.com', role: 'Participant', status: 'Deactivated' },
    { id: '035', username: 'George Gonzalez', email: 'george.gonzalez@example.com', role: 'Researcher', status: 'Active' },
    { id: '036', username: 'Hannah Walker', email: 'hannah.walker@example.com', role: 'Participant', status: 'Deactivated' },
    { id: '037', username: 'Ian Moore', email: 'ian.moore@example.com', role: 'Researcher', status: 'Active' },
    { id: '038', username: 'Julia Allen', email: 'julia.allen@example.com', role: 'Participant', status: 'Deactivated' },
    { id: '039', username: 'Kevin Martin', email: 'kevin.martin@example.com', role: 'Researcher', status: 'Active' },
    { id: '040', username: 'Lily Walker', email: 'lily.walker@example.com', role: 'Participant', status: 'Deactivated' },
  ];  

  const itemsPerPage = 20;
  const totalPages = Math.ceil(users.length / itemsPerPage);
  
  const currentUsers = users.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (direction) => {
    setCurrentPage((prevPage) => {
      if (direction === 'next' && prevPage < totalPages) return prevPage + 1;
      if (direction === 'prev' && prevPage > 1) return prevPage - 1;
      return prevPage;
    });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>User List and Information</h2>
      <p style={styles.description}>This page displays all the user list together with their roles and permissions.</p>

      {/* User Table Container */}
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>No.</th>
              <th style={styles.tableHeader}>User ID</th>
              <th style={styles.tableHeader}>Username</th>
              <th style={styles.tableHeader}>Email</th>
              <th style={styles.tableHeader}>Role</th>
              <th style={styles.tableHeader}>Status</th>
              <th style={styles.tableHeader}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Rendering dynamic rows based on current page */}
            {currentUsers.map((user, index) => (
              <tr style={styles.tableRow} key={user.id}>
                <td style={styles.tableCell}>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td style={styles.tableCell}>{user.id}</td>
                <td style={styles.tableCell}>{user.username}</td>
                <td style={styles.tableCell}>{user.email}</td>
                <td style={styles.tableCell}>{user.role}</td>
                <td style={{ ...styles.tableCell, color: getStatusColor(user.status) }}>{user.status}</td>
                <td style={styles.tableCell}>
                  <button style={styles.button}>Edit</button>
                  <button style={styles.button}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Pagination */}
        <div style={styles.pagination}>
          <span>Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, users.length)} of {users.length} entries</span>
          <div style={styles.paginationControls}>
            <button style={styles.paginationButton} onClick={() => handlePageChange('prev')} disabled={currentPage === 1}>
              {"<"}
            </button>
            <button style={styles.paginationButton} onClick={() => handlePageChange('next')} disabled={currentPage === totalPages}>
              {">"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to get status color
const getStatusColor = (status) => {
  if (status === 'Active') return 'green';
  if (status === 'Deactivated') return 'orange';
  if (status === 'Deleted') return 'red';
  return 'black';
};

// Inline styles
const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    fontSize: '24px',
    marginBottom: '10px',
  },
  description: {
    fontSize: '16px',
    marginBottom: '20px',
  },
  tableContainer: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableHeader: {
    backgroundColor: '#f4f4f4',
    padding: '10px',
    textAlign: 'left',
    fontWeight: 'bold',
    borderBottom: '1px solid #ddd',
  },
  tableRow: {
    borderBottom: '1px solid #ddd',
  },
  tableCell: {
    padding: '10px',
    borderBottom: '1px solid #ddd',
  },
  button: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '5px 10px',
    marginRight: '5px',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '4px',
  },
  pagination: {
    padding: '10px',
    textAlign: 'center',
    fontSize: '14px',
  },
  paginationControls: {
    marginTop: '10px',
  },
  paginationButton: {
    padding: '5px 10px',
    margin: '0 5px',
    backgroundColor: '#ddd',
    border: '1px solid #ccc',
    cursor: 'pointer',
    borderRadius: '4px',
  }
};

export default UserList;
