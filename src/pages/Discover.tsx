
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Heart, Users, Sparkles } from 'lucide-react';

interface PublicDream {
  id: number;
  title: string;
  description: string;
  location: string;
  tags: string[];
  timing: string;
  author: string;
  isAnonymous: boolean;
  createdAt: string;
}

const Discover = () => {
  const [dreams, setDreams] = useState<PublicDream[]>([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Load public dreams from localStorage and add some sample data
    const storedItems = JSON.parse(localStorage.getItem('bucketListItems') || '[]');
    const publicItems = storedItems
      .filter((item: any) => item.visibility.startsWith('public'))
      .map((item: any) => ({
        ...item,
        author: item.visibility === 'public-anonymous' ? 'Anonymous Dreamer' : 'Fellow Dreamer',
        isAnonymous: item.visibility === 'public-anonymous'
      }));

    // Add some sample dreams to populate the discovery page
    const sampleDreams = [
      {
        id: 9001,
        title: "Learn to tango in Buenos Aires",
        description: "I've always been mesmerized by the passion and elegance of tango. Would love to spend a month in Argentina learning from the masters.",
        location: "Buenos Aires, Argentina",
        tags: ["Travel", "Learning", "Culture"],
        timing: "this-year",
        author: "Maya from Oakland",
        isAnonymous: false,
        createdAt: "2024-01-15"
      },
      {
        id: 9002,
        title: "Write and publish a poetry collection",
        description: "I have notebooks full of poems but have never shared them. My dream is to compile them into a book and see it in print.",
        location: "Bay Area",
        tags: ["Creative", "Art", "Writing"],
        timing: "someday",
        author: "Anonymous Dreamer",
        isAnonymous: true,
        createdAt: "2024-01-10"
      },
      {
        id: 9003,
        title: "Hike the entire Pacific Crest Trail",
        description: "2,650 miles of pure adventure through California, Oregon, and Washington. The ultimate test of endurance and connection with nature.",
        location: "Pacific Coast",
        tags: ["Adventure", "Nature", "Fitness"],
        timing: "flexible",
        author: "David from SF",
        isAnonymous: false,
        createdAt: "2024-01-08"
      },
      {
        id: 9004,
        title: "Start a community garden in my neighborhood",
        description: "There's an empty lot that could become something beautiful. I want to bring neighbors together to grow food and flowers.",
        location: "East Bay",
        tags: ["Community", "Nature", "Volunteering"],
        timing: "soon",
        author: "Sarah L.",
        isAnonymous: false,
        createdAt: "2024-01-05"
      },
      {
        id: 9005,
        title: "Learn to surf at Ocean Beach",
        description: "Living in SF and never learning to surf feels like a crime! Looking for patient people to learn with.",
        location: "San Francisco",
        tags: ["Adventure", "Fitness", "Local"],
        timing: "soon",
        author: "Anonymous Dreamer",
        isAnonymous: true,
        createdAt: "2024-01-03"
      }
    ];

    setDreams([...publicItems, ...sampleDreams]);
  }, []);

  const filteredDreams = filter === 'all' 
    ? dreams 
    : dreams.filter(dream => dream.tags.some(tag => tag.toLowerCase().includes(filter.toLowerCase())));

  const getTimingDisplay = (timing: string) => {
    switch (timing) {
      case 'soon': return 'Within 3 months';
      case 'this-year': return 'This year';
      case 'someday': return 'Someday';
      case 'flexible': return 'Flexible';
      default: return timing;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-orange-200/50 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-orange-800">
            Bucket List Buddies
          </Link>
          <div className="space-x-4">
            <Link to="/submit" className="text-orange-700 hover:text-orange-900">
              Submit Your List
            </Link>
            <Link to="/dashboard" className="text-orange-700 hover:text-orange-900">
              My Dashboard
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-orange-900 mb-4">
            Discover Dreams
          </h1>
          <p className="text-xl text-orange-700 max-w-3xl mx-auto">
            Get inspired by what others are dreaming. Find your future adventure buddy or simply marvel at the beautiful diversity of human aspirations.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="flex flex-wrap gap-4">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Dreams</SelectItem>
                <SelectItem value="travel">Travel Adventures</SelectItem>
                <SelectItem value="creative">Creative Projects</SelectItem>
                <SelectItem value="learning">Learning & Skills</SelectItem>
                <SelectItem value="adventure">Adventures</SelectItem>
                <SelectItem value="community">Community</SelectItem>
                <SelectItem value="nature">Nature</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2 text-sm text-orange-700">
            <Sparkles className="w-4 h-4" />
            <span>{filteredDreams.length} dreams discovered</span>
          </div>
        </div>

        {/* Dreams Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDreams.map(dream => (
            <Card key={dream.id} className="border-orange-200 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all hover:scale-105">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start gap-2">
                  <CardTitle className="text-lg text-orange-900 leading-tight">
                    {dream.title}
                  </CardTitle>
                  <Heart className="w-5 h-5 text-orange-300 hover:text-orange-600 hover:fill-current cursor-pointer transition-colors" />
                </div>
                <p className="text-sm text-orange-600">
                  by {dream.author}
                </p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {dream.description && (
                  <p className="text-orange-700 text-sm leading-relaxed">
                    {dream.description}
                  </p>
                )}

                <div className="flex flex-wrap gap-2">
                  {dream.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="bg-orange-100 text-orange-800 text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="space-y-2 text-sm text-orange-700">
                  {dream.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{dream.location}</span>
                    </div>
                  )}
                  
                  {dream.timing && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-orange-100 px-2 py-1 rounded">
                        {getTimingDisplay(dream.timing)}
                      </span>
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-orange-100">
                  <Button 
                    size="sm" 
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Connect as Buddy
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <Card className="border-orange-200 bg-gradient-to-r from-orange-600 to-rose-600 text-white">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">
                Inspired by These Dreams?
              </h3>
              <p className="text-lg mb-6 opacity-90">
                Add your own dreams to the mix and help others discover new possibilities.
              </p>
              <Link to="/submit">
                <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50">
                  Share Your Dreams
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Discover;
