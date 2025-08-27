import React, { useState } from "react";
import { X } from "lucide-react";

interface CreateFolderDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateFolder: (folderName: string) => void;
}

export const CreateFolderDialog: React.FC<CreateFolderDialogProps> = ({
  isOpen,
  onClose,
  onCreateFolder,
}) => {
  const [folderName, setFolderName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (folderName.trim()) {
      onCreateFolder(folderName.trim());
      setFolderName("");
      onClose();
    }
  };

  const handleClose = () => {
    setFolderName("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop with blur effect */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Dialog */}
      <div className="relative bg-white dark:bg-black border border-zinc-400 dark:border-zinc-600 rounded-lg shadow-xl w-96 max-w-md mx-4">
        
        {/* Content */}
        <div className="p-6">
        <h2 className="text-xl font-semibold text-black dark:text-white">Create Folder</h2>
          <p className="text-zinc-500 dark:text-zinc-400 mb-4">
            Create a new folder to organize your assistants.
          </p>
          
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              placeholder="Folder name"
              className="w-full px-3 py-2 bg-zinc-100 dark:bg-zinc-900 border border-zinc-600 rounded-md text-black dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              autoFocus
            />
            
            {/* Action Buttons */}
            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 px-4 py-2 bg-white dark:bg-black font-bold text-black dark:text-white rounded-md hover:bg-zinc-300 dark:hover:bg-zinc-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-violet-500 font-bold dark:bg-violet-500 text-white rounded-md hover:bg-violet-700 dark:hover:bg-violet-600 transition-colors"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
