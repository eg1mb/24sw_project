import {forwardRef} from 'react';
import {SpeedCard, VolumeCard, ContentCard, VocaCard, SentCompletionCard, PolitenessCard, ClarityCard} from './overallCardComp';

const OverallCard = ({Score}, ref) => {
  return (
    <div ref={ref}>
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
  container : {
    display : "flex",
    flexDirection : "row",
  }
}

export default forwardRef(OverallCard);