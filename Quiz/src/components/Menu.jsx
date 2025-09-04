import React, { useState } from "react";
import "./Menu.css";


function Menu({ onStart }) {
  const [name, setName] = useState("");
  const [difficulty, setDifficulty] = useState("easy");

  const handleStart = () => {
    if (!name.trim()) {
      alert("Please enter your name before starting the quiz!");
      return;
    }
    onStart(name, difficulty);
  };

  return (
    <div className="menu-container">
      <div className="menu-card">
        <h1 className="menu-title">Quiz App</h1>

        <input
          type="text"
          placeholder="Enter your name"
          className="menu-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <select
          className="menu-select"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <button className="menu-button" onClick={handleStart}>
          Start Quiz
        </button>
      </div>
    </div>
  );
}

export default Menu;
