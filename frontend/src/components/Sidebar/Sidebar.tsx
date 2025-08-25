import React, { useState, useRef, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { createPortal } from "react-dom";

// SVG icon components (monochrome, black/white)
const icons = {
  overview: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" className="stroke-zinc-400 group-hover:stroke-violet-400"/><rect x="14" y="3" width="7" height="7" className="stroke-zinc-400 group-hover:stroke-violet-400"/><rect x="14" y="14" width="7" height="7" className="stroke-zinc-400 group-hover:stroke-violet-400"/><rect x="3" y="14" width="7" height="7" className="stroke-zinc-400 group-hover:stroke-violet-400"/></svg>
  ),
  assistants: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" className="stroke-zinc-400 group-hover:stroke-violet-400"/><path d="M4 20c0-2.2 3.6-4 8-4s8 1.8 8 4" className="stroke-zinc-400 group-hover:stroke-violet-400"/></svg>
  ),
  tools: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M14.7 6.3l3 3M2 22l7-7m2-2l7-7m-7 7l-3-3m3 3l3 3" className="stroke-zinc-400 group-hover:stroke-violet-400"/></svg>
  ),
  phone: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92V21a1 1 0 0 1-1.09 1A19 19 0 0 1 3 5.09 1 1 0 0 1 4 4h4.09a1 1 0 0 1 1 .75l1.13 4.52a1 1 0 0 1-.29 1L8.21 12.21a16 16 0 0 0 7.58 7.58l1.94-1.94a1 1 0 0 1 1-.29l4.52 1.13a1 1 0 0 1 .75 1V21z" className="stroke-zinc-400 group-hover:stroke-violet-400"/></svg>
  ),
  voice: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 3v18m6-9a6 6 0 0 1-12 0" className="stroke-zinc-400 group-hover:stroke-violet-400"/></svg>
  ),
  apikeys: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" className="stroke-zinc-400 group-hover:stroke-violet-400"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06A1.65 1.65 0 0 0 15 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 8.6 15a1.65 1.65 0 0 0-1.82-.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 8.6a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 15.4 9a1.65 1.65 0 0 0 1.82.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 15z" className="stroke-zinc-400 group-hover:stroke-violet-400"/></svg>
  ),
  metrics: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 17v-6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v6m4 0v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4" className="stroke-zinc-400 group-hover:stroke-violet-400"/></svg>
  ),
  tests: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2" className="stroke-zinc-400 group-hover:stroke-violet-400"/><path d="M8 2v4m8-4v4" className="stroke-zinc-400 group-hover:stroke-violet-400"/></svg>
  ),
  logs: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2" className="stroke-zinc-400 group-hover:stroke-violet-400"/><path d="M8 9h8m-8 4h6" className="stroke-zinc-400 group-hover:stroke-violet-400"/></svg>
  ),
  chat: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" className="stroke-zinc-400 group-hover:stroke-violet-400"/></svg>
  ),
  session: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2" className="stroke-zinc-400 group-hover:stroke-violet-400"/><path d="M9 9h6v6H9z" className="stroke-zinc-400 group-hover:stroke-violet-400"/></svg>
  ),
  more: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="5" cy="12" r="2" className="stroke-zinc-400 group-hover:stroke-violet-400"/><circle cx="12" cy="12" r="2" className="stroke-zinc-400 group-hover:stroke-violet-400"/><circle cx="19" cy="12" r="2" className="stroke-zinc-400 group-hover:stroke-violet-400"/></svg>
  ),
  chevronLeft: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" className="stroke-zinc-400 group-hover:stroke-violet-400"/></svg>
  ),
  chevronRight: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" className="stroke-zinc-400 group-hover:stroke-violet-400"/></svg>
  ),
};

const navLinks = [
  { label: "Overview", icon: icons.overview, to: "/" },
  { label: "Assistants", icon: icons.assistants, to: "/assistants" },
  { label: "Tools", icon: icons.tools, to: "/tools" },
  { label: "Phone Numbers", icon: icons.phone, to: "/phone-numbers" },
  { label: "Voice Library", icon: icons.voice, to: "/voice-library" },
  { label: "API Keys", icon: icons.apikeys, to: "/api-keys" },
  { label: "More", icon: icons.more, to: "/more", dropdown: ["Workflows", "Outbound", "Files", "Squads", "Integrations", "Customize sidebar"] },
];
const observeLinks = [
  { label: "Metrics", icon: icons.metrics, to: "/metrics" },
  { label: "Test Suites", icon: icons.tests, to: "/test-suites" },
  { label: "Call Logs", icon: icons.logs, to: "/call-logs" },
  { label: "Chat Logs", icon: icons.chat, to: "/chat-logs" },
  { label: "Session Logs", icon: icons.session, to: "/session-logs" },
  { label: "More", icon: icons.more, to: "/more" },
];

const moreDropdownIcons = {
  Workflows: (
    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M7 7h10M7 12h4m-4 5h10"/><circle cx="4" cy="7" r="2"/><circle cx="4" cy="12" r="2"/><circle cx="4" cy="17" r="2"/></svg>
  ),
  Outbound: (
    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92V21a1 1 0 0 1-1.09 1A19 19 0 0 1 3 5.09 1 1 0 0 1 4 4h4.09a1 1 0 0 1 1 .75l1.13 4.52a1 1 0 0 1-.29 1L8.21 12.21a16 16 0 0 0 7.58 7.58l1.94-1.94a1 1 0 0 1 1-.29l4.52 1.13a1 1 0 0 1 .75 1V21z"/></svg>
  ),
  Files: (
    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16v16H4z"/><path d="M4 8h16"/></svg>
  ),
  Squads: (
    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="7" cy="7" r="3"/><circle cx="17" cy="7" r="3"/><circle cx="12" cy="17" r="3"/></svg>
  ),
  Integrations: (
    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2v20M2 12h20"/></svg>
  ),
  "Customize sidebar": (
    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18M15 3v18"/></svg>
  ),
};

// Theme switching logic
const getSystemTheme = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

const getInitialTheme = () => {
  const stored = localStorage.getItem("theme");
  if (stored === "light" || stored === "dark" || stored === "system") return stored;
  return "system";
};

const applyTheme = (theme: string) => {
  const html = document.documentElement;
  if (theme === "dark") {
    html.classList.add("dark");
  } else if (theme === "light") {
    html.classList.remove("dark");
  } else {
    // system
    if (getSystemTheme() === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }
};

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const moreButtonRef = useRef<HTMLButtonElement>(null);
  const [moreDropdownPos, setMoreDropdownPos] = useState<{ left: number; top: number } | null>(null);
  const [observeMoreDropdownOpen, setObserveMoreDropdownOpen] = useState(false);
  const observeMoreButtonRef = useRef<HTMLButtonElement>(null);
  const [observeDropdownPos, setObserveDropdownPos] = useState<{ left: number; top: number } | null>(null);
  const [theme, setTheme] = useState<string>(getInitialTheme());

  // Apply theme on mount and when theme changes
  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem("theme", theme);
    if (theme === "system") {
      const handler = () => applyTheme("system");
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", handler);
      return () => window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change", handler);
    }
  }, [theme]);

  // Calculate position for portal dropdowns (top-aligned)
  useEffect(() => {
    if (moreDropdownOpen && moreButtonRef.current) {
      const rect = moreButtonRef.current.getBoundingClientRect();
      setMoreDropdownPos({
        left: rect.right + 8, // 8px gap
        top: rect.top,
      });
    }
    if (observeMoreDropdownOpen && observeMoreButtonRef.current) {
      const rect = observeMoreButtonRef.current.getBoundingClientRect();
      setObserveDropdownPos({
        left: rect.right + 8, // 8px gap
        top: rect.top,
      });
    }
  }, [moreDropdownOpen, observeMoreDropdownOpen]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClick);
    } else {
      document.removeEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [dropdownOpen]);

  // Close More dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (moreButtonRef.current && !moreButtonRef.current.contains(e.target as Node)) {
        setMoreDropdownOpen(false);
      }
    }
    if (moreDropdownOpen) {
      document.addEventListener("mousedown", handleClick);
    } else {
      document.removeEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [moreDropdownOpen]);

  // Close OBSERVE More dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        observeMoreButtonRef.current &&
        !observeMoreButtonRef.current.contains(e.target as Node) &&
        document.getElementById("observe-more-dropdown") &&
        !(document.getElementById("observe-more-dropdown") as HTMLElement).contains(e.target as Node)
      ) {
        setObserveMoreDropdownOpen(false);
      }
    }
    if (observeMoreDropdownOpen) {
      document.addEventListener("mousedown", handleClick);
    } else {
      document.removeEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [observeMoreDropdownOpen]);

  // Close BUILD More dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        moreButtonRef.current &&
        !moreButtonRef.current.contains(e.target as Node) &&
        document.getElementById("build-more-dropdown") &&
        !(document.getElementById("build-more-dropdown") as HTMLElement).contains(e.target as Node)
      ) {
        setMoreDropdownOpen(false);
      }
    }
    if (moreDropdownOpen) {
      document.addEventListener("mousedown", handleClick);
    } else {
      document.removeEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [moreDropdownOpen]);

  const observeMoreDropdownIcons = {
    "API Logs": (
      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 3v18m6-9a6 6 0 0 1-12 0"/></svg>
    ),
    "Webhook Logs": (
      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 17a4 4 0 1 0-8 0"/><path d="M12 3v14"/><path d="M12 21v-2"/></svg>
    ),
    "Customize sidebar": (
      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18M15 3v18"/></svg>
    ),
  };

  const observeMoreDropdownItems = [
    "API Logs",
    "Webhook Logs",
    "Customize sidebar",
  ];

  return (
    <aside
      className={`flex flex-col h-screen bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 border-r border-zinc-200 dark:border-zinc-800 transition-all duration-200 ${collapsed ? "w-16" : "w-64"}`}
    >
      {/* Logo, Collapse Button */}
      <div className={`flex items-center gap-2 px-4 py-4 border-b border-zinc-200 dark:border-zinc-800 flex-shrink-0 ${collapsed ? "justify-center" : "justify-between"}`}>
        <div className="flex items-center gap-2 justify-between w-full">
          {!collapsed && <div className="text-2xl font-extrabold tracking-tight">VAPI</div>}
          <button
            className="flex items-center justify-center w-8 h-8 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800 transition"
            onClick={() => setCollapsed((c) => !c)}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? icons.chevronRight : icons.chevronLeft}
          </button>
        </div>
      </div>
      {/* Org/Email Row */}
      <div className={`flex items-center gap-2 py-2 ${collapsed ? "px-2 justify-center" : "px-4"} relative`}>
        <div className="w-7 h-7 rounded-full bg-zinc-800 flex items-center justify-center text-sm font-bold text-zinc-200">C</div>
        {!collapsed && (
          <>
            <span className="text-sm text-zinc-900 dark:text-zinc-100 whitespace-nowrap">clivicy@gmail.com's Org</span>
            <button
              className="ml-auto p-1 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800 transition relative z-20"
              onClick={() => setDropdownOpen((v) => !v)}
              aria-label="Open organization menu"
            >
              <svg className={`w-4 h-4 text-zinc-400 dark:text-zinc-500 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {/* Dropdown menu */}
            {dropdownOpen && (
              <div ref={dropdownRef} className="absolute left-0 top-10 w-64 bg-zinc-100 border dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 rounded-lg shadow-lg z-30 animate-fade-in">
                <ul className="py-2">
                  <li><button className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-zinc-200 dark:hover:bg-zinc-800 transition"><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M16 3h5v5"/><path d="M8 21H3v-5"/><path d="M21 3l-7.5 7.5"/><path d="M3 21l7.5-7.5"/></svg>Switch organization</button></li>
                  <li><button className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-zinc-200 dark:hover:bg-zinc-800 transition"><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="7" r="4"/><path d="M5.5 21a7.5 7.5 0 0 1 13 0"/></svg>Account settings</button></li>
                  <li><button className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-zinc-200 dark:hover:bg-zinc-800 transition"><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06A1.65 1.65 0 0 0 15 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 8.6 15a1.65 1.65 0 0 0-1.82-.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 8.6a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 15.4 9a1.65 1.65 0 0 0 1.82.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 15z"/></svg>Settings</button></li>
                  <li><button className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-zinc-200 dark:hover:bg-zinc-800 transition"><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 8a6 6 0 0 1-12 0"/><path d="M12 2v6"/><path d="M12 14v8"/></svg>What's new</button></li>
                  <li><button className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-zinc-200 dark:hover:bg-zinc-800 transition"><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><circle cx="12" cy="8" r="1"/></svg>Help <svg className="w-3 h-3 ml-auto" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg></button></li>
                  <li><button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-200/40 dark:hover:bg-red-800/40 transition" onClick={() => setDropdownOpen(false)}><svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 16l4-4m0 0l-4-4m4 4H7"/></svg>Sign out</button></li>
                </ul>
                <div className="flex items-center justify-between gap-2 px-4 py-3 border-t border-zinc-200 dark:border-zinc-800">
                  <button 
                    className={`flex-1 flex items-center justify-center py-1 rounded transition ${theme === "light" ? "bg-yellow-500 text-white" : "bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-700 text-zinc-200"}`}
                    onClick={() => setTheme("light")}
                    title="Light theme"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><path d="M12 1v2m0 18v2m11-11h-2M3 12H1m16.95 7.07l-1.41-1.41M6.34 6.34L4.93 4.93m12.02 0l-1.41 1.41M6.34 17.66l-1.41 1.41"/></svg>
                  </button>
                  <button 
                    className={`flex-1 flex items-center justify-center py-1 rounded transition ${theme === "dark" ? "bg-violet-700 text-white" : "bg-zinc-800 hover:bg-zinc-700 text-zinc-200"}`}
                    onClick={() => setTheme("dark")}
                    title="Dark theme"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
                  </button>
                  <button 
                    className={`flex-1 flex items-center justify-center py-1 rounded transition ${theme === "system" ? "bg-zinc-700 text-white" : "bg-zinc-800 hover:bg-zinc-700 text-zinc-200"}`}
                    onClick={() => setTheme("system")}
                    title="System theme"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M4 12h16"/></svg>
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      {/* Search */}
      <div className={`py-3 flex-shrink-0 ${collapsed ? "px-2" : "px-3"}`}>
        {collapsed ? (
          <div className="flex items-center justify-center">
            <button
              className="flex items-center justify-center w-8 h-8 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800 transition"
              title="Search"
            >
              <svg className="w-4 h-4 text-zinc-500 dark:text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        ) : (
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
              <svg className="w-4 h-4 text-zinc-900 dark:text-zinc-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              className="w-full rounded bg-zinc-200 dark:bg-zinc-800 pl-8 pr-10 py-1 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500 dark:focus:ring-violet-400"
              placeholder="Search"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <kbd className="bg-zinc-300 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 text-xs px-2 py-0.5 rounded font-mono border border-zinc-300 dark:border-zinc-700">
                {navigator.platform.includes('Mac') ? '⌘' : '⌘'} K
              </kbd>
            </div>
          </div>
        )}
      </div>
      {/* Overview (NavLink) */}
      <div className="px-2 py-2">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `flex items-center w-full px-2 py-1 rounded transition text-sm ${collapsed ? "justify-center" : ""} ${isActive ? "bg-violet-900/30" : "hover:bg-violet-900/10 "}`
          }
        >
          <span >{icons.overview}</span>
          {!collapsed && <span className="ml-3 flex-shrink-0">Overview</span>}
        </NavLink>
      </div>
      {/* Navigation Sections (scrollable) */}
      <nav className="flex-1 overflow-y-auto px-2">
        {/* BUILD section */}
        <div className="">
          {!collapsed && (
            <div className="text-xs font-bold text-zinc-500 px-2 mb-1 mt-2">BUILD</div>
          )}
          <ul className="space-y-1">
            {navLinks.slice(1, 6).map((item) => (
              <li key={item.label} className="group relative">
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center w-full px-2 py-1 rounded transition text-sm ${collapsed ? "justify-center" : ""} ${isActive ? "bg-violet-900/30" : "hover:bg-violet-900/10" }`
                  }
                  title={collapsed ? item.label : undefined}
                >
                  <span>{item.icon}</span>
                  {!collapsed && <span className="ml-3 flex-shrink-0">{item.label}</span>}
                </NavLink>
              </li>
            ))}
            {/* More with portal dropdown */}
            <li className="group relative">
              <button
                ref={moreButtonRef}
                className={`flex items-center w-full px-2 py-1 rounded transition text-sm ${collapsed ? "justify-center" : ""} ${location.pathname === navLinks[6].to ? "bg-zinc-800" : "hover:bg-zinc-800"}`}
                title={collapsed ? navLinks[6].label : undefined}
                onClick={() => setMoreDropdownOpen((v) => !v)}
                aria-haspopup="true"
                aria-expanded={moreDropdownOpen}
              >
                <span >{navLinks[6].icon}</span>
                {!collapsed && <span className="ml-3 flex-shrink-0">{navLinks[6].label}</span>}
              </button>
              {moreDropdownOpen && moreDropdownPos &&
                createPortal(
                  <div
                    id="build-more-dropdown"
                    className="fixed z-50 w-56 bg-zinc-900 rounded-lg shadow-lg py-2 border border-zinc-800 animate-fade-in"
                    style={{
                      left: moreDropdownPos.left,
                      top: moreDropdownPos.top,
                    }}
                  >
                    {navLinks[6].dropdown?.map((d) => (
                      <NavLink
                        key={d}
                        to={`/more?tab=${encodeURIComponent(d.toLowerCase().replace(/ /g, "-"))}`}
                        className={({ isActive }) =>
                          `flex items-center px-4 py-2 text-sm rounded transition ${isActive ? "text-violet-400" : "text-zinc-200"} hover:bg-violet-900/10`
                        }
                        onClick={() => setMoreDropdownOpen(false)}
                      >
                        {moreDropdownIcons[d as keyof typeof moreDropdownIcons]}
                        {d}
                      </NavLink>
                    ))}
                  </div>,
                  document.body
                )}
            </li>
          </ul>
        </div>
        {/* OBSERVE section */}
        <div className="mb-4">
          {!collapsed && (
            <div className="text-xs font-bold text-zinc-500 px-2 mb-1 mt-2">OBSERVE</div>
          )}
          <ul className="space-y-1">
            {observeLinks.slice(0, 5).map((item) => (
              <li key={item.label} className="group relative">
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center w-full px-2 py-1 rounded transition text-sm ${collapsed ? "justify-center" : ""} ${isActive ? "bg-violet-900/30" : "hover:bg-violet-900/10"}`
                  }
                  title={collapsed ? item.label : undefined}
                >
                  <span>{item.icon}</span>
                  {!collapsed && <span className="ml-3 flex-shrink-0">{item.label}</span>}
                </NavLink>
              </li>
            ))}
            {/* OBSERVE More with portal dropdown */}
            <li className="group relative">
              <button
                ref={observeMoreButtonRef}
                className={`flex items-center w-full px-2 py-1 rounded transition text-sm ${collapsed ? "justify-center" : ""} ${location.pathname === "/observe-more" ? "bg-zinc-800 text-violet-400" : "hover:bg-zinc-800"}`}
                title={collapsed ? "More" : undefined}
                onClick={() => setObserveMoreDropdownOpen((v) => !v)}
                aria-haspopup="true"
                aria-expanded={observeMoreDropdownOpen}
              >
                <span >{icons.more}</span>
                {!collapsed && <span className="ml-3 flex-shrink-0">More</span>}
              </button>
              {observeMoreDropdownOpen && observeDropdownPos &&
                createPortal(
                  <div
                    id="observe-more-dropdown"
                    className="fixed z-50 w-56 bg-zinc-900 rounded-lg shadow-lg py-2 border border-zinc-800 animate-fade-in"
                    style={{
                      left: observeDropdownPos.left,
                      top: observeDropdownPos.top,
                    }}
                  >
                    {observeMoreDropdownItems.map((d) => (
                      <button
                        key={d}
                        className="flex items-center w-full px-4 py-2 text-sm rounded transition text-zinc-200 hover:bg-violet-900/40 hover:text-violet-400"
                        onClick={() => setObserveMoreDropdownOpen(false)}
                      >
                        {observeMoreDropdownIcons[d as keyof typeof observeMoreDropdownIcons]}
                        {d}
                      </button>
                    ))}
                  </div>,
                  document.body
                )}
            </li>
          </ul>
        </div>
      </nav>
      {/* Credits and Buy Button */}
      <div className={`px-4 py-4 border-t border-zinc-200 dark:border-zinc-800 flex-shrink-0 flex flex-col gap-2 ${collapsed ? "items-center px-2" : ""}`}>
        <div className="w-full">
          <div className={`flex items-center justify-between mb-2 ${collapsed ? "justify-center" : ""}`}>
            {collapsed ? (
              <svg className="w-4 h-4 text-zinc-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            ) : (
              <>
                <span className="text-xs text-zinc-400 dark:text-zinc-500">PAYG</span>
                <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">10.00 Credits</span>
              </>
            )}
          </div>
          {!collapsed && (
            <button className="w-full bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white text-sm font-semibold py-1 rounded transition">Buy Credits</button>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
