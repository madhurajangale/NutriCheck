import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/quiz.css';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, total, incorrectAnswers } = location.state;

  return (
    <div className="results-container">
      <h1 style={{ fontSize: '2.5em', marginBottom: '20px' }}>🎉 Quiz Results</h1>
      <p>You scored {score} out of {total}.</p>
      <p>
        {score === total
          ? 'Amazing! You know your nutrition well!'
          : 'Keep learning and try again!'}
      </p>

      {incorrectAnswers.length > 0 && (
        <div className="incorrect-answers">
          <h2>Questions You Got Wrong:</h2>
          {incorrectAnswers.map((item, index) => (
            <div key={index} className="incorrect-answer-card">
              <p><strong>Question:</strong> {item.question}</p>
              <p><strong>Your Answer:</strong> {item.userAnswer}</p>
              <p><strong>Correct Answer:</strong> {item.correctAnswer}</p>
              <p><strong>Tip:</strong> {item.tip}</p>
            </div>
          ))}
        </div>
      )}

      <button className="play-again-button" onClick={() => navigate('/')}>
        Play Again
      </button>
    </div>
  );
};

export default Results;
