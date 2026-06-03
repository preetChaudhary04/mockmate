import React, { useRef, useState } from "react";
import { useInterview } from "../context/useInterview";
import { useNavigate } from "react-router";
import { LogOut } from "lucide-react";
import { useAuth } from "../../auth/context/useAuth";
import Loader from "../../../components/Loader";

const CreateInterview = () => {
  const resumeRef = useRef();
  const [selfDescription, setSelfDescription] = useState("")
  const [jobDescription, setJobDescription] = useState("")

  const { loader, report, handleGenerateReport } = useInterview();
  const navigate = useNavigate();
  const { handleLogout } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resume = resumeRef.current.files[0];
    const data = await handleGenerateReport({ resume, selfDescription, jobDescription })
    navigate(`/interview/${data._id}`)
  };

  if (loader) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-10">

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="
          absolute top-6 right-6 z-50
          flex items-center gap-2
          px-5 py-3 rounded-2xl
          bg-white/5 backdrop-blur-xl
          border border-white/10
          hover:border-red-500/40
          hover:bg-red-500/10
          text-gray-300 hover:text-red-400
          transition-all duration-300
          shadow-lg hover:shadow-red-500/20 cursor-pointer
        "
      >
        <LogOut size={18} />
        Logout
      </button>

      {/* Background Glow */}
      <div className="absolute w-72 h-72 bg-cyan-500/20 blur-3xl rounded-full top-10 left-10"></div>
      <div className="absolute w-72 h-72 bg-purple-500/20 blur-3xl rounded-full bottom-10 right-10"></div>

      <div className="relative w-full max-w-3xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl">
        {/* Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Create Interview Plan
          </h1>

          <p className="text-gray-400 mt-3 text-sm md:text-base">
            Upload your resume and let MockMate generate a
            personalized AI interview experience for you.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Resume Upload */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Resume (PDF only)
            </label>

            <input
              ref={resumeRef}
              type="file"
              accept=".pdf"
              name="resume"
              className="w-full text-sm text-gray-300
              file:mr-4 file:py-3 file:px-5
              file:rounded-xl file:border-0
              file:text-sm file:font-semibold
              file:bg-cyan-500 file:text-black
              hover:file:bg-cyan-400
              cursor-pointer
              bg-white/5 border border-white/10 rounded-xl
              p-2"
              required
            />
          </div>

          {/* Self Description */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Self Description
            </label>

            <textarea
              value={selfDescription}
              onChange={(e) => setSelfDescription(e.target.value)}
              name="selfDescription"
              rows="5"
              placeholder="Tell us about yourself, your skills, experience, strengths, and goals..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition resize-none"
              required
            />
          </div>

          {/* Job Description */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Job Description
            </label>

            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              name="jobDescription"
              rows="6"
              placeholder="Paste the job description of the role you want to target..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400 transition resize-none"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-500 text-black font-bold text-lg hover:opacity-90 transition duration-300 shadow-lg shadow-cyan-500/20 cursor-pointer"
          >
            Generate Interview Report
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateInterview;