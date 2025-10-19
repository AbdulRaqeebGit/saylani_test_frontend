import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  // Get username from local storage
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    // Clear all stored data
    localStorage.clear();
    // Redirect to login page
    navigate("/login");
  };

  return (
    <nav className="bg-indigo-600 text-white px-4 py-3 flex justify-between items-center">
      <h1 className="font-bold text-lg">HealthMate</h1>
      <div className="flex items-center gap-4">
        {/* Display the logged-in user's name */}
        <span>Welcome, {username}</span>
        <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;