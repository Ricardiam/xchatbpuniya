import { useState, useRef, useEffect } from 'react';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { ChatOptions } from './components/ChatOptions';
import { getBotResponse } from './utils/chatbot';
import { Message } from './types/chat';

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "¡Hola! ¿Cómo puedo ayudarte con tu entrega hoy?",
      sender: 'bot',
      timestamp: new Date(),
    }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);

    setTimeout(() => {
      const response = getBotResponse(content);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.message,
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-blue-500 p-4 flex items-center">
          <img 
            src="/puniya-logo.png" 
            alt="PuniYa Logo" 
            className="h-8 mr-4"
          />
          <h1 className="text-white text-xl font-semibold">Soporte de Entrega</h1>
        </div>
        
        <div className="h-[500px] overflow-y-auto p-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
          
          {messages[messages.length - 1]?.sender === 'bot' && (
            <ChatOptions
              options={getBotResponse('default').options || []}
              onSelect={handleSendMessage}
            />
          )}
        </div>
        
        <div className="border-t p-4">
          <ChatInput onSend={handleSendMessage} />
        </div>
      </div>
    </div>
  );
}

export default App;