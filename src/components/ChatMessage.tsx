
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
    <div className="flex flex-col space-y-1 p-3 rounded-xl bg-gradient-to-r from-white/5 to-white/10 hover:from-white/10 hover:to-white/15 transition-all duration-300 border border-white/10 hover:border-white/20 backdrop-blur-sm">
      <div className="flex items-center space-x-2">
        <span className={`text-sm font-medium ${
          message.isHost 
            ? 'bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent' 
            : 'bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent'
        }`}>
          {message.user}
        </span>
        {message.isHost && (
          <Badge variant="secondary" className="text-xs px-2 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-400/30 backdrop-blur-sm shadow-sm">
            HOST
          </Badge>
        )}
        <span className="text-xs text-gray-400">
          {formatTime(message.timestamp)}
        </span>
      </div>
      <p className="text-sm text-gray-200 break-words leading-relaxed">
        {message.text}
      </p>
    </div>
  );
};

export default ChatMessage;
