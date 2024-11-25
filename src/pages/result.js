import React, { useState, useEffect } from 'react';
import ScoreCardcomplete from '../components/ScoreCard/ScoreCardcomplete';
import Chartbarcomplete from '../components/chartbarCard/Chartbarcomplete';
import Overallcomplete from '../components/overallCard/OverallCardcomplete';
import WeakStrongCard from '../components/Weak_Strong_Card/Weak_Strong';

/*
upload.js 에서 데이터를 받아오는 코드 
const UserScore = () => {
  const [data, setData] = setData(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: FormData,
      });
      const data = await response.json();
      setData(data);
    };
    fetchData();
  }, []);
}
*/

const DummyScore = {
  total_score : 75,
  speed_score : 80,
  decibel_score : 70,
  clearity_score : 85,
  grammar_score1 : 90,
  grammar_score2 : 80,
  grammar_score3 : 70,
  grammar_score4 : 60,
  strength : ['강점1', '강점2', '강점3'],
  weakness : ['약점1', '약점2', '약점3'],
  speed : ['속도1', '속도2', '속도3'],
  decibel : ['음성1', '음성2', '음성3'],
  clearity : ['명료도1', '명료도2', '명료도3']
}

const DummyUser = {
  name : '김민수',
}

// 1) components 폴더에 css한 카드 위치
// 2) import해서 <Chartbarcomplete/>처럼 해당된 위치에 배치 
function Result() {
  return (
    <div>
      <ScoreCardcomplete Score={DummyScore} User={DummyUser}/>
    </div> 
  );
}
// grid 형태로 만들어놓은 상태 열을 2개로 만들어야 함 
const styles = {
  
};

export default Result;