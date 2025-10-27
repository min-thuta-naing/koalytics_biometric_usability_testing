import React, { useEffect, useState } from "react";
import HeaderBar from "../../components/HeaderBar";

const MyAccount = () => {
    const API_URL = process.env.REACT_APP_API_URL;
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Get user ID from localStorage
                const storedUser = localStorage.getItem("user");
                if (!storedUser) {
                    throw new Error("User not found. Please log in.");
                }

                const user = JSON.parse(storedUser);
                
                // Extract user ID - handle both nested and direct user structures
                let userId;
                if (user.user && user.user.id) {
                    userId = user.user.id;
                } else if (user.id) {
                    userId = user.id;
                } else {
                    throw new Error("User ID not found");
                }

                // Fetch user data from API
                const response = await fetch(`${API_URL}user/${userId}/`);
                
                if (!response.ok) {
                    throw new Error(`Failed to fetch user data: ${response.status}`);
                }

                const userDataFromApi = await response.json();
                setUserData(userDataFromApi);
                
            } catch (error) {
                console.error("Error loading user data:", error);
                setError(error.message);
                
                // Fallback: try to use localStorage data if API fails
                try {
                    const storedUser = localStorage.getItem("user");
                    if (storedUser) {
                        const user = JSON.parse(storedUser);
                        setUserData(user.user || user);
                    }
                } catch (fallbackError) {
                    console.error("Fallback also failed:", fallbackError);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) {
        return (
          <div className="flex justify-center items-center h-screen bg-gray-100">
              <div className="text-center">
              <div className="animate-spin border-t-4 border-[#ACA3E3] border-solid rounded-full w-16 h-16 mx-auto"></div>
                  <p className="mt-4 text-xl font-funnel font-semibold text-gray-700">Loading, please wait ...</p>
              </div>
          </div>
        );
    }

    if (error) {
        return (
            <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '20px auto', padding: '20px' }}>
                <p className="text-red-500">Error: {error}</p>
                <p>Showing data from local storage as fallback.</p>
            </div>
        );
    }

    if (!userData) {
        return <p>No user data available.</p>;
    }

    // Helper function to safely access array data
    const getArrayData = (data, fieldName) => {
        if (!data || !data[fieldName]) return [];
        return Array.isArray(data[fieldName]) ? data[fieldName] : [];
    };

    // Extract arrays from user data
    const hobbies = getArrayData(userData, 'hobbies');
    const employmentStatuses = getArrayData(userData, 'employmentStatuses');
    const professions = getArrayData(userData, 'profession');
    const positions = getArrayData(userData, 'position');
    const industries = getArrayData(userData, 'industry');
    const projects = getArrayData(userData, 'projects');

    // return (
    //     <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '20px auto', padding: '20px', backgroundColor: '#EEF2FF', borderRadius: '8px' }}>
    //         <HeaderBar />
    //         <h2 style={{ textAlign: 'left', marginBottom: '20px' }}>My Profile</h2>

    //         {/* Profile Section */}
    //         <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
    //             <h3 style={{ margin: 0 }}>{userData.first_name} {userData.last_name}</h3>
    //             <p style={{ margin: 0, color: '#666' }}>{userData.country || 'No country'}</p>
    //             <p style={{ margin: 0, color: '#666' }}>User ID: {userData.id}</p>
    //         </div>

    //         {/* Personal Information Section */}
    //         <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
    //             <h3 style={{ marginBottom: '15px' }}>Personal Information</h3>
    //             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
    //                 <div>
    //                     <p style={{ margin: 0, color: '#666' }}>First Name</p>
    //                     <p style={{ margin: 0, fontWeight: 'bold' }}>{userData.first_name}</p>
    //                 </div>
    //                 <div>
    //                     <p style={{ margin: 0, color: '#666' }}>Last Name</p>
    //                     <p style={{ margin: 0, fontWeight: 'bold' }}>{userData.last_name}</p>
    //                 </div>
    //                 <div>
    //                     <p style={{ margin: 0, color: '#666' }}>Email Address</p>
    //                     <p style={{ margin: 0, fontWeight: 'bold' }}>{userData.email}</p>
    //                 </div>
    //                 <div>
    //                     <p style={{ margin: 0, color: '#666' }}>Birthday</p>
    //                     <p style={{ margin: 0, fontWeight: 'bold' }}>{userData.birthday || 'Not provided'}</p>
    //                 </div>
    //                 <div>
    //                     <p style={{ margin: 0, color: '#666' }}>Gender</p>
    //                     <p style={{ margin: 0, fontWeight: 'bold' }}>{userData.gender || 'Not provided'}</p>
    //                 </div>
    //                 <div>
    //                     <p style={{ margin: 0, color: '#666' }}>Marital Status</p>
    //                     <p style={{ margin: 0, fontWeight: 'bold' }}>{userData.marital_status || 'Not provided'}</p>
    //                 </div>
    //             </div>
    //         </div>

    //         {/* Address Section */}
    //         <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
    //             <h3 style={{ marginBottom: '15px' }}>Address</h3>
    //             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
    //                 <div>
    //                     <p style={{ margin: 0, color: '#666' }}>Country</p>
    //                     <p style={{ margin: 0, fontWeight: 'bold' }}>{userData.country || 'No country'}</p>
    //                 </div>
    //                 <div>
    //                     <p style={{ margin: 0, color: '#666' }}>Postal Code</p>
    //                     <p style={{ margin: 0, fontWeight: 'bold' }}>{userData.zip_code || 'xxxxxxx'}</p>
    //                 </div>
    //             </div>
    //         </div>

    //         {/* Professional Information Section */}
    //         <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
    //             <h3 style={{ marginBottom: '15px' }}>Professional Information</h3>
                
    //             <div style={{ marginBottom: '15px' }}>
    //                 <p style={{ margin: '0 0 5px 0', color: '#666' }}>Employment Status</p>
    //                 {employmentStatuses.length > 0 ? (
    //                     <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
    //                         {employmentStatuses.map((status, index) => (
    //                             <span key={index} style={{ 
    //                                 padding: '5px 10px', 
    //                                 backgroundColor: '#e3f2fd', 
    //                                 borderRadius: '4px', 
    //                                 display: 'inline-block'
    //                             }}>
    //                                 {status.employmentStatuses}
    //                             </span>
    //                         ))}
    //                     </div>
    //                 ) : (
    //                     <p style={{ margin: 0, fontStyle: 'italic' }}>Not provided</p>
    //                 )}
    //             </div>

    //             <div style={{ marginBottom: '15px' }}>
    //                 <p style={{ margin: '0 0 5px 0', color: '#666' }}>Profession</p>
    //                 {professions.length > 0 ? (
    //                     <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
    //                         {professions.map((prof, index) => (
    //                             <span key={index} style={{ 
    //                                 padding: '5px 10px', 
    //                                 backgroundColor: '#e8f5e8', 
    //                                 borderRadius: '4px', 
    //                                 display: 'inline-block'
    //                             }}>
    //                                 {prof.profession}
    //                             </span>
    //                         ))}
    //                     </div>
    //                 ) : (
    //                     <p style={{ margin: 0, fontStyle: 'italic' }}>Not provided</p>
    //                 )}
    //             </div>

    //             <div style={{ marginBottom: '15px' }}>
    //                 <p style={{ margin: '0 0 5px 0', color: '#666' }}>Position</p>
    //                 {positions.length > 0 ? (
    //                     <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
    //                         {positions.map((pos, index) => (
    //                             <span key={index} style={{ 
    //                                 padding: '5px 10px', 
    //                                 backgroundColor: '#fff3e0', 
    //                                 borderRadius: '4px', 
    //                                 display: 'inline-block'
    //                             }}>
    //                                 {pos.position}
    //                             </span>
    //                         ))}
    //                     </div>
    //                 ) : (
    //                     <p style={{ margin: 0, fontStyle: 'italic' }}>Not provided</p>
    //                 )}
    //             </div>

    //             <div style={{ marginBottom: '15px' }}>
    //                 <p style={{ margin: '0 0 5px 0', color: '#666' }}>Industry</p>
    //                 {industries.length > 0 ? (
    //                     <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
    //                         {industries.map((ind, index) => (
    //                             <span key={index} style={{ 
    //                                 padding: '5px 10px', 
    //                                 backgroundColor: '#f3e5f5', 
    //                                 borderRadius: '4px', 
    //                                 display: 'inline-block'
    //                             }}>
    //                                 {ind.industry}
    //                             </span>
    //                         ))}
    //                     </div>
    //                 ) : (
    //                     <p style={{ margin: 0, fontStyle: 'italic' }}>Not provided</p>
    //                 )}
    //             </div>
    //         </div>

    //         {/* Hobbies Section */}
    //         <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
    //             <h3 style={{ marginBottom: '15px' }}>Hobbies</h3>
    //             {hobbies.length > 0 ? (
    //                 <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
    //                     {hobbies.map((hobby, index) => (
    //                         <span key={index} style={{ 
    //                             padding: '5px 10px', 
    //                             backgroundColor: '#f0f0f0', 
    //                             borderRadius: '4px', 
    //                             display: 'inline-block'
    //                         }}>
    //                             {hobby.name}
    //                         </span>
    //                     ))}
    //                 </div>
    //             ) : (
    //                 <p style={{ margin: 0, fontStyle: 'italic' }}>No hobbies available.</p>
    //             )}
    //         </div>

    //         {/* Projects Section */}
    //         <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
    //             <h3 style={{ marginBottom: '15px' }}>Projects</h3>
    //             {projects.length > 0 ? (
    //                 <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
    //                     {projects.map((project, index) => (
    //                         <span key={index} style={{ 
    //                             padding: '5px 10px', 
    //                             backgroundColor: '#e1f5fe', 
    //                             borderRadius: '4px', 
    //                             display: 'inline-block'
    //                         }}>
    //                             {project.name}
    //                         </span>
    //                     ))}
    //                 </div>
    //             ) : (
    //                 <p style={{ margin: 0, fontStyle: 'italic' }}>No projects available.</p>
    //             )}
    //         </div>
    //     </div>
    // );
    return (
    <div className="min-h-screen bg-[#F0EEED] font-funnel">
      <HeaderBar />
      <div className="pt-20 max-w-3xl mx-auto p-6 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">My Profile</h2>

        {/* Profile Info */}
        <section className="bg-white rounded-lg p-5 shadow">
          <h3 className="text-lg font-semibold">{userData.first_name} {userData.last_name}</h3>
          <p className="text-gray-600">{userData.country || "No country"}</p>
          <p className="text-gray-600 text-sm">User ID: {userData.id}</p>
        </section>

        {/* Personal Info */}
        <section className="bg-white rounded-lg p-5 shadow">
          <h3 className="text-lg font-semibold mb-3">Personal Information</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            {[
              ["First Name", userData.first_name],
              ["Last Name", userData.last_name],
              ["Email Address", userData.email],
              ["Birthday", userData.birthday || "Not provided"],
              ["Gender", userData.gender || "Not provided"],
              ["Marital Status", userData.marital_status || "Not provided"],
            ].map(([label, value], i) => (
              <div key={i}>
                <p className="text-gray-500">{label}</p>
                <p className="font-medium">{value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Address */}
        <section className="bg-white rounded-lg p-5 shadow">
          <h3 className="text-lg font-semibold mb-3">Address</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Country</p>
              <p className="font-medium">{userData.country || "No country"}</p>
            </div>
            <div>
              <p className="text-gray-500">Postal Code</p>
              <p className="font-medium">{userData.zip_code || "xxxxxxx"}</p>
            </div>
          </div>
        </section>

        {/* Professional Info */}
        <section className="bg-white rounded-lg p-5 shadow">
          <h3 className="text-lg font-semibold mb-3">Professional Information</h3>
          {[
            ["Employment Status", employmentStatuses, "employmentStatuses", "bg-blue-50"],
            ["Profession", professions, "profession", "bg-green-50"],
            ["Position", positions, "position", "bg-orange-50"],
            ["Industry", industries, "industry", "bg-purple-50"],
          ].map(([label, items, key, bg], i) => (
            <div key={i} className="mb-3">
              <p className="text-gray-500 mb-1">{label}</p>
              {items.length ? (
                <div className="flex flex-wrap gap-2">
                  {items.map((item, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1 text-sm rounded ${bg}`}
                    >
                      {item[key]}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="italic text-gray-400">Not provided</p>
              )}
            </div>
          ))}
        </section>

        {/* Hobbies */}
        <section className="bg-white rounded-lg p-5 shadow">
          <h3 className="text-lg font-semibold mb-3">Hobbies</h3>
          {hobbies.length ? (
            <div className="flex flex-wrap gap-2">
              {hobbies.map((hobby, index) => (
                <span key={index} className="px-3 py-1 text-sm rounded bg-gray-100">
                  {hobby.name}
                </span>
              ))}
            </div>
          ) : (
            <p className="italic text-gray-400">No hobbies available.</p>
          )}
        </section>

        {/* Projects */}
        <section className="bg-white rounded-lg p-5 shadow mb-10">
          <h3 className="text-lg font-semibold mb-3">Projects</h3>
          {projects.length ? (
            <div className="flex flex-wrap gap-2">
              {projects.map((project, index) => (
                <span key={index} className="px-3 py-1 text-sm rounded bg-blue-50">
                  {project.name}
                </span>
              ))}
            </div>
          ) : (
            <p className="italic text-gray-400">No projects available.</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default MyAccount;