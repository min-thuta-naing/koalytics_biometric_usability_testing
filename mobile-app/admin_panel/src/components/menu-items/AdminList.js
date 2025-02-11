import React, { useState } from 'react';

const AdminList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const admins = [
    { id: '001', name: 'John Doe', email: 'john.doe@example.com', role: 'Admin', status: 'Active' },
    { id: '002', name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Editor', status: 'Deactivated' },
    { id: '003', name: 'Alice Johnson', email: 'alice.johnson@example.com', role: 'Moderator', status: 'Active' },
    { id: '004', name: 'Bob Brown', email: 'bob.brown@example.com', role: 'Admin', status: 'Deleted' },
    { id: '005', name: 'Charlie White', email: 'charlie.white@example.com', role: 'Editor', status: 'Active' },
    { id: '006', name: 'Dave Green', email: 'dave.green@example.com', role: 'Viewer', status: 'Deactivated' },
    { id: '007', name: 'Eva Black', email: 'eva.black@example.com', role: 'Moderator', status: 'Active' },
    { id: '008', name: 'Frank Wilson', email: 'frank.wilson@example.com', role: 'Admin', status: 'Deactivated' },
    { id: '009', name: 'Grace Lee', email: 'grace.lee@example.com', role: 'Editor', status: 'Active' },
    { id: '010', name: 'Henry Kim', email: 'henry.kim@example.com', role: 'Viewer', status: 'Active' },
  ];

  const itemsPerPage = 10;
  const totalPages = Math.ceil(admins.length / itemsPerPage);
  
  const currentAdmins = admins.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (direction) => {
    setCurrentPage((prevPage) => {
      if (direction === 'next' && prevPage < totalPages) return prevPage + 1;
      if (direction === 'prev' && prevPage > 1) return prevPage - 1;
      return prevPage;
    });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Admin Lists</h2>
      <p style={styles.description}>This page displays all the admin list together with their roles and permissions.</p>

      {/* Admin Table Container */}
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>No.</th>
              <th style={styles.tableHeader}>Admin ID</th>
              <th style={styles.tableHeader}>Name</th>
              <th style={styles.tableHeader}>Email</th>
              <th style={styles.tableHeader}>Role</th>
              <th style={styles.tableHeader}>Status</th>
              <th style={styles.tableHeader}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Rendering dynamic rows based on current page */}
            {currentAdmins.map((admin, index) => (
              <tr style={styles.tableRow} key={admin.id}>
                <td style={styles.tableCell}>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td style={styles.tableCell}>{admin.id}</td>
                <td style={styles.tableCell}>{admin.name}</td>
                <td style={styles.tableCell}>{admin.email}</td>
                <td style={styles.tableCell}>{admin.role}</td>
                <td style={{ ...styles.tableCell, color: getStatusColor(admin.status) }}>{admin.status}</td>
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
          <span>Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, admins.length)} of {admins.length} entries</span>
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

export default AdminList;
