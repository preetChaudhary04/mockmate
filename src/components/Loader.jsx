import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-[#050816] flex items-center justify-center z-[9999] overflow-hidden">

      {/* Background Glow */}
      <div className="absolute w-72 h-72 bg-pink-500/20 blur-3xl rounded-full animate-pulse"></div>

      <div className="absolute w-72 h-72 bg-cyan-500/20 blur-3xl rounded-full animate-pulse delay-300"></div>

      {/* Loader Content */}
      <div className="relative flex flex-col items-center">

        {/* Rotating Rings */}
        <div className="relative w-32 h-32 flex items-center justify-center">

          <div className="absolute w-32 h-32 border-4 border-pink-500/20 rounded-full"></div>

          <div className="absolute w-32 h-32 border-t-4 border-pink-500 rounded-full animate-spin"></div>

          <div className="absolute w-24 h-24 border-4 border-cyan-500/20 rounded-full"></div>

          <div className="absolute w-24 h-24 border-b-4 border-cyan-400 rounded-full animate-spin reverse-spin"></div>

          {/* Center Logo */}
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-pink-500/30">
            <span className="text-2xl font-black text-white">
              M
            </span>
          </div>
        </div>

        {/* Text */}
        <h1 className="mt-8 text-3xl font-bold bg-gradient-to-r from-pink-500 to-cyan-400 bg-clip-text text-transparent">
          MockMate
        </h1>

        <p className="mt-3 text-gray-400 tracking-widest text-sm uppercase">
          Generating AI Interview Report...
        </p>

        {/* Dots */}
        <div className="flex gap-2 mt-6">
          <span className="w-3 h-3 rounded-full bg-pink-500 animate-bounce"></span>

          <span className="w-3 h-3 rounded-full bg-cyan-400 animate-bounce delay-150"></span>

          <span className="w-3 h-3 rounded-full bg-pink-500 animate-bounce delay-300"></span>
        </div>
      </div>
    </div>
  );
};

export default Loader;