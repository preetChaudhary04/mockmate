import React, { useState } from "react";
import Loader from "../../../components/Loader";
import { useInterview } from "../context/useInterview";
import { useAuth } from "../../auth/context/useAuth";
import {
  Code2, MessageSquare, Map,
  ChevronDown, ChevronUp,
  Menu, X, Clock, LogOut,
} from "lucide-react";

const formatDate = (iso) => {
  const date = new Date(iso);
  const now = new Date();
  const diffMins = Math.floor((now - date) / 60000);
  const diffHrs = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHrs / 24);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? "s" : ""} ago`;
  if (diffHrs < 24) return `${diffHrs} hour${diffHrs > 1 ? "s" : ""} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;

  return date.toLocaleString("en-IN", {
    day: "numeric", month: "short", year: "numeric",
    hour: "numeric", minute: "2-digit", hour12: true,
  });
};

const severityClass = (severity) => {
  if (severity === "high") return "bg-red-500/10 border-red-500/20 text-red-300";
  if (severity === "medium") return "bg-yellow-500/10 border-yellow-500/20 text-yellow-300";
  return "bg-green-500/10 border-green-500/20 text-green-300";
};

const Interview = () => {
  const [activeSection, setActiveSection] = useState("technical");
  const [openQuestion, setOpenQuestion] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { report, loader, reportList } = useInterview();
  const { handleLogout } = useAuth();

  const toggleQuestion = (id) =>
    setOpenQuestion((prev) => (prev === id ? null : id));

  if (loader || !report) return <Loader />;

  return (
    <div className="h-screen bg-[#050816] text-white overflow-hidden flex flex-col">

      {/* Background Glow */}
      <div className="fixed w-96 h-96 bg-pink-500/10 blur-3xl rounded-full top-0 left-0 pointer-events-none" />
      <div className="fixed w-96 h-96 bg-cyan-500/10 blur-3xl rounded-full bottom-0 right-0 pointer-events-none" />

      {/* Mobile Topbar */}
      <div className="lg:hidden flex items-center justify-between px-4 py-4 border-b border-white/10 bg-[#050816]/90 backdrop-blur-xl sticky top-0 z-50">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 rounded-xl bg-white/5 border border-white/10"
        >
          <Menu size={22} />
        </button>

        <h1 className="text-xl font-bold">MockMate</h1>

        <button
          onClick={handleLogout}
          className="p-2 rounded-xl bg-white/5 border border-white/10 hover:border-red-500/40 hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-all duration-200 cursor-pointer"
        >
          <LogOut size={18} />
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden relative">

        {/* LEFT SIDEBAR (Fixed positioning bug here!) */}
        <aside className={`
          fixed lg:sticky lg:top-0 z-50 top-0 left-0 h-screen
          w-72 bg-[#0B1023]/95 backdrop-blur-xl border-r border-white/10
          transition-transform duration-300 flex-shrink-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}>
          <div className="p-6 h-full flex flex-col">

            {/* Mobile Close */}
            <div className="flex items-center justify-between mb-10 lg:hidden">
              <h2 className="text-2xl font-bold">Sections</h2>
              <button onClick={() => setSidebarOpen(false)} className="p-2 rounded-xl bg-white/5">
                <X size={22} />
              </button>
            </div>

            {/* Desktop Logo */}
            <div className="hidden lg:block mb-14">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-cyan-400 bg-clip-text text-transparent">
                MockMate
              </h1>
              <p className="text-gray-500 mt-2 text-sm">AI Interview Assistant</p>
            </div>

            {/* Navigation */}
            <div className="space-y-3 flex-1">
              {[
                { id: "technical", icon: <Code2 size={20} />, label: "Technical Questions" },
                { id: "behavioral", icon: <MessageSquare size={20} />, label: "Behavioral Questions" },
                { id: "roadmap", icon: <Map size={20} />, label: "Road Map" },
              ].map(({ id, icon, label }) => (
                <button
                  key={id}
                  onClick={() => { setActiveSection(id); setSidebarOpen(false); }}
                  className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl transition-all duration-300
                    ${activeSection === id
                      ? "bg-gradient-to-r from-pink-500/20 to-pink-500/10 border border-pink-500/30 text-pink-400"
                      : "hover:bg-white/5 text-gray-400"
                    }`}
                >
                  {icon}
                  {label}
                </button>
              ))}
            </div>

            {/* Logout — pinned to sidebar bottom, desktop only */}
            <div className="hidden lg:block mt-auto pb-4">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-5 py-4 rounded-2xl bg-white/5 border border-white/10 hover:border-red-500/40 hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-all duration-300 cursor-pointer"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        </aside>

        {/* Sidebar Overlay (mobile) */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* CENTER CONTENT */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-8 lg:px-10 py-6 lg:py-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">

          {/* Mobile/Tablet Stats Card */}
          <div className="xl:hidden mb-8 bg-[#0B1023] border border-white/10 rounded-2xl p-6 shadow-lg">

            {/* Match Score */}
            <div className="flex flex-col items-center mb-6">
              <p className="text-gray-500 tracking-[3px] text-xs uppercase mb-3">Match Score</p>
              <div className="w-24 h-24 rounded-full border-[5px] border-green-500 flex flex-col items-center justify-center">
                <h2 className="text-3xl font-bold">{report.matchScore}</h2>
                <span className="text-gray-400 text-xs">%</span>
              </div>
              <p className="text-green-400 mt-3 text-sm font-medium text-center">Strong match for this role</p>
            </div>

            <div className="w-full h-px bg-white/10 mb-6" />

            {/* Skill Gaps */}
            <div className="w-full">
              <p className="text-gray-500 tracking-[3px] text-xs uppercase mb-3">Skill Gaps</p>
              <div className="flex flex-wrap gap-2">
                {report.skillGaps.map((gap, i) => (
                  <span
                    key={i}
                    className={`px-3 py-2 rounded-xl border text-xs sm:text-sm max-w-full break-words leading-snug inline-block ${severityClass(gap.severity)}`}
                  >
                    {gap.skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Technical Questions */}
          {activeSection === "technical" && (
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold">Technical Questions</h1>
                <span className="px-4 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs sm:text-sm w-fit">
                  {report.technicalQuestions.length} questions
                </span>
              </div>

              <div className="space-y-4 sm:space-y-5">
                {report.technicalQuestions.map((question, index) => (
                  <div key={index} className="bg-[#0B1023] border border-white/10 rounded-2xl overflow-hidden">
                    <button
                      onClick={() => toggleQuestion(index)}
                      className="w-full flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 text-left hover:bg-white/5 transition"
                    >
                      <div className="flex items-start gap-3 sm:gap-4 pr-4">
                        <div className="px-2 sm:px-3 py-1 rounded-lg bg-pink-500/20 text-pink-400 text-xs sm:text-sm font-bold shrink-0">
                          Q{index + 1}
                        </div>
                        <h2 className="text-base sm:text-lg font-medium leading-snug">{question.question}</h2>
                      </div>
                      {openQuestion === index
                        ? <ChevronUp className="text-pink-400 flex-shrink-0" size={20} />
                        : <ChevronDown className="text-gray-400 flex-shrink-0" size={20} />
                      }
                    </button>

                    {openQuestion === index && (
                      <div className="px-4 sm:px-6 pb-5 sm:pb-6 border-t border-white/10">
                        <div className="mt-4 sm:mt-5">
                          <span className="inline-block px-3 py-1 rounded-lg bg-purple-500/20 text-purple-300 text-[10px] sm:text-xs font-semibold mb-2 sm:mb-3">
                            INTENTION
                          </span>
                          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{question.intention}</p>
                        </div>
                        <div className="mt-5 sm:mt-6">
                          <span className="inline-block px-3 py-1 rounded-lg bg-green-500/20 text-green-300 text-[10px] sm:text-xs font-semibold mb-2 sm:mb-3">
                            MODEL ANSWER
                          </span>
                          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{question.answer}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Behavioral Questions */}
          {activeSection === "behavioral" && (
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold">Behavioral Questions</h1>
                <span className="px-4 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs sm:text-sm w-fit">
                  {report.behavioralQuestions.length} questions
                </span>
              </div>

              <div className="space-y-4 sm:space-y-5">
                {report.behavioralQuestions.map((question, index) => (
                  <div key={index} className="bg-[#0B1023] border border-white/10 rounded-2xl overflow-hidden">
                    <button
                      onClick={() => toggleQuestion(`behavioral-${index}`)}
                      className="w-full flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 text-left hover:bg-white/5 transition"
                    >
                      <div className="flex items-start gap-3 sm:gap-4 pr-4">
                        <div className="px-2 sm:px-3 py-1 rounded-lg bg-pink-500/20 text-pink-400 text-xs sm:text-sm font-bold shrink-0">
                          Q{index + 1}
                        </div>
                        <h2 className="text-base sm:text-lg font-medium leading-snug">{question.question}</h2>
                      </div>
                      {openQuestion === `behavioral-${index}`
                        ? <ChevronUp className="text-pink-400 flex-shrink-0" size={20} />
                        : <ChevronDown className="text-gray-400 flex-shrink-0" size={20} />
                      }
                    </button>

                    {openQuestion === `behavioral-${index}` && (
                      <div className="px-4 sm:px-6 pb-5 sm:pb-6 border-t border-white/10">
                        <div className="mt-4 sm:mt-5">
                          <span className="inline-block px-3 py-1 rounded-lg bg-purple-500/20 text-purple-300 text-[10px] sm:text-xs font-semibold mb-2 sm:mb-3">
                            INTENTION
                          </span>
                          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{question.intention}</p>
                        </div>
                        <div className="mt-5 sm:mt-6">
                          <span className="inline-block px-3 py-1 rounded-lg bg-green-500/20 text-green-300 text-[10px] sm:text-xs font-semibold mb-2 sm:mb-3">
                            MODEL ANSWER
                          </span>
                          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{question.answer}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Roadmap */}
          {activeSection === "roadmap" && (
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold">Preparation Road Map</h1>
                <span className="px-4 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs sm:text-sm w-fit">
                  {report.preparationPlan.length} Days Plan
                </span>
              </div>

              <div className="relative border-l border-pink-500/40 ml-2 sm:ml-4 space-y-8 sm:space-y-10">
                {report.preparationPlan.map((plan, index) => (
                  <div key={index} className="relative pl-6 sm:pl-10">
                    <div className="absolute -left-[9px] sm:-left-[11px] top-2 w-4 h-4 sm:w-5 sm:h-5 rounded-full border-[3px] sm:border-4 border-pink-500 bg-[#050816]" />
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                      <span className="px-3 py-1 rounded-lg bg-pink-500/20 text-pink-400 text-xs sm:text-sm font-bold w-fit">
                        Day {plan.day}
                      </span>
                      <h2 className="text-lg sm:text-2xl font-semibold leading-snug">{plan.focus}</h2>
                    </div>
                    <ul className="space-y-2 sm:space-y-3">
                      {plan.tasks.map((task, taskIndex) => (
                        <li key={taskIndex} className="text-gray-300 text-sm sm:text-base flex gap-2 sm:gap-3">
                          <span className="text-pink-400 mt-0.5 sm:mt-0">•</span>
                          <span className="flex-1">{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Previous Reports Footer */}
          {reportList && reportList.length > 0 && (
            <div className="mt-12 sm:mt-16 border-t border-white/10 pt-6 sm:pt-8 pb-4">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
                <Clock size={14} className="text-gray-500" />
                <span className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-widest">Previous Reports</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {reportList.map((item, index) => (
                  <a
                    key={item._id || index}
                    href={`/interview/${item._id}`}
                    className="flex flex-col gap-1 px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-pink-500/40 hover:bg-pink-500/5 transition-all duration-200"
                  >
                    <span className="text-sm font-medium text-white truncate">
                      {item.title || "Interview Report"}
                    </span>
                    <span className="text-xs text-gray-500">{formatDate(item.createdAt)}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </main>

        {/* RIGHT SIDEBAR */}
        <aside className="hidden xl:flex xl:flex-col w-80 flex-shrink-0 border-l border-white/10 bg-[#0B1023]/60 backdrop-blur-xl p-8 h-screen sticky top-0 overflow-hidden">

          {/* Match Score */}
          <div className="flex flex-col items-center flex-shrink-0">
            <p className="text-gray-500 tracking-[3px] text-sm uppercase">Match Score</p>
            <div className="mt-6 w-36 h-36 rounded-full border-[6px] border-green-500 flex flex-col items-center justify-center">
              <h2 className="text-5xl font-bold">{report.matchScore}</h2>
              <span className="text-gray-400 text-sm">%</span>
            </div>
            <p className="text-green-400 mt-5 font-medium text-center">Strong match for this role</p>
          </div>

          {/* Skill Gaps */}
          <div className="mt-14 flex flex-col flex-1 min-h-0">
            <h2 className="text-gray-400 tracking-[3px] uppercase text-sm mb-6 flex-shrink-0">Skill Gaps</h2>
            <div className="space-y-3 overflow-y-auto pr-2 flex-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {report.skillGaps.map((gap, index) => (
                <div key={index} className={`px-4 py-3.5 rounded-2xl border text-sm ${severityClass(gap.severity)}`}>
                  {gap.skill}
                </div>
              ))}
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
};

export default Interview;