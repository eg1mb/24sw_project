import librosa
import numpy as np
import matplotlib.pyplot as plt
import sys 
import json 

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

def main (file_path ) : 
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
    result = {
        'true_percentage': true_percentage
    }
    return result


if __name__ == "__main__":
    file_path = sys.argv[1]  # file_path는 명령어 인자에서 받음
    result = main(file_path)
    print(json.dumps(result))  # 결과를 출력
    # {"목소리 크기" : 95 , "목소리 속도" : 85 ... } <= 이런 json 형태로 만들어 node.js에 return 필요 

