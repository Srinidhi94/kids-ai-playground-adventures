
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
        explanation: "Great job! The triangle is different because it's not a circle. This took you a few seconds, but AI can do this with thousands of images in milliseconds!",
        wrongExplanation: "Look carefully! Three of these are circles, but one has a different shape. The triangle (🔺) is the odd one out because it's not round like the others."
      },
      {
        id: 3,
        type: "activity",
        title: "Pattern Recognition Practice",
        content: "Now let's try another pattern challenge. Which number comes next in this sequence: 2, 4, 6, 8, ?",
        options: ["9", "10", "11", "12"],
        correctAnswer: 1,
        explanation: "Perfect! The pattern is adding 2 each time (even numbers). Recognizing number patterns is one of the first things AI learns to do!",
        wrongExplanation: "Look at the pattern: 2, 4, 6, 8... Each number increases by 2! So the next number would be 8 + 2 = 10. This is called an arithmetic sequence."
      },
      {
        id: 4,
        type: "explanation",
        title: "How AI Sees Patterns",
        content: "AI looks at pictures like a puzzle made of tiny dots (pixels). It learns that cats usually have pointy ears, whiskers, and fur patterns. After seeing thousands of cat photos, it becomes amazing at spotting cats!"
      },
      {
        id: 5,
        type: "quiz",
        title: "Pattern Master Quiz",
        content: "Which of these would be HARDEST for early AI to recognize?",
        options: ["A stop sign (always red and octagonal)", "A cat (comes in many colors and positions)", "A circle (always round)", "The number 5 (always the same shape)"],
        correctAnswer: 1,
        explanation: "Exactly! Cats are tricky because they come in different colors, sizes, and positions. That's why AI needs to see lots of examples to get really good at it!",
        wrongExplanation: "Think about what makes recognition challenging. A stop sign is always the same red octagon, but cats can be any color, size, or position. This variety makes them much harder for AI to learn!"
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
        explanation: "Smart thinking! Breaking big problems into smaller pieces is exactly how AI helps us solve complex problems!",
        wrongExplanation: "Think about the best strategy! Throwing things under the bed isn't really cleaning, and giving up won't solve the problem. The smart approach is to break the big task into smaller, manageable pieces - clean one area at a time!"
      },
      {
        id: 3,
        type: "activity",
        title: "AI Problem-Solving Practice",
        content: "A library has 10,000 books and needs to find one specific book. What's the smartest approach an AI would use?",
        options: ["Check every book one by one", "Use a search system with categories", "Ask everyone to help search", "Give up - too many books"],
        correctAnswer: 1,
        explanation: "Brilliant! AI excels at organizing and searching through large amounts of information quickly and efficiently!",
        wrongExplanation: "Think about what AI does best! Checking every book one by one would take forever, and asking people to help isn't using AI. The smart solution is to use AI's strength: organizing and searching through data systematically!"
      },
      {
        id: 4,
        type: "explanation",
        title: "How AI Helps Solve Problems",
        content: "Now imagine an AI helper for your room: It could make a map of your room, remind you where things belong, set timers for each area, and even play your favorite cleaning music! AI handles the boring parts so you can focus on the fun parts."
      },
      {
        id: 5,
        type: "quiz",
        title: "Teamwork Challenge",
        content: "You're planning a birthday party. What would be the BEST job for your AI assistant?",
        options: ["Choosing the party theme (needs creativity)", "Sending invitations to all friends (repetitive task)", "Deciding what games to play (needs to know what's fun)", "Picking the perfect gift (needs to know the person)"],
        correctAnswer: 1,
        explanation: "Perfect! AI is great at repetitive tasks like sending messages. You're better at creative tasks like choosing themes and knowing what your friends will enjoy!",
        wrongExplanation: "Consider what each task requires! AI excels at repetitive, organized tasks like sending many similar messages. But creativity, personal knowledge, and understanding what's fun - those are human superpowers!"
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
        explanation: "Great choice! Just like teaching a baby, we start with the most basic concept. After many examples, your pet will learn to recognize balls of all colors and sizes!",
        wrongExplanation: "Think about learning basics first! While color and shape are important, it's best to start with the most fundamental concept - what the object actually IS. Once your pet knows 'ball,' then you can teach details like color and shape!"
      },
      {
        id: 3,
        type: "activity",
        title: "Training Progress",
        content: "After showing your pet 1000 photos of balls, what would it be BEST at recognizing?",
        options: ["A basketball (round ball it has seen)", "A football (oval shaped)", "A cube (completely different shape)", "A bicycle (not a ball at all)"],
        correctAnswer: 0,
        explanation: "Exactly! Your pet learned from round ball examples, so it's best at recognizing other round balls. This shows why AI needs diverse training data to work well!",
        wrongExplanation: "Remember what your pet was trained on! You showed it 1000 photos of round balls, so it learned the pattern of 'round objects.' A basketball is also round like the training examples, making it the easiest to recognize!"
      },
      {
        id: 4,
        type: "explanation",
        title: "How Machine Learning Works",
        content: "Machine learning is like being a teacher to a computer. You show it thousands of examples (photos of cats, sounds of music, etc.) and it starts to notice patterns. The more examples you give, the smarter it gets!"
      },
      {
        id: 5,
        type: "quiz",
        title: "Learning Expert Quiz",
        content: "What happens when you show your AI pet examples of different animals?",
        options: ["It gets confused and forgets everything", "It learns to tell the difference between animals", "It only remembers the last animal you showed", "It combines all animals into one weird creature"],
        correctAnswer: 1,
        explanation: "Perfect! With diverse examples, AI learns to distinguish between different categories. This is why training data variety is so important for smart AI!",
        wrongExplanation: "Think about how learning works! When you show AI different types of animals, it learns to notice the unique features of each type. It doesn't get confused - it gets smarter by learning the differences between cats, dogs, birds, etc.!"
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
        explanation: "Great! AI first breaks down speech into individual sounds and words, then figures out the meaning. It's like learning to read - first letters, then words, then sentences!",
        wrongExplanation: "Think step by step! Just like when you learned to read, AI must first understand the individual sounds and words before it can figure out what you mean. Breaking down 'I'm hungry' into sounds comes first!"
      },
      {
        id: 3,
        type: "activity",
        title: "Voice Recognition Challenge",
        content: "Which sentence would be HARDEST for AI to understand correctly?",
        options: ["'Turn on the lights please'", "'It's raining cats and dogs'", "'What time is it?'", "'Play my favorite song'"],
        correctAnswer: 1,
        explanation: "Exactly! 'Raining cats and dogs' is an idiom that means heavy rain, not actual animals falling! AI struggles with expressions that don't mean exactly what they say.",
        wrongExplanation: "Consider what makes language tricky! 'Raining cats and dogs' doesn't literally mean animals are falling from the sky - it's an idiom meaning 'heavy rain.' AI understands literal language better than these colorful expressions!"
      },
      {
        id: 4,
        type: "explanation",
        title: "How AI Learns Language",
        content: "AI learns language by reading millions of books, articles, and conversations. It discovers that 'hungry' relates to 'food' and 'eat', just like you learned that 'meow' means a cat is talking to you!"
      },
      {
        id: 5,
        type: "quiz",
        title: "Language Detective Quiz",
        content: "Why do voice assistants sometimes misunderstand jokes or sarcasm?",
        options: ["They don't have ears", "They can't read facial expressions or tone easily", "They're not smart enough", "They don't like jokes"],
        correctAnswer: 1,
        explanation: "Smart observation! AI focuses on words and patterns, but humor and sarcasm often depend on tone, timing, and context that's harder for AI to detect!",
        wrongExplanation: "Think about what makes jokes funny! Sarcasm and humor often depend on HOW something is said (tone of voice) and facial expressions, not just the words. AI is great with words but still learning about human emotions and expressions!"
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
        explanation: "Smart thinking! Patterns help us make good guesses, but we can't be 100% certain. AI uses 'probably' and 'likely' because the future isn't guaranteed!",
        wrongExplanation: "Be careful with predictions! While the pattern suggests rain is likely, nothing in the future is 100% certain. Weather can change! AI learns to say 'probably' rather than 'definitely' because patterns help predict but don't guarantee the future."
      },
      {
        id: 3,
        type: "activity",
        title: "Pattern Prediction Game",
        content: "An AI notices you always order pizza on Friday nights. What's the most reasonable prediction?",
        options: ["You'll definitely order pizza next Friday", "You'll probably want pizza next Friday", "You'll never order pizza again", "You only eat pizza on Fridays"],
        correctAnswer: 1,
        explanation: "Excellent reasoning! AI learns from patterns but knows that people can change their minds. It makes probable predictions, not absolute ones!",
        wrongExplanation: "Remember that people are unpredictable! While you have ordered pizza on Fridays before, AI knows that humans can change their habits. It would predict you'll 'probably' want pizza, not 'definitely' - because people have free choice!"
      },
      {
        id: 4,
        type: "explanation",
        title: "How AI Makes Predictions",
        content: "AI looks at tons of past data (like weather patterns, your movie ratings, or shopping history) and finds hidden connections. The more data it has, the better its predictions become!"
      },
      {
        id: 5,
        type: "quiz",
        title: "Prediction Expert Quiz",
        content: "An AI suggests you might like a new song. What data probably helped it decide?",
        options: ["Songs you skipped quickly", "Songs you played repeatedly", "Songs your friends like", "All of the above"],
        correctAnswer: 3,
        explanation: "Brilliant! AI uses all available data - your listening habits, skip patterns, and even social connections - to make better predictions. More data usually means better guesses!",
        wrongExplanation: "Think bigger! AI doesn't just look at one type of data. It combines EVERYTHING it knows about you - songs you love, songs you skip, what your friends enjoy - to make the best possible recommendation. More information leads to better suggestions!"
      }
    ]
  }
];
