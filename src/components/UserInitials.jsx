import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const UserInitials = () => {
  const [initials, setInitials] = useState("");
  const user = auth.currentUser;

  useEffect(() => {
    const fetchUserName = async () => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            const userName = userDoc.data().displayName || "User";
            const userInitials = userName
              .split(" ")
              .map((word) => word[0])
              .join("")
              .slice(0, 2)
              .toUpperCase();
            setInitials(userInitials);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserName();
  }, [user]);

  return (
    <div className="flex items-end justify-end mr-3">
      {user ? (
        <Link
          to="/profile"
          className="bg-lime-400 text-white mt-3 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold hover:bg-lime-500 transition"
          title="Go to Profile"
        >
          {initials || "U"}
        </Link>
      ) : (
        <Link
          to="/signin"
          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
        >
          Sign In
        </Link>
      )}
    </div>
  );
};

export default UserInitials;
