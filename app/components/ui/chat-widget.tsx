import { useState } from 'react';
import { Button } from './button';
import { Input } from './input';
import { PlusCircle, Send } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'agent';
  timestamp: Date;
}

interface ChatWidgetProps {
  agentName: string;
  agentEmail: string;
  agentAvatar?: string;
  onSendMessage: (message: string) => void;
  onAddClick?: () => void;
}

export function ChatWidget({
  agentName,
  agentEmail,
  agentAvatar = '/default-avatar.png',
  onSendMessage,
  onAddClick,
}: ChatWidgetProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hi, how can I help you today?',
      sender: 'agent',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    onSendMessage(inputValue);
    setInputValue('');
  };

  return (
    <div className="flex w-full max-w-md flex-col overflow-hidden rounded-lg bg-black text-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-700 p-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 overflow-hidden rounded-full">
            <img src={agentAvatar} alt={agentName} className="h-full w-full object-cover" />
          </div>
          <div>
            <h3 className="font-semibold text-white">{agentName}</h3>
            <p className="text-sm text-gray-400">{agentEmail}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-400 hover:text-white"
          onClick={onAddClick}
        >
          <PlusCircle className="h-6 w-6" />
        </Button>
      </div>

      {/* Messages */}
      <div className="max-h-[400px] flex-1 space-y-4 overflow-y-auto p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                message.sender === 'user' ? 'ml-auto bg-white text-black' : 'bg-gray-800 text-white'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="border-t border-gray-700 p-4">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="border-gray-700 bg-gray-800 text-white"
          />
          <Button
            onClick={handleSend}
            className="px-4"
            variant="secondary"
            disabled={!inputValue.trim()}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
