// pages/test.js
// test화면 
import React, { useState, useRef } from 'react';

export default function TestPage() {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  // 녹음 시작
  const startRecording = async () => {
    setRecording(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: mediaRecorder.mimeType });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioURL(audioUrl);
        audioChunksRef.current = [];
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
  const uploadAudio = async () => {
    if (!audioURL) return;

    console.log("Uploading audio...");

    const formData = new FormData();
    const audioBlob = await fetch(audioURL).then((res) => res.blob());
    formData.append(
      "speech",
      new File([audioBlob], "recording.webm", { type: "audio/webm" })
    );

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        
      } else {
        console.error("Upload failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  // 녹음 중지 후 업로드
  const handleStopRecording = () => {
    stopRecording();
    uploadAudio();
  };

  return (
    <div style={styles.container}>
      <div style={styles.scriptBox}>
        <h2 style={styles.scriptText}>script</h2>
        <p style={styles.hiddenText}>●●●●●●</p>
      </div>

      <div style={styles.recordBox}>
        <button
          style={styles.micButton}
          onClick={() => {
            if (recording) {
              handleStopRecording();
            } else {
              startRecording();
            }
          }}
        >
          <span role="img" aria-label="microphone">🎤</span> {recording ? "Stop Recording" : "Start Recording"}
        </button>
      </div>

      {audioURL && (
        <audio controls src={audioURL} style={{ marginTop: '20px' }}>
          Your browser does not support the audio element.
        </audio>
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
};
