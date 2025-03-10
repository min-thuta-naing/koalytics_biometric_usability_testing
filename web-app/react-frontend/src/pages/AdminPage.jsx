import { useState, useEffect } from "react";

const userData = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Researcher", birthday: "1990-05-15", gender: "Male", maritalStatus: "Single", country: "USA", zipCode: "10001" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Participant", birthday: "1992-07-22", gender: "Female", maritalStatus: "Married", country: "UK", zipCode: "20002" },
  { id: 3, name: "Tom Lee", email: "tom@example.com", role: "Researcher", birthday: "1989-08-10", gender: "Male", maritalStatus: "Single", country: "Canada", zipCode: "30003" },
  { id: 4, name: "Sara White", email: "sara@example.com", role: "Participant", birthday: "1995-03-25", gender: "Female", maritalStatus: "Married", country: "Australia", zipCode: "40004" },
  { id: 5, name: "Chris Green", email: "chris@example.com", role: "Researcher", birthday: "1987-11-30", gender: "Male", maritalStatus: "Single", country: "New Zealand", zipCode: "50005" },
  { id: 6, name: "Anna Black", email: "anna@example.com", role: "Participant", birthday: "1991-02-14", gender: "Female", maritalStatus: "Divorced", country: "Ireland", zipCode: "60006" },
  { id: 7, name: "Mike Brown", email: "mike@example.com", role: "Researcher", birthday: "1993-05-01", gender: "Male", maritalStatus: "Single", country: "USA", zipCode: "70007" },
  { id: 8, name: "Emily Blue", email: "emily@example.com", role: "Participant", birthday: "1994-06-17", gender: "Female", maritalStatus: "Married", country: "Canada", zipCode: "80008" },
  { id: 9, name: "David Gold", email: "david@example.com", role: "Researcher", birthday: "1988-04-22", gender: "Male", maritalStatus: "Single", country: "UK", zipCode: "90009" },
  { id: 10, name: "Olivia Grey", email: "olivia@example.com", role: "Participant", birthday: "1990-01-30", gender: "Female", maritalStatus: "Married", country: "Australia", zipCode: "10010" },
  { id: 11, name: "Ethan White", email: "ethan@example.com", role: "Researcher", birthday: "1992-12-02", gender: "Male", maritalStatus: "Single", country: "New Zealand", zipCode: "11011" },
  { id: 12, name: "Sophia Red", email: "sophia@example.com", role: "Participant", birthday: "1995-09-18", gender: "Female", maritalStatus: "Divorced", country: "Ireland", zipCode: "12012" },
  { id: 13, name: "Liam Yellow", email: "liam@example.com", role: "Researcher", birthday: "1990-10-12", gender: "Male", maritalStatus: "Single", country: "USA", zipCode: "13013" },
  { id: 14, name: "Charlotte Pink", email: "charlotte@example.com", role: "Participant", birthday: "1993-02-20", gender: "Female", maritalStatus: "Married", country: "Canada", zipCode: "14014" },
  { id: 15, name: "Mason Brown", email: "mason@example.com", role: "Researcher", birthday: "1985-11-01", gender: "Male", maritalStatus: "Single", country: "Australia", zipCode: "15015" },
  { id: 16, name: "Isabella Purple", email: "isabella@example.com", role: "Participant", birthday: "1996-12-25", gender: "Female", maritalStatus: "Single", country: "New Zealand", zipCode: "16016" },
];

const AdminPage = () => {
  const [users, setUsers] = useState(userData);
  const [userName] = useState("Admin"); // Replace with actual logged-in user's name
  const [profilePic] = useState("/path/to/profile-pic.jpg"); // Replace with the actual path to the profile picture

  useEffect(() => {
    // You can fetch user data from an API here and set it to state
    // For now, using the dummy data
    setUsers(userData);
  }, []);

  const totalUsers = users.length; // Calculate total users dynamically

  return (
    <div className="h-screen flex flex-col">
      {/* Top Bar */}
      <div className="bg-white shadow-md px-4 py-5 flex items-center justify-between">
        <div className="flex items-center space-x-4 ml-auto">
          {/* Profile */}
          <div className="flex items-center space-x-2">
            <img
              src={profilePic}
              alt="Profile"
              className="w-8 h-8 rounded-full border-2 border-gray-300"
            />
            <span className="font-semibold">{userName}</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 p-6 flex space-x-6">
        {/* Total Users Box and Status of Existing Projects - Stacked */}
        <div className="flex flex-col space-y-6 w-1/3 h-full">
          {/* Total Users Box */}
          <div className="bg-gradient-to-b from-violet-100 via-white to-transparent p-4 border-2 border-violet-500 shadow-lg flex flex-col items-center justify-center h-full">
            <div className="text-xl font-semibold text-violet-500 mb-2">Total Users</div>
            <div className="text-3xl font-bold">{totalUsers}</div>
          </div>

          {/* Status of Existing Projects Box */}
          <div className="bg-gradient-to-b from-violet-100 via-white to-transparent p-4 border-2 border-violet-500 shadow-lg flex flex-col items-center justify-center h-full">
            <div className="text-xl font-semibold text-violet-500 mb-2">Status of Existing Projects</div>
            <div className="text-lg">In Progress: 5</div>
            <div className="text-lg">Ended: 7</div>
          </div>
        </div>

        {/* User Table */}
        <div className="p-6 w-2/3">
          <h1 className="text-2xl font-semibold mb-4">User Information</h1>
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2 text-left">Actions</th>
                <th className="border px-4 py-2 text-left">Name</th>
                <th className="border px-4 py-2 text-left">Email</th>
                <th className="border px-4 py-2 text-left">Role</th>
                <th className="border px-4 py-2 text-left">Birthday</th>
                <th className="border px-4 py-2 text-left">Gender</th>
                <th className="border px-4 py-2 text-left">Marital Status</th>
                <th className="border px-4 py-2 text-left">Country</th>
                <th className="border px-4 py-2 text-left">Zip Code</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-100">
                  <td className="border px-4 py-2 flex justify-start space-x-4">
                    {/* Action Buttons */}
                  </td>
                  <td className="border px-4 py-2">{user.name}</td>
                  <td className="border px-4 py-2">{user.email}</td>
                  <td className="border px-4 py-2">{user.role}</td>
                  <td className="border px-4 py-2">{user.birthday}</td>
                  <td className="border px-4 py-2">{user.gender}</td>
                  <td className="border px-4 py-2">{user.maritalStatus}</td>
                  <td className="border px-4 py-2">{user.country}</td>
                  <td className="border px-4 py-2">{user.zipCode}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;