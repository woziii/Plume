import React, { useState, useRef, useEffect } from 'react';
import { X, Paperclip, ArrowRight, Maximize2, Minimize2 } from 'lucide-react';

interface ChatMessage {
  id: string;
  content: string;
  type: 'user' | 'bot';
  timestamp: Date;
}

interface ChatProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Chat: React.FC<ChatProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target instanceof HTMLElement && e.target.closest('.chat-header')) {
      setIsDragging(true);
      dragStart.current = {
        x: e.clientX - position.x,
        y: e.clientY - position.y
      };
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.current.x,
        y: e.clientY - dragStart.current.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      content: input,
      type: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInput('');
  };

  if (!isOpen) return null;

  const chatClassNames = `fixed bg-white rounded-lg shadow-lg transition-all duration-200 ${
    isExpanded ? 'w-2/3 h-5/6' : 'w-96 h-120'
  }`;

  return (
    <div
      ref={chatRef}
      className={chatClassNames}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        zIndex: 1000
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div className="chat-header flex justify-between items-center p-4 bg-gray-50 rounded-t-lg cursor-move border-b">
        <h3 className="text-base font-medium text-gray-700 flex items-center">
          <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
          plume
        </h3>
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-400 hover:text-gray-600 p-1"
          >
            {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 h-[calc(100%-8rem)] p-4 overflow-y-auto bg-gray-50">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`mb-4 ${msg.type === 'user' ? 'text-right' : 'text-left'}`}
          >
            <div 
              className={`inline-block p-3 rounded-lg max-w-[80%] ${
                msg.type === 'user' 
                  ? 'bg-blue-600 text-white rounded-br-none' 
                  : 'bg-white shadow-sm rounded-bl-none'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t">
        <div className="flex items-center gap-2">
          <label className="cursor-pointer text-gray-400 hover:text-gray-600 p-2">
            <Paperclip className="w-5 h-5" />
            <input type="file" className="hidden" />
          </label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            className="flex-1 p-2 border border-gray-200 rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Comment puis-je vous aider ?"
          />
          <button 
            onClick={sendMessage}
            className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
          <button className="text-sm bg-white border border-gray-200 px-4 py-2 rounded-full whitespace-nowrap hover:bg-gray-50">
            Afficher les détails
          </button>
          <button className="text-sm bg-white border border-gray-200 px-4 py-2 rounded-full whitespace-nowrap hover:bg-gray-50">
            Lancer une recherche
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;