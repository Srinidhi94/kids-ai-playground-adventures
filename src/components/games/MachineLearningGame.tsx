
import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Brain } from 'lucide-react';
import { GameStep } from '@/types/Level';

interface MachineLearningGameProps {
  step: GameStep;
  onStepComplete: (score: number) => void;
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
    
    const isCorrect = step.correctAnswer === answerIndex;
    const score = isCorrect ? 100 : 80; // Encourage learning attempts
    
    setTimeout(() => {
      onStepComplete(score);
    }, 2500);
  };

  const handleContinue = () => {
    onStepComplete(100);
  };

  if (step.type === 'intro' || step.type === 'explanation') {
    return (
      <Card className="bg-white/95 backdrop-blur-sm shadow-xl border-0 animate-bounce-in">
        <CardHeader>
          <div className="flex items-center justify-center">
            <Brain className="w-8 h-8 text-purple-500 mr-3 animate-wiggle" />
            <h2 className="text-2xl font-bold text-center text-gray-800">
              {step.title}
            </h2>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <div className="bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 p-6 rounded-xl mb-6 border-2 border-purple-200">
              <div className="text-6xl mb-4">🐱</div>
              <p className="text-lg text-gray-700 leading-relaxed">
                {step.content}
              </p>
            </div>
          </div>
          <div className="text-center">
            <Button
              onClick={handleContinue}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Start Teaching! 🎓
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/95 backdrop-blur-sm shadow-xl border-0 animate-bounce-in">
      <CardHeader>
        <div className="flex items-center justify-center">
          <Brain className="w-8 h-8 text-purple-500 mr-3" />
          <h2 className="text-2xl font-bold text-center text-gray-800">
            {step.title}
          </h2>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-xl mb-6 border-2 border-pink-200">
            <div className="text-4xl mb-4">🐱📚</div>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              {step.content}
            </p>
          </div>
          
          {step.options && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {step.options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={hasAnswered}
                  className={`p-6 h-auto text-left justify-start transition-all duration-300 ${
                    hasAnswered
                      ? selectedAnswer === index
                        ? step.correctAnswer === index
                          ? 'bg-green-500 hover:bg-green-500 text-white'
                          : 'bg-red-500 hover:bg-red-500 text-white'
                        : step.correctAnswer === index
                        ? 'bg-green-200 border-2 border-green-500 text-green-800'
                        : 'bg-gray-200 text-gray-600'
                      : 'bg-gradient-to-br from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200 text-gray-800 hover:scale-105 border-2 border-transparent hover:border-purple-300'
                  }`}
                >
                  <div className="w-full">
                    <span className="font-bold text-lg block mb-1">
                      {String.fromCharCode(65 + index)}.
                    </span>
                    <span className="text-sm leading-relaxed">{option}</span>
                  </div>
                </Button>
              ))}
            </div>
          )}
          
          {showResult && step.explanation && (
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg border-l-4 border-purple-400 animate-bounce-in">
              <div className="flex items-center mb-3">
                {step.correctAnswer === selectedAnswer ? (
                  <CheckCircle className="w-6 h-6 text-green-500 mr-2" />
                ) : (
                  <XCircle className="w-6 h-6 text-purple-500 mr-2" />
                )}
                <span className="font-bold text-gray-800 text-lg">
                  {step.correctAnswer === selectedAnswer ? 'Amazing Teaching!' : 'Good Learning Attempt!'}
                </span>
              </div>
              <p className="text-gray-700 text-left leading-relaxed">{step.explanation}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
