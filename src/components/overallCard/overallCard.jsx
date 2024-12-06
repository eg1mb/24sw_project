import {forwardRef} from 'react';
import {SpeedCard, VolumeCard, ContentCard, VocaCard, SentCompletionCard, PolitenessCard, ClarityCard} from './overallCardComp';

const OverallCard = ({Score, User}, ref) => {
  return (
    <div ref={ref} style={styles.wrapper}>
      <div style={styles.title}>평가 항목</div>
      <div style={styles.content}>
        {User.name}님은 각 항목에서 몇점을 받았을까요?
      </div>
      <div style={styles.container}>
        <SpeedCard speed={Score.speed}/>
        <VolumeCard volume={Score.volume}/>
        <ContentCard content={Score.grammar.content}/>
        <VocaCard voca={Score.grammar.voca}/>
      </div>
      <div style={styles.container}>
        <SentCompletionCard sent_completion={Score.grammar.sent_completion}/>
        <PolitenessCard politeness={Score.grammar.politeness}/>
        <ClarityCard clarity={Score.clarity}/>
      </div>
    </div>
  )
}

const styles = {
  wrapper : {
    margin : "10px 70px",
  },
  title : {
    margin : "0px 20px",
    fontSize : "40px",
    fontWeight : "bold",
  },
  content : {
    margin : "0px 20px",
    fontSize : "24px",
  },
  container : {
    display : "flex",
    flexDirection : "row",
  }
}

export default forwardRef(OverallCard);