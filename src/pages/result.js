import React, { useState } from 'react';
import ScoreCardcomplete from '../components/ScoreCard/ScoreCardcomplete';
import Chartbarcomplete from '../components/chartbarCard/Chartbarcomplete';
import Weakness from '../components/WeaknessCard/Weakness'

// 1) components 폴더에 css한 카드 위치
// 2) import해서 <Chartbarcomplete/>처럼 해당된 위치에 배치 
function Result() {
  return (
    <div>
    <div style ={styles.lec}>
      My Results Report 
    </div>
    <div style={styles.gridContainer}>
      <Chartbarcomplete/> 
      <ScoreCardcomplete />
      <Chartbarcomplete />
      <Chartbarcomplete/>
    </div>
    <div style ={styles.gridContainer2}>
      <Weakness/>
      <Weakness/> 
    </div>
    </div> 
  );
}
// grid 형태로 만들어놓은 상태 열을 2개로 만들어야 함 
const styles = {
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr', // 최소 크기 조정
    gridGap: '0px 0px',
    padding: '20px',
    marginTop : '10px',
    marginLeft : '160px',
    marginRight : '90px',
  },
  gridContainer2 : {
    display : 'grid' ,
    gridTemplateColumns : 'repeat(3, minmax(200px, 1fr))',
    gridGap : '0px 0px',
    marginLeft : '190px',
    marginRight : '90px',
    marginBottom : '50px',
  },
  lec : {
    width : '1200px',
    height : '35px',
    borderRadius: '15px',
    padding: '5px',
    backgroundColor : '#2d5ace',
    display: 'flex',            /* Flexbox를 사용 */
    justifyContent: 'center',     /* 가로로 중앙 정렬 */
    alignItems: 'center', 
    color : "#ffffff"  ,
    marginLeft : '160px',
    marginTop : '20px'
  },
};

export default Result;