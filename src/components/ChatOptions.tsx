import React from 'react';

interface ChatOptionsProps {
  options: string[];
  onSelect: (option: string) => void;
}

export const ChatOptions: React.FC<ChatOptionsProps> = ({ options, onSelect }) => {
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onSelect(option)}
          className="bg-gray-100 hover:bg-gray-200 rounded-full px-4 py-2 text-sm text-gray-700 transition-colors"
        >
          {option}
        </button>
      ))}
    </div>
  );
};