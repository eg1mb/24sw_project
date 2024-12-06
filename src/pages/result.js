import React, { useState, useEffect, useRef } from 'react';
import ScoreCardcomplete from '../components/ScoreCard/ScoreCardcomplete';
import WeakStrongCard from '../components/Weak_Strong_Card/Weak_Strong';
import ScrollButtons from '../components/buttons/scrollButtons';
import OverallCard from '../components/overallCard/overallCard';
import styled from 'styled-components';
import Sebucheck from "../components/sebupage/sebucheck"

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
  details: {
    text: "음… 저는 이 프로젝트를 잘 했다고 생각해... 음... 그런데 음… 제가 제가 실수한 부분도 조금 있었던 것 같아요. \n 잘 넘어가게 되었습니다\n",
    Clarity: {
      hmm: ["음…", "음..."] ,
      reps: ["제가 제가"],
      blur: ["생각해..."],
    },
    Contents : [{origin: "이 프로젝트를", correct: "프로젝트", reason: ""}, {origin: "실수한 부분도", correct: "", reason: ""} ],
    Grammar: {
      contents: [{ original: "제가 실수한", corrected: "내가 실수한" }, { original: "안녕", corrected: "" }],
      politeness: [{ original: "부분도", corrected: "" }, { original: "조금", corrected: "" }],
      voca: [{ original: "ab", corrected: " " }, { original: "ab", corrected: "" }],
      sent_complition: [{ original: "add", corrected: "" }, { original: "ad", corrected: "" }],
    },
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

/* local storage를 이용해 test.js의 값 가져오는 것 
useEffect(() => {
  // 클라이언트 사이드에서만 실행되도록 조건 추가
  
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const Data = JSON.parse(storedUser);
      console.log(Data); // useState에서 값 가져오기 
      // 이 값 추가 
    } else {
      console.log('사용자 정보가 없습니다.');
  }
}, []);*/


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
    <Sebucheck Score ={DummyScore.details} />
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