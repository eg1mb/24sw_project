import os
from openai import OpenAI
import sys 
import json
from datetime import datetime

def stt(apikey, audio_file_path):
    # Initialize the OpenAI client
    client = OpenAI(api_key=apikey)

    # Perform the transcription
    with open(audio_file_path, "rb") as audio_file:
        transcription = client.audio.transcriptions.create(
            model="whisper-1",
            file=audio_file
        )

    print("STT 완료")

    #text 만들기
    text = transcription.text
    # Return the transcription in JSON format
    transcription_json = transcription.model_dump_json()

    print("text 및 text.json 생성 완료. 두개의 값을 반환합니다.")
    return text, transcription_json


def grammar(apikey, text):
    # Initialize the OpenAI client
    client = OpenAI(api_key=apikey)

    # Generate grammar correction response
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a Korean language grammar correction assistant. json 구조에 맞추어 답변을 작성하라."},
            {"role": "assistant", "content": "다음의 형식과 같이 출력하라. 값은 평가한대로 바꿔라.\n total_score: 85,\n strengths: 논리적인 답변 구조와 명확한 전달력,\n weaknesses: 비문이 일부 포함됨,\n total_errors: 2\n repetitions: 2\n content_feedback: 답변이 충분히 설득력 있으며 예시가 잘 제시됨"},
            {"role": "user", "content": f"다음 문장을 자연스럽고 정확하게 교정해 주세요: {text}"}
        ],
        max_tokens=150,
        temperature=0.5
    )

    # Convert response to a dictionary
    response_dict = response.to_dict()

    # Save response to a JSON file
    output_file = generate_output_file(base_name="grammar_check", extension="json", directory="./grammers")

    # Return the response JSON data
    return response_dict

# 파일 이름 생성 함수
def generate_output_file(base_name="STT+Grammar", extension="json", directory="./grammers"):
    """
    오늘 날짜와 시간을 기반으로 파일 이름을 생성합니다.

    Args:
        base_name (str): 파일 이름의 기본 이름 (확장자를 제외한 부분).
        extension (str): 파일 확장자 (예: "json", "txt").
        directory (str): 파일을 저장할 디렉토리 경로.

    Returns:
        str: 날짜와 시간이 포함된 파일 경로.
    """
    current_time = datetime.now().strftime("%Y%m%d_%H%M%S")  # 날짜_시간 형식
    file_name = f"{base_name}_{current_time}.{extension}"  # 파일 이름 생성
    file_path = os.path.join(directory, file_name)  # 디렉토리와 파일 이름 결합
    return os.path.abspath(file_path)  # 절대 경로 반환

def save_json(grammarcheck):
    """
    Grammar check 데이터를 JSON 파일로 저장합니다.
    """
    # 파일 이름 생성 및 저장
    output_file = generate_output_file(base_name="STT+grammar", extension="json", directory=".")
    print(f"생성된 파일 경로: {output_file}")
    try:
        # 디렉토리 확인 및 생성
        os.makedirs(os.path.dirname(output_file), exist_ok=True)
        print(f"디렉토리 확인 완료: {os.path.dirname(output_file)}")

        # 파일 저장
        with open(output_file, "w", encoding="utf-8") as json_file:
            json.dump(grammarcheck, json_file, ensure_ascii=False, indent=4)
        print(f"Grammar check JSON이 생성되었습니다: {output_file}")

    except Exception as e:
        print(f"JSON 파일 저장 중 오류가 발생했습니다: {e}")

    return grammarcheck


# Main 함수
def main(apikey, audio_file_path):
    # Step 1: Perform STT and get the text
    text = stt(apikey, audio_file_path)
    if not text:
        raise ValueError("STT 결과가 없습니다. audio_file_path를 확인하세요.")

    # Step 2: Perform grammar correction on the transcribed text
    response_dict = grammar(apikey, text)
    if not response_dict:
        raise ValueError("Grammar correction 결과가 없습니다.")

    # Step 3: Combine text and grammar correction result into a single JSON
    grammarcheck = {
        "text": text,
        "grammar_correction": response_dict.get("choices", [])[0]["message"]["content"]
    }

    save_json(grammarcheck)

# Example usage
if __name__ == "__main__":
    apikey = "key"
    audio_file_path = sys.argv[1]

    # Run the main function
    result = main(apikey, audio_file_path)
    print(result)