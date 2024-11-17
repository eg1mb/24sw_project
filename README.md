# 24sw_project
## json파일 요청
```json  
{
    "total_score": 85,
    "strengths": "논리적인 답변 구조와 명확한 전달력",
    "weaknesses": "비문이 일부 포함됨",
    "speech_clarity": {
      "errors": [
        { "incorrect": "않습니다", "correct": "않아요" },
        { "incorrect": "합니다", "correct": "해요" }
      ],
      "total_errors": 2
    },
    "sentence_completion": {
      "endings": [
        { "sentence": "저는 그렇게 생각합니다.", "correct_ending": "생각해요" },
        { "sentence": "이것이 중요합니다.", "correct_ending": "중요해요" }
      ],
      "total_incomplete_endings": 2
    },
    "filler_words": {
      "repetitions": [
        { "filler": "음...", "correct": "" },
        { "filler": "그러니까", "correct": "" }
      ],
      "total_count": 5
    },
    "politeness": {
      "errors": [
        { "incorrect": "해라", "correct": "해주세요" },
        { "incorrect": "봐라", "correct": "보세요" }
      ],
      "total_errors": 2
    },
    "repetitive_phrases": {
      "repetitions": [
        { "phrase": "그래서 그래서", "correct": "그래서" },
        { "phrase": "똑같은 방식으로 똑같은 방식으로", "correct": "똑같은 방식으로" }
      ],
      "total_repetitions": 2
    },
    "content_feedback": "답변이 충분히 설득력 있으며 예시가 잘 제시됨",
}
```

```
11/17
1. 프로젝트 파일 녹음 및 python 돌릴 때 유의사항 
ffmpeg 설치 -> ffmpeg 주소 api/upload/js의 해당 주소 부분에 집어넣기 
파이썬도 자기 컴퓨터에서 설치 된 곳 주소 서버에 넣기 

2. 오류 생긴 부분 
처음 실행 시 서버가 아예 작동 안됨 , 2번째부터 됨 

