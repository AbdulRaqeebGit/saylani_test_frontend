import React, { useState, useEffect } from "react"; // 👈 useEffect aur useState add karen
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./screens/Signup";
import Login from "./screens/Login";
import Dashboard from "./screens/Dashboard";

function App() {
  const [loading, setLoading] = useState(true);
  const isAuthenticated = !!localStorage.getItem("token");

  useEffect(() => {
    // Ye delay ya check sirf pehli baar load hone par chalta hai
    // LocalStorage tezi se access hota hai, isliye hum isko foran false kar sakte hain
    // Real-world scenarios mein, yeh kisi async data fetching ke liye use hota hai
    setLoading(false);
  }, []);

  // Agar loading ho rahi hai, to kuch na dikhayein (ya Loading message dikhayein)
  if (loading) {
    // Aap yahan ek loading spinner ya message dikha sakte hain
    return (
        <div className="min-h-screen flex items-center justify-center text-indigo-600 font-bold">
            Loading...
        </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/saylani_test_frontend/"
          element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />}
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;