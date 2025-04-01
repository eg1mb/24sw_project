import React from 'react';


const Chartbar = ({prData} ) => {
  
  return (
    <div style={styles.card}>
      <div style={styles.title}>결과 간략히 보기 ▼</div>
      {prData.map((item, index) => (
        <div key={index} style={styles.progressContainer}>
          <div style={styles.label}>{item.label}</div>
          <div style={styles.progressBar}>
            <div
              style={{
                ...styles.progress,
                width: `${item.value}%`,
              }}
            ></div>
          </div>
          <div style={styles.percentage}>{item.value}%</div>
        </div>
      ))}
    </div>
  );
};

// 스타일 정의
const styles = {
  card: {
    width: 'auto',
    height : 'auto',
    maxWidth : '250px',
    maxHeight : '300px',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
    
  },
  title: {
    fontWeight: 'bold',
    fontSize: '1.2em',
    marginBottom: '10px',
  },
  progressContainer: {
    marginBottom: '15px',
  },
  label: {
    fontSize: '0.9em',
    marginBottom: '5px',
  },
  progressBar: {
    position: 'relative',
    width: '100%',
    height: '10px',
    backgroundColor: '#e0e0e0',
    borderRadius: '5px',
  },
  progress: {
    height: '100%',
    borderRadius: '5px',
    backgroundColor: '#3b82f6',
  },
  percentage: {
    fontSize: '0.9em',
    textAlign: 'right',
    marginTop: '5px',
  },
};

export default Chartbar;


