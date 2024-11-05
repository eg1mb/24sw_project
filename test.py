# 문법 교정 테스트

import os
from openai import OpenAI
import json

# client 객체로 호출
client = OpenAI(
    # 환경변수에 저장된 API_KEY 호출
    api_key=os.environ.get("OPENAI_API_KEY")
)

# 문법 교정 함수
def correct_utterance(text):
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a Korean language grammar correction assistant."},
            {"role": "user", "content": f"다음 문장을 자연스럽고 정확하게 교정해 주세요: {text} 그 이후에 왜 수정되어야 하는지 원본 문장과 비교하면서 알려주세요."}
        ],
        max_tokens=150,
        temperature=0.5
    )
    return response

# 예문
input_text = "음 저는 음 그러니까 음 어제는 이렇게 했어야 한다고 생각하지만 어 잘 모르겠지만서도 그래서 제가 옳다고 생각하는 방식대로 진행했어요"
response_data = correct_utterance(input_text)

# 결과 확인용 출력
corrected_text = response_data.choices[0].message.content
print("교정된 문장:", corrected_text)

# json 파일 생성
with open("response.json", "w", encoding="utf-8") as json_file:
    json.dump(response_data.to_dict(), json_file, ensure_ascii=False, indent=4)

# 완료 메시지 출력
print("응답이 저장되었습니다.")



