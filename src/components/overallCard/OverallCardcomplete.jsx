import OverallChart from './OverallChart'
import OverallScore from './OverallScore';

function OverallCardcomplete({Score}) {

  let prData = [{label: '속도', score: Score.speed_score}, {label: '크기', score: Score.decibel_score}, {label: '전달력', score: Score.clearity_score}]

  return (
    <div>
      <div style = {styles.main}>
        <div style = {styles.title}>종합적인 결과</div>
        <OverallChart prData={prData}/>
        <OverallScore prData={prData}/>
      </div>
    </div>
  );
}

const styles = {
  main:{
    display: 'flex',
    flexDirection: 'column',
    alingItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    width: 'auto',
    height: 'auto',
    maxWidth : '250px',
    maxHeight : '300px',
  },
  title:{
    fontSize: '1.2em',
    fontWeight: 'bold',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'left',
  }
}

export default OverallCardcomplete;
