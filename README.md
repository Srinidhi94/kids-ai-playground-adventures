# Future Minds AI

A mobile-first educational platform that teaches kids AI concepts through interactive games and adventures.

## Project Overview

Future Minds AI is designed to make artificial intelligence concepts accessible and engaging for young learners through:

- **Interactive Games**: Pattern recognition, problem-solving, and machine learning games
- **Progressive Learning**: Levels that build upon each other with increasing complexity
- **Real-world Applications**: Scenarios that show how AI is used in everyday life
- **Gamified Experience**: Points, progress tracking, and achievement systems

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project directory
cd future-minds-ai

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:8080`

## 🏗️ Technical Architecture

### Core Technologies

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: React Context API + React Query
- **Authentication**: Supabase Auth
- **Database**: Supabase (PostgreSQL)
- **Routing**: React Router DOM

### Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── games/           # Game-specific components
│   │   ├── PatternGame.tsx
│   │   ├── ProblemSolvingGame.tsx
│   │   └── MachineLearningGame.tsx
│   ├── ui/              # shadcn/ui components
│   ├── GameLevel.tsx    # Main game level wrapper
│   └── LevelCard.tsx    # Level selection cards
├── contexts/            # React contexts
│   └── AuthContext.tsx  # Authentication context
├── data/               # Static data and configurations
│   └── levels.ts       # Game levels and content
├── hooks/              # Custom React hooks
├── integrations/       # External service integrations
│   └── supabase/       # Supabase client and types
├── lib/                # Utility functions
├── pages/              # Page components
│   ├── Index.tsx       # Main dashboard
│   ├── Auth.tsx        # Authentication page
│   └── NotFound.tsx    # 404 page
├── types/              # TypeScript type definitions
│   └── Level.ts        # Game level types
└── test/               # Test files
```

### Database Schema

The application uses Supabase with the following main tables:

- **user_progress**: Tracks user completion and scores for each level
  - user_id (UUID, foreign key to auth.users)
  - level_id (integer)
  - score (integer)
  - completed_at (timestamp)

### Game System Architecture

The game system is built with three main components:

1. **GameLevel**: Main wrapper that handles:
   - Step progression
   - Score calculation
   - Completion tracking
   - UI transitions

2. **Game Components**: Specialized components for different game types:
   - `PatternGame`: Pattern recognition challenges
   - `ProblemSolvingGame`: Collaborative problem-solving scenarios
   - `MachineLearningGame`: Interactive ML concept demonstrations

3. **Level Data**: Structured content in `src/data/levels.ts` defining:
   - Learning objectives
   - Step sequences
   - Game mechanics
   - Scoring criteria

## 🎮 Adding New Levels

### Step 1: Define the Level Structure

Add a new level to `src/data/levels.ts`:

```typescript
{
  id: 6, // Unique identifier
  title: "Your Level Title",
  description: "Brief description of what kids will learn",
  icon: "🤖", // Emoji icon for the level
  difficulty: "easy" | "medium" | "hard",
  estimatedTime: 5, // Time in minutes
  concept: "AI Concept Name",
  gameType: "pattern" | "problem-solving" | "machine-learning",
  steps: [
    {
      id: 1,
      type: "intro" | "activity" | "explanation" | "quiz",
      title: "Step Title",
      content: "Step content and instructions",
      options?: ["Option A", "Option B", "Option C"], // For quiz/activity steps
      correctAnswer?: 1, // Index of correct answer
      explanation?: "Explanation shown after answering"
    }
    // Add more steps...
  ]
}
```

### Step 2: Create Custom Game Components (Optional)

If you need a new game type:

1. Create a new component in `src/components/games/`
2. Follow the interface pattern:

```typescript
interface YourGameProps {
  step: GameStep;
  onStepComplete: (score: number) => void;
}
```

3. Add the game type to `src/components/GameLevel.tsx`:

```typescript
case 'your-game-type':
  return (
    <YourGame
      key={`${level.id}-${currentStep}`}
      step={level.steps[currentStep]}
      onStepComplete={handleStepComplete}
    />
  );
```

### Step 3: Update Types (if needed)

If adding new game types, update `src/types/Level.ts`:

```typescript
export interface Level {
  // ... existing properties
  gameType: 'pattern' | 'problem-solving' | 'machine-learning' | 'your-new-type';
}
```

## 🎨 UI/UX Design System

### Color Scheme

- **Primary**: Teal to Cyan gradient (`from-teal-400 via-cyan-400 to-blue-400`)
- **Secondary**: Purple to Pink gradient (`from-purple-500 to-pink-500`)
- **Success**: Green (`text-green-500`)
- **Warning**: Yellow (`text-yellow-500`)
- **Error**: Red (`text-red-500`)

### Component Guidelines

- **Cards**: Use `bg-white/95 backdrop-blur-sm` for glassmorphism effect
- **Buttons**: Gradient backgrounds with hover effects
- **Spacing**: Consistent padding with `p-4`, `p-6` for cards
- **Typography**: Responsive text sizes with `text-lg md:text-xl`

## 🔧 Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm run test

# Lint code
npm run lint

# Type checking
npm run type-check
```

## 🚀 Deployment

### Build and Deploy

1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting platform
3. Configure environment variables for Supabase

## 🔒 Environment Variables

Create a `.env.local` file:

```
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## 📚 Learning Concepts Covered

- **Pattern Recognition**: How AI identifies patterns in data
- **Human-AI Collaboration**: Working together with AI systems
- **Machine Learning**: Teaching computers to learn from examples
- **Natural Language Processing**: How AI understands human language
- **Predictive Analytics**: Using data to predict future outcomes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Add your level or improvement
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For questions or issues:
- Check the existing issues on GitHub
- Create a new issue with detailed description
- Contact the development team

---

Built with ❤️ for the next generation of AI learners
