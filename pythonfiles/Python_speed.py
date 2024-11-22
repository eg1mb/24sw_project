import os
import subprocess
import librosa
import speech_recognition as sr
import nltk
import json
import sys
import requests
from nltk.tokenize import sent_tokenize

nltk.download('punkt')  
nltk.download('punkt_tab')


# 음성 파일 형식을 WAV로 변환하기
def convert_to_wav(input_file, output_file):
    try:
        # ffmpeg를 이용하여 mp3 -> wav 변환
        ffmpegPath = 'C:\\ffmpeg\\bin\\ffmpeg.exe'
        subprocess.run(
            [ffmpegPath, '-i', input_file, '-ar', '16000', '-ac', '1', output_file],
            check=True
        )
        print(f"Converted {input_file} to {output_file}")
    except subprocess.CalledProcessError as e:
        print(f"Error during file conversion: {e}")
        raise


# 음성을 텍스트로 변환
def transcribe_audio(audio_file_path):
    recognizer = sr.Recognizer()
    try:
        with sr.AudioFile(audio_file_path) as source:
            audio_data = recognizer.record(source)
            text = recognizer.recognize_google(audio_data, language='ko-KR')
        return text
    except sr.UnknownValueError:
        print("Could not understand audio")
        return ""
    except sr.RequestError as e:
        print(f"Request error: {e}")
        return ""


# 발화 속도를 점수화
def score_speed(speed):
    # 발화 속도 점수화 (120~150 WPM 사이가 이상적임 -> 135 WPM이 가장 높은 점수)
    if speed < 135:
        return round((speed / 135) * 100)  # 정수로 변환
    elif speed > 135:
        return round(100 - ((speed - 135) / 135) * 100)  # 정수로 변환
    else:
        return 100


def analyze_speech(input_file):

    # WAV 파일 로드 및 총 길이 측정
    if not input_file.lower().endswith(".wav"):
        print("Error: Only WAV files are supported.")
        return None

    if not os.path.exists(input_file):
        print(f"Error: File '{input_file}' not found.")
        return None

    y, sr_rate = librosa.load(input_file, sr=None)
    total_duration = librosa.get_duration(y=y, sr=sr_rate)

    # 텍스트로 변환
    text = transcribe_audio(input_file)
    if not text:
        print("No text transcribed. Exiting analysis.")
        return None

    # 문장 단위로 나누기
    sentences = sent_tokenize(text)
    print("Sentences:", sentences)

    # 각 문장에 대해 발화 속도 측정 및 점수화
    sentence_durations = total_duration / len(sentences)  # 평균 문장 길이로 가정
    scores = []

    for sentence in sentences:
        word_count = len(sentence.split())
        speech_rate = word_count / sentence_durations * 60  # 분당 단어수 (WPM)
        score = score_speed(speech_rate)
        scores.append(score)
        print(f"문장: {sentence[:50]}... | 발화 속도: {int(speech_rate)} WPM | 점수: {score}")

    # 최종 평균 점수
    average_score = round(sum(scores) / len(scores))  # 정수로 변환
    
    print(f"\n최종 평균 발화 속도 점수: {average_score}")
    print(json.dumps({"average_score" : average_score },  ensure_ascii=False) ), 

    # JSON 반환
    


# 메인 함수
if __name__ == "__main__":
    # MP3 파일 경로 지정
    file_path = sys.argv[1]  # file_path는 명령어 인자에서 받음
    output_wav = sys.argv[2]  # 변환될 WAV 파일 경로
    # MP3를 WAV로 변환
    try:
        convert_to_wav(file_path , output_wav)

        # 분석 수행
        result = analyze_speech(output_wav)
        # 보내기 준비 
        
    except Exception as e:
        print(f"Error occurred: {e}")
