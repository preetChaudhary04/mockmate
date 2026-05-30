import React from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../context/useAuth";
import { useState } from "react";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loader, handleLogin } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin({ email, password });
    navigate("/")
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 relative overflow-hidden">

      {/* Background Glow Effects */}
      <div className="absolute w-72 h-72 bg-purple-500 rounded-full blur-3xl opacity-20 top-10 left-10"></div>
      <div className="absolute w-72 h-72 bg-cyan-500 rounded-full blur-3xl opacity-20 bottom-10 right-10"></div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-8">

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white">
            Welcome Back
          </h1>
          <p className="text-gray-300 mt-2">
            Login to continue your journey with MockMate
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Email
            </label>

            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Password
            </label>

            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
            />
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end">
            <button
              type="button"
              className="text-sm text-cyan-400 hover:text-cyan-300 transition cursor-pointer"
            >
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold text-lg hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-cyan-500/30 cursor-pointer"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-white/20"></div>
          <span className="text-gray-400 text-sm">OR</span>
          <div className="flex-1 h-px bg-white/20"></div>
        </div>

        {/* Google Login */}
        <button
          className="w-full py-3 rounded-xl bg-white text-black font-medium hover:bg-gray-200 transition-all duration-300 cursor-pointer"
        >
          Continue with Google
        </button>

        {/* Signup */}
        <p className="text-center text-gray-300 mt-6">
          Don&apos;t have an account?{" "}
          <Link to={"/register"} className="text-cyan-400 cursor-pointer hover:text-cyan-300">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;