
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Video, Users, Code, Play, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-72 h-72 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 -right-10 w-72 h-72 bg-gradient-to-r from-pink-400 to-red-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-10 left-1/2 w-72 h-72 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <Code className="h-12 w-12 text-cyan-400 mr-3 drop-shadow-lg" />
              <Sparkles className="h-4 w-4 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              LiveDev
            </h1>
          </div>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto mb-8 leading-relaxed">
            Stream your coding sessions live and collaborate with developers worldwide. 
            Share knowledge, solve problems together, and learn from the community.
          </p>
          
          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gradient-to-br from-cyan-500/20 to-blue-600/20 backdrop-blur-sm rounded-xl p-6 border border-cyan-400/30 hover:border-cyan-400/50 transition-all duration-300 hover:transform hover:scale-105">
              <Video className="h-8 w-8 text-cyan-400 mx-auto mb-4 drop-shadow-lg" />
              <h3 className="text-lg font-semibold text-white mb-2">Live Streaming</h3>
              <p className="text-gray-300 text-sm">Share your screen or camera with viewers in real-time</p>
            </div>
            <div className="bg-gradient-to-br from-emerald-500/20 to-green-600/20 backdrop-blur-sm rounded-xl p-6 border border-emerald-400/30 hover:border-emerald-400/50 transition-all duration-300 hover:transform hover:scale-105">
              <Users className="h-8 w-8 text-emerald-400 mx-auto mb-4 drop-shadow-lg" />
              <h3 className="text-lg font-semibold text-white mb-2">Real-time Chat</h3>
              <p className="text-gray-300 text-sm">Interact with your audience through live messaging</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-600/20 backdrop-blur-sm rounded-xl p-6 border border-purple-400/30 hover:border-purple-400/50 transition-all duration-300 hover:transform hover:scale-105">
              <Play className="h-8 w-8 text-purple-400 mx-auto mb-4 drop-shadow-lg" />
              <h3 className="text-lg font-semibold text-white mb-2">Easy Access</h3>
              <p className="text-gray-300 text-sm">Join streams instantly with simple room codes</p>
            </div>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-sm border-purple-400/30 hover:border-purple-400/50 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full w-fit shadow-lg">
                <Video className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-white text-2xl bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">Start Streaming</CardTitle>
              <CardDescription className="text-gray-300">
                Host a live coding session and share your knowledge with the community
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Link to="/host">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300">
                  Start as Host
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-cyan-600/20 to-blue-600/20 backdrop-blur-sm border-cyan-400/30 hover:border-cyan-400/50 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full w-fit shadow-lg">
                <Users className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-white text-2xl bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">Join Stream</CardTitle>
              <CardDescription className="text-gray-300">
                Enter a room code to watch and participate in live coding sessions
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Link to="/viewer">
                <Button size="lg" variant="outline" className="border-2 border-cyan-500 text-cyan-400 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 hover:text-white px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300">
                  Join as Viewer
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Stats Section */}
        <div className="mt-20 text-center">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-8">Join the Community</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 backdrop-blur-sm rounded-xl p-6 border border-purple-400/20">
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">1K+</div>
              <div className="text-gray-300">Active Developers</div>
            </div>
            <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-600/10 backdrop-blur-sm rounded-xl p-6 border border-cyan-400/20">
              <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">500+</div>
              <div className="text-gray-300">Live Sessions</div>
            </div>
            <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 backdrop-blur-sm rounded-xl p-6 border border-emerald-400/20">
              <div className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">24/7</div>
              <div className="text-gray-300">Community Support</div>
            </div>
            <div className="bg-gradient-to-br from-yellow-500/10 to-orange-600/10 backdrop-blur-sm rounded-xl p-6 border border-yellow-400/20">
              <div className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">Free</div>
              <div className="text-gray-300">Always</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
