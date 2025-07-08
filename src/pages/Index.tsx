
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Brain, Gamepad, BookOpen, Play, LogIn, LogOut, User } from 'lucide-react';
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
        toast({
          title: "Level Completed!",
          description: `Great job! You scored ${score} points.`,
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
      setCompletedLevels(prev => new Set([...prev, levelId]));
      toast({
        title: "Level Completed!",
        description: `Great job! You scored ${score} points. Sign in to save your progress!`,
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
    <div className="min-h-screen bg-gradient-to-br from-teal-400 via-cyan-400 to-blue-400 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-bounce-in">
          <div className="flex items-center justify-center mb-4">
            <Brain className="w-12 h-12 text-white mr-3 animate-star-twinkle" />
            <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
              AI Learning Quest
            </h1>
            <Gamepad className="w-12 h-12 text-white ml-3 animate-wiggle" />
          </div>
          <p className="text-xl text-white/90 font-medium drop-shadow">
            Discover AI through fun adventures and games! 🚀
          </p>
        </div>

        {/* Auth Section */}
        <Card className="mb-6 bg-white/95 backdrop-blur-sm shadow-xl border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {user ? (
                  <>
                    <User className="w-5 h-5 text-gray-600 mr-2" />
                    <span className="text-gray-700">Welcome back!</span>
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5 text-gray-600 mr-2" />
                    <span className="text-gray-700">Sign in to save your progress</span>
                  </>
                )}
              </div>
              <div>
                {user ? (
                  <Button
                    onClick={handleSignOut}
                    variant="outline"
                    size="sm"
                    className="text-gray-600 hover:text-gray-800"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                ) : (
                  <Link to="/auth">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-gray-600 hover:text-gray-800"
                    >
                      <LogIn className="w-4 h-4 mr-2" />
                      Sign In
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Progress Stats */}
        <Card className="mb-6 bg-white/95 backdrop-blur-sm shadow-xl border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Star className="w-6 h-6 text-yellow-500 mr-2 animate-star-twinkle" />
                <span className="text-lg font-semibold text-gray-700">
                  Progress: {completedLevels.size} / {levels.length} levels completed
                </span>
              </div>
              <div className="flex space-x-1">
                {Array.from({ length: Math.min(5, completedLevels.size) }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-6 h-6 text-yellow-500 fill-current animate-star-twinkle"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Level Selection */}
        <Card className="bg-white/95 backdrop-blur-sm shadow-xl border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-800 flex items-center justify-center">
              <BookOpen className="w-6 h-6 mr-2" />
              Choose Your AI Adventure!
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

        {/* Add New Levels Placeholder */}
        <Card className="mt-6 bg-gradient-to-r from-green-400 to-blue-500 text-white shadow-xl border-0">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-bold mb-2">More Adventures Coming Soon!</h3>
            <p className="mb-4">New AI concepts and games are being added regularly.</p>
            <Button 
              variant="secondary" 
              className="bg-white text-blue-600 hover:bg-gray-100 font-semibold"
              disabled
            >
              <Play className="w-4 h-4 mr-2" />
              Stay Tuned for Updates
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
