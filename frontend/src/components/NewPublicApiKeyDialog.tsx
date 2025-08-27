import React, { useState } from "react";
import { X, Info, ChevronDown } from "lucide-react";

interface NewPublicApiKeyDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateApiKey: (data: {
    name: string;
    allowedOrigins: string;
    allowedAssistants: string;
    transientAssistant: boolean;
  }) => void;
}

export const NewPublicApiKeyDialog: React.FC<NewPublicApiKeyDialogProps> = ({
  isOpen,
  onClose,
  onCreateApiKey,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    allowedOrigins: "",
    allowedAssistants: "",
    transientAssistant: true,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) {
      newErrors.name = "Token Name is a required field";
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      onCreateApiKey(formData);
      setFormData({
        name: "",
        allowedOrigins: "",
        allowedAssistants: "",
        transientAssistant: true,
      });
      setErrors({});
      onClose();
    }
  };

  const handleClose = () => {
    setFormData({
      name: "",
      allowedOrigins: "",
      allowedAssistants: "",
      transientAssistant: true,
    });
    setErrors({});
    onClose();
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
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
      <div className="relative bg-zinc-100 dark:bg-zinc-900 rounded-lg shadow-xl w-[500px] max-w-[90vw] mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-zinc-200 dark:border-zinc-800">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">New Public API Key</h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
            Add a new API Key to restrict access.
          </p>
        </div>
        
        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-2">
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="API Key Name"
              className={`w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border rounded-md text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                errors.name ? "border-red-500 focus:ring-red-500" : "border-zinc-200 dark:border-zinc-700"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Allowed Origins Field */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <label className="block text-sm font-medium text-zinc-900 dark:text-zinc-100">
                Allowed Origins
              </label>
              <Info className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
            </div>
            <input
              type="text"
              value={formData.allowedOrigins}
              onChange={(e) => handleInputChange("allowedOrigins", e.target.value)}
              placeholder="Allowed urls"
              className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          {/* Allowed Assistants Dropdown */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <label className="block text-sm font-medium text-zinc-900 dark:text-zinc-100">
                Allowed Assistants
              </label>
              <Info className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
            </div>
            <div className="relative">
              <select
                value={formData.allowedAssistants}
                onChange={(e) => handleInputChange("allowedAssistants", e.target.value)}
                className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent appearance-none"
              >
                <option value="">Select Assistants</option>
                <option value="all">All Assistants</option>
                <option value="specific">Specific Assistants</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-500 dark:text-zinc-400 pointer-events-none" />
            </div>
          </div>

          {/* Transient Assistant Toggle */}
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <label className="block text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  Transient Assistant
                </label>
                <Info className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
              </div>
              <button
                type="button"
                onClick={() => handleInputChange("transientAssistant", !formData.transientAssistant)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  formData.transientAssistant ? "bg-teal-500" : "bg-zinc-300 dark:bg-zinc-600"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    formData.transientAssistant ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-teal-500 hover:bg-teal-600 text-white font-medium py-3 px-4 rounded-md transition-colors"
            >
              Create Public Token
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
