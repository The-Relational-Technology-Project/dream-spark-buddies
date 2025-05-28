
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Users, MapPin, Star, Sparkles } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 relative overflow-hidden">
      {/* Floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-4 h-4 bg-yellow-300 rounded-full opacity-60 animate-bounce"></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-pink-300 rounded-full opacity-40 animate-pulse"></div>
        <div className="absolute bottom-40 left-20 w-3 h-3 bg-blue-300 rounded-full opacity-50 animate-bounce delay-300"></div>
        <div className="absolute top-60 left-1/3 w-5 h-5 bg-purple-300 rounded-full opacity-30 animate-pulse delay-700"></div>
      </div>

      {/* Navigation */}
      <nav className="bg-white/70 backdrop-blur-md border-b border-pink-200/30 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-5 flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            ✨ Bucket List Buddies
          </div>
          <div className="space-x-6">
            <Link to="/submit" className="text-purple-700 hover:text-pink-600 transition-colors font-medium">
              Add Dreams
            </Link>
            <Link to="/dashboard" className="text-purple-700 hover:text-pink-600 transition-colors font-medium">
              My Dreams
            </Link>
            <Link to="/discover" className="text-purple-700 hover:text-pink-600 transition-colors font-medium">
              Discover
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-4 py-24 text-center relative">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
            <span className="block text-purple-900 mb-2">Dreams are</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 animate-pulse">
              better together
            </span>
          </h1>
          
          <div className="text-2xl text-purple-800 mb-12 font-light">
            <p>Share what makes your heart sing.</p>
            <p className="text-pink-600 font-medium">Find someone to dream with.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
            <Link to="/submit">
              <Button size="lg" className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-10 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                <Sparkles className="w-5 h-5 mr-2" />
                Share Your Dreams
              </Button>
            </Link>
            <Link to="/discover">
              <Button size="lg" variant="outline" className="border-2 border-purple-300 text-purple-700 hover:bg-purple-50 px-10 py-4 text-lg rounded-full shadow-md hover:shadow-lg transition-all">
                Discover Dreams
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center text-purple-900 mb-16">
          How the Magic Happens
        </h2>
        
        <div className="grid md:grid-cols-3 gap-10">
          <Card className="border-0 bg-white/60 backdrop-blur-sm shadow-lg rounded-3xl hover:transform hover:scale-105 transition-all">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full flex items-center justify-center">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-purple-900 mb-4">
                Share Your Heart
              </h3>
              <p className="text-purple-700 leading-relaxed">
                Add dreams to your list. Big ones, tiny ones, weird ones, wonderful ones.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/60 backdrop-blur-sm shadow-lg rounded-3xl hover:transform hover:scale-105 transition-all">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-purple-900 mb-4">
                Find Your People
              </h3>
              <p className="text-purple-700 leading-relaxed">
                Get matched with dreamers who share your vision and want to journey together.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/60 backdrop-blur-sm shadow-lg rounded-3xl hover:transform hover:scale-105 transition-all">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-yellow-400 to-pink-400 rounded-full flex items-center justify-center">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-purple-900 mb-4">
                Make It Real
              </h3>
              <p className="text-purple-700 leading-relaxed">
                Support each other, share the journey, and celebrate when dreams come true.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white/40 backdrop-blur-sm py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-purple-900 mb-16">
            Dreams Coming True
          </h2>
          
          <div className="grid md:grid-cols-2 gap-10">
            <Card className="border-0 bg-white/80 shadow-lg rounded-3xl">
              <CardContent className="p-8">
                <p className="text-purple-800 mb-6 italic text-lg leading-relaxed">
                  "I always wanted to learn pottery but felt intimidated. Through Bucket List Buddies, I found Sarah who had the same dream. We signed up for classes together and now we have a weekly pottery date! ✨"
                </p>
                <p className="text-purple-700 font-semibold">— Maya, Oakland</p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/80 shadow-lg rounded-3xl">
              <CardContent className="p-8">
                <p className="text-purple-800 mb-6 italic text-lg leading-relaxed">
                  "My dream was to hike all the trails in Point Reyes. I met two other nature lovers here, and we've been exploring together every weekend. Adventures are so much sweeter with friends! 🌲"
                </p>
                <p className="text-purple-700 font-semibold">— David, San Francisco</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-5xl mx-auto px-4 py-24 text-center">
        <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-3xl p-12 text-white shadow-2xl">
          <h2 className="text-4xl font-bold mb-6">
            Your Dreams Are Waiting ✨
          </h2>
          <p className="text-xl mb-10 opacity-90 font-light">
            Join our community of dreamers and doers. Every dream deserves a chance.
          </p>
          <Link to="/submit">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-purple-50 px-10 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
              <Heart className="w-5 h-5 mr-2" />
              Start Your Dream List
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-purple-900 text-purple-100 py-10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-lg">Made with 💜 in the Bay Area • Where dreams find their wings</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
