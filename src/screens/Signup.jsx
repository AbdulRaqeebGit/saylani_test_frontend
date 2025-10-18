import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input.jsx";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Please fill all fields!");
      return;
    }

    alert("Signup Successful!");
    navigate("/login");
  };

  return (
    <div className="bg-gradient-to-br from-blue-100 to-blue-200 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-96">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
          Signup
        </h1>

        <form onSubmit={handleSignup} className="space-y-4 flex flex-col items-center">
          <Input
            type="text"
            placeholder="Enter your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            type="email"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            type="password"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 w-80 rounded-lg hover:bg-blue-600 transition"
          >
            Signup
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-500 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
