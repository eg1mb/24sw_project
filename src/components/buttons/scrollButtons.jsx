import React from 'react';

export default function ScrollButtons({overallRef, detailRef}) {
  const scrollToRef = (ref) => {
    ref.current?.scrollIntoView({behavior: 'smooth'});
  };
  return (
    <div>
      <div style={styles.wrapper}>
        <button style={styles.button} onClick={() => scrollToRef(overallRef)}>평가항목</button>
        <button style={styles.button} onClick={() => scrollToRef(detailRef)}>상세분석</button>
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