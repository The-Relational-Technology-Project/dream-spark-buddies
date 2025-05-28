
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
import { X, Plus, Sparkles, Heart } from 'lucide-react';
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
    'Travel 🌍', 'Creative 🎨', 'Adventure 🏔️', 'Learning 📚', 'Fitness 💪', 'Food 🍕', 
    'Art 🖼️', 'Music 🎵', 'Nature 🌿', 'Career 💼', 'Volunteering ❤️', 'Relationships 👫'
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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 relative overflow-hidden">
      {/* Floating whimsical elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-6 h-6 bg-yellow-300 rounded-full opacity-60 animate-bounce"></div>
        <div className="absolute top-40 right-20 w-8 h-8 bg-pink-300 rounded-full opacity-40 animate-pulse"></div>
        <div className="absolute bottom-40 left-20 w-4 h-4 bg-blue-300 rounded-full opacity-50 animate-bounce delay-300"></div>
        <div className="absolute top-60 left-1/3 w-7 h-7 bg-purple-300 rounded-full opacity-30 animate-pulse delay-700"></div>
        <div className="absolute bottom-60 right-1/4 w-5 h-5 bg-green-300 rounded-full opacity-40 animate-bounce delay-1000"></div>
        <div className="absolute top-1/2 right-10 w-3 h-3 bg-orange-300 rounded-full opacity-60 animate-pulse delay-500"></div>
      </div>

      {/* Navigation */}
      <nav className="bg-white/70 backdrop-blur-md border-b border-pink-200/30 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-5 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            ✨ Bucket List Buddies
          </Link>
          <div className="space-x-6">
            <Link to="/dashboard" className="text-purple-700 hover:text-pink-600 transition-colors font-medium">
              My Dreams
            </Link>
            <Link to="/discover" className="text-purple-700 hover:text-pink-600 transition-colors font-medium">
              Discover
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-purple-900 mb-6 leading-tight">
            What makes your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
              heart sing? ✨
            </span>
          </h1>
          <p className="text-xl text-purple-700 font-light">
            No dream too big, too small, or too wonderfully weird
          </p>
        </div>

        <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-xl rounded-3xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-pink-100 to-purple-100 pb-8">
            <CardTitle className="text-center text-purple-900 text-2xl flex items-center justify-center gap-2">
              <Heart className="w-6 h-6 text-pink-500" />
              Share Your Dream
              <Sparkles className="w-6 h-6 text-purple-500" />
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <Label htmlFor="title" className="text-purple-900 font-semibold text-lg">
                  What's your dream? ✨
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g. Learn to surf in Hawaii 🏄‍♀️"
                  required
                  className="mt-3 rounded-2xl border-purple-200 focus:border-pink-300 bg-white/80 text-lg py-3"
                />
              </div>

              <div>
                <Label htmlFor="description" className="text-purple-900 font-semibold text-lg">
                  Tell us more (optional) 💭
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Why is this important to you? Any specific details that make you smile?"
                  className="mt-3 rounded-2xl border-purple-200 focus:border-pink-300 bg-white/80"
                  rows={3}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="location" className="text-purple-900 font-semibold text-lg">
                    Where? 📍
                  </Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="Anywhere special?"
                    className="mt-3 rounded-2xl border-purple-200 focus:border-pink-300 bg-white/80"
                  />
                </div>

                <div>
                  <Label htmlFor="timing" className="text-purple-900 font-semibold text-lg">
                    When? ⏰
                  </Label>
                  <Select value={formData.timing} onValueChange={(value) => setFormData(prev => ({ ...prev, timing: value }))}>
                    <SelectTrigger className="mt-3 rounded-2xl border-purple-200 focus:border-pink-300 bg-white/80">
                      <SelectValue placeholder="Timeline for this dream?" />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl">
                      <SelectItem value="soon">Soon (within 3 months) 🚀</SelectItem>
                      <SelectItem value="this-year">This year 📅</SelectItem>
                      <SelectItem value="someday">Someday ✨</SelectItem>
                      <SelectItem value="flexible">I'm flexible 🌈</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label className="text-purple-900 font-semibold text-lg">Tags 🏷️</Label>
                <p className="text-sm text-purple-600 mb-4">Help other dreamers find you</p>
                
                <div className="flex flex-wrap gap-3 mb-4">
                  {commonTags.map(tag => (
                    <Button
                      key={tag}
                      type="button"
                      variant={formData.tags.includes(tag) ? "default" : "outline"}
                      size="sm"
                      onClick={() => formData.tags.includes(tag) ? removeTag(tag) : addTag(tag)}
                      className={`rounded-full transition-all ${
                        formData.tags.includes(tag) 
                          ? "bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600" 
                          : "border-purple-300 text-purple-700 hover:bg-purple-50"
                      }`}
                    >
                      {tag}
                    </Button>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add your own tag ✨"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag(newTag))}
                    className="rounded-2xl border-purple-200 focus:border-pink-300 bg-white/80"
                  />
                  <Button
                    type="button"
                    onClick={() => addTag(newTag)}
                    size="sm"
                    className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 rounded-2xl px-6"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {formData.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="bg-purple-100 text-purple-800 rounded-full px-3 py-1">
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-2 text-purple-600 hover:text-purple-800"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-purple-50 rounded-2xl p-6">
                <Label className="text-purple-900 font-semibold text-lg">Privacy & Sharing 🔒</Label>
                <Select value={formData.visibility} onValueChange={(value) => setFormData(prev => ({ ...prev, visibility: value }))}>
                  <SelectTrigger className="mt-3 rounded-2xl border-purple-200 bg-white/80">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl">
                    <SelectItem value="public-name">Share with my name ✨</SelectItem>
                    <SelectItem value="public-anonymous">Share anonymously 🎭</SelectItem>
                    <SelectItem value="private">Keep private (just for me) 🤫</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-6 bg-pink-50 rounded-2xl p-6">
                <h4 className="font-semibold text-purple-900 text-lg">How would you like to connect? 🤝</h4>
                
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="matching"
                    checked={formData.optInMatching}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, optInMatching: !!checked }))}
                    className="rounded-lg"
                  />
                  <Label htmlFor="matching" className="text-purple-800 font-medium">
                    Find buddies who share this dream 👯‍♀️
                  </Label>
                </div>

                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="forums"
                    checked={formData.optInForums}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, optInForums: !!checked }))}
                    className="rounded-lg"
                  />
                  <Label htmlFor="forums" className="text-purple-800 font-medium">
                    Join related forums and discussions 💬
                  </Label>
                </div>

                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="dataset"
                    checked={formData.optInDataset}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, optInDataset: !!checked }))}
                    className="rounded-lg"
                  />
                  <Label htmlFor="dataset" className="text-purple-800 font-medium">
                    Inspire others with your dream (anonymized) 🌟
                  </Label>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 text-white py-4 text-xl font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Add to My Dream List ✨
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Submit;
