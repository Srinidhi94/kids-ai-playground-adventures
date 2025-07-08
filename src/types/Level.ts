
export interface GameStep {
  id: number;
  type: 'intro' | 'activity' | 'explanation' | 'quiz';
  title: string;
  content: string;
  options?: string[];
  correctAnswer?: number;
  explanation?: string;
  comic?: {
    panels: Array<{
      image: string;
      text: string;
    }>;
  };
}

export interface Level {
  id: number;
  title: string;
  description: string;
  icon: string;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: number;
  concept: string;
  gameType: 'pattern' | 'problem-solving' | 'machine-learning';
  steps: GameStep[];
}
