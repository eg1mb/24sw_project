// pages/test.js
// test화면 
import React, { useState, useRef } from 'react';

export default function Test() {
  const [recording, setRecording] = useState(false);
  const [loading, setLoading] = useState(false); // Loading 상태 추가
  const [audioURL, setAudioURL] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const [feedback, setFeedback] = useState(null);

  // 녹음 시작
  const startRecording = async () => {
    setRecording(true);
    audioChunksRef.current = [];
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: mediaRecorder.mimeType });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioURL(audioUrl);
        audioChunksRef.current = [];
        await uploadAudio(audioBlob);
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  // 녹음 중지
  const stopRecording = () => {
    setRecording(false);
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
  };

  // 오디오 업로드
  const uploadAudio = async (audioBlob) => {
    if (!audioBlob) return;

    setLoading(true); // Loading 시작

    const formData = new FormData();
    formData.append(
      "speech",
      new File([audioBlob], "recording.webm", { type: "audio/webm" })
    );

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
        headers: {
          'Cache-Control': 'no-cache',
        }
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        const { average_score, decibel_count, text, strength, weakness, feedback, total_score } = jsonResponse;
        setFeedback({ average_score, decibel_count, text, strength, weakness, feedback, total_score });
        
        // 데이터 로드 완료 시 이동
        setLoading(false); 
      } else {
        console.error("Upload failed:", response.statusText);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {loading ? ( // 로딩 화면 표시
        <div style={styles.loadingBox}>
          <p style={styles.loadingText}>Loading...</p>
        </div>
      ) : (
        <>
          <div style={styles.scriptBox}>
            <h2 style={styles.scriptText}>script</h2>
            <p style={styles.hiddenText}>●●●●●●</p>
          </div>

          <div style={styles.recordBox}>
            <button
              style={styles.micButton}
              onClick={() => {
                if (recording) {
                  stopRecording();
                } else {
                  startRecording();
                }
              }}
            >
              <span role="img" aria-label="microphone">🎤</span> {recording ? "Stop Recording" : "Start Recording"}
            </button>
          </div>

          {audioURL && (
            <div>
              <audio controls src={audioURL} style={{ marginTop: '20px' }}>
                Your browser does not support the audio element.
              </audio>
              {feedback && (
                <div style={{ marginTop: '20px', color: '#333' }}>
                  <p><strong>원문 :</strong>{feedback.text}</p>
                  <p><strong>총점 :</strong>{feedback.total_score}</p>
                  <p><strong>피드백:</strong>{feedback.feedback}</p>
                  <p><strong>말소리 속도 :</strong> {feedback.average_score}</p>
                  <p><strong>말소리 크기 :</strong>{Math.round(feedback.decibel_count * 100) / 100}</p>
                  <p><strong>강점 :</strong>{feedback.strength}</p>
                  <p><strong>약점 :</strong>{feedback.weakness}</p>
                </div>
              )}
            </div>
          )}
        </>
      )}
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
  loadingBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  loadingText: {
    fontSize: '24px',
    color: '#333',
  },
};
