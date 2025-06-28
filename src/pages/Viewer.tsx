
import { useState, useEffect } from 'react';
import { Send, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import ChatMessage from '@/components/ChatMessage';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  user: string;
  text: string;
  timestamp: Date;
  isHost?: boolean;
}

const Viewer = () => {
  const [roomCode, setRoomCode] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [viewerCount, setViewerCount] = useState(0);
  const [username, setUsername] = useState('');
  const { toast } = useToast();

  // Generate random username
  useEffect(() => {
    const generateUsername = () => {
      const adjectives = ['Quick', 'Smart', 'Cool', 'Epic', 'Swift', 'Bright'];
      const nouns = ['Coder', 'Dev', 'Hacker', 'Builder', 'Maker', 'Ninja'];
      const randomAdj = adjectives[Math.floor(Math.random() * adjectives.length)];
      const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
      const randomNum = Math.floor(Math.random() * 99) + 1;
      setUsername(`${randomAdj}${randomNoun}${randomNum}`);
    };
    generateUsername();
  }, []);

  const joinStream = () => {
    if (roomCode.trim()) {
      setIsConnected(true);
      setViewerCount(Math.floor(Math.random() * 10) + 1);
      toast({
        title: "Connected!",
        description: `Successfully joined room: ${roomCode.toUpperCase()}`,
      });
      
      // Add welcome message from host
      const welcomeMessage: Message = {
        id: 'welcome',
        user: 'Host',
        text: `Welcome to the stream, ${username}! 👋`,
        timestamp: new Date(),
        isHost: true,
      };
      setMessages([welcomeMessage]);
    } else {
      toast({
        title: "Invalid Room Code",
        description: "Please enter a valid room code",
        variant: "destructive",
      });
    }
  };

  const sendMessage = () => {
    if (newMessage.trim() && isConnected) {
      const message: Message = {
        id: Date.now().toString(),
        user: username,
        text: newMessage,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, message]);
      setNewMessage('');
    }
  };

  // Simulate host responses
  useEffect(() => {
    if (isConnected) {
      const interval = setInterval(() => {
        if (Math.random() > 0.8) { // 20% chance every 5 seconds
          const hostResponses = [
            "Thanks for watching!",
            "Great question! Let me explain...",
            "You're right, that's a better approach",
            "I'll fix that in a moment",
            "Good catch everyone!",
            "Let me zoom in for better visibility",
          ];
          const randomResponse = hostResponses[Math.floor(Math.random() * hostResponses.length)];
          const message: Message = {
            id: Date.now().toString(),
            user: 'Host',
            text: randomResponse,
            timestamp: new Date(),
            isHost: true,
          };
          setMessages(prev => [...prev, message]);
        }
      }, 7000);

      return () => clearInterval(interval);
    }
  }, [isConnected]);

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        </div>

        <Card className="w-full max-w-md bg-gradient-to-br from-cyan-500/10 to-blue-600/10 backdrop-blur-sm border-cyan-400/30 shadow-2xl relative z-10">
          <CardHeader className="text-center">
            <CardTitle className="text-white text-3xl bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Join Live Stream</CardTitle>
            <p className="text-gray-300">Enter the room code to join a coding session</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm text-gray-300 mb-2 block">Room Code</label>
              <Input
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                onKeyPress={(e) => e.key === 'Enter' && joinStream()}
                placeholder="Enter room code..."
                className="bg-gradient-to-r from-gray-800 to-gray-900 border-gray-600 text-white font-mono text-lg text-center shadow-inner"
                maxLength={6}
              />
            </div>
            <div>
              <label className="text-sm text-gray-300 mb-2 block">Your Username</label>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username..."
                className="bg-gradient-to-r from-gray-800 to-gray-900 border-gray-600 text-white shadow-inner"
              />
            </div>
            <Button onClick={joinStream} className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 shadow-lg hover:shadow-xl transition-all duration-300">
              Join Stream
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900 p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Live Stream</h1>
            <Badge variant="destructive" className="animate-pulse bg-gradient-to-r from-red-500 to-red-600 border-red-400/50">
              <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
              LIVE
            </Badge>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-white bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-sm rounded-lg px-3 py-2 border border-blue-400/30">
              <Users className="h-4 w-4 mr-2 text-blue-400" />
              <span>{viewerCount} viewers</span>
            </div>
            <Badge variant="outline" className="text-cyan-400 border-cyan-400/50 bg-cyan-500/10 backdrop-blur-sm">
              Room: {roomCode}
            </Badge>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Video Section */}
          <div className="lg:col-span-2">
            <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border-gray-600/30 hover:border-gray-500/50 transition-all duration-300">
              <CardContent className="p-0">
                <div className="relative bg-gradient-to-br from-blue-900 to-cyan-900 rounded-lg overflow-hidden aspect-video">
                  {/* Simulated video stream */}
                  <div className="w-full h-full bg-gradient-to-br from-blue-900 via-cyan-900 to-blue-800 flex items-center justify-center relative">
                    {/* Animated gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-transparent to-cyan-500/20 animate-pulse"></div>
                    
                    <div className="text-center relative z-10">
                      <div className="w-32 h-32 bg-gradient-to-br from-cyan-400/30 to-blue-400/30 rounded-full flex items-center justify-center mb-4 mx-auto backdrop-blur-sm border border-white/20">
                        <Users className="h-16 w-16 text-white drop-shadow-lg" />
                      </div>
                      <h3 className="text-white text-xl font-semibold mb-2 bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">Host is streaming</h3>
                      <p className="text-gray-300">Live coding session in progress...</p>
                      <div className="mt-4 flex justify-center">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce shadow-lg"></div>
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce shadow-lg" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce shadow-lg" style={{animationDelay: '0.2s'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Section */}
          <div>
            <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border-gray-600/30 hover:border-gray-500/50 transition-all duration-300 h-96">
              <CardHeader>
                <CardTitle className="text-white bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Live Chat</CardTitle>
              </CardHeader>
              <CardContent className="h-full flex flex-col">
                <div className="flex-1 overflow-y-auto space-y-2 mb-4">
                  {messages.map((message) => (
                    <ChatMessage key={message.id} message={message} />
                  ))}
                </div>
                
                <div className="flex space-x-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Type a message..."
                    className="bg-gradient-to-r from-gray-800 to-gray-900 border-gray-600 text-white shadow-inner"
                  />
                  <Button onClick={sendMessage} size="sm" className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 shadow-lg">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Viewer;
