import React from 'react';

const RolePermission = () => {
  const roles = [
    { id: '001', adminRole: 'Administrator', status: 'Active' },
    { id: '002', adminRole: 'Editor', status: 'Active' },
    { id: '003', adminRole: 'Viewer', status: 'Deactivated' },
    { id: '004', adminRole: 'Manager', status: 'Active' },
    { id: '005', adminRole: 'Moderator', status: 'Deleted' },
  ];

  return (
    <div>
      <h2>Role and Permission</h2>
      <button style={styles.addButton}>Add a New Role</button>
      <div style={styles.tableBox}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Id</th>
              <th style={styles.tableHeader}>Admin Roles</th>
              <th style={styles.tableHeader}>Status</th>
              <th style={styles.tableHeader}>Action</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role, index) => (
              <tr key={index} style={styles.tableRow}>
                <td style={styles.tableCell}>{role.id}</td>
                <td style={styles.tableCell}>{role.adminRole}</td>
                <td style={styles.tableCell}>
                  <span style={role.status === 'Active' ? styles.activeStatus : role.status === 'Deactivated' ? styles.deactivatedStatus : styles.deletedStatus}>
                    {role.status}
                  </span>
                </td>
                <td style={styles.tableCell}>
                  <button style={styles.button}>Edit</button>
                  <button style={styles.button}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  addButton: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    marginBottom: '20px',
    cursor: 'pointer',
  },
  tableBox: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    marginTop: '20px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '20px',
  },
  tableHeader: {
    backgroundColor: '#f2f2f2',
    padding: '10px',
    textAlign: 'left',
  },
  tableRow: {
    borderBottom: '1px solid #ddd',
  },
  tableCell: {
    padding: '10px',
  },
  button: {
    padding: '5px 10px',
    marginRight: '5px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  activeStatus: {
    color: 'green',
  },
  deactivatedStatus: {
    color: 'orange',
  },
  deletedStatus: {
    color: 'red',
  },
};

export default RolePermission;
