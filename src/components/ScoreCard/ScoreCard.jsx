// components/ScoreCard.js
import React from 'react';
import SemiCircleBarChart from './SemiCircleBarChart';

function ScoreCard({ score, name }) {
  return (
    <div style={styles.card}>
      <SemiCircleBarChart score={score} name={name} />
      <div style={styles.scoreText}>
        {name}님의 점수
      </div>
    </div>
  );
}

const styles = {
  card: {
    width: '100%', // 고정 너비 제거
    height: '100%', // 고정 높이 제거
    maxWidth: '250px', // 최대 크기 제한
    maxHeight: '300px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',  // 세로로 정렬
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
  },
  scoreText: {
      // SemiCircleBarChart와 점수 사이의 간격
    fontSize: '20px',    // 점수 글자 크기 설정
    marginBottom : '70px',
    color: '#2d5ace',
    fontFamily : 'Arial, sans-serif',
  },
};

export default ScoreCard;
