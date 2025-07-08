
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Star, CheckCircle } from 'lucide-react';
import { Level } from '@/types/Level';
import { PatternGame } from '@/components/games/PatternGame';
import { ProblemSolvingGame } from '@/components/games/ProblemSolvingGame';
import { MachineLearningGame } from '@/components/games/MachineLearningGame';

interface GameLevelProps {
  level: Level;
  onComplete: (levelId: number, score: number) => void;
  onBack: () => void;
}

export const GameLevel = ({ level, onComplete, onBack }: GameLevelProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const totalSteps = level.steps.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const renderGameComponent = () => {
    switch (level.gameType) {
      case 'pattern':
        return (
          <PatternGame
            key={`${level.id}-${currentStep}`}
            step={level.steps[currentStep]}
            onStepComplete={handleStepComplete}
          />
        );
      case 'problem-solving':
        return (
          <ProblemSolvingGame
            key={`${level.id}-${currentStep}`}
            step={level.steps[currentStep]}
            onStepComplete={handleStepComplete}
          />
        );
      case 'machine-learning':
        return (
          <MachineLearningGame
            key={`${level.id}-${currentStep}`}
            step={level.steps[currentStep]}
            onStepComplete={handleStepComplete}
          />
        );
      default:
        return <div>Game component not found</div>;
    }
  };

  const handleStepComplete = (stepScore: number) => {
    setScore(prev => prev + stepScore);
    
    if (currentStep < totalSteps - 1) {
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 1000);
    } else {
      setIsComplete(true);
      setTimeout(() => {
        onComplete(level.id, score + stepScore);
      }, 2000);
    }
  };

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-400 to-purple-400 p-4 flex items-center justify-center">
        <Card className="max-w-md mx-auto bg-white/95 backdrop-blur-sm shadow-2xl border-0 animate-bounce-in">
          <CardContent className="p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4 animate-star-twinkle" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Awesome Job!</h2>
            <p className="text-gray-600 mb-4">You've mastered {level.title}!</p>
            <div className="flex justify-center mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="w-8 h-8 text-yellow-500 fill-current animate-star-twinkle"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
            <p className="text-lg font-semibold text-purple-600">Final Score: {score}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 via-cyan-400 to-blue-400 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
          <Button
            onClick={onBack}
            variant="outline"
            className="bg-white/90 hover:bg-white border-0 shadow-md"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Levels
          </Button>
          
          <div className="flex items-center space-x-4">
            <Badge className="bg-white/90 text-gray-700 px-3 py-1 pointer-events-none">
              Step {currentStep + 1} of {totalSteps}
            </Badge>
            <div className="flex items-center text-white font-semibold">
              <Star className="w-5 h-5 mr-1 text-yellow-300" />
              Score: {score}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <Card className="mb-6 bg-white/95 backdrop-blur-sm shadow-lg border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Progress</span>
              <span className="text-sm text-gray-500">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-3" />
          </CardContent>
        </Card>

        {/* Level Title */}
        <Card className="mb-6 bg-white/95 backdrop-blur-sm shadow-lg border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-800 flex items-center justify-center">
              <span className="text-3xl mr-3">{level.icon}</span>
              {level.title}
            </CardTitle>
          </CardHeader>
        </Card>

        {/* Game Content */}
        <div className="animate-bounce-in">
          {renderGameComponent()}
        </div>
      </div>
    </div>
  );
};
