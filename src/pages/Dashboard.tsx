
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Star, Brain, Gamepad, BookOpen, Play, LogIn, LogOut, MoreVertical } from 'lucide-react';
import { LevelCard } from '@/components/LevelCard';
import { GameLevel } from '@/components/GameLevel';
import { levels } from '@/data/levels';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [currentLevel, setCurrentLevel] = useState<number | null>(null);
  const [completedLevels, setCompletedLevels] = useState<Set<number>>(new Set());
  const { user, signOut, loading } = useAuth();
  const { toast } = useToast();

  // Load user progress
  useEffect(() => {
    if (user) {
      loadUserProgress();
    }
  }, [user]);

  const loadUserProgress = async () => {
    try {
      const { data, error } = await supabase
        .from('user_progress')
        .select('level_id')
        .eq('user_id', user?.id);

      if (error) throw error;
      
      const completed = new Set(data.map(item => item.level_id));
      setCompletedLevels(completed);
    } catch (error) {
      console.error('Error loading progress:', error);
    }
  };

  const handleLevelComplete = async (levelId: number, score: number) => {
    if (user) {
      try {
        const { error } = await supabase
          .from('user_progress')
          .upsert({ 
            user_id: user.id, 
            level_id: levelId, 
            score 
          }, { 
            onConflict: 'user_id,level_id' 
          });

        if (error) throw error;
        
        setCompletedLevels(prev => new Set([...prev, levelId]));
        const stars = Math.floor(score / 100);
        toast({
          title: "Level Completed!",
          description: `Great job! You earned ${stars} ${stars === 1 ? 'star' : 'stars'}!`,
        });
      } catch (error) {
        console.error('Error saving progress:', error);
        toast({
          title: "Error",
          description: "Failed to save progress.",
          variant: "destructive",
        });
      }
    } else {
      // Not signed in - redirect to auth
      toast({
        title: "Sign In Required",
        description: "Please sign in to save your progress and play adventures!",
        variant: "destructive",
      });
    }
    setCurrentLevel(null);
  };

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to sign out.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "You have been signed out successfully.",
      });
    }
  };

  const handleBackToLevels = () => {
    setCurrentLevel(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-400 via-cyan-400 to-blue-400 p-4 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  // Require authentication to play
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-400 via-cyan-400 to-blue-400">
        <div className="w-full max-w-md mx-auto min-h-screen bg-white/10 backdrop-blur-sm">
          {/* Mobile Header */}
          <div className="sticky top-0 z-50 bg-white/20 backdrop-blur-md border-b border-white/20">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-3">
                <Brain className="w-8 h-8 text-white animate-star-twinkle" />
                <h1 className="text-xl font-bold text-white drop-shadow-lg">
                  Future Minds AI
                </h1>
              </div>
            </div>
          </div>

          {/* Hero Landing Section */}
          <div className="p-4 space-y-6">

            {/* Main CTA Card */}
            <Card className="bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500 text-white shadow-2xl border-0 transform hover:scale-105 transition-transform">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center mb-4">
                  <Gamepad className="w-16 h-16 text-white animate-wiggle" />
                </div>
                <h2 className="text-2xl font-bold mb-3">Start Your AI Adventure</h2>
                <p className="text-lg mb-6 text-white/95">
                  Join thousands learning AI through games and interactive experiences
                </p>
                <Link to="/auth">
                  <Button 
                    size="lg"
                    className="bg-white text-purple-600 hover:bg-gray-100 font-bold px-10 py-4 text-lg shadow-xl transform hover:scale-105 transition-all"
                  >
                    <LogIn className="w-6 h-6 mr-3" />
                    Start Your AI Adventure
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Quick Features */}
            <div className="grid grid-cols-2 gap-3">
              <Card className="bg-white/95 backdrop-blur-sm shadow-lg border-0">
                <CardContent className="p-4 text-center">
                  <BookOpen className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <h4 className="text-sm font-bold text-gray-800 mb-1">Interactive Learning</h4>
                  <p className="text-xs text-gray-600">
                    Step-by-step adventures
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/95 backdrop-blur-sm shadow-lg border-0">
                <CardContent className="p-4 text-center">
                  <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                  <h4 className="text-sm font-bold text-gray-800 mb-1">Track Progress</h4>
                  <p className="text-xs text-gray-600">
                    Earn stars & achievements
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Secondary CTA */}
            <Card className="bg-white/95 backdrop-blur-sm shadow-xl border-0">
              <CardContent className="p-5 text-center">
                <h3 className="text-lg font-bold text-gray-800 mb-2">Why Choose Future Minds AI?</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-center text-sm text-gray-600">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Learn through fun games & puzzles
                  </div>
                  <div className="flex items-center justify-center text-sm text-gray-600">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    No prior AI knowledge needed
                  </div>
                  <div className="flex items-center justify-center text-sm text-gray-600">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Ready to explore AI concepts?
                  </div>
                </div>
                <Link to="/auth">
                  <Button 
                    variant="outline"
                    className="border-purple-500 text-purple-600 hover:bg-purple-50 font-semibold"
                  >
                    Join Now →
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (currentLevel !== null) {
    const level = levels.find(l => l.id === currentLevel);
    if (level) {
      return (
        <GameLevel
          level={level}
          onComplete={handleLevelComplete}
          onBack={handleBackToLevels}
        />
      );
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 via-cyan-400 to-blue-400">
      <div className="w-full max-w-md mx-auto min-h-screen bg-white/10 backdrop-blur-sm">
        {/* Mobile Header */}
        <div className="sticky top-0 z-50 bg-white/20 backdrop-blur-md border-b border-white/20">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-3">
              <Brain className="w-8 h-8 text-white animate-star-twinkle" />
              <h1 className="text-xl font-bold text-white drop-shadow-lg">
                Future Minds AI
              </h1>
            </div>
            
            {/* User Menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="h-10 w-10 rounded-full bg-white/20 hover:bg-white/30 transition-colors p-0"
                  >
                    <MoreVertical className="w-5 h-5 text-white" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuItem disabled className="flex flex-col items-start px-3 py-2">
                    <div className="font-medium text-sm">
                      {user.user_metadata?.full_name || 'User'}
                    </div>
                    <div className="text-xs text-gray-500 truncate w-full">
                      {user.email}
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut} className="px-3 py-2">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/auth">
                <Button 
                  size="sm"
                  className="bg-white/20 hover:bg-white/30 text-white border border-white/30 hover:border-white/50 font-semibold"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="p-4 space-y-6">
          {/* Hero Section */}
          <div className="text-center py-3">
            <div className="flex items-center justify-center mb-2">
              <Gamepad className="w-10 h-10 text-white animate-wiggle" />
            </div>
            <p className="text-base text-white/90 font-medium drop-shadow px-4">
              Discover AI through fun adventures and games! 🚀
            </p>
          </div>

          {/* Progress Stats */}
          <Card className="bg-white/95 backdrop-blur-sm shadow-xl border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-500 mr-2 animate-star-twinkle flex-shrink-0" />
                  <span className="text-sm font-semibold text-gray-700">
                    Progress: {completedLevels.size} / {levels.length}
                  </span>
                </div>
                <div className="flex space-x-1">
                  {Array.from({ length: Math.min(4, completedLevels.size) }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-500 fill-current animate-star-twinkle"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Level Selection */}
          <Card className="bg-white/95 backdrop-blur-sm shadow-xl border-0">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-lg font-bold text-gray-800 flex items-center justify-center">
                <BookOpen className="w-5 h-5 mr-2" />
                Choose Your AI Adventure!
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-4">
                {levels.map((level) => (
                  <LevelCard
                    key={level.id}
                    level={level}
                    isCompleted={completedLevels.has(level.id)}
                    onPlay={() => setCurrentLevel(level.id)}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Coming Soon */}
          <Card className="bg-gradient-to-r from-green-400 to-blue-500 text-white shadow-xl border-0">
            <CardContent className="p-4 text-center">
              <h3 className="text-lg font-bold mb-2">More Adventures Coming Soon!</h3>
              <p className="text-sm mb-4">New AI concepts and games are being added regularly.</p>
              <Button 
                variant="secondary" 
                size="sm"
                className="bg-white text-blue-600 hover:bg-gray-100 font-semibold"
                disabled
              >
                <Play className="w-4 h-4 mr-2" />
                Stay Tuned
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
