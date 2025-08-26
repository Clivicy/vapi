import React, { useEffect, useState } from "react";
import { apiFetch } from "../api";
import { FolderIcon, PlusIcon, ScanFaceIcon, SettingsIcon } from "lucide-react";
import { Button, SearchBar } from "../components/ui";
import CreateAssistantModal from "../components/CreateAssistantModal";

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
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

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

  const handleCreateAssistant = async (name: string, template: string) => {
    try {
      const newAgent = {
        name,
        sttProvider: "openai",
        ttsProvider: "openai", 
        llmProvider: "openai",
        prompt: `You are ${name}, a helpful AI assistant.`,
      };
      
      const createdAgent = await apiFetch<Agent>("/agents", {
        method: "POST",
        body: JSON.stringify(newAgent),
      });
      
      setAgents([...agents, createdAgent]);
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) return <div className="flex items-center justify-center h-screen bg-zinc-900 text-white">Loading assistants...</div>;
  if (error) return <div className="text-red-500 p-8 bg-zinc-900 text-white">Error: {error}</div>;

  return (
    <div className="flex h-screen bg-zinc-100 dark:bg-zinc-900 text-black dark:text-white">
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="flex flex-col items-center justify-center w-[330px]">
        <ScanFaceIcon className="w-20 h-20 self-start text-zinc-500"/>
        <span className="text-xl text-left w-full">Assistants</span>
        <span className="text-sm text-zinc-500 dark:text-zinc-400 text-left mb-4 w-full">
        Assistants are voice AI chat bots used for integrations into your applications.
        </span>
        <span className="text-sm text-zinc-900 dark:text-zinc-100 text-left mb-4 w-full">
        You can fully configure them to your business's needs, and we support all major models and providers.
        </span>
        </div>
       <div className=" flex w-[330px] flex-row gap-x-2">
       <div className="flex flex-col">
          <div className="flex gap-2">
            <Button 
              className="bg-blue-500 text-white px-2 font-bold py-2 rounded-md flex items-center gap-2 self-start mb-2"
              onClick={() => setIsCreateModalOpen(true)}
            >
              <PlusIcon className="w-4 h-4" strokeWidth={2}  />
              Create Assistant
            </Button>
            <button className=" text-black dark:text-zinc-100 px-4 py-2  flex items-center gap-2 self-start">
              <FolderIcon className="w-4 h-4" strokeWidth={2}  />
            </button>
          </div>
        <div className="w-[220px]">
          <SearchBar 
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search assistants..."
            className="w-full"
          />
        </div>
        </div>
        </div>
      </div>

      {/* Create Assistant Modal */}
      <CreateAssistantModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateAssistant={handleCreateAssistant}
      />
    </div>
  );
};

export default Assistants;
