import React, { useState } from 'react';
import ScoreCardcomplete from '../components/ScoreCard/ScoreCardcomplete';
import Chartbarcomplete from '../components/chartbarCard/Chartbarcomplete';

function Result() {
  return (
    <div>
    <div style ={styles.lec}>
      My Results Report 
    </div>
    <div style={styles.gridContainer}>
      <ScoreCardcomplete />
      <Chartbarcomplete/>
      <Chartbarcomplete />
      <Chartbarcomplete/>
    </div>
    </div> 
  );
}

const styles = {
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, minmax(180px, 1fr))', // 최소 크기 조정
    gridGap: '0px 0px',
    padding: '20px',
    marginTop : '10px',
    marginLeft : '90px',
    marginRight : '50px',
  },
  lec : {
    width : '1330px',
    height : '35px',
    borderRadius: '15px',
    padding: '5px',
    backgroundColor : '#2d5ace',
    display: 'flex',            /* Flexbox를 사용 */
    justifyContent: 'center',     /* 가로로 중앙 정렬 */
    alignItems: 'center', 
    color : "#ffffff"  ,
    marginLeft : '90px',
    marginTop : '40px'
  },
};

export default Result;
