import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Loginpage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const loginpage = async () => {
    try {
      const res = await axios.post(
        "https://resto-practice.vercel.app/superAdmin/login",
        {
          email: email,
          password: password,
        }
      );

      console.log(res.data);
      localStorage.setItem("userid", res.data.id);
      toast.success("Successfully Logged In");
      navigate("/addvendor");
    } catch (error) {
      toast.error("This Email Is Not Registered.");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      loginpage();
    }
  };

  return (
    <div className="flex items-center justify-center mt-24 bg-white-100">
      <div className="bg-gray-50 p-8 rounded-lg shadow-lg max-w-xl w-full">
        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-9">
          Panel Login Access
        </h1>

        {/* Email Input */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-4"
          >
            Email:
          </label>
          <input
            id="email"
            type="email"
            placeholder="abc@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Password Input */}
        <div className="mb-9 relative">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-4"
          >
            Password:
          </label>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown} // Trigger on Enter key
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-600 mt-8"
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>

        {/* Login Button */}
        <button
          onClick={loginpage}
          className="w-full py-2 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600 focus:outline-none focus:ring focus:ring-yellow-300"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Loginpage;
