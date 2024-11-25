import React from 'react';
import { format } from 'date-fns';
import { Message } from '../types/chat';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isBot = message.sender === 'bot';
  
  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4`}>
      <div className={`max-w-[70%] rounded-lg p-3 ${
        isBot ? 'bg-gray-200' : 'bg-blue-500 text-white'
      }`}>
        <p className="text-sm">{message.content}</p>
        <span className="text-xs text-gray-500 mt-1 block">
          {format(message.timestamp, 'HH:mm')}
        </span>
      </div>
    </div>
  );
};