import React, { useEffect, useState } from "react";

const MyAccount = () => {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const storedUser = localStorage.getItem("user");
                const userId = storedUser ? JSON.parse(storedUser).id : null;

                if (!userId) throw new Error("User ID not found. Please log in.");

                console.log("Fetching user with ID:", userId);

                const response = await fetch(`/api/user/${userId}/`);
                const data = await response.json();

                if (!response.ok) throw new Error(data.error || "Failed to fetch user.");

                setUserData(data);
            } catch (error) {
                console.error("Error loading user data:", error);
                setError(error.message);
            }
        };

        fetchUserData();
    }, []);

    if (error) {
        return <p className="text-red-500">Error: {error}</p>;
    }

    if (!userData) {
        return <p>Loading user information...</p>;
    }

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '20px auto', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
            <h2 style={{ textAlign: 'left', marginBottom: '20px' }}>My Profile</h2>

            {/* Profile Section (with Edit) */}
            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', marginBottom: '20px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h3 style={{ margin: 0 }}>{userData.first_name} {userData.last_name}</h3>
                        <p style={{ margin: 0, color: '#666' }}>{userData.country || 'USA'}</p>
                    </div>
                    <button style={{ background: 'none', border: 'none', color: '#007bff', cursor: 'pointer' }}>Edit</button>
                </div>
            </div>

            {/* Personal Information Section (with Edit) */}
            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                    <h3 style={{ margin: 0 }}>Personal Information</h3>
                    <button style={{ background: 'none', border: 'none', color: '#007bff', cursor: 'pointer' }}>Edit</button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <div>
                        <p style={{ margin: 0, color: '#666' }}>First Name</p>
                        <p style={{ margin: 0 }}>{userData.first_name}</p>
                    </div>
                    <div>
                        <p style={{ margin: 0, color: '#666' }}>Last Name</p>
                        <p style={{ margin: 0 }}>{userData.last_name}</p>
                    </div>
                    <div>
                        <p style={{ margin: 0, color: '#666' }}>Email Address</p>
                        <p style={{ margin: 0 }}>{userData.email}</p>
                    </div>
                    <div>
                        <p style={{ margin: 0, color: '#666' }}>Birthday</p>
                        <p style={{ margin: 0 }}>{userData.birthday || 'Not provided'}</p>
                    </div>
                    <div>
                        <p style={{ margin: 0, color: '#666' }}>Gender</p>
                        <p style={{ margin: 0 }}>{userData.gender || 'Not provided'}</p>
                    </div>
                    <div>
                        <p style={{ margin: 0, color: '#666' }}>Marital Status</p>
                        <p style={{ margin: 0 }}>{userData.marital_status || 'Not provided'}</p>
                    </div>
                </div>
            </div>

            {/* Address Section (with Edit) */}
            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                    <h3 style={{ margin: 0 }}>Address</h3>
                    <button style={{ background: 'none', border: 'none', color: '#007bff', cursor: 'pointer' }}>Edit</button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <div>
                        <p style={{ margin: 0, color: '#666' }}>Country</p>
                        <p style={{ margin: 0 }}>{userData.country || 'United States of America'}</p>
                    </div>
                    <div>
                        <p style={{ margin: 0, color: '#666' }}>Postal Code</p>
                        <p style={{ margin: 0 }}>{userData.zip_code || 'ERT 62574'}</p>
                    </div>
                </div>
            </div>

            {/* Hobbies Section */}
            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', marginTop: '20px' }}>
                <h3>Hobbies:</h3>
                {userData.hobbies && userData.hobbies.length > 0 ? (
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        {userData.hobbies.map((hobby, index) => (
                            <li key={index} style={{ padding: '5px 10px', backgroundColor: '#f0f0f0', borderRadius: '4px', marginBottom: '5px', display: 'inline-block', marginRight: '5px' }}>
                                {hobby.name}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No hobbies available.</p>
                )}
            </div>
        </div>
    );
};

export default MyAccount;
