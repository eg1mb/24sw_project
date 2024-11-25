import ScoreCard from './ScoreCard';

function ScoreCardcomplete({Score}) {

  return (
      <div>
        <div style={{
          margin: '20px',
          position: 'relative',
          width: '100%',
          height: '100%',
          maxWidth: '400px',
          maxHeight: '400px',
        }}>
          <div>
            <p style={{
              fontFamily: 'Arial, sans-serif',
              fontWeight: 'bold',
              fontSize: '60px',
              color: '#2d5ace',
              lineHeight: '1.2'
            }}>My Results</p>
            <p style={{
              fontFamily: 'Arial, sans-serif',
              fontWeight: '300',
              fontSize: '60px',
              color: '#2d5ace',
              lineHeight: '1.2'
            }}>Report</p>
          </div>
          <ScoreCard score={Score.total_score}
            style={{
              position: 'relative',
              top: '25%',
              left: '100%',
              transform: 'translate(-50%, -50%)'
            }}
          />
        </div>
      </div>
    
  );
}

export default ScoreCardcomplete;