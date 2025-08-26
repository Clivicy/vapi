import React, { useEffect, useState } from "react";
import { UserRoundIcon } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className = "",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setIsAnimating(true);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      setIsAnimating(false);
      // Re-enable body scroll when modal is closed
      document.body.style.overflow = 'unset';
      // Delay hiding to allow animation to complete
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-start">
      {/* Backdrop with blur effect */}
      <div 
        className={`absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300 ${
          isAnimating ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />
      
      {/* Modal - positioned on left side with slide animation */}
      <div className={`relative bg-zinc-100 dark:bg-zinc-900 shadow-xl w-[600px] m-4 rounded-2xl overflow-y-auto transition-transform duration-300 ease-in-out ${
        isAnimating ? 'transform translate-x-0' : 'transform -translate-x-full'
      } ${className}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 pl-8 border-b border-zinc-200 dark:border-zinc-800 sticky top-0 bg-zinc-100 dark:bg-zinc-900 z-10">
          <div className="flex items-center gap-3">
            <UserRoundIcon className="w-6 h-6 text-zinc-500" />
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{title}</h2>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
