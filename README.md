# French Quiz App

A React + TypeScript quiz application to help learn French at A1-A2 level. Test your comprehension by translating French sentences to English.

## Features

- **100 French sentences** with English translations (50 A1 level, 50 A2 level)
- **10-round quiz format** with scoring system
- **Multiple choice** - 3 options per question (1 correct, 2 moderately tricky incorrect)
- **Randomized answer order** to prevent pattern recognition
- **Immediate feedback** showing the correct answer after each selection
- **Responsive design** - works great on mobile and desktop
- **No repeats** - questions don't repeat within a single game session

## Tech Stack

- **Vite** - Fast build tool and dev server
- **React 19** - UI framework
- **TypeScript** - Type safety with strict mode
- **Tailwind CSS** - Utility-first styling
- **GitHub Pages** - Static hosting with automated deployment

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd french

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Quiz.tsx              # Main game controller
│   ├── QuestionCard.tsx      # Question display with answer buttons
│   ├── AnswerButton.tsx      # Individual answer option
│   ├── ScoreDisplay.tsx      # Score and round counter
│   └── ResultFeedback.tsx    # Post-answer feedback
├── data/
│   └── sentences.ts          # 100 French sentences with translations
├── types/
│   └── quiz.ts               # TypeScript type definitions
├── utils/
│   ├── shuffle.ts            # Array shuffling utility
│   └── quizLogic.ts          # Quiz logic functions
├── App.tsx                   # Root component
├── main.tsx                  # Entry point
└── index.css                 # Tailwind imports
```

## How It Works

1. **Start**: The app loads a random French sentence from the pool of 100
2. **Choose**: Select one of three English translations
3. **Feedback**: See if you were correct and what the right answer was
4. **Next**: Continue through 10 rounds
5. **Score**: See your final score and start over

## Adding New Sentences

To add more French sentences, edit [src/data/sentences.ts](src/data/sentences.ts):

```typescript
{
  id: 101,
  french: "Votre French sentence here",
  correctEnglish: "Correct English translation",
  incorrectOptions: [
    "First incorrect but similar translation",
    "Second incorrect but similar translation"
  ],
  level: 'A1' // or 'A2'
}
```

**Tips for incorrect options:**
- Use similar vocabulary or grammar
- Include common learner mistakes
- Make them distinguishable but challenging

## Deployment

The app automatically deploys to GitHub Pages when you push to the `master` branch.

### Setup GitHub Pages

1. Go to your repository Settings
2. Navigate to Pages section
3. Set Source to "GitHub Actions"
4. Push to master branch to trigger deployment

The site will be available at: `https://[username].github.io/french/`

## License

MIT

## Contributing

Feel free to submit issues or pull requests to improve the quiz content or functionality.
