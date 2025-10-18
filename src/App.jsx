import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";

import Signup from "./screens/Signup.jsx";
import Login from "./screens/Login.jsx";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;