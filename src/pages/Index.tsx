
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Users, MapPin, Star } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-orange-200/50 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-orange-800">
            Bucket List Buddies
          </div>
          <div className="space-x-4">
            <Link to="/submit" className="text-orange-700 hover:text-orange-900">
              Submit Your List
            </Link>
            <Link to="/dashboard" className="text-orange-700 hover:text-orange-900">
              My Dashboard
            </Link>
            <Link to="/discover" className="text-orange-700 hover:text-orange-900">
              Discover
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-orange-900 mb-6 leading-tight">
            Welcome to<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-rose-600">
              Bucket List Buddies
            </span>
          </h1>
          
          <div className="text-xl text-orange-800 mb-8 space-y-4 leading-relaxed">
            <p>Everyone has a list. Things you want to do before... well, before life moves on.</p>
            <p className="font-semibold">But here's the thing: dreams need witnesses.</p>
            <p>Whether it's learning to tango, finishing that novel, or seeing the Northern Lights—this is a space for turning wishes into shared journeys.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to="/submit">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 text-lg">
                Submit Your First Item
              </Button>
            </Link>
            <Link to="/discover">
              <Button size="lg" variant="outline" className="border-orange-300 text-orange-700 hover:bg-orange-50 px-8 py-3 text-lg">
                Discover Dreams
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-orange-900 mb-12">
          How It Works
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-orange-200 bg-white/60 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <Heart className="w-12 h-12 mx-auto mb-4 text-orange-600" />
              <h3 className="text-xl font-semibold text-orange-900 mb-3">
                Add to Your List
              </h3>
              <p className="text-orange-700">
                Share your dreams, big or small. From learning to surf to writing poetry—no dream too big or too weird.
              </p>
            </CardContent>
          </Card>

          <Card className="border-orange-200 bg-white/60 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <Users className="w-12 h-12 mx-auto mb-4 text-orange-600" />
              <h3 className="text-xl font-semibold text-orange-900 mb-3">
                Find Your Buddy
              </h3>
              <p className="text-orange-700">
                Get matched with others who share your dreams. Form dyads or triads and support each other.
              </p>
            </CardContent>
          </Card>

          <Card className="border-orange-200 bg-white/60 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <Star className="w-12 h-12 mx-auto mb-4 text-orange-600" />
              <h3 className="text-xl font-semibold text-orange-900 mb-3">
                Take the Next Step
              </h3>
              <p className="text-orange-700">
                Join forums, share your journey, and celebrate completions together. Dreams become reality.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white/40 backdrop-blur-sm py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-orange-900 mb-12">
            Dreams in Motion
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-orange-200 bg-white/80">
              <CardContent className="p-6">
                <p className="text-orange-800 mb-4 italic">
                  "I always wanted to learn pottery but felt intimidated. Through Bucket List Buddies, I found Sarah who had the same dream. We signed up for classes together and now we have a weekly pottery date!"
                </p>
                <p className="text-orange-700 font-semibold">— Maya, Oakland</p>
              </CardContent>
            </Card>

            <Card className="border-orange-200 bg-white/80">
              <CardContent className="p-6">
                <p className="text-orange-800 mb-4 italic">
                  "My dream was to hike all the trails in Point Reyes. I met two other nature lovers here, and we've been exploring together every weekend. It's amazing how much more fun adventures are with friends!"
                </p>
                <p className="text-orange-700 font-semibold">— David, San Francisco</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-6xl mx-auto px-4 py-20 text-center">
        <div className="bg-gradient-to-r from-orange-600 to-rose-600 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Turn Dreams into Reality?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join our community of dreamers and doers. No dream too big or too weird.
          </p>
          <Link to="/submit">
            <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50 px-8 py-3 text-lg font-semibold">
              Submit Your Bucket List
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-orange-900 text-orange-100 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p>&copy; 2024 Bucket List Buddies. Made with ❤️ in the Bay Area.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
