import React, { useState } from "react";
import { Wrench, FileText, Plus, Search, Check } from "lucide-react";
import { Button } from "../components/ui";

const Tools = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="flex h-screen bg-zinc-100 dark:bg-zinc-900">
      {/* Left Sidebar */}
      <div className="h-full w-[270px] min-w-[270px] max-w-[270px] bg-zinc-100 dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 flex flex-col">
        {/* Top Tabs */}
        
          <div className="flex items-center justify-between gap-2 mb-2 px-4 py-2 border-b border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-2">
              <Wrench className="w-5 h-5 text-zinc-500" />
              <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                Tools
              </h2>
            </div>
            <button 
              className="text-black bg-zinc-200 dark:bg-zinc-800 font-bold dark:text-zinc-100 px-4 py-2 flex items-center gap-2 hover:bg-zinc-300 dark:hover:bg-zinc-700 rounded-md transition-colors"
              onClick={() => {}}
            >
              <FileText className="w-4 h-4" />
              Docs
            </button>
          </div>
        

        {/* Create Tool Button */}
        <div className="px-4 py-2">
          <Button variant = "primary" className="w-full bg-violet-500 font-bold hover:bg-violet-600 text-white flex items-center justify-center gap-2">
            <Plus className="w-4 h-4" />
            Create Tool
          </Button>
        </div>

        {/* Search Bar */}
        <div className="px-4 pb-4">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Tools"
              className="w-full pl-3 pr-10 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-400" />
          </div>
        </div>

        {/* Tools List */}
        <div className="flex-1 px-4">
          <div className="text-zinc-500 dark:text-zinc-400 text-sm text-center">
            No tools found
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-zinc-100 dark:bg-zinc-900 flex flex-col">
        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-zinc-200 dark:bg-zinc-800 rounded-full flex items-center justify-center">
              <Plus className="w-8 h-8 text-zinc-900 dark:text-zinc-100" />
            </div>
            <h2 className="mb-2 text-center text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              No tools found
            </h2>
            <p className="text-zinc-500 max-w-sm dark:text-zinc-500">
              Create your first tool to get started with integrating external services.
            </p>
          </div>
        </div>

        {/* Ask AI Button */}
        <div className="p-6 flex justify-end">
          <Button className="bg-zinc-700 hover:bg-zinc-600 text-white flex items-center gap-2">
            Ask AI
            <Check className="w-4 h-4 text-green-400" />
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Tools;
