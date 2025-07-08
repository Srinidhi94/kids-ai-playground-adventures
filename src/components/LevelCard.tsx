
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
    <Card className="group hover:scale-[1.02] transition-all duration-300 cursor-pointer bg-white shadow-md hover:shadow-lg border border-gray-200 hover:border-purple-300">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <div className="text-2xl group-hover:animate-wiggle flex-shrink-0">
              {level.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="text-base font-bold text-gray-800 group-hover:text-purple-600 transition-colors truncate">
                  {level.title}
                </h3>
                {isCompleted && (
                  <Star className="w-4 h-4 text-yellow-500 fill-current animate-star-twinkle flex-shrink-0" />
                )}
              </div>
              <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                {level.description}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Badge className={`${difficultyColors[level.difficulty]} text-xs px-2 py-1`}>
                    {level.difficulty}
                  </Badge>
                  <span className="text-xs text-gray-500">
                    {level.estimatedTime} mins
                  </span>
                </div>
              </div>
            </div>
          </div>
          <Button 
            onClick={onPlay}
            size="sm"
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold shadow-sm hover:shadow-md transition-all duration-300 ml-3 flex-shrink-0"
          >
            <Play className="w-3 h-3 mr-1" />
            {isCompleted ? 'Replay' : 'Start'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
