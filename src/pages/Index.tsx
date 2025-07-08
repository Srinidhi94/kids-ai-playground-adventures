
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Brain, Gamepad, BookOpen, Play } from 'lucide-react';
import { LevelCard } from '@/components/LevelCard';
import { GameLevel } from '@/components/GameLevel';
import { levels } from '@/data/levels';

const Index = () => {
  const [currentLevel, setCurrentLevel] = useState<number | null>(null);
  const [completedLevels, setCompletedLevels] = useState<Set<number>>(new Set());

  const handleLevelComplete = (levelId: number, score: number) => {
    setCompletedLevels(prev => new Set([...prev, levelId]));
    setCurrentLevel(null);
    console.log(`Level ${levelId} completed with score: ${score}`);
  };

  const handleBackToLevels = () => {
    setCurrentLevel(null);
  };

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
              SmartPlay Academy
            </h1>
            <Gamepad className="w-12 h-12 text-white ml-3 animate-wiggle" />
          </div>
          <p className="text-xl text-white/90 font-medium drop-shadow">
            Discover AI through fun adventures and games! 🚀
          </p>
        </div>

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
