
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { X, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Submit = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    timing: '',
    tags: [] as string[],
    visibility: 'public-name',
    optInMatching: true,
    optInForums: true,
    optInDataset: true
  });
  const [newTag, setNewTag] = useState('');

  const commonTags = [
    'Travel', 'Creative', 'Adventure', 'Learning', 'Fitness', 'Food', 
    'Art', 'Music', 'Nature', 'Career', 'Volunteering', 'Relationships'
  ];

  const addTag = (tag: string) => {
    if (tag && !formData.tags.includes(tag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
    }
    setNewTag('');
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Store in localStorage for now (would be Supabase in real app)
    const existingItems = JSON.parse(localStorage.getItem('bucketListItems') || '[]');
    const newItem = {
      id: Date.now(),
      ...formData,
      createdAt: new Date().toISOString(),
      status: 'planning'
    };
    
    localStorage.setItem('bucketListItems', JSON.stringify([...existingItems, newItem]));
    
    toast({
      title: "Dream Added!",
      description: "Your bucket list item has been submitted successfully.",
    });

    // Reset form
    setFormData({
      title: '',
      description: '',
      location: '',
      timing: '',
      tags: [],
      visibility: 'public-name',
      optInMatching: true,
      optInForums: true,
      optInDataset: true
    });
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
            <Link to="/dashboard" className="text-orange-700 hover:text-orange-900">
              My Dashboard
            </Link>
            <Link to="/discover" className="text-orange-700 hover:text-orange-900">
              Discover
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-orange-900 mb-4">
            Add to Your Bucket List
          </h1>
          <p className="text-xl text-orange-700">
            What dream would you like to share with the world?
          </p>
        </div>

        <Card className="border-orange-200 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-orange-900">Tell Us About Your Dream</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="title" className="text-orange-900 font-semibold">
                  What's your dream? *
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g. Learn to surf in Hawaii"
                  required
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="description" className="text-orange-900 font-semibold">
                  Tell us more (optional)
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Why is this important to you? Any specific details?"
                  className="mt-2"
                  rows={3}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location" className="text-orange-900 font-semibold">
                    Location (optional)
                  </Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="Where would you like to do this?"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="timing" className="text-orange-900 font-semibold">
                    Timing (optional)
                  </Label>
                  <Select value={formData.timing} onValueChange={(value) => setFormData(prev => ({ ...prev, timing: value }))}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="When would you like to do this?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="soon">Within 3 months</SelectItem>
                      <SelectItem value="this-year">This year</SelectItem>
                      <SelectItem value="someday">Someday</SelectItem>
                      <SelectItem value="flexible">I'm flexible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label className="text-orange-900 font-semibold">Tags</Label>
                <p className="text-sm text-orange-600 mb-3">Help others find similar dreams</p>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  {commonTags.map(tag => (
                    <Button
                      key={tag}
                      type="button"
                      variant={formData.tags.includes(tag) ? "default" : "outline"}
                      size="sm"
                      onClick={() => formData.tags.includes(tag) ? removeTag(tag) : addTag(tag)}
                      className={formData.tags.includes(tag) ? "bg-orange-600 hover:bg-orange-700" : "border-orange-300 text-orange-700 hover:bg-orange-50"}
                    >
                      {tag}
                    </Button>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add custom tag"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag(newTag))}
                  />
                  <Button
                    type="button"
                    onClick={() => addTag(newTag)}
                    size="sm"
                    className="bg-orange-600 hover:bg-orange-700"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {formData.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="bg-orange-100 text-orange-800">
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-2 text-orange-600 hover:text-orange-800"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <Label className="text-orange-900 font-semibold">Privacy & Visibility</Label>
                <Select value={formData.visibility} onValueChange={(value) => setFormData(prev => ({ ...prev, visibility: value }))}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public-name">Public with my name</SelectItem>
                    <SelectItem value="public-anonymous">Public but anonymous</SelectItem>
                    <SelectItem value="private">Private (just for me)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4 border-t border-orange-200 pt-6">
                <h4 className="font-semibold text-orange-900">Participation Options</h4>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="matching"
                    checked={formData.optInMatching}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, optInMatching: !!checked }))}
                  />
                  <Label htmlFor="matching" className="text-orange-800">
                    Find buddies who share this dream
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="forums"
                    checked={formData.optInForums}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, optInForums: !!checked }))}
                  />
                  <Label htmlFor="forums" className="text-orange-800">
                    Join related forums and discussions
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="dataset"
                    checked={formData.optInDataset}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, optInDataset: !!checked }))}
                  />
                  <Label htmlFor="dataset" className="text-orange-800">
                    Contribute to our shared Dreams Dataset (anonymized)
                  </Label>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 text-lg font-semibold"
              >
                Add to My Bucket List
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Submit;
