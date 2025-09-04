import React, { useState } from "react";
import Menu from "./components/Menu";
import Quiz from "./components/Quiz";
import Results from "./components/Results";
import "./App.css";

function App() {
  const [gameState, setGameState] = useState("menu"); // menu | quiz | results
  const [username, setUsername] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [answers, setAnswers] = useState([]);

  const handleStart = (name, diff) => {
    setUsername(name);
    setDifficulty(diff);
    setGameState("quiz");
  };

  const handleFinish = (finalAnswers) => {
    setAnswers(finalAnswers);
    setGameState("results");
  };

  const handleRestart = () => {
    setGameState("menu");
    setAnswers([]);
    setUsername("");
    setDifficulty("easy");
  };

  return (
    <div>
      {gameState === "menu" && <Menu onStart={handleStart} />}
      {gameState === "quiz" && (
        <Quiz
          onFinish={handleFinish}
          username={username}
          difficulty={difficulty}
        />
      )}
      {gameState === "results" && (
        <Results
          answers={answers}
          username={username}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}

export default App;
