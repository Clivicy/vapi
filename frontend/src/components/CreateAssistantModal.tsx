import React, { useState } from "react";
import { Plus, PlusCircleIcon, Search } from "lucide-react";
import Modal from "./ui/Modal";
import Button from "./ui/Button";

interface CreateAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateAssistant: (name: string, template: string) => void;
}

const CreateAssistantModal: React.FC<CreateAssistantModalProps> = ({
  isOpen,
  onClose,
  onCreateAssistant,
}) => {
  const [assistantName, setAssistantName] = useState("New Assistant");
  const [selectedTemplate, setSelectedTemplate] = useState("blank");

  const templates = [
    {
      id: "blank",
      title: "Blank Template",
      description: "This blank slate template with minimal configurations. It's a starting point for creating your custom assistant.",
      icon: Plus,
      isSelected: true,
    },
  ];

  const quickstartTemplates = [
    {
      id: "customer-support",
      title: "Customer Support Specialist",
      description: "A comprehensive template for resolving customer issues and providing support.",
    },
    {
      id: "lead-qualification",
      title: "Lead Qualification Specialist", 
      description: "A consultative template designed to qualify leads and gather requirements.",
    },
    {
      id: "appointment-scheduler",
      title: "Appointment Scheduler",
      description: "A specialized template for efficiently scheduling appointments and meetings.",
    },
    {
      id: "info-collector",
      title: "Info Collector",
      description: "A methodical template for gathering information and data collection.",
    },
    {
      id: "care-coordinator",
      title: "Care Coordinator",
      description: "A compassionate template for scheduling care and managing patient needs.",
    },
    {
      id: "feedback-gatherer",
      title: "Feedback Gatherer",
      description: "An engaging template for conducting surveys and gathering feedback.",
    },
  ];

  const handleCreate = () => {
    onCreateAssistant(assistantName, selectedTemplate);
    onClose();
    setAssistantName("New Assistant");
    setSelectedTemplate("blank");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Assistant">
      <div className="space-y-4 mx-4">
        {/* Choose a template section */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Choose a template</h3>
          <p className="text-gray-400 text-sm mb-4">
            Here's a few templates to get you started, or you can create your own template and use it to create a new assistant.
          </p>
        </div>

        {/* Assistant Name */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <label className="text-white font-medium">Assistant Name</label>
            <span className="text-orange-400 text-xs">(This can be adjusted at any time after creation.)</span>
          </div>
          <input
            type="text"
            onChange={(e) => setAssistantName(e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="New Assistant"
          />
        </div>

        {/* Blank Template */}
        <div>
          <div
            className={`p-3 border-2 rounded-xl cursor-pointer transition-colors ${
              selectedTemplate === "blank"
                ? "border-green-500 bg-green-500/10"
                : "border-gray-600 hover:border-gray-500"
            }`}
            onClick={() => setSelectedTemplate("blank")}
          >
            <div className="flex items-start gap-3">
              
                <PlusCircleIcon className="w-8 h-8 text-zinc-500" />
              <div>
                <h4 className="text-white font-medium text-md">Blank Template</h4>
                <p className="text-gray-400 text-xs mt-1">
                  This blank slate template with minimal configurations. It's a starting point for creating your custom assistant.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quickstart Templates */}
        <div>
          <div className="grid grid-cols-2 gap-3">
            {quickstartTemplates.map((template) => (
              <div
                key={template.id}
                className={`p-3 border rounded-xl cursor-pointer transition-colors ${
                  selectedTemplate === template.id
                    ? "border-green-500 bg-green-500/10"
                    : "border-gray-600 hover:border-gray-500"
                }`}
                onClick={() => setSelectedTemplate(template.id)}
              >
                <h5 className="text-white font-medium text-sm">{template.title}</h5>
                <p className="text-gray-400 text-xs mt-1 line-clamp-2">
                  {template.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mt-8">
          <Button
            variant="secondary"
            onClick={onClose}
            className="px-6"
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleCreate}
            className="px-6 bg-green-600 hover:bg-green-700"
          >
            Create Assistant
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default CreateAssistantModal;
