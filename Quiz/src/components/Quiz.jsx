import React, { useState, useEffect } from "react";
import "./Quiz.css"; // import CSS

function Quiz({ onFinish, username, difficulty }) {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(30);

  // Load questions.json with difficulty
  useEffect(() => {
    fetch("/questions.json")
      .then((res) => res.json())
      .then((data) => {
        const quizData = data[difficulty] || [];
        setQuestions(quizData);
        setAnswers(new Array(quizData.length).fill(null));
        setLoading(false);
      })
      .catch((err) => console.error("Error loading questions:", err));
  }, [difficulty]);

  // Timer
  useEffect(() => {
    if (loading) return;
    if (timeLeft === 0) {
      handleSkip();
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, loading]);

  const handleNext = () => {
    if (selected === null) return;

    const updated = [...answers];
    updated[current] = {
      question: questions[current].question,
      selected,
      correct: questions[current].answer
    };
    setAnswers(updated);

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
      setSelected(updated[current + 1]?.selected || null);
      setTimeLeft(30);
    } else {
      onFinish(updated);
    }
  };

  const handlePrevious = () => {
    if (current > 0) {
      setCurrent(current - 1);
      setSelected(answers[current - 1]?.selected || null);
      setTimeLeft(30);
    }
  };

  const handleSkip = () => {
    const updated = [...answers];
    updated[current] = {
      question: questions[current].question,
      selected: null,
      correct: questions[current].answer
    };
    setAnswers(updated);

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
      setSelected(updated[current + 1]?.selected || null);
      setTimeLeft(30);
    } else {
      onFinish(updated);
    }
  };

  if (loading) return <h2>Loading Questions...</h2>;

  const progress = ((current + 1) / questions.length) * 100;

  return (
    <div className="quiz-container">
      <div className="quiz-card">
        <div className="quiz-header">
          <h3>Player: {username}</h3>
          <p>Difficulty: {difficulty.toUpperCase()}</p>
          <p>Question {current + 1} of {questions.length}</p>

          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>

          <p className="timer">⏳ Time Left: {timeLeft}s</p>
        </div>

        <h2 className="quiz-question">{questions[current].question}</h2>

        <div className="quiz-options">
          {questions[current].options.map((opt, i) => (
            <button
              key={i}
              onClick={() => setSelected(opt)}
              className={`option-btn ${selected === opt ? "selected" : ""}`}
            >
              {opt}
            </button>
          ))}
        </div>

        <div className="quiz-actions">
          <button onClick={handlePrevious} disabled={current === 0} className="prev-btn">
            Previous
          </button>
          <button onClick={handleSkip} className="skip-btn">
            Skip
          </button>
          <button onClick={handleNext} className="next-btn">
            {current + 1 === questions.length ? "Submit" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Quiz;
