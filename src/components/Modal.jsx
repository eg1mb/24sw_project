

// Modal.js
import React from 'react';

const Modal = ({ isOpen, onClose , contents }) => {
  if (!isOpen) return null; // 모달이 열리지 않으면 아무것도 렌더링하지 않음

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button style={styles.closeButton} onClick={onClose}>x</button>
        <h2 style={styles.title}>모달 내용</h2>
        <div style={styles.separator}></div> {/* 회색 얇은 선 */}
        <p>데이터 데시벨 : 180 decibel (70점대 : 150 ~ 190 사이) <br/>
          데이터 속도  <br/>
          음정 정확도 : 
        </p>
      
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',  // 볼드체로 설정
  },
  
  modal: {
    position: 'relative',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    width: '300px',
    height : '350px',
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'none',
    border: 'none',
    fontSize: '20px',
    color: '#ccc', // 파란색으로 설정
    cursor: 'pointer',
  },
  separator: {
    marginTop: '0.5', // 간격 없애기
    height: '1px',
    backgroundColor: '#ccc',
  },
};

export default Modal;
