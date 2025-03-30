import { ChatWidget } from '~/components/ui/chat-widget';

export default function ChatDemo() {
  const handleSendMessage = (message: string) => {
    console.log('Message sent:', message);
    // Here you would typically handle the message, e.g., send it to your backend
  };

  const handleAddClick = () => {
    console.log('Add button clicked');
    // Handle add button click
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 p-4">
      <ChatWidget
        agentName="Sofia Davis"
        agentEmail="m@example.com"
        onSendMessage={handleSendMessage}
        onAddClick={handleAddClick}
      />
    </div>
  );
}
