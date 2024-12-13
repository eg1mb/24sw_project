import React, { useState, useEffect, useRef } from 'react';
import ScoreCardcomplete from '../components/ScoreCard/ScoreCardcomplete';
import WeakStrongCard from '../components/Weak_Strong_Card/Weak_Strong';
import ScrollButtons from '../components/buttons/scrollButtons';
import OverallCard from '../components/overallCard/overallCard';
import styled from 'styled-components';
import Sebucheck from "../components/sebupage/sebucheck"

const dummyScore = {
  total_score : 850 ,
  
  weak_strong : {
    weakness : ['문법 오류 및 부적절한 표현', '높임말과 반말 혼용', '반복적이고 산만한 표현'],
    strength : ["문제를 분석하고 협력하여 원인을 파악한 뒤, 적절한 해결책(서버 확장 및 쿼리 최적화)을 제시해 논리적인 전개가 이루어짐",
      '팀워크와 소통의 중요성 강조', '문제 해결의 성과를 명확히 제시해 설득력을 높임'],
  },
  
  speed_score: 100,
  
  volume_score: 150,
  
  grammar : {
    contents_score : 120 ,
    politeness_score : 130 ,
    voca_score : 150 ,
    sentcompletion_score :100 ,
    clarity_score : 100 
  },
  details : {
    text : '음.. 제가 가장 어려운 문제를 해결했던 경험은 대힉 프로젝트 중 발생한 서버 다운 문제를 해결했을 때야. 그때는 깜짝 놀랐습니다. 프로.. 프로젝트 진행 도중 서버가 갑작스럽게 다운되서... 데이터 손실 가능성과 일정 지연 우려가 있어서... 저는 문제를 분석한 뒤, 팀원들과 협력하여 로그를 조사하고 원인을 파악했습니다. 결과적으로, 데이터베이스 과부하가 주요 원인임을 확인하였고, 이를 해결하기 위해 서버를 확장하고 쿼리 최적화를 진행했습니다. 그 결과, 서버가 안정적으로 작동하게 되었고, 프로젝트를 기한 내에 마무리할 수 있었습니다. 이 경험을 통해 문제를 체계적으로 분석하고, 팀과 소통하며 해결하는 방법을 배웠습니다.',
    Clarity : {hmm : ["음.."] , reps : ["프로.."] ,
      blur : ["되서..."]
    },
    Contents : [
      {origin : "그때는 깜짝 놀랐습니다", correct : "", reason : "문맥에 맞지 않는 내용"}],
    Grammar : {
      politeness : [
        {original : "때야", corrected : "때 입니다", reason : "존댓말 사용 필수"}
    ],
    voca : [
        {original : "대힉 ", corrected : "대학", reason : "문맥 상 대학이 맞습니다"},
    ],
    sent_completion : [
        {original : "있어서...", corrected :"있었습니다", reason : "문장 끝 마무리 필수"},
       
    ],

    }
   
  },
}

const DummyUser = {
  name : '김민수',
}


// 1) components 폴더에 css한 카드 위치
// 2) import해서 <Chartbarcomplete/>처럼 해당된 위치에 배치 
function Result() {
  const [DummyScore , setData] = useState(dummyScore);
  const overallRef = useRef(null);
  const detailRef = useRef(null);
  const [array , setArray ] = useState([])

/* local storage를 이용해 test.js의 값 가져오는 것 */

useEffect(() => {
  // 클라이언트 사이드에서만 실행되도록 조건 추가
  
    const storedUser = localStorage.getItem('user');
    
    if (storedUser) {
      const Data = JSON.parse(storedUser);
      const ary = [ Data.speed_score , Math.floor(Data.volume_score), Data.grammar.clarity_score , Data.grammar.contents_score ,Data.grammar.voca_score , Data.grammar.sentcompletion_score,  Data.grammar.politeness_score]
      console.log(ary)
      setArray(ary)
      console.log(Data); // useState에서 값 가져오기
      setData(Data) 


      // 이 값 추가 
    } else {
      console.log('사용자 정보가 없습니다.');
  }
}, []);


  return (
   <>
   <Container>
      <ScoreCardcomplete Score={DummyScore} User={DummyUser}/>
      <WeakStrongCard weak_strong={DummyScore.weak_strong} User={DummyUser}/>
    </Container>
    <ScrollButtons overallRef={overallRef} detailRef={detailRef}/>
    <OverallCard Score={DummyScore} User={DummyUser} ref={overallRef}/>
    <Sebucheck Score ={DummyScore.details } Audio ={DummyScore.audio_file} Array ={array} ref={detailRef} />
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