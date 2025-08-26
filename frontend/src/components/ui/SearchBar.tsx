import React from "react";
import { SearchIcon } from "lucide-react";

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  className?: string;
  disabled?: boolean;
  showKeyboardShortcut?: boolean;
  size?: "sm" | "md" | "lg";
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search...",
  value = "",
  onChange,
  onSearch,
  className = "",
  disabled = false,
  showKeyboardShortcut = true,
  size = "md"
}) => {
  const sizeClasses = {
    sm: "py-1 px-3 text-sm",
    md: "py-2 px-4 text-sm",
    lg: "py-3 px-5 text-base"
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-4 h-4", 
    lg: "w-5 h-5"
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && onSearch) {
      onSearch(value);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <SearchIcon className={`${iconSizes[size]} text-zinc-500 dark:text-zinc-400`} />
      </div>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onKeyPress={handleKeyPress}
        disabled={disabled}
        className={`
          w-full rounded-lg bg-zinc-200 dark:bg-zinc-800 
          pl-10 pr-12 text-zinc-900 dark:text-zinc-100 
          placeholder-zinc-500 dark:placeholder-zinc-400 
          focus:outline-none focus:ring-2 focus:ring-violet-500 dark:focus:ring-violet-400
          disabled:opacity-50 disabled:cursor-not-allowed
          border border-transparent hover:border-zinc-300 dark:hover:border-zinc-700
          transition-colors duration-200
          ${sizeClasses[size]}
        `}
      />
      {showKeyboardShortcut && (
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <kbd className="bg-zinc-300 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 text-xs px-2 py-0.5 rounded font-mono border border-zinc-300 dark:border-zinc-700">
            {navigator.platform.includes('Mac') ? '⌘' : '⌘'} K
          </kbd>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
