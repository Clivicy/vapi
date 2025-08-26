import React, { useEffect, useState } from "react";
import { apiFetch } from "../api";

interface Agent {
  _id: string;
  name: string;
  sttProvider: string;
  ttsProvider: string;
  llmProvider: string;
  prompt: string;
}

const Assistants = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("Widget");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    setLoading(true);
    try {
      const data = await apiFetch<Agent[]>("/agents");
      setAgents(data);
      if (data.length > 0 && !selectedAgent) {
        setSelectedAgent(data[0]);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredAgents = agents.filter(agent =>
    agent.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="flex items-center justify-center h-screen bg-gray-900 text-white">Loading assistants...</div>;
  if (error) return <div className="text-red-500 p-8 bg-gray-900 text-white">Error: {error}</div>;

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Left Sidebar */}
      <div className="w-80 bg-gray-800 border-r border-gray-700 p-6">
        <div className="mb-6">
          {/* Header with Icon */}
          <div className="text-center mb-4">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-700 rounded-lg mb-3">
              <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-gray-100 mb-2">Assistants</h1>
            <p className="text-sm text-gray-400 leading-relaxed">
              Assistants are voice AI chat bots used for integrations into your applications. You can fully configure them to your business's needs, and we support all major models and providers.
            </p>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-2">
            <button className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create Assistant
            </button>
            <button className="p-3 bg-gray-700 hover:bg-gray-600 rounded-lg">
              <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search Assistants"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 pl-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <svg className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Assistants List */}
        <div className="space-y-2">
          {filteredAgents.map((agent) => (
            <div
              key={agent._id}
              onClick={() => setSelectedAgent(agent)}
              className={`p-3 rounded-lg cursor-pointer transition-colors ${
                selectedAgent?._id === agent._id
                  ? "bg-teal-600/20 border border-teal-500/30"
                  : "hover:bg-gray-700"
              }`}
            >
              <div className="font-medium text-gray-100">{agent.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Configuration Panel */}
      <div className="flex-1 p-8 overflow-y-auto">
        {selectedAgent ? (
          <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-100">{selectedAgent.name}</h2>
                <div className="text-gray-400 text-sm mt-1">
                  {selectedAgent._id}
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  Code
                </button>
                <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                  Test
                </button>
                <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Chat
                </button>
                <button className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg flex items-center gap-2 font-medium">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                  Talk to Assistant
                </button>
                <div className="flex items-center gap-2">
                  <span className="text-yellow-500">⚠️</span>
                  <span className="px-3 py-1 bg-green-600 text-white text-sm rounded-full">Published</span>
                </div>
                <button className="p-2 hover:bg-gray-700 rounded-lg">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-gray-700 mb-6">
              {["Model", "Voice", "Transcriber", "Tools", "Analysis", "Advanced", "Widget"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 border-b-2 font-medium transition-colors ${
                    activeTab === tab
                      ? "border-green-500 text-green-400"
                      : "border-transparent text-gray-400 hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content - Widget Tab */}
            {activeTab === "Widget" && (
              <div className="space-y-6">
                {/* Widget Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-100">Widget</h3>
                    <p className="text-gray-400 text-sm mt-1">
                      The widget allows you to embed your assistant into your website. You can customize the widget's appearance and behavior in the Advanced tab.
                    </p>
                  </div>
                </div>

                {/* Code Snippet Section */}
                <div className="bg-gray-800 border border-gray-600 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-gray-300">Copy Code</span>
                    <button className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded flex items-center gap-2 text-sm">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Copy
                    </button>
                  </div>
                  <div className="bg-gray-900 rounded p-3 font-mono text-sm text-gray-300">
                    {`<script src="https://cdn.vapi.ai/widget/v1.js"></script>`}
                  </div>
                </div>

                {/* Link Section */}
                <div className="bg-gray-800 border border-gray-600 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-gray-300">Copy Link</span>
                    <button className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded flex items-center gap-2 text-sm">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Copy
                    </button>
                  </div>
                  <div className="bg-gray-900 rounded p-3 font-mono text-sm text-gray-300">
                    {`https://vapi.ai/widget/${selectedAgent._id}`}
                  </div>
                </div>

                {/* Open Widget Button */}
                <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-4 px-6 rounded-lg text-lg">
                  Open Widget
                </button>
              </div>
            )}

            {/* Other Tab Content Placeholders */}
            {activeTab !== "Widget" && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-lg">
                  {activeTab} configuration will be available here
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            <div className="text-center">
              <div className="text-6xl mb-4">🤖</div>
              <div className="text-xl font-medium">Select an assistant to configure</div>
              <div className="text-sm text-gray-500 mt-2">Choose an assistant from the sidebar to get started</div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Right - Ask AI Button */}
      <div className="fixed bottom-6 right-6">
        <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg">
          <span className="text-sm">Ask AI</span>
          <div className="w-5 h-5 bg-green-500 rounded text-xs font-bold text-white flex items-center justify-center">V</div>
        </button>
      </div>
    </div>
  );
};

export default Assistants;
