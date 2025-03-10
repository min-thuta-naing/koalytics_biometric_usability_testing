import React, { useEffect, useState } from "react";

const MyAccount = () => {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState("");
    const [selectedImage, setSelectedImage] = useState("");
    const [hover, setHover] = useState(false);

    const profileImages = [
        "/static/images/user1.png",
        "/static/images/user2.png",
        "/static/images/user3.png",
        "/static/images/user4.png",
        "/static/images/user5.png",
        "/static/images/user5.png"
    ];

    useEffect(() => {
        try {
            const storedUser = localStorage.getItem("user");
            if (!storedUser) throw new Error("User not found. Please log in.");

            const user = JSON.parse(storedUser);
            if (!user?.id) throw new Error("User ID missing. Please log in.");

            setUserData(user);
            const savedProfilePic = localStorage.getItem("profilePic");
            if (savedProfilePic) {
                setSelectedImage(savedProfilePic);
            }
        } catch (error) {
            console.error("Error loading user data:", error);
            setError(error.message);
        }
    }, []);


    const handleProfileImageSelect = (image) => {
        setSelectedImage(image);
    };
 
 
    const handleConfirmProfileImage = () => {
        localStorage.setItem("profilePic", selectedImage);
        alert("Profile picture updated!");
    };
   
    const handleProfilePictureChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                localStorage.setItem("profilePicture", reader.result); // Save image URL
            };
            reader.readAsDataURL(file);
        }
    };

    
    if (error) {
        return <p className="text-red-500">Error: {error}</p>;
    }

    if (!userData) {
        return <p>Loading user information...</p>;
    }

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '20px auto', padding: '20px', backgroundColor: '#EEF2FF', borderRadius: '8px' }}>
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

            {/* Profile Picture Selection */}
           <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "8px", marginBottom: "20px" }}>
               <h3>Select Profile Picture</h3>
               <div style={{ display: "flex", gap: "10px" }}>
                   {profileImages.map((img, index) => (
                       <img
                           key={index}
                           src={img}
                           alt={`Profile ${index + 1}`}
                           onClick={() => handleProfileImageSelect(img)}
                           style={{
                               width: "60px",
                               height: "60px",
                               borderRadius: "50%",
                               cursor: "pointer",
                               border: selectedImage === img ? "3px solid blue" : "3px solid transparent"
                           }}
                       />
                   ))}
               </div>
                    <button
                    onClick={handleConfirmProfileImage}
                    className="mt-2 px-4 py-2 bg-[#C4BDED] text-white border-none rounded-md cursor-pointer hover:bg-[#ACA3E3]"
                    >
                    Confirm Selection
                    </button>
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
