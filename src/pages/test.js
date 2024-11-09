// pages/test.js
// test화면 
import React from 'react';

export default function TestPage() {
  return (
    <div style={styles.container}>

      <div style={styles.scriptBox}>
        <h2 style={styles.scriptText}>script</h2>
        <p style={styles.hiddenText}>●●●●●●</p>
      </div>

      <div style={styles.recordBox}>
        <button style={styles.micButton}>
          <span role="img" aria-label="microphone">🎤</span> 00:00:00
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
  },
  scriptBox: {
    width: '80%',
    height: '150px',
    backgroundColor: '#4a6ea9',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '20px 0',
    borderRadius: '8px',
  },
  scriptText: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
  hiddenText: {
    fontSize: '18px',
    letterSpacing: '3px',
  },
  recordBox: {
    width: '60%',
    display: 'flex',
    justifyContent: 'center',
    margin: '20px 0',
  },
  micButton: {
    width: '100%',
    padding: '15px',
    backgroundColor: '#2f4f90',
    color: '#fff',
    fontSize: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
    cursor: 'pointer',
    border: 'none',
  },
};
