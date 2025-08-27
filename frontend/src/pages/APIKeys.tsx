import React, { useState } from "react";
import { Key, Plus, Eye, EyeOff, Copy, Trash2, ChevronDown, SlidersVerticalIcon, KeyRoundIcon } from "lucide-react";
import { Button } from "../components/ui";
import { NewPublicApiKeyDialog } from "../components/NewPublicApiKeyDialog";

const APIKeys = () => {
  const [privateKeyVisible, setPrivateKeyVisible] = useState(false);
  const [publicKeyVisible, setPublicKeyVisible] = useState(false);
  const [isNewApiKeyDialogOpen, setIsNewApiKeyDialogOpen] = useState(false);

  const privateKey = "pk_1234567890abcdef1234567890abcdef12345678";
  const publicKey = "pk_public_1234567890abcdef1234567890abcdef12345678";

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    // TODO: Add toast notification
  };

  const handleDeleteKey = (type: 'private' | 'public') => {
    // TODO: Implement delete functionality
    console.log(`Delete ${type} key`);
  };

  const handleCreateApiKey = (data: {
    name: string;
    allowedOrigins: string;
    allowedAssistants: string;
    transientAssistant: boolean;
  }) => {
    // TODO: Implement API key creation
    console.log("Creating API key:", data);
  };

  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 mx-auto w-full max-w-6xl overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-40 flex flex-row items-center justify-between rounded-t-2xl border-b border-zinc-400 dark:border-zinc-600 backdrop-blur-md dark:bg-background">
      <div className="my-4 flex flex-row items-center gap-x-2 pl-6">
        <div className="flex flex-col items-center justify-center rounded-lg bg-secondary p-1">
          <SlidersVerticalIcon className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
        </div>
        <h1 className="text-xl font-bold text-text">clivicy@gmail.com's Org</h1>
      </div>
      </div>
      <div className="flex w-full flex-col gap-y-4 p-4">
      {/* Private API Keys Section */}
      <div className=" border border-zinc-400 dark:border-zinc-600 rounded-lg p-4 w-full">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Private API Keys</h2>
          <Button 
            className="bg-violet-500 hover:bg-violet-600 text-white flex items-center gap-2"
            onClick={() => setIsNewApiKeyDialogOpen(true)}
          >
            <Plus className="w-4 h-4" />
            Add Key
          </Button>
        </div>
        
        <p className="mt-1 text-[13px] text-zinc-500 dark:text-zinc-400 pb-4">
          Use these keys for interacting with our APIs in your backend systems.
        </p>

        {/* Private Key Card */}
        <div className="bg-zinc-200 dark:bg-zinc-800 rounded-lg px-3 py-2 w-full">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm font-bold text-black dark:text-white">Private Key</span>
          </div>
          
          <div className="flex items-center gap-3 bg-zinc-100 dark:bg-zinc-800 border rounded-md border-zinc-300 dark:border-zinc-600">
            <div className="flex-1 relative">
              <KeyRoundIcon className="w-4 h-4 text-zinc-600 dark:text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 z-10" />
              <input
                type={privateKeyVisible ? "text" : "password"}
                value={privateKey}
                readOnly
                className="w-full pl-10 pr-3 py-2 bg-transparent text-zinc-900 dark:text-zinc-100 font-mono text-sm border-none outline-none"
              />
            </div>
            
            <div className="flex items-center gap-2 pr-2">
              <button
                onClick={() => setPrivateKeyVisible(!privateKeyVisible)}
                className="p-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
              >
                {privateKeyVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
              <button
                onClick={() => handleCopyKey(privateKey)}
                className="p-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
              >
                <Copy className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDeleteKey('private')}
                className="p-2 text-zinc-600 dark:text-zinc-400 hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Public API Keys Section */}
      <div className="border border-zinc-400 dark:border-zinc-600 rounded-lg p-4 w-full">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Public API Keys</h2>
          <Button 
            className="bg-violet-500 hover:bg-violet-600 text-white flex items-center gap-2"
            onClick={() => setIsNewApiKeyDialogOpen(true)}
          >
            <Plus className="w-4 h-4" />
            Add Key
          </Button>
        </div>
        
        <p className="mt-1 text-[13px] text-zinc-500 dark:text-zinc-400 pb-4">
          Use these keys for interacting with Vapi Client SDKs (e.g. from your frontend).
        </p>

        {/* Public Key Card */}
        <div className="bg-zinc-200 dark:bg-zinc-800 rounded-lg px-3 py-2 w-full">
          <div className="flex items-center gap-2 mb-3">
            
            <span className="text-sm font-bold text-black dark:text-white">Public Key</span>
          </div>
          
          <div className="flex items-center gap-3 bg-zinc-100 dark:bg-zinc-800 border rounded-md border-zinc-300 dark:border-zinc-600 mb-4">
            <div className="flex-1 relative">
            <KeyRoundIcon className="w-4 h-4 text-zinc-600 dark:text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 z-10" />
              <input
                type={publicKeyVisible ? "text" : "password"}
                value={publicKey}
                readOnly
                className="w-full pl-10 pr-3 py-2 bg-transparent text-zinc-900 dark:text-zinc-100 font-mono text-sm border-none outline-none"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPublicKeyVisible(!publicKeyVisible)}
                className="p-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
              >
                {publicKeyVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
              <button
                onClick={() => handleCopyKey(publicKey)}
                className="p-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
              >
                <Copy className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDeleteKey('public')}
                className="p-2 text-zinc-600 dark:text-zinc-400 hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Key Permissions */}
          <div className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
            <div>Origins: All domains allowed</div>
            <div>Assistants: All Assistants allowed</div>
            <div>Transient Assistants: Allowed</div>
          </div>
        </div>
      </div>
      </div>

      {/* New Public API Key Dialog */}
      <NewPublicApiKeyDialog
        isOpen={isNewApiKeyDialogOpen}
        onClose={() => setIsNewApiKeyDialogOpen(false)}
        onCreateApiKey={handleCreateApiKey}
      />
    </div>
  );
};
export default APIKeys;
