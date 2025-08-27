import React, { useState } from "react";
import { FolderIcon, PlusIcon, SmartphoneIcon } from "lucide-react";
import { Button, SearchBar } from "../components/ui";
import { PhoneNumberOptionsDialog } from "../components/PhoneNumberOptionsDialog";

const PhoneNumbers = () => {
  const [isPhoneDialogOpen, setIsPhoneDialogOpen] = useState(false);

  const handleCreatePhoneNumber = (option: string, areaCode?: string) => {
    console.log("Creating phone number:", option, areaCode);
    // TODO: Implement phone number creation logic
  };

  return (
    <div className="flex h-screen bg-zinc-100 dark:bg-zinc-900 text-black dark:text-white">
  <div className="flex flex-col items-center justify-center w-full h-full">
    <div className="flex flex-col items-center justify-center w-[330px]">
    <SmartphoneIcon className="w-20 h-20 self-start text-zinc-500"/>
    <span className="text-xl text-left w-full">Phone Numbers</span>
    <span className="text-sm text-zinc-500 dark:text-zinc-400 text-left mb-4 w-full">
    Assistants are able to be connected to phone numbers for calls. 
    </span>
    <span className="text-sm text-zinc-900 dark:text-zinc-100 text-left mb-4 w-full">
    You can import from Twilio, vonage, or create a free number directly from Vapi for use with your assistants. 
    </span>
    </div>
   <div className=" flex w-[330px] flex-row gap-x-2">
  <div className="flex flex-col">
      <div className="flex gap-2">
        <Button 
          className="bg-blue-500 px-2 text-white font-bold py-2 rounded-md flex items-center gap-2 self-start mb-2"
          onClick={() => setIsPhoneDialogOpen(true)}
        >
          <PlusIcon className="w-4 h-4" strokeWidth={2}  />
          Create Phone Number
        </Button>
        
      </div>
      <div className="w-[200px]">
       <SearchBar 
        value={""}
        onChange={() => {}}
        placeholder="Search name, number, SIP..."
        className="w-full"
      />
    </div>
  </div>
  <button 
          className="text-black dark:text-zinc-100 px-4 py-2 flex items-center gap-2 self-start hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-md transition-colors"
          onClick={() => {}}
        >
          Documentation
        </button>
</div>
</div>

      {/* Phone Number Options Dialog */}
      <PhoneNumberOptionsDialog
        isOpen={isPhoneDialogOpen}
        onClose={() => setIsPhoneDialogOpen(false)}
        onCreatePhoneNumber={handleCreatePhoneNumber}
      />
</div>
  );
};

export default PhoneNumbers;
