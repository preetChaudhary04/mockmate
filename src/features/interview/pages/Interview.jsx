import React, { useState } from "react";
import { useInterview } from "../context/useInterview";
import { Code2, MessageSquare, Map, ChevronDown, ChevronUp, Menu, X, Clock } from "lucide-react";

// Formats ISO date string into a friendly "2 days ago" / "3 Jun 2025, 4:38 PM" style
const formatDate = (iso) => {
  const date = new Date(iso);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
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

const Interview = () => {
  const [activeSection, setActiveSection] = useState("technical");
  const [openQuestion, setOpenQuestion] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { report, loader, reportList } = useInterview();

  const toggleQuestion = (id) => {
    if (openQuestion === id) {
      setOpenQuestion(null);
    } else {
      setOpenQuestion(id);
    }
  };

  if (loader || !report) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <h1 className="text-2xl font-semibold text-cyan-400">Loading your interview plan...</h1>
      </div>
    );
  }

  return (
    <div className="h-screen bg-[#050816] text-white overflow-hidden flex flex-col">
      {/* Background Glow */}
      <div className="fixed w-96 h-96 bg-pink-500/10 blur-3xl rounded-full top-0 left-0 pointer-events-none"></div>
      <div className="fixed w-96 h-96 bg-cyan-500/10 blur-3xl rounded-full bottom-0 right-0 pointer-events-none"></div>

      {/* Mobile Topbar */}
      <div className="lg:hidden flex items-center justify-between px-4 py-4 border-b border-white/10 bg-[#050816]/90 backdrop-blur-xl sticky top-0 z-50">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 rounded-xl bg-white/5 border border-white/10"
        >
          <Menu size={22} />
        </button>

        <h1 className="text-xl font-bold">
          MockMate
        </h1>

        <div className="w-10"></div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* LEFT SIDEBAR */}
        <aside
          className={`
          fixed lg:sticky lg:top-0 z-50 top-0 left-0 h-screen
          w-72 bg-[#0B1023]/95 backdrop-blur-xl
          border-r border-white/10
          transition-transform duration-300 flex-shrink-0
          ${sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
            }
        `}
        >
          <div className="p-6">
            {/* Mobile Close */}
            <div className="flex items-center justify-between mb-10 lg:hidden">
              <h2 className="text-2xl font-bold">
                Sections
              </h2>

              <button
                onClick={() =>
                  setSidebarOpen(false)
                }
                className="p-2 rounded-xl bg-white/5"
              >
                <X size={22} />
              </button>
            </div>

            {/* Desktop Logo */}
            <div className="hidden lg:block mb-14">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-cyan-400 bg-clip-text text-transparent">
                MockMate
              </h1>

              <p className="text-gray-500 mt-2 text-sm">
                AI Interview Assistant
              </p>
            </div>

            {/* Navigation */}
            <div className="space-y-3">
              <button
                onClick={() =>
                  setActiveSection(
                    "technical"
                  )
                }
                className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl transition-all duration-300 ${activeSection ===
                  "technical"
                  ? "bg-gradient-to-r from-pink-500/20 to-pink-500/10 border border-pink-500/30 text-pink-400"
                  : "hover:bg-white/5 text-gray-400"
                  }`}
              >
                <Code2 size={20} />
                Technical Questions
              </button>

              <button
                onClick={() =>
                  setActiveSection(
                    "behavioral"
                  )
                }
                className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl transition-all duration-300 ${activeSection ===
                  "behavioral"
                  ? "bg-gradient-to-r from-pink-500/20 to-pink-500/10 border border-pink-500/30 text-pink-400"
                  : "hover:bg-white/5 text-gray-400"
                  }`}
              >
                <MessageSquare size={20} />
                Behavioral Questions
              </button>

              <button
                onClick={() =>
                  setActiveSection("roadmap")
                }
                className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl transition-all duration-300 ${activeSection ===
                  "roadmap"
                  ? "bg-gradient-to-r from-pink-500/20 to-pink-500/10 border border-pink-500/30 text-pink-400"
                  : "hover:bg-white/5 text-gray-400"
                  }`}
              >
                <Map size={20} />
                Road Map
              </button>
            </div>
          </div>
        </aside>

        {/* CENTER CONTENT */}
        <main className="flex-1 overflow-y-auto px-4 md:px-10 py-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">

          {/* Mobile/Tablet Stats Card — hidden on xl (right sidebar takes over) */}
          <div className="xl:hidden mb-8 bg-[#0B1023] border border-white/10 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6">
            {/* Match Score */}
            <div className="flex flex-col items-center flex-shrink-0">
              <p className="text-gray-500 tracking-[3px] text-xs uppercase mb-3">Match Score</p>
              <div className="w-24 h-24 rounded-full border-[5px] border-green-500 flex flex-col items-center justify-center">
                <h2 className="text-3xl font-bold">{report.matchScore}</h2>
                <span className="text-gray-400 text-xs">%</span>
              </div>
              <p className="text-green-400 mt-3 text-sm font-medium text-center">Strong match for this role</p>
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px self-stretch bg-white/10"></div>
            <div className="block sm:hidden w-full h-px bg-white/10"></div>

            {/* Skill Gaps */}
            <div className="flex-1 w-full">
              <p className="text-gray-500 tracking-[3px] text-xs uppercase mb-3">Skill Gaps</p>
              <div className="flex flex-wrap gap-2">
                {report.skillGaps.map((gap, index) => (
                  <span
                    key={index}
                    className={`px-3 py-2 rounded-xl border text-sm
                      ${gap.severity === "high"
                        ? "bg-red-500/10 border-red-500/20 text-red-300"
                        : gap.severity === "medium"
                          ? "bg-yellow-500/10 border-yellow-500/20 text-yellow-300"
                          : "bg-green-500/10 border-green-500/20 text-green-300"
                      }`}
                  >
                    {gap.skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Technical Questions */}
          {activeSection ===
            "technical" && (
              <div>
                <div className="flex items-center gap-4 mb-10">
                  <h1 className="text-3xl font-bold">
                    Technical Questions
                  </h1>

                  <span className="px-4 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 text-sm">
                    {
                      report
                        .technicalQuestions
                        .length
                    }{" "}
                    questions
                  </span>
                </div>

                <div className="space-y-5">
                  {report.technicalQuestions.map(
                    (
                      question,
                      index
                    ) => (
                      <div
                        key={index}
                        className="bg-[#0B1023] border border-white/10 rounded-2xl overflow-hidden"
                      >
                        {/* Question Header */}
                        <button
                          onClick={() =>
                            toggleQuestion(
                              index
                            )
                          }
                          className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-white/5 transition"
                        >
                          <div className="flex items-start gap-4">
                            <div className="px-3 py-1 rounded-lg bg-pink-500/20 text-pink-400 text-sm font-bold">
                              Q {index + 1}
                            </div>

                            <h2 className="text-lg font-medium">
                              {
                                question.question
                              }
                            </h2>
                          </div>

                          {openQuestion ===
                            index ? (
                            <ChevronUp className="text-pink-400" />
                          ) : (
                            <ChevronDown className="text-gray-400" />
                          )}
                        </button>

                        {/* Dropdown Content */}
                        {openQuestion ===
                          index && (
                            <div className="px-6 pb-6 border-t border-white/10">
                              <div className="mt-5">
                                <span className="inline-block px-3 py-1 rounded-lg bg-purple-500/20 text-purple-300 text-xs font-semibold mb-3">
                                  INTENTION
                                </span>

                                <p className="text-gray-300 leading-relaxed">
                                  {
                                    question.intention
                                  }
                                </p>
                              </div>

                              <div className="mt-6">
                                <span className="inline-block px-3 py-1 rounded-lg bg-green-500/20 text-green-300 text-xs font-semibold mb-3">
                                  MODEL ANSWER
                                </span>

                                <p className="text-gray-300 leading-relaxed">
                                  {
                                    question.answer
                                  }
                                </p>
                              </div>
                            </div>
                          )}
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

          {/* Behavioral Questions */}
          {activeSection === "behavioral" && (
            <div>
              <div className="flex items-center gap-4 mb-10">
                <h1 className="text-3xl font-bold">
                  Behavioral Questions
                </h1>

                <span className="px-4 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 text-sm">
                  {
                    report.behavioralQuestions
                      .length
                  }{" "}
                  questions
                </span>
              </div>

              <div className="space-y-5">
                {report.behavioralQuestions.map(
                  (question, index) => (
                    <div
                      key={index}
                      className="bg-[#0B1023] border border-white/10 rounded-2xl overflow-hidden"
                    >
                      {/* Question Header */}
                      <button
                        onClick={() =>
                          toggleQuestion(
                            `behavioral-${index}`
                          )
                        }
                        className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-white/5 transition"
                      >
                        <div className="flex items-start gap-4">
                          <div className="px-3 py-1 rounded-lg bg-pink-500/20 text-pink-400 text-sm font-bold">
                            Q{index + 1}
                          </div>

                          <h2 className="text-lg font-medium">
                            {question.question}
                          </h2>
                        </div>

                        {openQuestion ===
                          `behavioral-${index}` ? (
                          <ChevronUp className="text-pink-400" />
                        ) : (
                          <ChevronDown className="text-gray-400" />
                        )}
                      </button>

                      {/* Dropdown Content */}
                      {openQuestion ===
                        `behavioral-${index}` && (
                          <div className="px-6 pb-6 border-t border-white/10">
                            <div className="mt-5">
                              <span className="inline-block px-3 py-1 rounded-lg bg-purple-500/20 text-purple-300 text-xs font-semibold mb-3">
                                INTENTION
                              </span>

                              <p className="text-gray-300 leading-relaxed">
                                {question.intention}
                              </p>
                            </div>

                            <div className="mt-6">
                              <span className="inline-block px-3 py-1 rounded-lg bg-green-500/20 text-green-300 text-xs font-semibold mb-3">
                                MODEL ANSWER
                              </span>

                              <p className="text-gray-300 leading-relaxed">
                                {question.answer}
                              </p>
                            </div>
                          </div>
                        )}
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {/* Roadmap */}
          {activeSection ===
            "roadmap" && (
              <div>
                <div className="flex items-center gap-4 mb-10">
                  <h1 className="text-3xl font-bold">
                    Preparation Road Map
                  </h1>

                  <span className="px-4 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 text-sm">
                    {report.preparationPlan.length} Days Plan
                  </span>
                </div>

                <div className="relative border-l border-pink-500/40 ml-4 space-y-10">
                  {report.preparationPlan.map(
                    (
                      plan,
                      index
                    ) => (
                      <div
                        key={index}
                        className="relative pl-10"
                      >
                        {/* Timeline Dot */}
                        <div className="absolute -left-[11px] top-2 w-5 h-5 rounded-full border-4 border-pink-500 bg-[#050816]"></div>

                        <div className="flex items-center gap-3 mb-4">
                          <span className="px-3 py-1 rounded-lg bg-pink-500/20 text-pink-400 text-sm font-bold">
                            Day{" "}
                            {
                              plan.day
                            }
                          </span>

                          <h2 className="text-2xl font-semibold">
                            {
                              plan.focus
                            }
                          </h2>
                        </div>

                        <ul className="space-y-3">
                          {plan.tasks.map(
                            (
                              task,
                              taskIndex
                            ) => (
                              <li
                                key={
                                  taskIndex
                                }
                                className="text-gray-300 flex gap-3"
                              >
                                <span className="text-pink-400">
                                  •
                                </span>

                                {task}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

          {/* FOOTER — Previous Reports (inside scrollable main) */}
          {reportList && reportList.length > 0 && (
            <div className="mt-16 border-t border-white/10 pt-8">
              <div className="flex items-center gap-3 mb-5">
                <Clock size={14} className="text-gray-500" />
                <span className="text-xs text-gray-500 uppercase tracking-widest">
                  Previous Reports
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {reportList.map((item, index) => (
                  <a
                    key={item._id || index}
                    href={`/interview/${item._id}`}
                    className="flex flex-col gap-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-pink-500/40 hover:bg-pink-500/5 transition-all duration-200"
                  >
                    <span className="text-sm font-medium text-white truncate">
                      {item.title || "Interview Report"}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatDate(item.createdAt)}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </main>

        {/* RIGHT SIDEBAR */}
        <aside className="hidden xl:flex xl:flex-col w-80 flex-shrink-0 border-l border-white/10 bg-[#0B1023]/60 backdrop-blur-xl p-8 h-screen sticky top-0 overflow-hidden">
          {/* Match Score — fixed, never scrolls */}
          <div className="flex flex-col items-center flex-shrink-0">
            <p className="text-gray-500 tracking-[3px] text-sm uppercase">
              Match Score
            </p>

            <div className="mt-6 w-36 h-36 rounded-full border-[6px] border-green-500 flex flex-col items-center justify-center">
              <h2 className="text-5xl font-bold">
                {
                  report.matchScore
                }
              </h2>

              <span className="text-gray-400 text-sm">
                %
              </span>
            </div>

            <p className="text-green-400 mt-5 font-medium">
              Strong match for this role
            </p>
          </div>

          {/* Skill Gaps — scrollable when overflowing */}
          <div className="mt-14 flex flex-col flex-1 min-h-0">
            <h2 className="text-gray-400 tracking-[3px] uppercase text-sm mb-6 flex-shrink-0">
              Skill Gaps
            </h2>

            <div className="space-y-4 overflow-y-auto pr-1 flex-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {report.skillGaps.map(
                (gap, index) => (
                  <div
                    key={index}
                    className={`
                    px-4 py-4 rounded-2xl border
                    ${gap.severity ===
                        "high"
                        ? "bg-red-500/10 border-red-500/20 text-red-300"
                        : gap.severity ===
                          "medium"
                          ? "bg-yellow-500/10 border-yellow-500/20 text-yellow-300"
                          : "bg-green-500/10 border-green-500/20 text-green-300"
                      }
                  `}
                  >
                    {gap.skill}
                  </div>
                )
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Interview;