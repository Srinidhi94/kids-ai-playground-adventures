
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

          {/* Sign-in Required Message */}
          <div className="p-4 space-y-6">
            <div className="text-center py-6">
              <div className="flex items-center justify-center mb-4">
                <Gamepad className="w-16 h-16 text-white animate-wiggle" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Welcome to Future Minds AI!</h2>
              <p className="text-lg text-white/90 font-medium drop-shadow px-4 mb-6">
                Discover AI through fun adventures and games! 🚀
              </p>
              <Card className="bg-white/95 backdrop-blur-sm shadow-xl border-0">
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Sign In Required</h3>
                  <p className="text-gray-600 mb-6">
                    Please sign in to start your AI learning journey and save your progress!
                  </p>
                  <Link to="/auth">
                    <Button 
                      size="lg"
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-8 py-3"
                    >
                      <LogIn className="w-5 h-5 mr-2" />
                      Sign In to Start Learning
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
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
