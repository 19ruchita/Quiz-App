QuizApp (React + Vite)

A clean, responsive quiz application built with React and Vite. 
It supports name entry, difficulty levels (easy/medium/hard), one-question-at-a-time flow, timer per question, Previous / Skip / Next, progress bar, and a Results screen with detailed answer review.

1.Check versions: node -v npm -v

2.Install dependencies: npm install

3.Run the dev server npm run dev

4.Build for Production npm run build

Data Source Default mode uses a local JSON file at public/questions.json

How It Works (User Flow) :

Menu: Enter name + choose difficulty → Start Quiz

Quiz: One question at a time with 4 options Timer per question (30s, auto-skip on timeout) Previous, Skip, Next/Submit Progress bar + “Question X of Y” + Player name

Results: Final score (e.g., “You scored 7/10”) 
Per-question summary:
 ✅ Correct 
 ❌ Wrong (shows correct answer) 
 ⚠️ Skipped

Restart Quiz (resets state and returns to Menu)
