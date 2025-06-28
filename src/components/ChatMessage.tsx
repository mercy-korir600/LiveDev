
import { Badge } from '@/components/ui/badge';

interface Message {
  id: string;
  user: string;
  text: string;
  timestamp: Date;
  isHost?: boolean;
}

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col space-y-1 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
      <div className="flex items-center space-x-2">
        <span className={`text-sm font-medium ${message.isHost ? 'text-purple-400' : 'text-blue-400'}`}>
          {message.user}
        </span>
        {message.isHost && (
          <Badge variant="secondary" className="text-xs px-1 py-0 bg-purple-500/20 text-purple-300 border-purple-400/20">
            HOST
          </Badge>
        )}
        <span className="text-xs text-gray-400">
          {formatTime(message.timestamp)}
        </span>
      </div>
      <p className="text-sm text-gray-200 break-words">
        {message.text}
      </p>
    </div>
  );
};

export default ChatMessage;
