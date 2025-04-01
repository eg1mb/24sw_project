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
            file=audio_file,
            prompt="면접 어투 교정에 필요한 텍스트이기 때문에 말을 더듬는 철자 오류를 수정하지 마라"
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
            {"role": "assistant", "content": "다음의 형식과 같이 출력하라. 값은 평가한대로 바꿔라. weak1,2,3과 strength1,2,3은 장단점을 뜻하며 없으면 none이라고 써라. detail_에서 수정이 필요한 값이 없으면 none으로 작성하라. detail_clarity를 제외한 값들은 두 개씩 출력해야 한다.(예시 : detail_contents_origin1과 detail_contents_origin2를 모두 출력해야 함.) detail_clarity은 말흐리기이다(말을 자르거나 생략(sentcompletion)하거나 더듬는(repition, hmm) 경우). detail_clarity_reps에 주어진 문장에서 말을 더듬거나 흐려진 부분을 작성하고 없으면면 none으로 작성하라. clarity_score은 유일하게 50점 만점이다. _score들은 하나 틀리면 5점씩 차감하면 된다.\n strength1: 논리적인 답변 구조와 명확한 전달력,\n strength2: 질문에 대한 명료한 대답,\n strength3: 적절한 어휘 사용,\n weak1: 비문이 일부 포함되었습니다.,\n weak2: 문장이 '-해요' 체로 끝나는 경향이 있습니다.,\n weak3: 전문적인 내용을 보충해야 합니다.,\n grammar_contents_score: 85,\n grammar_politeness_score: 95,\n grammar_voca_score: 60,\n grammar_sentcompletion_score: 90,\n detail_clarity_score: 50,\n detail_clarity_hmm: 어 어 음 ,\n detail_clarity_repititions: 데베 아니 아니 데이터베이스,\n detail_clarity_blur: 우려가 됐. ,\n detail_contents_origin1: 안녕하세요 저는 김민수입니다.,\n detail_contents_correct1: 안녕하세요 저는 경영학과를 졸업한 지원자 김민수입니다.,\n detail_contents_reason1: 자기 소개를 상세히 해주세요.,\n detail_politeness_origin1: 경험을 했구여,\n detail_politeness_correct1: 경험을 하였고요,\n detail_politeness_reason1: 높임 표현 및 격식체 어미를 사용하세요.,\n detail_voca_origin1: 보실 수 있습니다.,\n detail_voca_correct1: 확인하실 수 있습니다.,\n detail_voca_reason1: 구어체보다 격식 있는 단어를 사용하세요.,\n detail_sentcompletion_origin1: 경험을 했구여,\n detail_sentcompletion_correct1: 경험을 하였고요,\n detail_sentcompletion_reason1:문장을 바르게 끝마치세요.,\n detail_contents_origin2:저는 심리학과를 졸업했습니다.,\n detail_contents_correct2: 저는 심리학을 전공했습니다.,\n detail_contents_reason2: 전공 및 부전공을 소개하세요,\n detail_politeness_origin2: 생각중입니다,\n detail_politeness_correct2: 고려하는 중입니다,\n detail_politeness_reason2: 공손해보이는 표현을 사용하세요.,\n detail_voca_origin2: 해봤습니다.,\n detail_voca_correct2: 경험했습니다.,\n detail_voca_reason2: 격식 있는 단어를 사용하세요.,\n detail_sentcompletion_origin2: 그랬습…,\n detail_sentcompletion_correct2: 그랬습니다.,\n detail_sentcompletion_reason2: 문장을 또렷하게 끝마치세요."},
            {"role": "user", "content": f"다음 문장을 자연스럽고 정확하게 교정해 주세요: {text}"}
        ],
        max_tokens=1500,
        temperature=0.6
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
        "grammar": grammarcheck_json,
    }
    return result

# Example usage
if __name__ == "__main__":
    apikey = os.environ.get('OPENAI_API_KEY')
    audio_file_path = sys.argv[1]

    # Run the main function
    result = main(apikey, audio_file_path)
    print(json.dumps(result, ensure_ascii=False, indent=4))
    

