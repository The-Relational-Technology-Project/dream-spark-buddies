
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Edit, Trash2, Users, MapPin, Clock, Heart } from 'lucide-react';
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
      title: "Status Updated",
      description: `Dream status changed to ${newStatus}`,
    });
  };

  const deleteItem = (id: number) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
    localStorage.setItem('bucketListItems', JSON.stringify(updatedItems));
    
    toast({
      title: "Dream Removed",
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
            <Link to="/discover" className="text-orange-700 hover:text-orange-900">
              Discover
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-orange-900 mb-2">
              My Bucket List
            </h1>
            <p className="text-xl text-orange-700">
              Track your dreams and connect with fellow adventurers
            </p>
          </div>
          <Link to="/submit">
            <Button className="bg-orange-600 hover:bg-orange-700 text-white">
              Add New Dream
            </Button>
          </Link>
        </div>

        {/* Filter and Stats */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="flex flex-wrap gap-4">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Dreams</SelectItem>
                <SelectItem value="planning">Planning</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-6 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{items.length}</div>
              <div className="text-orange-700">Total Dreams</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {items.filter(item => item.status === 'completed').length}
              </div>
              <div className="text-orange-700">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {items.filter(item => item.status === 'in-progress').length}
              </div>
              <div className="text-orange-700">In Progress</div>
            </div>
          </div>
        </div>

        {/* Items Grid */}
        {filteredItems.length === 0 ? (
          <Card className="border-orange-200 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-12 text-center">
              <Heart className="w-16 h-16 mx-auto mb-4 text-orange-300" />
              <h3 className="text-xl font-semibold text-orange-900 mb-2">
                {filter === 'all' ? 'No dreams yet' : `No ${filter} dreams`}
              </h3>
              <p className="text-orange-700 mb-6">
                {filter === 'all' 
                  ? 'Start building your bucket list by adding your first dream!'
                  : 'No dreams match your current filter.'
                }
              </p>
              {filter === 'all' && (
                <Link to="/submit">
                  <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                    Add Your First Dream
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map(item => (
              <Card key={item.id} className="border-orange-200 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start gap-2">
                    <CardTitle className="text-lg text-orange-900 leading-tight">
                      {item.title}
                    </CardTitle>
                    <div className="flex gap-1">
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-orange-600 hover:bg-orange-50">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-8 w-8 p-0 text-red-600 hover:bg-red-50"
                        onClick={() => deleteItem(item.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {item.description && (
                    <p className="text-orange-700 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {item.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="bg-orange-100 text-orange-800 text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="space-y-2 text-sm">
                    {item.location && (
                      <div className="flex items-center gap-2 text-orange-700">
                        <MapPin className="w-4 h-4" />
                        <span>{item.location}</span>
                      </div>
                    )}
                    
                    {item.timing && (
                      <div className="flex items-center gap-2 text-orange-700">
                        <Clock className="w-4 h-4" />
                        <span>
                          {item.timing === 'soon' && 'Within 3 months'}
                          {item.timing === 'this-year' && 'This year'}
                          {item.timing === 'someday' && 'Someday'}
                          {item.timing === 'flexible' && 'Flexible timing'}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-orange-100">
                    <Select
                      value={item.status}
                      onValueChange={(value) => updateItemStatus(item.id, value)}
                    >
                      <SelectTrigger className="w-32 h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="planning">Planning</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="paused">Paused</SelectItem>
                      </SelectContent>
                    </Select>

                    {item.optInMatching && (
                      <Button size="sm" variant="outline" className="border-orange-300 text-orange-700 hover:bg-orange-50">
                        <Users className="w-4 h-4 mr-1" />
                        Find Buddy
                      </Button>
                    )}
                  </div>

                  <Badge className={`${getStatusColor(item.status)} text-xs`}>
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
