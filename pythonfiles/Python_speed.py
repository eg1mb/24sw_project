import os
import subprocess
import librosa
import speech_recognition as sr
import nltk
import json
import sys
import requests
from nltk.tokenize import sent_tokenize
import numpy as np
import matplotlib.pyplot as plt


nltk.download('punkt')  
nltk.download('punkt_tab')

### 100번째 줄 json 형태처럼 

## 1. speed 
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

# 목소리 속도에 따른 코멘트 생성
def generate_comment_for_speed(speed_average_score):
    """점수에 따라 코멘트를 생성"""
    if speed_average_score >= 88:
        return "매우 좋음"
    elif 76 <= speed_average_score < 88:
        return "좋음"
    elif 64 <= speed_average_score < 76:
        return "보통"
    elif 52 <= speed_average_score < 64:
        return "약간 나쁨"
    else:
        return "개선 필요" 

# 목소리 속도에 따른 피드백 생성
def generate_feedback_for_speed(speed, speed_average_score):
    """점수에 따라 피드백을 생성"""
    if speed_average_score >= 88:
        return "발화 속도가 매우 적절하고 자연스럽습니다. 지금처럼 계속 유지하세요!"
    elif 76 <= speed_average_score < 88:
        if speed>150:
            return "발화 속도가 적절한 편입니다. 다만, 중요한 부분에서는 조금 더 천천히 말해도 좋겠습니다."
        else:
            return "발화 속도가 적절한 편입니다. 다만, 중요하지 않은 부분에서는 조금 더 빨리 말해도 좋겠습니다."
    elif 64 <= speed_average_score < 76:
        if speed>150:
            return "발화 속도가 약간 빠릅니다. 중요한 정보를 명확히 전달하기 위해 속도를 줄이시길 바랍니다."
        else:
            return "발화 속도가 약간 느립니다. 중요한 정보를 명확히 전달하고 불필요한 내용에선 속도를 높이시길 바랍니다."
    elif 52 <= speed_average_score < 64:
        if speed>150:
            return "발화 속도가 너무 빠릅니다. 청중이 이해하기 쉽도록 속도를 개선해보세요."
        else:
            return "발화 속도가 너무 느립니다. 청중이 집중할 수 있도록 속도를 개선해보세요."
    else:
        return "발화 속도가 매우 부적절합니다. 연습을 통해 청중에게 더 쉽게 이해될 수 있도록 속도를 맞추는 것을 추천합니다."

def analyze_speech(input_file , file_path):

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

    # 각 문장에 대해 발화 속도 측정 및 점수화
    sentence_durations = total_duration / len(sentences)  # 평균 문장 길이로 가정
    scores = []

    for sentence in sentences:
        word_count = len(sentence.split())
        speech_rate = word_count / sentence_durations * 60  # 분당 단어수 (WPM)
        score = score_speed(speech_rate)
        scores.append(score)
        

    # 최종 평균 점수
    speed_average_score = round(sum(scores) / len(scores))  # 정수로 변환
    speed_comment = generate_comment_for_speed(speed_average_score)
    speed_feedback = generate_feedback_for_speed(speed, speed_average_score)
    decibel_count = main2(file_path)
    decibel_comment = generate_comment_for_volume(decibel_count)
    decibel_feedback = generate_feedback_for_volume(decibel_count)
    
    ####json 이런 형식으로 보내기! ({" " : [ ]} <= 이런 형식으로 변수 : 리스트 만들어도 가능  ) 
     # JSON 데이터 생성
    result = {
        "speed_analysis": {
            "average_score": speed_average_score,
            "comment": speed_comment,
            "feedback": speed_feedback
        },
        "volume_analysis": {
            "average_volume_score": decibel_count,
            "comment": decibel_comment,
            "feedback": decibel_feedback
        }

    # JSON 데이터를 stdout으로 출력
    print(json.dumps(result, ensure_ascii=False, indent=4))

## 2 목소리 크기 출력  
def analyze_file(file_path, interval=0.1):
    audio, sr = librosa.load(file_path, sr=None)
    frame_length = int(interval * sr)
    rms_values = []

    for start in range(0, len(audio), frame_length):
        end = start + frame_length
        frame = audio[start:end]
        rms = np.sqrt(np.mean(frame**2))
        rms_values.append(rms)

    # RMS 값 중 가장 낮은 값을 기준으로 기준 데시벨 설정
    min_rms = np.min(rms_values)
    decibel_values = 20 * np.log10(np.maximum(min_rms, rms_values) / min_rms)
    return decibel_values, interval

def calculate_confidence(decibel_values):
    average_decibel = np.mean(decibel_values)
    threshold = average_decibel * 0.8  # 80%를 기준으로 설정

    confidence_judgement = decibel_values < threshold

    print(f"Average Decibel: {average_decibel}")
    print(f"Threshold (80% of Average): {threshold}")

    return average_decibel, threshold, confidence_judgement

# 목소리 크기에 따른 코멘트 생성
"""만약 오류가 발생한다면 true_percentage부분을 decibel_count로 바꿔서 해주시길 바랍니다."""
def generate_comment_for_volume(true_percentage):
    """점수에 따라 코멘트를 생성"""
    if true_percentage >= 85:
        return "매우 좋음"
    elif 70 <= true_percentage < 85:
        return "좋음"
    elif 55 <= true_percentage < 70:
        return "보통"
    elif 40 <= true_percentage <55:
        return "약간 나쁨"
    else:
        return "개선 필요" 

# 목소리 크기에 따른 피드백 생성
"""만약 오류가 발생한다면 true_percentage부분을 decibel_count로 바꿔서 해주시길 바랍니다."""
def generate_feedback_for_volume(true_percentage):
    """점수에 따라 피드백을 생성"""
    if true_percentage >= 85:
        return "목소리가 명확하고 안정적입니다. 현재 크기를 유지하세요."
    elif 70 <= true_percentage < 85:
        return "대체로 안정적인 목소리 크기입니다. 약간 더 명확히 하면 좋겠습니다."
    elif 55 <= true_percentage < 70:
        return "목소리가 약간 불안정합니다. 조금 더 크고 명확하게 말해주세요."
    elif 40 <= true_percentage <55:
        return "목소리가 불안정합니다. 조금 더 자신감을 가지시고 명확하게 말해주세요."
    else:
        return "목소리가 너무 작거나 불안정합니다. 연습을 통해 더 크게 말하는 것을 추천합니다."

def main2 (file_path ) : 
    # 파일 경로를 지정하여 데시벨 분석 수행

    # 파일을 분석하여 데시벨 값 가져오기
    decibel_values, interval = analyze_file(file_path)

    # 타임스탬프 생성
    times = [i * interval for i in range(len(decibel_values))]

    # 평균 데시벨의 80% 값 계산 및 판단
    average_decibel, threshold, confidence_judgement = calculate_confidence(decibel_values)

    # False에 해당하는 값들의 개수 세기
    true_count = sum(confidence_judgement)
    false_count = len(confidence_judgement) - true_count

    # %로 나타내기
    true_percentage = 100 - (true_count / len(confidence_judgement) * 100)

    #점수 기반 코멘트와 피드백 생성
    return true_percentage

    


# 메인 함수
if __name__ == "__main__":
    # MP3 파일 경로 지정
    file_path = sys.argv[1]  # file_path는 명령어 인자에서 받음
    output_wav = sys.argv[2]  # 변환될 WAV 파일 경로
    # MP3를 WAV로 변환
    try:
        #mp3 파일 , wav 파일 인자로 
        convert_to_wav(file_path , output_wav)

        # 분석 수행
        result = analyze_speech(output_wav , file_path) #file_path = decibelCheck용 
        
        
    except Exception as e:
        print(f"Error occurred: {e}")
