
import { Level } from '@/types/Level';

export const levels: Level[] = [
  {
    id: 1,
    title: "Pattern Detective",
    description: "Learn how AI recognizes patterns by becoming a pattern detective! Discover how computers see patterns everywhere.",
    icon: "🕵️",
    difficulty: "easy",
    estimatedTime: 5,
    concept: "Pattern Recognition",
    gameType: "pattern",
    steps: [
      {
        id: 1,
        type: "intro",
        title: "Welcome Pattern Detective!",
        content: "Hi there! Today you'll learn how AI is like a super smart detective that finds patterns everywhere. Just like you can spot that all cats have whiskers, AI can spot patterns in thousands of pictures at once!"
      },
      {
        id: 2,
        type: "activity",
        title: "Human vs Computer",
        content: "First, let's see how you do at finding patterns. Look at these shapes and find the one that doesn't belong:",
        options: ["🔴", "🔵", "🟢", "🔺"],
        correctAnswer: 3,
        explanation: "Great job! The triangle is different because it's not a circle. This took you a few seconds, but AI can do this with thousands of images in milliseconds!"
      },
      {
        id: 3,
        type: "explanation",
        title: "How AI Sees Patterns",
        content: "AI looks at pictures like a puzzle made of tiny dots (pixels). It learns that cats usually have pointy ears, whiskers, and fur patterns. After seeing thousands of cat photos, it becomes amazing at spotting cats!"
      },
      {
        id: 4,
        type: "quiz",
        title: "Pattern Master Quiz",
        content: "Which of these would be HARDEST for early AI to recognize?",
        options: ["A stop sign (always red and octagonal)", "A cat (comes in many colors and positions)", "A circle (always round)", "The number 5 (always the same shape)"],
        correctAnswer: 1,
        explanation: "Exactly! Cats are tricky because they come in different colors, sizes, and positions. That's why AI needs to see lots of examples to get really good at it!"
      }
    ]
  },
  {
    id: 2,
    title: "Problem Solver Assistant",
    description: "Discover how AI helps solve problems by working together with humans. See the magic of human creativity + AI power!",
    icon: "🤝",
    difficulty: "easy",
    estimatedTime: 7,
    concept: "Human-AI Collaboration",
    gameType: "problem-solving",
    steps: [
      {
        id: 1,
        type: "intro",
        title: "Meet Your AI Assistant!",
        content: "Imagine having a super-fast helper who never gets tired and can remember everything! That's what AI is like. But here's the secret: AI works best when it teams up with creative humans like you!"
      },
      {
        id: 2,
        type: "activity",
        title: "The Messy Room Challenge",
        content: "Your room is messy and you need to clean it before friends come over. How would you solve this problem?",
        options: ["Throw everything under the bed", "Clean one area at a time", "Ask everyone to help", "Give up and meet friends outside"],
        correctAnswer: 1,
        explanation: "Smart thinking! Breaking big problems into smaller pieces is exactly how AI helps us solve complex problems!"
      },
      {
        id: 3,
        type: "explanation",
        title: "How AI Helps Solve Problems",
        content: "Now imagine an AI helper for your room: It could make a map of your room, remind you where things belong, set timers for each area, and even play your favorite cleaning music! AI handles the boring parts so you can focus on the fun parts."
      },
      {
        id: 4,
        type: "quiz",
        title: "Teamwork Challenge",
        content: "You're planning a birthday party. What would be the BEST job for your AI assistant?",
        options: ["Choosing the party theme (needs creativity)", "Sending invitations to all friends (repetitive task)", "Deciding what games to play (needs to know what's fun)", "Picking the perfect gift (needs to know the person)"],
        correctAnswer: 1,
        explanation: "Perfect! AI is great at repetitive tasks like sending messages. You're better at creative tasks like choosing themes and knowing what your friends will enjoy!"
      }
    ]
  },
  {
    id: 3,
    title: "Teaching Machine Game",
    description: "Experience how machine learning works by teaching a virtual pet! Understand how AI learns from examples, just like you do.",
    icon: "🐱",
    difficulty: "medium",
    estimatedTime: 8,
    concept: "Machine Learning",
    gameType: "machine-learning",
    steps: [
      {
        id: 1,
        type: "intro",
        title: "Meet Your Virtual Pet!",
        content: "You just got a virtual pet that doesn't know anything yet! Just like teaching a real pet, you'll need to show it lots of examples so it can learn. This is exactly how machine learning works!"
      },
      {
        id: 2,
        type: "activity",
        title: "Teaching Your Pet",
        content: "Your pet sees a red ball. What should you teach it first?",
        options: ["This is a ball (what it is)", "This is red (the color)", "This is round (the shape)", "This is fun (how to feel about it)"],
        correctAnswer: 0,
        explanation: "Great choice! Just like teaching a baby, we start with the most basic concept. After many examples, your pet will learn to recognize balls of all colors and sizes!"
      },
      {
        id: 3,
        type: "explanation",
        title: "How Machine Learning Works",
        content: "Machine learning is like being a teacher to a computer. You show it thousands of examples (photos of cats, sounds of music, etc.) and it starts to notice patterns. The more examples you give, the smarter it gets!"
      },
      {
        id: 4,
        type: "quiz",
        title: "Learning Expert Quiz",
        content: "After showing your pet 1000 photos of balls, what would it be BEST at recognizing?",
        options: ["A basketball (round ball it has seen)", "A football (oval shaped)", "A cube (completely different shape)", "A bicycle (not a ball at all)"],
        correctAnswer: 0,
        explanation: "Exactly! Your pet learned from round ball examples, so it's best at recognizing other round balls. This shows why AI needs diverse training data to work well!"
      }
    ]
  },
  {
    id: 4,
    title: "Smart Voice Helper",
    description: "Discover how AI understands and speaks! Learn about voice assistants and natural language processing through fun activities.",
    icon: "🗣️",
    difficulty: "easy",
    estimatedTime: 6,
    concept: "Natural Language Processing",
    gameType: "pattern",
    steps: [
      {
        id: 1,
        type: "intro",
        title: "Hello, Voice Assistant!",
        content: "Have you ever talked to Siri, Alexa, or Google? They use Natural Language Processing (NLP) to understand human speech and respond! Let's discover how AI learns to understand and speak like humans."
      },
      {
        id: 2,
        type: "activity", 
        title: "Teaching AI to Understand",
        content: "You say 'I'm hungry' to a voice assistant. What does the AI need to understand first?",
        options: ["The individual sounds (I, am, hungry)", "The meaning (you want food)", "Your voice tone (how you sound)", "The time of day"],
        correctAnswer: 0,
        explanation: "Great! AI first breaks down speech into individual sounds and words, then figures out the meaning. It's like learning to read - first letters, then words, then sentences!"
      },
      {
        id: 3,
        type: "explanation",
        title: "How AI Learns Language",
        content: "AI learns language by reading millions of books, articles, and conversations. It discovers that 'hungry' relates to 'food' and 'eat', just like you learned that 'meow' means a cat is talking to you!"
      },
      {
        id: 4,
        type: "quiz",
        title: "Language Detective Quiz",
        content: "Which sentence would be HARDEST for AI to understand correctly?",
        options: ["'Turn on the lights please'", "'It's raining cats and dogs'", "'What time is it?'", "'Play my favorite song'"],
        correctAnswer: 1,
        explanation: "Exactly! 'Raining cats and dogs' is an idiom that means heavy rain, not actual animals falling! AI struggles with expressions that don't mean exactly what they say."
      }
    ]
  },
  {
    id: 5,
    title: "Future Predictor",
    description: "Learn how AI predicts the future by looking at patterns from the past. Become a prediction expert with data and trends!",
    icon: "🔮",
    difficulty: "medium",
    estimatedTime: 7,
    concept: "Predictive Analytics", 
    gameType: "problem-solving",
    steps: [
      {
        id: 1,
        type: "intro",
        title: "Welcome Future Predictor!",
        content: "Did you know AI can help predict if it will rain tomorrow, which movie you'll like, or even what you might want to buy? AI looks at patterns from the past to make smart guesses about the future!"
      },
      {
        id: 2,
        type: "activity",
        title: "Weather Prediction Challenge", 
        content: "You notice it has rained every Tuesday for the past month. What's the best prediction for next Tuesday?",
        options: ["It will definitely rain", "It will probably rain", "It definitely won't rain", "Weather is completely random"],
        correctAnswer: 1,
        explanation: "Smart thinking! Patterns help us make good guesses, but we can't be 100% certain. AI uses 'probably' and 'likely' because the future isn't guaranteed!"
      },
      {
        id: 3,
        type: "explanation",
        title: "How AI Makes Predictions",
        content: "AI looks at tons of past data (like weather patterns, your movie ratings, or shopping history) and finds hidden connections. The more data it has, the better its predictions become!"
      },
      {
        id: 4,
        type: "quiz",
        title: "Prediction Expert Quiz",
        content: "An AI suggests you might like a new song. What data probably helped it decide?",
        options: ["Songs you skipped quickly", "Songs you played repeatedly", "Songs your friends like", "All of the above"],
        correctAnswer: 3,
        explanation: "Brilliant! AI uses all available data - your listening habits, skip patterns, and even social connections - to make better predictions. More data usually means better guesses!"
      }
    ]
  }
];
