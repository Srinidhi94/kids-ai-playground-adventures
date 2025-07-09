
import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Brain, AlertCircle } from 'lucide-react';
import { GameStep } from '@/types/Level';

interface MachineLearningGameProps {
  step: GameStep;
  onStepComplete: (score: number, isCorrect?: boolean) => void;
}

export const MachineLearningGame = ({ step, onStepComplete }: MachineLearningGameProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);

  const handleAnswer = (answerIndex: number) => {
    if (hasAnswered) return;
    
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    setHasAnswered(true);
  };

  const handleContinue = () => {
    const isCorrect = step.correctAnswer === selectedAnswer;
    onStepComplete(100, isCorrect);
  };

  const handleIntroOrExplanationContinue = () => {
    onStepComplete(100);
  };

  if (step.type === 'intro' || step.type === 'explanation') {
    return (
      <Card className="bg-white/95 backdrop-blur-sm shadow-xl border-0 animate-bounce-in">
        <CardHeader className="px-4 pt-6 pb-4">
          <div className="flex items-center justify-center">
            <Brain className="w-8 h-8 text-purple-500 mr-3 animate-wiggle" />
            <h2 className="text-xl font-bold text-center text-gray-800">
              {step.title}
            </h2>
          </div>
        </CardHeader>
        <CardContent className="px-4 pb-6">
          <div className="text-center space-y-6">
            <div className="bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 p-4 rounded-xl border-2 border-purple-200">
              <div className="text-6xl mb-4">🐱</div>
              <p className="text-base text-gray-700 leading-relaxed text-center">
                {step.content}
              </p>
            </div>
            <Button
              onClick={handleIntroOrExplanationContinue}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold px-6 py-3 text-base shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Start Teaching! 🎓
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const isCorrect = step.correctAnswer === selectedAnswer;

  return (
    <Card className="bg-white/95 backdrop-blur-sm shadow-xl border-0 animate-bounce-in">
      <CardHeader className="px-4 pt-6 pb-4">
        <div className="flex items-center justify-center">
          <Brain className="w-8 h-8 text-purple-500 mr-3" />
          <h2 className="text-xl font-bold text-center text-gray-800">
            {step.title}
          </h2>
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-6">
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-xl border-2 border-pink-200">
            <div className="text-4xl mb-4 text-center">🐱📚</div>
            <p className="text-base text-gray-700 leading-relaxed text-center">
              {step.content}
            </p>
          </div>
          
          {step.options && (
            <div className="space-y-3">
              {step.options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={hasAnswered}
                  className={`w-full p-3 text-left justify-start transition-all duration-300 whitespace-normal h-auto min-h-[3rem] ${
                    hasAnswered
                      ? selectedAnswer === index
                        ? step.correctAnswer === index
                          ? 'bg-green-500 hover:bg-green-500 text-white'
                          : 'bg-red-500 hover:bg-red-500 text-white'
                        : step.correctAnswer === index
                        ? 'bg-green-200 border-2 border-green-500 text-green-800'
                        : 'bg-gray-200 text-gray-600'
                      : 'bg-gradient-to-br from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200 text-gray-800 hover:scale-[1.01] border-2 border-transparent hover:border-purple-300 shadow-sm'
                  }`}
                >
                  <div className="flex items-start space-x-3 w-full">
                    <span className="font-bold text-base flex-shrink-0 mt-0.5">{String.fromCharCode(65 + index)}.</span>
                    <span className="text-sm leading-relaxed flex-grow break-words text-left">{option}</span>
                  </div>
                </Button>
              ))}
            </div>
          )}
          
          {showResult && step.explanation && (
            <div className={`p-4 rounded-xl border-l-4 animate-bounce-in ${
              isCorrect 
                ? 'bg-gradient-to-r from-purple-50 to-blue-50 border-purple-400' 
                : 'bg-gradient-to-br from-red-50 to-orange-50 border-red-400'
            }`}>
              <div className="flex items-center justify-center mb-3">
                {isCorrect ? (
                  <CheckCircle className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-6 h-6 text-orange-500 mr-2 flex-shrink-0" />
                )}
                <span className={`font-semibold text-base text-center ${
                  isCorrect ? 'text-green-800' : 'text-orange-800'
                }`}>
                  {isCorrect 
                    ? 'Amazing Teaching!' 
                    : 'Great thinking! Let\'s explore the correct approach!'
                  }
                </span>
              </div>
              <p className="text-gray-700 text-center leading-relaxed text-sm mb-4">{step.explanation}</p>
              {!isCorrect && (
                <div className="bg-blue-100 border border-blue-300 rounded-lg p-3 mb-4">
                  <div className="flex items-center mb-2">
                    <CheckCircle className="w-4 h-4 text-blue-600 mr-2" />
                    <span className="text-sm font-medium text-blue-800">The correct answer was:</span>
                  </div>
                  <p className="text-sm text-blue-700">
                    <strong>{String.fromCharCode(65 + (step.correctAnswer || 0))}.</strong> {step.options?.[step.correctAnswer || 0]}
                  </p>
                </div>
              )}
              <div className="text-center">
                <Button
                  onClick={handleContinue}
                  size="lg"
                  className={`font-semibold px-6 py-3 text-base shadow-lg hover:shadow-xl transition-all duration-300 ${
                    isCorrect
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white'
                      : 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white'
                  }`}
                >
                  Continue
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
