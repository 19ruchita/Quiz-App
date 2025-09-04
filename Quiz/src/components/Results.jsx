import React from "react";
import "./Results.css";


function Results({ answers, onRestart, username }) {
  const score = answers.filter(a => a.selected === a.correct).length;

  return (
    <div className="results">
      <h2>Well done, {username}!</h2>
      <h3>You scored {score} out of {answers.length}</h3>

      <div className="summary">
        {answers.map((ans, i) => (
          <div key={i} className="question-summary">
            <p><strong>Q{i + 1}: {ans.question}</strong></p>

            {/* Case 1: Skipped */}
            {ans.selected === null ? (
              <p style={{ color: "orange" }}>⚠️ Skipped (No answer selected)</p>
            ) : (
              <>
                <p>Your Answer: {ans.selected}</p>
                <p>
                  {ans.selected === ans.correct 
                    ? <span style={{ color: "green" }}>✅ Correct</span> 
                    : <span style={{ color: "red" }}>❌ Wrong (Correct: {ans.correct})</span>}
                </p>
              </>
            )}
            <hr />
          </div>
        ))}
      </div>

      <button onClick={onRestart}>Restart Quiz</button>
    </div>
  );
}

export default Results;
