import React, { useState, useEffect, useRef } from 'react';
import ScoreCardcomplete from '../components/ScoreCard/ScoreCardcomplete';
import WeakStrongCard from '../components/Weak_Strong_Card/Weak_Strong';
import ScrollButtons from '../components/buttons/scrollButtons';
import OverallCard from '../components/overallCard/overallCard';
import styled from 'styled-components';

const DummyScore = {
  total_score : 650,
  weak_strong : {
    weakness : ['약점1', '약점2', '약점3'],
    strength : ['강점1', '강점2', '강점3'],
  },
  speed : 100,
  volume : 100,
  clarity : 50,
  grammar : {
    content: [100, 'level', 'comment'],
    politeness: [100, 'level', 'comment'],
    voca : [100, 'level', 'comment'],
    sent_completion : [100, 'level', 'comment'],
  },
  details : {
    text: "...",
    Clarity : { hmm : ["errors" , "errors"] , reps : ["errors" , "errors"] , blur : ["errors" , "errors"] } ,
    Contents : [{"origin": "", "correct": "", "reason": ""}, {"origin": "", "correct": "", "reason": ""} ] ,
    Grammar : {
      contents : [{original: "음…" , corrected : " " }, {original: "음…" , corrected : " " } ] , 
      politeness : [{original : "error" , corrected : "corrected" }, {original : "error" , corrected : "corrected" }],
      voca: [{original : "error" , corrected : "corrected" }, {original : "error" , corrected : "corrected" }],
      sent_complition: [{original : "error" , corrected : "corrected" }, {original : "error" , corrected : "corrected" }]
    }
  }
}

const DummyUser = {
  name : '김민수',
}

// 1) components 폴더에 css한 카드 위치
// 2) import해서 <Chartbarcomplete/>처럼 해당된 위치에 배치 
function Result() {
  const [Data, setData] = useState(null);
  const [sebuData, setsebuData] = useState(null);
  const overallRef = useRef(null);
  const detailRef = useRef(null);

/*
// local Storage로 test.js에서 저장한 데이터를 받아오기 
useEffect(() => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
  const Data = JSON.parse(storedUser);
  setData(Data)
  setsebuData(Data.details)
  console.log(userObject.name);  // 사용자 정보 출력
} else {
  console.log('사용자 정보가 없습니다.');
}

  
  } , [])
*/


  return (
   <>
    <Container>
      <ScoreCardcomplete Score={DummyScore} User={DummyUser}/>
      <WeakStrongCard weak_strong={DummyScore.weak_strong} User={DummyUser}/>
    </Container>
    <ScrollButtons overallRef={overallRef} detailRef={detailRef}/>
    <OverallCard Score={DummyScore} ref={overallRef}/>
    <Container ref={detailRef}>
      
    </Container>
   </>
  );
}
// grid 형태로 만들어놓은 상태 열을 2개로 만들어야 함 
const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 2.5fr;
  grid-gap: 70px;
  padding: 40px 100px;
`;

export default Result;