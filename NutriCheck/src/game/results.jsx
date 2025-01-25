import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/quiz.css';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, total } = location.state;

  return (
    <div className="results-container">
      <h1 style={{ fontSize: '2.5em', marginBottom: '20px' }}>🎉 Quiz Results</h1>
      <p>You scored {score} out of {total}.</p>
      <p>
        {score === total
          ? 'Amazing! You know your nutrition well!'
          : 'Keep learning and try again!'}
      </p>
      <button className="play-again-button" onClick={() => navigate('/')}>
        Play Again
      </button>
    </div>
  );
};

export default Results;
