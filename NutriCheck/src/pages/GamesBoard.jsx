import React from 'react';
import styles from '../styles/GamesBoard.module.css';

const GamesBoard = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>GamesBoard</h1>
      <div className={styles.cardContainer}>
        <GameCard 
          title="NutriQuiz" 
          description="Test your nutrition knowledge" 
          href="/quiz"
          bgColor="linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)"
        />
        <GameCard 
          title="Protein-Pantry" 
          description="Assess your daily protein intake" 
          href="/pantry"
          bgColor="linear-gradient(135deg, #f6d365 0%, #fda085 100%)"
        />
      </div>
    </div>
  );
};

const GameCard = ({ title, description, href, bgColor }) => {
  return (
    <a href={href} className={styles.card} style={{ background: bgColor }}>
      <div className={styles.cardContent}>
        <h2 className={styles.cardTitle}>{title}</h2>
        <p className={styles.cardDescription}>{description}</p>
      </div>
    </a>
  );
};

export default GamesBoard;