// pages/test.js
// test화면 
import React, { useState, useRef } from 'react';
// LocalStorage 
import { useRouter } from "next/router";

export default function Test() {
  const [recording, setRecording] = useState(false);
  const [loading, setLoading] = useState(false); // Loading 상태 추가
  const [audioURL, setAudioURL] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const [feedback, setFeedback] = useState(null);

  const router = useRouter();

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
        // json.Parse()를 이용해 객체 형태로 바로 바꿀 수 있음 
        const { total_score, weak_strong, speed_score, volume_score, grammar, details } = jsonResponse;
        setFeedback({ total_score, weak_strong, speed_score, volume_score, grammar, details });
        console.log(jsonResponse ,  "json결과")
        // localStorage형태로 저장 & 데이터 로드 완료시 이동 
        //localStorage.setItem('audio' , audioURL) audioUrl 받기 
        //localStorage.setItem('user', JSON.stringify(jsonResponse));
        //router.push('/result');
        
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
            <p style={styles.hiddenText}>어려운 문제를 해결했던 경험을 말씀해주세요.</p>
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
