import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields!");
      return;
    }

    alert("Login Successful!");
    navigate("/");
  };

  return (
    <div className="bg-gradient-to-br from-blue-100 to-blue-200 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-96">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
          Login
        </h1>

        <form onSubmit={handleLogin} className="space-y-4 flex flex-col items-center">
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
            Login
          </button>
        </form>

        <div className="text-center mt-4 text-sm text-gray-600">
          <p>
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-blue-500 cursor-pointer hover:underline"
            >
              Signup
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
