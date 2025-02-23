import React, { useEffect, useState } from "react";

const MyAccount = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // const userId = localStorage.getItem("user_id");
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
    <div>
      <h1>Hello, {userData.first_name}!</h1>
      <p>First Name: {userData.first_name}</p>
      <p>Last Name: {userData.last_name}</p>
      <p>Email: {userData.email}</p>
      <p>Birthday: {userData.birthday}</p>
      <p>Gender: {userData.gender}</p>
      <p>Marital Status: {userData.marital_status}</p>
      <p>Country: {userData.country}</p>
      <p>Zip Code: {userData.zip_code}</p>
    </div>
  );
};

export default MyAccount;
