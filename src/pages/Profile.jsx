import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase"; // Import Firebase auth and Firestore
import { FaUserCircle } from "react-icons/fa"; // Default user icon
import { doc, getDoc } from "firebase/firestore"; // Firestore methods

const Profile = () => {
  const [userName, setUserName] = useState(""); // Store the user's name
  const user = auth.currentUser;

  // Fetch user details on component mount
  useEffect(() => {
    const fetchUserName = async () => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUserName(userData.displayName || ""); // Get name from Firestore
          } else {
            setUserName(user.displayName || ""); // Fallback to Firebase Auth
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserName();
  }, [user]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Profile</h1>
      {user ? (
        <div className="text-center">
          {/* Profile Picture or Default Icon */}
          <div className="relative mb-4">
            <FaUserCircle className="text-gray-400 w-32 h-32 mx-auto" />
          </div>

          {/* Display Name and Email */}
          <p className="text-xl font-semibold">{userName || "User Name"}</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p className="text-center text-red-500">
          Please log in to view your profile.
        </p>
      )}
    </div>
  );
};

export default Profile;
