
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Edit, Trash2, Users, MapPin, Clock, Heart, Sparkles, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BucketListItem {
  id: number;
  title: string;
  description: string;
  location: string;
  timing: string;
  tags: string[];
  visibility: string;
  status: string;
  createdAt: string;
  optInMatching: boolean;
}

const Dashboard = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<BucketListItem[]>([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const stored = localStorage.getItem('bucketListItems');
    if (stored) {
      setItems(JSON.parse(stored));
    }
  }, []);

  const updateItemStatus = (id: number, newStatus: string) => {
    const updatedItems = items.map(item =>
      item.id === id ? { ...item, status: newStatus } : item
    );
    setItems(updatedItems);
    localStorage.setItem('bucketListItems', JSON.stringify(updatedItems));
    
    toast({
      title: "Status Updated ✨",
      description: `Dream status changed to ${newStatus}`,
    });
  };

  const deleteItem = (id: number) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
    localStorage.setItem('bucketListItems', JSON.stringify(updatedItems));
    
    toast({
      title: "Dream Removed 💫",
      description: "Your bucket list item has been deleted.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-gray-100 text-gray-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const filteredItems = filter === 'all' ? items : items.filter(item => item.status === filter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 relative overflow-hidden">
      {/* Floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-40 left-20 w-4 h-4 bg-yellow-300 rounded-full opacity-40 animate-bounce"></div>
        <div className="absolute top-80 right-40 w-3 h-3 bg-pink-300 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute bottom-60 left-40 w-5 h-5 bg-blue-300 rounded-full opacity-20 animate-bounce delay-700"></div>
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
            <Link to="/discover" className="text-purple-700 hover:text-pink-600 transition-colors font-medium">
              Discover
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-3">
              My Dream Collection ✨
            </h1>
            <p className="text-xl text-purple-700 font-light">
              Track your dreams and connect with fellow adventurers
            </p>
          </div>
          <Link to="/submit">
            <Button className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105 px-6 py-3">
              <Sparkles className="w-4 h-4 mr-2" />
              Add New Dream
            </Button>
          </Link>
        </div>

        {/* Filter and Stats */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-12">
          <div className="flex flex-wrap gap-4">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-48 rounded-full border-2 border-purple-200 bg-white/80">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Dreams 🌟</SelectItem>
                <SelectItem value="planning">Planning 💭</SelectItem>
                <SelectItem value="in-progress">In Progress 🚀</SelectItem>
                <SelectItem value="completed">Completed ✨</SelectItem>
                <SelectItem value="paused">Paused ⏸️</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-8 text-sm">
            <div className="text-center bg-white/60 rounded-2xl p-4 min-w-[80px]">
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{items.length}</div>
              <div className="text-purple-700 font-medium">Total Dreams</div>
            </div>
            <div className="text-center bg-white/60 rounded-2xl p-4 min-w-[80px]">
              <div className="text-3xl font-bold text-green-600">
                {items.filter(item => item.status === 'completed').length}
              </div>
              <div className="text-purple-700 font-medium">Completed</div>
            </div>
            <div className="text-center bg-white/60 rounded-2xl p-4 min-w-[80px]">
              <div className="text-3xl font-bold text-yellow-600">
                {items.filter(item => item.status === 'in-progress').length}
              </div>
              <div className="text-purple-700 font-medium">In Progress</div>
            </div>
          </div>
        </div>

        {/* Items Grid */}
        {filteredItems.length === 0 ? (
          <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-lg rounded-3xl">
            <CardContent className="p-16 text-center">
              <Heart className="w-20 h-20 mx-auto mb-6 text-pink-300" />
              <h3 className="text-2xl font-semibold text-purple-900 mb-4">
                {filter === 'all' ? 'No dreams yet! ✨' : `No ${filter} dreams`}
              </h3>
              <p className="text-purple-700 mb-8 text-lg font-light">
                {filter === 'all' 
                  ? 'Your dream collection is waiting to be filled with magic!'
                  : 'No dreams match your current filter.'
                }
              </p>
              {filter === 'all' && (
                <Link to="/submit">
                  <Button className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105 px-8 py-3">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Add Your First Dream
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map(item => (
              <Card key={item.id} className="border-0 bg-white/70 backdrop-blur-sm hover:shadow-xl transition-all hover:scale-105 rounded-3xl overflow-hidden group">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start gap-3">
                    <CardTitle className="text-lg text-purple-900 leading-tight font-semibold">
                      {item.title}
                    </CardTitle>
                    <div className="flex gap-1">
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-purple-600 hover:bg-purple-50 rounded-full">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-8 w-8 p-0 text-pink-600 hover:bg-pink-50 rounded-full"
                        onClick={() => deleteItem(item.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-5">
                  {item.description && (
                    <p className="text-purple-700 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {item.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="bg-gradient-to-r from-pink-100 to-purple-100 text-purple-800 text-xs rounded-full px-3 py-1 border-0">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="space-y-3 text-sm">
                    {item.location && (
                      <div className="flex items-center gap-2 text-purple-700">
                        <MapPin className="w-4 h-4 text-pink-500" />
                        <span>{item.location}</span>
                      </div>
                    )}
                    
                    {item.timing && (
                      <div className="flex items-center gap-2 text-purple-700">
                        <Clock className="w-4 h-4 text-yellow-500" />
                        <span>
                          {item.timing === 'soon' && 'Within 3 months ✨'}
                          {item.timing === 'this-year' && 'This year 🌟'}
                          {item.timing === 'someday' && 'Someday 💫'}
                          {item.timing === 'flexible' && 'Flexible timing 🌈'}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-purple-100">
                    <Select
                      value={item.status}
                      onValueChange={(value) => updateItemStatus(item.id, value)}
                    >
                      <SelectTrigger className="w-36 h-8 rounded-full border-purple-200 bg-white/80">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="planning">Planning 💭</SelectItem>
                        <SelectItem value="in-progress">In Progress 🚀</SelectItem>
                        <SelectItem value="completed">Completed ✨</SelectItem>
                        <SelectItem value="paused">Paused ⏸️</SelectItem>
                      </SelectContent>
                    </Select>

                    {item.optInMatching && (
                      <Button size="sm" variant="outline" className="border-2 border-pink-300 text-pink-700 hover:bg-pink-50 rounded-full">
                        <Users className="w-4 h-4 mr-1" />
                        Find Buddy
                      </Button>
                    )}
                  </div>

                  <Badge className={`${getStatusColor(item.status)} text-xs rounded-full px-3 py-1`}>
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
