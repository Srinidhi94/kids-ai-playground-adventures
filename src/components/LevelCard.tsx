
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Star } from 'lucide-react';
import { Level } from '@/types/Level';

interface LevelCardProps {
  level: Level;
  isCompleted: boolean;
  onPlay: () => void;
}

export const LevelCard = ({ level, isCompleted, onPlay }: LevelCardProps) => {
  const difficultyColors = {
    easy: 'bg-green-100 text-green-700 border-green-200',
    medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    hard: 'bg-red-100 text-red-700 border-red-200'
  };

  return (
    <Card className="group hover:scale-105 transition-all duration-300 cursor-pointer bg-white shadow-lg hover:shadow-xl border-2 border-gray-100 hover:border-purple-300">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center">
            <div className="text-3xl mr-3 group-hover:animate-wiggle">
              {level.icon}
            </div>
            {isCompleted && (
              <Star className="w-5 h-5 text-yellow-500 fill-current animate-star-twinkle" />
            )}
          </div>
          <Badge className={difficultyColors[level.difficulty]}>
            {level.difficulty}
          </Badge>
        </div>
        
        <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
          {level.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {level.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-500">
            {level.estimatedTime} mins
          </div>
          <Button 
            onClick={onPlay}
            size="sm"
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300"
          >
            <Play className="w-4 h-4 mr-1" />
            {isCompleted ? 'Replay' : 'Start'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
