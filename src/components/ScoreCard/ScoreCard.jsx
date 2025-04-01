// components/ScoreCard.js
import React from 'react';
import SemiCircleBarChart from './SemiCircleBarChart';

function ScoreCard({score, style}) {
  return (
    <div style={style}>
      <SemiCircleBarChart score={score}/>
    </div>
  );
}

export default ScoreCard;
