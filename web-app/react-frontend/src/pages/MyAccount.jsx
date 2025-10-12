// import React, { useEffect, useState } from "react";

// const MyAccount = () => {
//     const [userData, setUserData] = useState(null);
//     const [error, setError] = useState("");

//     useEffect(() => {
//         try {
//             const storedUser = localStorage.getItem("user");
//             if (!storedUser) {
//                 const signupData = localStorage.getItem("signupData");
//                 if (signupData) {
//                     const user = JSON.parse(signupData);
//                     // Handle nested user structure for signup data too
//                     setUserData(user.user || user);
//                 } else {
//                     throw new Error("User not found. Please log in.");
//                 }
//             } else {
//                 const user = JSON.parse(storedUser);
                
//                 // Handle the nested user structure from login response
//                 if (user.user) {
//                     // This is the structure from login: {message: "...", user: {...}}
//                     setUserData(user.user);
//                 } else if (user.id) {
//                     // This is direct user data
//                     setUserData(user);
//                 } else {
//                     console.warn("User ID missing - this might be a new user");
//                     setUserData(user);
//                 }
//             }
//         } catch (error) {
//             console.error("Error loading user data:", error);
//             setError(error.message);
//         }
//     }, []);

//     if (error) {
//         return <p className="text-red-500">Error: {error}</p>;
//     }

//     if (!userData) {
//         return <p>Loading user information...</p>;
//     }

//     // Helper function to safely access array data
//     const getArrayData = (data, fieldName) => {
//         if (!data || !data[fieldName]) return [];
//         return Array.isArray(data[fieldName]) ? data[fieldName] : [];
//     };

//     // Extract arrays from user data
//     const hobbies = getArrayData(userData, 'hobbies');
//     const employmentStatuses = getArrayData(userData, 'employmentStatuses');
//     const professions = getArrayData(userData, 'profession');
//     const positions = getArrayData(userData, 'position');
//     const industries = getArrayData(userData, 'industry');
//     const projects = getArrayData(userData, 'projects');

//     return (
//         <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '20px auto', padding: '20px', backgroundColor: '#EEF2FF', borderRadius: '8px' }}>
//             <h2 style={{ textAlign: 'left', marginBottom: '20px' }}>My Profile</h2>

//             {/* Profile Section */}
//             <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
//                 <h3 style={{ margin: 0 }}>{userData.first_name} {userData.last_name}</h3>
//                 <p style={{ margin: 0, color: '#666' }}>{userData.country || 'No country'}</p>
//                 <p style={{ margin: 0, color: '#666' }}>User ID: {userData.id}</p>
//             </div>

//             {/* Personal Information Section */}
//             <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
//                 <h3 style={{ marginBottom: '15px' }}>Personal Information</h3>
//                 <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
//                     <div>
//                         <p style={{ margin: 0, color: '#666' }}>First Name</p>
//                         <p style={{ margin: 0, fontWeight: 'bold' }}>{userData.first_name}</p>
//                     </div>
//                     <div>
//                         <p style={{ margin: 0, color: '#666' }}>Last Name</p>
//                         <p style={{ margin: 0, fontWeight: 'bold' }}>{userData.last_name}</p>
//                     </div>
//                     <div>
//                         <p style={{ margin: 0, color: '#666' }}>Email Address</p>
//                         <p style={{ margin: 0, fontWeight: 'bold' }}>{userData.email}</p>
//                     </div>
//                     <div>
//                         <p style={{ margin: 0, color: '#666' }}>Birthday</p>
//                         <p style={{ margin: 0, fontWeight: 'bold' }}>{userData.birthday || 'Not provided'}</p>
//                     </div>
//                     <div>
//                         <p style={{ margin: 0, color: '#666' }}>Gender</p>
//                         <p style={{ margin: 0, fontWeight: 'bold' }}>{userData.gender || 'Not provided'}</p>
//                     </div>
//                     <div>
//                         <p style={{ margin: 0, color: '#666' }}>Marital Status</p>
//                         <p style={{ margin: 0, fontWeight: 'bold' }}>{userData.marital_status || 'Not provided'}</p>
//                     </div>
//                 </div>
//             </div>

//             {/* Address Section */}
//             <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
//                 <h3 style={{ marginBottom: '15px' }}>Address</h3>
//                 <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
//                     <div>
//                         <p style={{ margin: 0, color: '#666' }}>Country</p>
//                         <p style={{ margin: 0, fontWeight: 'bold' }}>{userData.country || 'No country'}</p>
//                     </div>
//                     <div>
//                         <p style={{ margin: 0, color: '#666' }}>Postal Code</p>
//                         <p style={{ margin: 0, fontWeight: 'bold' }}>{userData.zip_code || 'xxxxxxx'}</p>
//                     </div>
//                 </div>
//             </div>

//             {/* Professional Information Section */}
//             <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
//                 <h3 style={{ marginBottom: '15px' }}>Professional Information</h3>
                
//                 <div style={{ marginBottom: '15px' }}>
//                     <p style={{ margin: '0 0 5px 0', color: '#666' }}>Employment Status</p>
//                     {employmentStatuses.length > 0 ? (
//                         <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
//                             {employmentStatuses.map((status, index) => (
//                                 <span key={index} style={{ 
//                                     padding: '5px 10px', 
//                                     backgroundColor: '#e3f2fd', 
//                                     borderRadius: '4px', 
//                                     display: 'inline-block'
//                                 }}>
//                                     {status.employmentStatuses}
//                                 </span>
//                             ))}
//                         </div>
//                     ) : (
//                         <p style={{ margin: 0, fontStyle: 'italic' }}>Not provided</p>
//                     )}
//                 </div>

//                 <div style={{ marginBottom: '15px' }}>
//                     <p style={{ margin: '0 0 5px 0', color: '#666' }}>Profession</p>
//                     {professions.length > 0 ? (
//                         <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
//                             {professions.map((prof, index) => (
//                                 <span key={index} style={{ 
//                                     padding: '5px 10px', 
//                                     backgroundColor: '#e8f5e8', 
//                                     borderRadius: '4px', 
//                                     display: 'inline-block'
//                                 }}>
//                                     {prof.profession}
//                                 </span>
//                             ))}
//                         </div>
//                     ) : (
//                         <p style={{ margin: 0, fontStyle: 'italic' }}>Not provided</p>
//                     )}
//                 </div>

//                 <div style={{ marginBottom: '15px' }}>
//                     <p style={{ margin: '0 0 5px 0', color: '#666' }}>Position</p>
//                     {positions.length > 0 ? (
//                         <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
//                             {positions.map((pos, index) => (
//                                 <span key={index} style={{ 
//                                     padding: '5px 10px', 
//                                     backgroundColor: '#fff3e0', 
//                                     borderRadius: '4px', 
//                                     display: 'inline-block'
//                                 }}>
//                                     {pos.position}
//                                 </span>
//                             ))}
//                         </div>
//                     ) : (
//                         <p style={{ margin: 0, fontStyle: 'italic' }}>Not provided</p>
//                     )}
//                 </div>

//                 <div style={{ marginBottom: '15px' }}>
//                     <p style={{ margin: '0 0 5px 0', color: '#666' }}>Industry</p>
//                     {industries.length > 0 ? (
//                         <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
//                             {industries.map((ind, index) => (
//                                 <span key={index} style={{ 
//                                     padding: '5px 10px', 
//                                     backgroundColor: '#f3e5f5', 
//                                     borderRadius: '4px', 
//                                     display: 'inline-block'
//                                 }}>
//                                     {ind.industry}
//                                 </span>
//                             ))}
//                         </div>
//                     ) : (
//                         <p style={{ margin: 0, fontStyle: 'italic' }}>Not provided</p>
//                     )}
//                 </div>
//             </div>

//             {/* Hobbies Section */}
//             <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
//                 <h3 style={{ marginBottom: '15px' }}>Hobbies</h3>
//                 {hobbies.length > 0 ? (
//                     <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
//                         {hobbies.map((hobby, index) => (
//                             <span key={index} style={{ 
//                                 padding: '5px 10px', 
//                                 backgroundColor: '#f0f0f0', 
//                                 borderRadius: '4px', 
//                                 display: 'inline-block'
//                             }}>
//                                 {hobby.name}
//                             </span>
//                         ))}
//                     </div>
//                 ) : (
//                     <p style={{ margin: 0, fontStyle: 'italic' }}>No hobbies available.</p>
//                 )}
//             </div>

//             {/* Projects Section */}
//             <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
//                 <h3 style={{ marginBottom: '15px' }}>Projects</h3>
//                 {projects.length > 0 ? (
//                     <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
//                         {projects.map((project, index) => (
//                             <span key={index} style={{ 
//                                 padding: '5px 10px', 
//                                 backgroundColor: '#e1f5fe', 
//                                 borderRadius: '4px', 
//                                 display: 'inline-block'
//                             }}>
//                                 {project.name}
//                             </span>
//                         ))}
//                     </div>
//                 ) : (
//                     <p style={{ margin: 0, fontStyle: 'italic' }}>No projects available.</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default MyAccount;


import React, { useEffect, useState } from "react";

const MyAccount = () => {
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
                const response = await fetch(`/api/user/${userId}/`);
                
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
        return <p>Loading user information...</p>;
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

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '20px auto', padding: '20px', backgroundColor: '#EEF2FF', borderRadius: '8px' }}>
            <h2 style={{ textAlign: 'left', marginBottom: '20px' }}>My Profile</h2>

            {/* Profile Section */}
            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
                <h3 style={{ margin: 0 }}>{userData.first_name} {userData.last_name}</h3>
                <p style={{ margin: 0, color: '#666' }}>{userData.country || 'No country'}</p>
                <p style={{ margin: 0, color: '#666' }}>User ID: {userData.id}</p>
            </div>

            {/* Personal Information Section */}
            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
                <h3 style={{ marginBottom: '15px' }}>Personal Information</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                    <div>
                        <p style={{ margin: 0, color: '#666' }}>First Name</p>
                        <p style={{ margin: 0, fontWeight: 'bold' }}>{userData.first_name}</p>
                    </div>
                    <div>
                        <p style={{ margin: 0, color: '#666' }}>Last Name</p>
                        <p style={{ margin: 0, fontWeight: 'bold' }}>{userData.last_name}</p>
                    </div>
                    <div>
                        <p style={{ margin: 0, color: '#666' }}>Email Address</p>
                        <p style={{ margin: 0, fontWeight: 'bold' }}>{userData.email}</p>
                    </div>
                    <div>
                        <p style={{ margin: 0, color: '#666' }}>Birthday</p>
                        <p style={{ margin: 0, fontWeight: 'bold' }}>{userData.birthday || 'Not provided'}</p>
                    </div>
                    <div>
                        <p style={{ margin: 0, color: '#666' }}>Gender</p>
                        <p style={{ margin: 0, fontWeight: 'bold' }}>{userData.gender || 'Not provided'}</p>
                    </div>
                    <div>
                        <p style={{ margin: 0, color: '#666' }}>Marital Status</p>
                        <p style={{ margin: 0, fontWeight: 'bold' }}>{userData.marital_status || 'Not provided'}</p>
                    </div>
                </div>
            </div>

            {/* Address Section */}
            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
                <h3 style={{ marginBottom: '15px' }}>Address</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                    <div>
                        <p style={{ margin: 0, color: '#666' }}>Country</p>
                        <p style={{ margin: 0, fontWeight: 'bold' }}>{userData.country || 'No country'}</p>
                    </div>
                    <div>
                        <p style={{ margin: 0, color: '#666' }}>Postal Code</p>
                        <p style={{ margin: 0, fontWeight: 'bold' }}>{userData.zip_code || 'xxxxxxx'}</p>
                    </div>
                </div>
            </div>

            {/* Professional Information Section */}
            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
                <h3 style={{ marginBottom: '15px' }}>Professional Information</h3>
                
                <div style={{ marginBottom: '15px' }}>
                    <p style={{ margin: '0 0 5px 0', color: '#666' }}>Employment Status</p>
                    {employmentStatuses.length > 0 ? (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                            {employmentStatuses.map((status, index) => (
                                <span key={index} style={{ 
                                    padding: '5px 10px', 
                                    backgroundColor: '#e3f2fd', 
                                    borderRadius: '4px', 
                                    display: 'inline-block'
                                }}>
                                    {status.employmentStatuses}
                                </span>
                            ))}
                        </div>
                    ) : (
                        <p style={{ margin: 0, fontStyle: 'italic' }}>Not provided</p>
                    )}
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <p style={{ margin: '0 0 5px 0', color: '#666' }}>Profession</p>
                    {professions.length > 0 ? (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                            {professions.map((prof, index) => (
                                <span key={index} style={{ 
                                    padding: '5px 10px', 
                                    backgroundColor: '#e8f5e8', 
                                    borderRadius: '4px', 
                                    display: 'inline-block'
                                }}>
                                    {prof.profession}
                                </span>
                            ))}
                        </div>
                    ) : (
                        <p style={{ margin: 0, fontStyle: 'italic' }}>Not provided</p>
                    )}
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <p style={{ margin: '0 0 5px 0', color: '#666' }}>Position</p>
                    {positions.length > 0 ? (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                            {positions.map((pos, index) => (
                                <span key={index} style={{ 
                                    padding: '5px 10px', 
                                    backgroundColor: '#fff3e0', 
                                    borderRadius: '4px', 
                                    display: 'inline-block'
                                }}>
                                    {pos.position}
                                </span>
                            ))}
                        </div>
                    ) : (
                        <p style={{ margin: 0, fontStyle: 'italic' }}>Not provided</p>
                    )}
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <p style={{ margin: '0 0 5px 0', color: '#666' }}>Industry</p>
                    {industries.length > 0 ? (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                            {industries.map((ind, index) => (
                                <span key={index} style={{ 
                                    padding: '5px 10px', 
                                    backgroundColor: '#f3e5f5', 
                                    borderRadius: '4px', 
                                    display: 'inline-block'
                                }}>
                                    {ind.industry}
                                </span>
                            ))}
                        </div>
                    ) : (
                        <p style={{ margin: 0, fontStyle: 'italic' }}>Not provided</p>
                    )}
                </div>
            </div>

            {/* Hobbies Section */}
            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
                <h3 style={{ marginBottom: '15px' }}>Hobbies</h3>
                {hobbies.length > 0 ? (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                        {hobbies.map((hobby, index) => (
                            <span key={index} style={{ 
                                padding: '5px 10px', 
                                backgroundColor: '#f0f0f0', 
                                borderRadius: '4px', 
                                display: 'inline-block'
                            }}>
                                {hobby.name}
                            </span>
                        ))}
                    </div>
                ) : (
                    <p style={{ margin: 0, fontStyle: 'italic' }}>No hobbies available.</p>
                )}
            </div>

            {/* Projects Section */}
            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
                <h3 style={{ marginBottom: '15px' }}>Projects</h3>
                {projects.length > 0 ? (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                        {projects.map((project, index) => (
                            <span key={index} style={{ 
                                padding: '5px 10px', 
                                backgroundColor: '#e1f5fe', 
                                borderRadius: '4px', 
                                display: 'inline-block'
                            }}>
                                {project.name}
                            </span>
                        ))}
                    </div>
                ) : (
                    <p style={{ margin: 0, fontStyle: 'italic' }}>No projects available.</p>
                )}
            </div>
        </div>
    );
};

export default MyAccount;