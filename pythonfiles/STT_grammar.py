import os
from openai import OpenAI
import json
import sys
from datetime import datetime
import io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')


def stt(apikey, audio_file_path):
    # Initialize the OpenAI client
    client = OpenAI(api_key=apikey)

    # Perform the transcription
    with open(audio_file_path, "rb") as audio_file:
        transcription = client.audio.transcriptions.create(
            model="whisper-1",
            file=audio_file
        )

    #text 만들기
    text = transcription.text
    # Return the transcription in JSON format
    transcription_json = transcription.model_dump_json()

    return text


def grammar(apikey, text):
    # Initialize the OpenAI client
    client = OpenAI(api_key=apikey)

    # Generate grammar correction response
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a Korean language grammar correction assistant. json 구조에 맞추어 답변을 작성하라. json 구조를 엄격히 따라라."},
            {"role": "assistant", "content": "다음의 형식과 같이 출력하라. 값은 평가한대로 바꿔라. weak1,2,3과 strength1,2,3은 장단점을 뜻하며 없으면 none이라고 써라. detail_에서 수정이 필요한 값이 없으면 none으로 작성하라. detail_clarity은 말흐리기이다(말을 자르거나 생략하거나 더듬는 경우). detail_clarity에서 주어진 문장에서 말을 더듬거나 흐려진 부분이 없으면 none으로 작성하라. clarity_score은 유일하게 50점 만점이다. _score들은 하나 틀리면 5점씩 차감하면 된다.\n strength1: 논리적인 답변 구조와 명확한 전달력,\n strength2: 문장을 더듬지 않음,\n strength3: 적절한 어휘 사용,\n weak1: 비문이 일부 포함되었습니다.,\n weak2: 말끝을 흐리는 경향이 있습니다.,\n weak3: 목소리가 작습니다.,\n grammar_contents_score: 85,\n grammar_politeness_score: 95,\n grammar_voca_score: 60,\n grammar_sentcompletion_score: 90,\n detail_clarity_score: 50,\n detail_clarity_hmm: 음...,\n detail_clarity_repititions: 그랬...그랬습니다,\n detail_clarity_blur: ...입니다,\n detail_contents_origin: 안녕하세요 저는 김민수입니다.,\n detail_contents_correct: 안녕하세요 저는 경영학과를 졸업한 지원자 김민수입니다.,\n detail_contents_reason: 자기 소개를 상세히 해주세요.,\n detail_politeness_origin: 경험을 했구여,\n detail_politeness_correct: 경험을 하였고요,\n detail_politeness_reason: 높임 표현 및 격식체 어미를 사용하세요.,\n detail_voca_origin: 보실 수 있습니다.,\n detail_voca_correct: 확인하실 수 있습니다.,\n detail_voca_reason: 구어체보다 격식 있는 단어를 사용하세요.,\n detail_sentcompletion_origin: 경험을 했구여,\n detail_sentcompletion_correct: 경험을 하였고요,\n detail_sentcompletion_reason: 높임 표현 및 격식체 어미를 사용하세요."},
            {"role": "user", "content": f"다음 문장을 자연스럽고 정확하게 교정해 주세요: {text}"}
        ],
        max_tokens=1000,
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
    apikey = os.environ.get('OPENAI_API_KEY')
    audio_file_path = sys.argv[1]

    # Run the main function
    result = main(apikey, audio_file_path)
    print(json.dumps(result, ensure_ascii=False, indent=4))
    

