
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
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
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

  const handleStepComplete = (stepScore: number, isCorrect?: boolean) => {
    const step = level.steps[currentStep];
    
    // Track questions and correct answers for star rating
    if (step.type === 'activity' || step.type === 'quiz') {
      setTotalQuestions(prev => prev + 1);
      if (isCorrect) {
        setCorrectAnswers(prev => prev + 1);
      }
    }
    
    if (currentStep < totalSteps - 1) {
      const nextStep = currentStep + 1;
      setTimeout(() => {
        setCurrentStep(nextStep);
      }, 1000);
    } else {
      // Calculate star rating based on performance
      const accuracy = totalQuestions > 0 ? correctAnswers / totalQuestions : 1;
      let stars = 5;
      if (accuracy === 0) stars = 1;
      else if (accuracy < 1) stars = 3;
      
      setIsComplete(true);
      setTimeout(() => {
        onComplete(level.id, stars * 100); // Use stars for scoring
      }, 2000);
    }
  };

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-400 to-purple-400">
        <div className="w-full max-w-md mx-auto min-h-screen flex items-center justify-center p-4">
          <Card className="w-full bg-white/95 backdrop-blur-sm shadow-2xl border-0 animate-bounce-in">
            <CardContent className="p-6 text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4 animate-star-twinkle" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Awesome Job!</h2>
              <p className="text-gray-600 mb-4">You've mastered {level.title}!</p>
              <div className="flex justify-center mb-4">
                {(() => {
                  const accuracy = totalQuestions > 0 ? correctAnswers / totalQuestions : 1;
                  let stars = 5;
                  if (accuracy === 0) stars = 1;
                  else if (accuracy < 1) stars = 3;
                  
                  return Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-8 h-8 ${i < stars ? 'text-yellow-500 fill-current' : 'text-gray-300'} animate-star-twinkle`}
                      style={{ animationDelay: `${i * 0.1}s` }}
                    />
                  ));
                })()}
              </div>
              <p className="text-lg font-semibold text-purple-600">
                {correctAnswers} out of {totalQuestions} correct!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 via-cyan-400 to-blue-400">
      <div className="w-full max-w-md mx-auto min-h-screen bg-white/10 backdrop-blur-sm">
        {/* Mobile Header */}
        <div className="sticky top-0 z-50 bg-white/20 backdrop-blur-md border-b border-white/20">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <Button
                onClick={onBack}
                variant="ghost"
                size="sm"
                className="bg-white/20 hover:bg-white/30 text-white border border-white/30"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              
              <div className="flex items-center space-x-3">
                <Badge className="bg-white/90 text-gray-700 px-2 py-1 text-xs">
                  Step {currentStep + 1} of {totalSteps}
                </Badge>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="bg-white/20 rounded-full p-1">
              <div className="flex items-center justify-between mb-1 px-2">
                <span className="text-xs font-medium text-white">Progress</span>
                <span className="text-xs text-white/80">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2 bg-white/30" />
            </div>
          </div>
        </div>

        {/* Level Title */}
        <div className="p-4">
          <Card className="bg-white/95 backdrop-blur-sm shadow-lg border-0 mb-4">
            <CardHeader className="text-center py-3">
              <CardTitle className="text-lg font-bold text-gray-800 flex items-center justify-center">
                <span className="text-2xl mr-2">{level.icon}</span>
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
    </div>
  );
};
