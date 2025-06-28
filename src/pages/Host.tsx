
import { useState, useRef, useEffect } from 'react';
import { Video, VideoOff, Mic, MicOff, Send, Copy, Users } from 'lucide-react';
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

const Host = () => {
  const [isStreaming, setIsStreaming] = useState(false);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [roomCode, setRoomCode] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [viewerCount, setViewerCount] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  // Generate room code
  useEffect(() => {
    const generateRoomCode = () => {
      const code = Math.random().toString(36).substring(2, 8).toUpperCase();
      setRoomCode(code);
    };
    generateRoomCode();
  }, []);

  // Initialize camera
  useEffect(() => {
    const initCamera = async () => {
      try {
        if (videoRef.current && videoEnabled) {
          const stream = await navigator.mediaDevices.getUserMedia({ 
            video: true, 
            audio: audioEnabled 
          });
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        toast({
          title: "Camera Error",
          description: "Unable to access camera. Please check permissions.",
          variant: "destructive",
        });
      }
    };

    initCamera();
  }, [videoEnabled, audioEnabled, toast]);

  const startStream = () => {
    setIsStreaming(true);
    setViewerCount(Math.floor(Math.random() * 10) + 1); // Simulated viewer count
    toast({
      title: "Stream Started!",
      description: `Your stream is live with room code: ${roomCode}`,
    });
  };

  const stopStream = () => {
    setIsStreaming(false);
    setViewerCount(0);
    toast({
      title: "Stream Ended",
      description: "Your stream has been stopped.",
    });
  };

  const copyRoomCode = () => {
    navigator.clipboard.writeText(roomCode);
    toast({
      title: "Copied!",
      description: "Room code copied to clipboard",
    });
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        user: 'Host',
        text: newMessage,
        timestamp: new Date(),
        isHost: true,
      };
      setMessages(prev => [...prev, message]);
      setNewMessage('');
    }
  };

  // Simulate receiving messages
  useEffect(() => {
    if (isStreaming) {
      const interval = setInterval(() => {
        if (Math.random() > 0.7) { // 30% chance every 5 seconds
          const sampleMessages = [
            "Great explanation!",
            "Can you zoom in a bit?",
            "What's that function doing?",
            "This is really helpful, thanks!",
            "Have you tried using async/await?",
            "The code looks clean!",
          ];
          const randomMessage = sampleMessages[Math.floor(Math.random() * sampleMessages.length)];
          const message: Message = {
            id: Date.now().toString(),
            user: `Viewer${Math.floor(Math.random() * 99) + 1}`,
            text: randomMessage,
            timestamp: new Date(),
          };
          setMessages(prev => [...prev, message]);
        }
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isStreaming]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Host Dashboard</h1>
          <div className="flex items-center space-x-4">
            {isStreaming && (
              <Badge variant="destructive" className="animate-pulse bg-gradient-to-r from-red-500 to-pink-500 border-red-400/50">
                <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                LIVE
              </Badge>
            )}
            <div className="flex items-center text-white bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-lg px-3 py-2 border border-purple-400/30">
              <Users className="h-4 w-4 mr-2 text-purple-400" />
              <span>{viewerCount} viewers</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Video Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Camera Preview */}
            <Card className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 backdrop-blur-sm border-cyan-400/30 hover:border-cyan-400/50 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-white bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Camera Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden aspect-video border border-gray-700/50">
                  {videoEnabled ? (
                    <video
                      ref={videoRef}
                      autoPlay
                      muted
                      className="w-full h-full object-cover rounded-xl"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <VideoOff className="h-16 w-16 text-gray-400" />
                    </div>
                  )}
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                </div>
                
                {/* Controls */}
                <div className="flex justify-center space-x-4 mt-4">
                  <Button
                    variant={videoEnabled ? "default" : "secondary"}
                    size="sm"
                    onClick={() => setVideoEnabled(!videoEnabled)}
                    className={videoEnabled 
                      ? "bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white shadow-lg" 
                      : "bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white"
                    }
                  >
                    {videoEnabled ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant={audioEnabled ? "default" : "secondary"}
                    size="sm"
                    onClick={() => setAudioEnabled(!audioEnabled)}
                    className={audioEnabled 
                      ? "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg" 
                      : "bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white"
                    }
                  >
                    {audioEnabled ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Stream Controls */}
            <Card className="bg-gradient-to-br from-purple-500/10 to-pink-600/10 backdrop-blur-sm border-purple-400/30 hover:border-purple-400/50 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-white bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Stream Controls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <label className="text-sm text-gray-300 mb-2 block">Room Code</label>
                    <div className="flex space-x-2">
                      <Input
                        value={roomCode}
                        readOnly
                        className="bg-gradient-to-r from-gray-800 to-gray-900 border-gray-600 text-white font-mono text-lg shadow-inner"
                      />
                      <Button variant="outline" onClick={copyRoomCode} className="border-purple-400/50 text-purple-400 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white transition-all duration-300">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  {!isStreaming ? (
                    <Button onClick={startStream} className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 flex-1 shadow-lg hover:shadow-xl transition-all duration-300">
                      Start Stream
                    </Button>
                  ) : (
                    <Button onClick={stopStream} variant="destructive" className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 shadow-lg hover:shadow-xl transition-all duration-300">
                      Stop Stream
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Section */}
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border-gray-600/30 hover:border-gray-500/50 transition-all duration-300 h-96">
              <CardHeader>
                <CardTitle className="text-white bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Live Chat</CardTitle>
              </CardHeader>
              <CardContent className="h-full flex flex-col">
                <div className="flex-1 overflow-y-auto space-y-2 mb-4">
                  {messages.length === 0 ? (
                    <div className="text-center text-gray-400 py-8">
                      No messages yet. Start streaming to see viewer messages!
                    </div>
                  ) : (
                    messages.map((message) => (
                      <ChatMessage key={message.id} message={message} />
                    ))
                  )}
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

export default Host;
