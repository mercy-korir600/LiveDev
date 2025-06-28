
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Video, Users, Code, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Code className="h-12 w-12 text-purple-400 mr-3" />
            <h1 className="text-5xl font-bold text-white">LiveDev</h1>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Stream your coding sessions live and collaborate with developers worldwide. 
            Share knowledge, solve problems together, and learn from the community.
          </p>
          
          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <Video className="h-8 w-8 text-blue-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Live Streaming</h3>
              <p className="text-gray-300 text-sm">Share your screen or camera with viewers in real-time</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <Users className="h-8 w-8 text-green-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Real-time Chat</h3>
              <p className="text-gray-300 text-sm">Interact with your audience through live messaging</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <Play className="h-8 w-8 text-purple-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Easy Access</h3>
              <p className="text-gray-300 text-sm">Join streams instantly with simple room codes</p>
            </div>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-purple-500/20 rounded-full w-fit">
                <Video className="h-8 w-8 text-purple-400" />
              </div>
              <CardTitle className="text-white text-2xl">Start Streaming</CardTitle>
              <CardDescription className="text-gray-300">
                Host a live coding session and share your knowledge with the community
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Link to="/host">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3">
                  Start as Host
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-blue-500/20 rounded-full w-fit">
                <Users className="h-8 w-8 text-blue-400" />
              </div>
              <CardTitle className="text-white text-2xl">Join Stream</CardTitle>
              <CardDescription className="text-gray-300">
                Enter a room code to watch and participate in live coding sessions
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Link to="/viewer">
                <Button size="lg" variant="outline" className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white px-8 py-3">
                  Join as Viewer
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Stats Section */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Join the Community</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="text-3xl font-bold text-purple-400">1K+</div>
              <div className="text-gray-300">Active Developers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-400">500+</div>
              <div className="text-gray-300">Live Sessions</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400">24/7</div>
              <div className="text-gray-300">Community Support</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-400">Free</div>
              <div className="text-gray-300">Always</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
