
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Heart, Users, Sparkles, Star } from 'lucide-react';

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
    // Load public dreams from localStorage and add extensive sample data
    const storedItems = JSON.parse(localStorage.getItem('bucketListItems') || '[]');
    const publicItems = storedItems
      .filter((item: any) => item.visibility.startsWith('public'))
      .map((item: any) => ({
        ...item,
        author: item.visibility === 'public-anonymous' ? 'Anonymous Dreamer' : 'Fellow Dreamer',
        isAnonymous: item.visibility === 'public-anonymous'
      }));

    // Extensive sample dreams to populate the discovery page
    const sampleDreams = [
      {
        id: 9001,
        title: "Learn to tango in Buenos Aires",
        description: "I've always been mesmerized by the passion and elegance of tango. Would love to spend a month in Argentina learning from the masters and dancing under the stars.",
        location: "Buenos Aires, Argentina",
        tags: ["Travel", "Learning", "Culture", "Dance"],
        timing: "this-year",
        author: "Maya ✨",
        isAnonymous: false,
        createdAt: "2024-01-15"
      },
      {
        id: 9002,
        title: "Write and publish a poetry collection about fog",
        description: "I have notebooks full of poems about morning mist and SF fog. My dream is to compile them into a book called 'Conversations with Clouds' and see it in print.",
        location: "Bay Area",
        tags: ["Creative", "Art", "Writing"],
        timing: "someday",
        author: "Anonymous Dreamer 🌫️",
        isAnonymous: true,
        createdAt: "2024-01-10"
      },
      {
        id: 9003,
        title: "Build a tiny house shaped like a mushroom",
        description: "I want to design and build the most whimsical tiny home ever - complete with curved walls, a spiral staircase, and a garden roof that actually grows mushrooms!",
        location: "Northern California",
        tags: ["Creative", "DIY", "Nature", "Architecture"],
        timing: "flexible",
        author: "Forest Dreamer 🍄",
        isAnonymous: false,
        createdAt: "2024-01-08"
      },
      {
        id: 9004,
        title: "Start a community garden with fairy doors",
        description: "There's an empty lot that could become something magical. I want to bring neighbors together to grow food and flowers, plus install tiny fairy doors throughout for kids to discover.",
        location: "East Bay",
        tags: ["Community", "Nature", "Volunteering", "Magic"],
        timing: "soon",
        author: "Sarah the Garden Fairy 🧚‍♀️",
        isAnonymous: false,
        createdAt: "2024-01-05"
      },
      {
        id: 9005,
        title: "Learn to surf at Ocean Beach with my dog",
        description: "Living in SF and never learning to surf feels wrong! Plus my golden retriever loves the ocean - we want to learn together and become the coolest beach duo.",
        location: "San Francisco",
        tags: ["Adventure", "Fitness", "Local", "Pets"],
        timing: "soon",
        author: "Anonymous Beach Buddy 🏄‍♀️",
        isAnonymous: true,
        createdAt: "2024-01-03"
      },
      {
        id: 9006,
        title: "Host dinner parties where everyone brings a story",
        description: "I want to create magical evenings where strangers become friends over food and storytelling. Each guest brings a dish and a true story to share.",
        location: "San Francisco",
        tags: ["Community", "Food", "Storytelling", "Social"],
        timing: "soon",
        author: "The Story Collector 📚",
        isAnonymous: false,
        createdAt: "2024-01-01"
      },
      {
        id: 9007,
        title: "Learn to make sourdough bread that actually rises",
        description: "I've failed at sourdough 47 times. I want to find a patient teacher or fellow learner to finally crack the code of perfect, fluffy bread.",
        location: "Bay Area",
        tags: ["Learning", "Food", "Cooking"],
        timing: "flexible",
        author: "Bread Failure Expert 🍞",
        isAnonymous: true,
        createdAt: "2023-12-28"
      },
      {
        id: 9008,
        title: "Create an art installation with recycled ocean plastic",
        description: "I want to turn beach cleanup into art - collecting plastic waste and transforming it into a beautiful sculpture that tells the story of ocean conservation.",
        location: "California Coast",
        tags: ["Art", "Environment", "Ocean", "Creative"],
        timing: "this-year",
        author: "Ocean Artist 🌊",
        isAnonymous: false,
        createdAt: "2023-12-25"
      },
      {
        id: 9009,
        title: "Take a pottery class in Japan",
        description: "I dream of learning traditional Japanese ceramics from masters in a small village, working with clay while surrounded by cherry blossoms.",
        location: "Japan",
        tags: ["Travel", "Learning", "Culture", "Art"],
        timing: "someday",
        author: "Clay Dreamer 🏺",
        isAnonymous: true,
        createdAt: "2023-12-20"
      },
      {
        id: 9010,
        title: "Organize a neighborhood stargazing club",
        description: "Light pollution makes it hard to see stars in the city. I want to organize monthly trips to dark sky locations and teach people about constellations.",
        location: "Bay Area",
        tags: ["Community", "Science", "Nature", "Astronomy"],
        timing: "soon",
        author: "Star Whisperer ⭐",
        isAnonymous: false,
        createdAt: "2023-12-18"
      },
      {
        id: 9011,
        title: "Learn to skateboard at 35",
        description: "I always thought I was too old, but seeing kids at the skate park made me realize dreams don't have expiration dates. Time to roll!",
        location: "San Francisco",
        tags: ["Adventure", "Fitness", "Local", "Personal Growth"],
        timing: "soon",
        author: "Late Bloomer 🛹",
        isAnonymous: true,
        createdAt: "2023-12-15"
      },
      {
        id: 9012,
        title: "Write children's books about everyday magic",
        description: "I want to write stories that help kids see the magic in ordinary things - like how sidewalk cracks can be rivers for ants, or how shadows dance.",
        location: "Bay Area",
        tags: ["Creative", "Writing", "Children", "Magic"],
        timing: "flexible",
        author: "Magic Finder ✨",
        isAnonymous: false,
        createdAt: "2023-12-12"
      },
      {
        id: 9013,
        title: "Learn to play ukulele and busk in parks",
        description: "I want to bring joy to people's days by playing cheerful ukulele music in parks and public spaces. Maybe I'll earn enough for coffee too!",
        location: "San Francisco",
        tags: ["Music", "Performance", "Community", "Local"],
        timing: "this-year",
        author: "Ukulele Dreamer 🎵",
        isAnonymous: true,
        createdAt: "2023-12-10"
      },
      {
        id: 9014,
        title: "Create a mobile library for kids on bikes",
        description: "I want to convert a cargo bike into a mobile library and bring books directly to kids in underserved neighborhoods.",
        location: "Oakland",
        tags: ["Community", "Education", "Volunteering", "Creative"],
        timing: "this-year",
        author: "Book Bike Builder 📚",
        isAnonymous: false,
        createdAt: "2023-12-08"
      },
      {
        id: 9015,
        title: "Master the art of latte foam designs",
        description: "I want to create beautiful art in coffee foam - hearts, leaves, even portraits! Looking for someone to practice with (and drink lots of coffee).",
        location: "Bay Area",
        tags: ["Learning", "Art", "Coffee", "Food"],
        timing: "flexible",
        author: "Foam Artist ☕",
        isAnonymous: true,
        createdAt: "2023-12-05"
      },
      {
        id: 9016,
        title: "Hike to every waterfall in Northern California",
        description: "There's something magical about waterfalls. I want to visit every single one in NorCal and create a photo journal of the journey.",
        location: "Northern California",
        tags: ["Adventure", "Nature", "Photography", "Hiking"],
        timing: "someday",
        author: "Waterfall Hunter 💧",
        isAnonymous: false,
        createdAt: "2023-12-03"
      },
      {
        id: 9017,
        title: "Learn to identify all Bay Area birds by sound",
        description: "The dawn chorus is like a symphony, but I only recognize a few players. I want to learn every bird song in our beautiful bay.",
        location: "Bay Area",
        tags: ["Nature", "Learning", "Local", "Science"],
        timing: "flexible",
        author: "Bird Song Student 🐦",
        isAnonymous: true,
        createdAt: "2023-12-01"
      },
      {
        id: 9018,
        title: "Organize clothing swaps with style consultations",
        description: "Fast fashion hurts the planet. I want to organize fun clothing swaps where people can refresh their wardrobes sustainably and help each other find their style.",
        location: "San Francisco",
        tags: ["Community", "Environment", "Fashion", "Social"],
        timing: "soon",
        author: "Sustainable Stylist 👗",
        isAnonymous: false,
        createdAt: "2023-11-28"
      }
    ];

    setDreams([...publicItems, ...sampleDreams]);
  }, []);

  const filteredDreams = filter === 'all' 
    ? dreams 
    : dreams.filter(dream => dream.tags.some(tag => tag.toLowerCase().includes(filter.toLowerCase())));

  const getTimingDisplay = (timing: string) => {
    switch (timing) {
      case 'soon': return 'Soon ✨';
      case 'this-year': return 'This year 🌟';
      case 'someday': return 'Someday 💫';
      case 'flexible': return 'Flexible 🌈';
      default: return timing;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 relative overflow-hidden">
      {/* Floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-32 left-16 w-3 h-3 bg-yellow-300 rounded-full opacity-40 animate-bounce"></div>
        <div className="absolute top-64 right-32 w-4 h-4 bg-pink-300 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute bottom-48 left-32 w-2 h-2 bg-blue-300 rounded-full opacity-50 animate-bounce delay-500"></div>
      </div>

      {/* Navigation */}
      <nav className="bg-white/70 backdrop-blur-md border-b border-pink-200/30 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-5 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            ✨ Bucket List Buddies
          </Link>
          <div className="space-x-6">
            <Link to="/submit" className="text-purple-700 hover:text-pink-600 transition-colors font-medium">
              Add Dreams
            </Link>
            <Link to="/dashboard" className="text-purple-700 hover:text-pink-600 transition-colors font-medium">
              My Dreams
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Discover Dreams ✨
          </h1>
          <p className="text-xl text-purple-700 max-w-3xl mx-auto font-light">
            Get inspired by what others are dreaming. Find your future adventure buddy or simply marvel at the beautiful diversity of human hopes.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div className="flex flex-wrap gap-4">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-56 rounded-full border-2 border-purple-200 bg-white/80">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Dreams 🌟</SelectItem>
                <SelectItem value="travel">Travel Adventures ✈️</SelectItem>
                <SelectItem value="creative">Creative Projects 🎨</SelectItem>
                <SelectItem value="learning">Learning & Skills 📚</SelectItem>
                <SelectItem value="adventure">Adventures 🏔️</SelectItem>
                <SelectItem value="community">Community 🤝</SelectItem>
                <SelectItem value="nature">Nature 🌿</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-3 text-purple-700 bg-white/60 px-4 py-2 rounded-full">
            <Sparkles className="w-5 h-5 text-pink-500" />
            <span className="font-medium">{filteredDreams.length} dreams discovered</span>
          </div>
        </div>

        {/* Dreams Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDreams.map(dream => (
            <Card key={dream.id} className="border-0 bg-white/70 backdrop-blur-sm hover:shadow-xl transition-all hover:scale-105 rounded-3xl overflow-hidden group">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start gap-3">
                  <CardTitle className="text-lg text-purple-900 leading-tight font-semibold">
                    {dream.title}
                  </CardTitle>
                  <Heart className="w-6 h-6 text-pink-300 hover:text-pink-500 hover:fill-current cursor-pointer transition-all transform hover:scale-110" />
                </div>
                <p className="text-sm text-purple-600 font-medium">
                  by {dream.author}
                </p>
              </CardHeader>
              
              <CardContent className="space-y-5">
                {dream.description && (
                  <p className="text-purple-700 text-sm leading-relaxed">
                    {dream.description}
                  </p>
                )}

                <div className="flex flex-wrap gap-2">
                  {dream.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="bg-gradient-to-r from-pink-100 to-purple-100 text-purple-800 text-xs rounded-full px-3 py-1 border-0">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="space-y-3 text-sm text-purple-700">
                  {dream.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-pink-500" />
                      <span>{dream.location}</span>
                    </div>
                  )}
                  
                  {dream.timing && (
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-xs bg-gradient-to-r from-pink-100 to-purple-100 px-3 py-1 rounded-full font-medium">
                        {getTimingDisplay(dream.timing)}
                      </span>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-purple-100">
                  <Button 
                    size="sm" 
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-full shadow-md hover:shadow-lg transition-all transform hover:scale-105"
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
        <div className="mt-20 text-center">
          <Card className="border-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white rounded-3xl shadow-2xl">
            <CardContent className="p-12">
              <h3 className="text-3xl font-bold mb-6">
                Inspired by These Dreams? ✨
              </h3>
              <p className="text-xl mb-8 opacity-90 font-light">
                Add your own dreams to the mix and help others discover new possibilities.
              </p>
              <Link to="/submit">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-purple-50 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105 px-8 py-3">
                  <Sparkles className="w-5 h-5 mr-2" />
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
