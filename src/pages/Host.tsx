
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-white">Host Dashboard</h1>
          <div className="flex items-center space-x-4">
            {isStreaming && (
              <Badge variant="destructive" className="animate-pulse">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                LIVE
              </Badge>
            )}
            <div className="flex items-center text-white">
              <Users className="h-4 w-4 mr-2" />
              <span>{viewerCount} viewers</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Video Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Camera Preview */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Camera Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative bg-gray-800 rounded-lg overflow-hidden aspect-video">
                  {videoEnabled ? (
                    <video
                      ref={videoRef}
                      autoPlay
                      muted
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <VideoOff className="h-16 w-16 text-gray-400" />
                    </div>
                  )}
                </div>
                
                {/* Controls */}
                <div className="flex justify-center space-x-4 mt-4">
                  <Button
                    variant={videoEnabled ? "default" : "secondary"}
                    size="sm"
                    onClick={() => setVideoEnabled(!videoEnabled)}
                  >
                    {videoEnabled ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant={audioEnabled ? "default" : "secondary"}
                    size="sm"
                    onClick={() => setAudioEnabled(!audioEnabled)}
                  >
                    {audioEnabled ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Stream Controls */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Stream Controls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <label className="text-sm text-gray-300 mb-2 block">Room Code</label>
                    <div className="flex space-x-2">
                      <Input
                        value={roomCode}
                        readOnly
                        className="bg-gray-800 border-gray-600 text-white font-mono text-lg"
                      />
                      <Button variant="outline" onClick={copyRoomCode}>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  {!isStreaming ? (
                    <Button onClick={startStream} className="bg-green-600 hover:bg-green-700 flex-1">
                      Start Stream
                    </Button>
                  ) : (
                    <Button onClick={stopStream} variant="destructive" className="flex-1">
                      Stop Stream
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Section */}
          <div className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 h-96">
              <CardHeader>
                <CardTitle className="text-white">Live Chat</CardTitle>
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
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                  <Button onClick={sendMessage} size="sm">
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
