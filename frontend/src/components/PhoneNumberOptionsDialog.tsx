import React, { useState } from "react";
import { X, Info } from "lucide-react";

interface PhoneNumberOptionsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onCreatePhoneNumber: (option: string, areaCode?: string) => void;
}

const phoneNumberOptions = [
  { id: "free-vapi", label: "Free Vapi Number" },
  { id: "free-vapi-sip", label: "Free Vapi SIP" },
  { id: "import-twilio", label: "Import Twilio" },
  { id: "import-vonage", label: "Import Vonage" },
  { id: "import-telnyx", label: "Import Telnyx" },
  { id: "byo-sip", label: "BYO SIP Trunk Number" },
];

export const PhoneNumberOptionsDialog: React.FC<PhoneNumberOptionsDialogProps> = ({
  isOpen,
  onClose,
  onCreatePhoneNumber,
}) => {
  const [selectedOption, setSelectedOption] = useState("free-vapi");
  const [areaCode, setAreaCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreatePhoneNumber(selectedOption, areaCode);
    setAreaCode("");
    onClose();
  };

  const handleClose = () => {
    setAreaCode("");
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
      <div className="relative bg-white dark:bg-black border border-zinc-400 dark:border-zinc-600 rounded-lg shadow-xl w-full sm:rounded-lg max-w-5xl  overflow-hidden">
        {/* Content */}
        <div className="flex h-auto min-h-[520px]">
          {/* Left Sidebar */}
          <div className="w-60 bg-white dark:bg-black border-r border-zinc-400 dark:border-zinc-600 p-6">
            <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-2 px-4 py-2">Phone Number Options</h3>
            <div className="space-y-1">
              {phoneNumberOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setSelectedOption(option.id)}
                  className={`w-full text-left px-4 py-2 rounded-lg text-zinc-900 dark:text-zinc-100 transition-colors text-sm ${
                    selectedOption === option.id
                      ? "bg-violet-500 font-semibold text-white"
                      : "text-zinc-600 dark:text-zinc-400 font-semibold hover:text-zinc-900 dark:hover:text-white hover:bg-violet-100/80 dark:hover:bg-violet-700/20"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right Content Area */}
          <div className="flex-1 p-6 flex flex-col">
            {selectedOption === "free-vapi" && (
              <div className="flex-1">
                <div className="mb-6">
                  <label className="block text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-2">
                    Area Code
                  </label>
                  <input
                    type="text"
                    value={areaCode}
                    onChange={(e) => setAreaCode(e.target.value)}
                    placeholder="e.g. 346, 984, 326"
                    className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  />
                </div>

                {/* Information Box */}
                <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-violet-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Info className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-zinc-900 dark:text-zinc-100 font-medium mb-1">
                        Free US phone numbers • Up to 10 per account
                      </p>
                      <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                        Only US area codes are supported. For international numbers, use the import options above.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedOption !== "free-vapi" && (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-zinc-600 dark:text-zinc-400">
                    Configuration options for {phoneNumberOptions.find(opt => opt.id === selectedOption)?.label} will be available here.
                  </p>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-6">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 bg-white dark:bg-black font-bold text-zinc-900 dark:text-zinc-100 rounded-md hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="px-4 py-2 bg-violet-500 font-bold text-white rounded-md hover:bg-violet-600 transition-colors"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
