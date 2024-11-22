import os
from openai import OpenAI
import os
import json
import sys
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
            {"role": "assistant", "content": "다음의 형식과 같이 출력하라. 값은 평가한대로 바꿔라. \"total_score\":85,\"strengths\":논리적인 답변 구조와 명확한 전달력,\"weaknesses\":비문이 일부 포함됨,\"total_errors\":2,\"repetitions\":2,\"content_feedback\":답변이 충분히 설득력 있으며 예시가 잘 제시됨"},
            {"role": "user", "content": f"다음 문장을 자연스럽고 정확하게 교정해 주세요: {text}"}
        ],
        max_tokens=150,
        temperature=0.5
    )

    # Convert response to a dictionary
    response_dict = response.to_dict()

    # Return the response JSON data
    return response_dict



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
    grammarcheck = response_dict.get("choices", [])[0]["message"]["content"]
    grammarcheck_json = json.loads(grammarcheck)

    # Combine into result
    result = {
        "text": text,
        "grammar_correction": grammarcheck_json
    }
    return result

# Example usage
if __name__ == "__main__":
    apikey = "key"
    audio_file_path = sys.argv[1]

    # Run the main function
    result = main(apikey, audio_file_path)
    print(json.dumps(result))