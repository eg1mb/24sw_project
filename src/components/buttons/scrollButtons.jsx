import React from 'react';

export default function ScrollButtons({overallRef, grammarRef}) {
  const scrollToRef = (ref) => {
    ref.current?.scrollIntoView({behavior: 'smooth'});
  };
  return (
    <div>
      <div style={styles.wrapper}>
        <button style={styles.button} onClick={() => scrollToRef(overallRef)}>전체 성취도</button>
        <button style={styles.button} onClick={() => scrollToRef(grammarRef)}>문법 성취도</button>
      </div>
    </div>
  )
}

const styles = {
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
  },
  button: {
    width: '100px',
    height: '50px',
  }
}