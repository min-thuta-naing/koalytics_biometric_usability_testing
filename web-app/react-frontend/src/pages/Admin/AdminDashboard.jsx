import React, { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  // Fetch users from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/admin/users/");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="flex min-h-screen bg-[#EEF2FF]"> {/* Changed the overall background color */}
      {/* Sidebar */}
      <div className="w-64 bg-white text-gray-800 p-6 shadow-lg"> {/* Sidebar with white background */}
        <h2 className="text-2xl font-semibold mb-6">Admin Panel</h2>
        <ul>
          <li className="py-2 px-4 bg-white rounded text-black">Dashboard</li> {/* Darker gray background for dashboard item */}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 bg-[#EEF2FF]"> {/* Main content background changed to white */}
        <h1 className="text-3xl font-semibold mb-8 text-center">Admin Dashboard</h1>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead style={{ backgroundColor: "#a78bfa" }} className="text-white">

              <tr>
                <th className="py-3 px-4 text-left">ID</th>
                <th className="py-3 px-4 text-left">First Name</th>
                <th className="py-3 px-4 text-left">Last Name</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Birthday</th>
                <th className="py-3 px-4 text-left">Gender</th>
                <th className="py-3 px-4 text-left">Marital Status</th>
                <th className="py-3 px-4 text-left">Country</th>
                <th className="py-3 px-4 text-left">Zip Code</th>
              </tr>
            </thead>

            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-200"> {/* Hover effect changed to light gray */}
                    <td className="py-2 px-4">{user.id}</td>
                    <td className="py-2 px-4">{user.first_name}</td>
                    <td className="py-2 px-4">{user.last_name}</td>
                    <td className="py-2 px-4">{user.email}</td>
                    <td className="py-2 px-4">{user.birthday}</td>
                    <td className="py-2 px-4">{user.gender}</td>
                    <td className="py-2 px-4">{user.marital_status}</td>
                    <td className="py-2 px-4">{user.country}</td>
                    <td className="py-2 px-4">{user.zip_code}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="py-4 text-center">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
