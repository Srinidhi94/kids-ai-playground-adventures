
import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle } from 'lucide-react';
import { GameStep } from '@/types/Level';

interface PatternGameProps {
  step: GameStep;
  onStepComplete: (score: number) => void;
}

export const PatternGame = ({ step, onStepComplete }: PatternGameProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);

  const handleAnswer = (answerIndex: number) => {
    if (hasAnswered) return;
    
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    setHasAnswered(true);
    
    const isCorrect = step.correctAnswer === answerIndex;
    const score = isCorrect ? 100 : 50; // Still give points for trying
  };

  const handleContinue = () => {
    const isCorrect = step.correctAnswer === selectedAnswer;
    const score = isCorrect ? 100 : 50;
    onStepComplete(score);
  };

  const handleIntroOrExplanationContinue = () => {
    onStepComplete(100);
  };

  if (step.type === 'intro' || step.type === 'explanation') {
    return (
      <Card className="bg-white/95 backdrop-blur-sm shadow-xl border-0 animate-bounce-in">
        <CardHeader>
          <h2 className="text-2xl font-bold text-center text-gray-800">
            {step.title}
          </h2>
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              {step.content}
            </p>
          </div>
          <div className="text-center">
            <Button
              onClick={handleIntroOrExplanationContinue}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Continue Adventure! 🚀
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/95 backdrop-blur-sm shadow-xl border-0 animate-bounce-in">
      <CardHeader>
        <h2 className="text-2xl font-bold text-center text-gray-800">
          {step.title}
        </h2>
      </CardHeader>
      <CardContent className="p-6">
        <div className="text-center mb-8">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            {step.content}
          </p>
          
          {step.options && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {step.options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={hasAnswered}
                  className={`min-h-[4rem] p-4 text-sm whitespace-normal text-left transition-all duration-300 ${
                    hasAnswered
                      ? selectedAnswer === index
                        ? step.correctAnswer === index
                          ? 'bg-green-500 hover:bg-green-500 text-white'
                          : 'bg-red-500 hover:bg-red-500 text-white'
                        : step.correctAnswer === index
                        ? 'bg-green-200 border-2 border-green-500 text-green-800'
                        : 'bg-gray-200 text-gray-600'
                      : 'bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 hover:scale-105 text-white'
                  }`}
                >
                  <span className="font-bold mr-2">{String.fromCharCode(65 + index)}.</span>
                  {option}
                </Button>
              ))}
            </div>
          )}
          
          {showResult && step.explanation && (
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400 animate-bounce-in">
              <div className="flex items-center mb-2">
                {step.correctAnswer === selectedAnswer ? (
                  <CheckCircle className="w-6 h-6 text-green-500 mr-2" />
                ) : (
                  <CheckCircle className="w-6 h-6 text-blue-500 mr-2" />
                )}
                <span className="font-semibold text-gray-800">
                  {step.correctAnswer === selectedAnswer ? 'Perfect! You got it!' : 'Great thinking! Let\'s learn together!'}
                </span>
              </div>
              <p className="text-gray-700 mb-4">{step.explanation}</p>
              <div className="text-center">
                <Button
                  onClick={handleContinue}
                  className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold px-6 py-2 text-base shadow-lg hover:shadow-xl transition-all duration-300"
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
