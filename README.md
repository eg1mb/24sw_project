# 🎯 24sw_project_AI 면접 훈련 프로그램

**AI를 이용하여 면접 훈련 프로그램 만들기**

- 사용자의 음성을 분석하여 말하기 습관을 교정하고, 구체적인 피드백을 제공하는 **웹 기반 면접 연습 도구**입니다.

---

## 📌 목표

### 🎯 주요 목표
- **AI를 활용한 실시간 말하기 피드백 제공**

### ✅ 세부 목표
1. 말 흐리기, 반복 등 **불필요한 발화 습관 교정**
2. **내용 및 발화**에 대한 구체적인 **수정 안내 및 점수화**
3. 시각화된 결과 리포트로 **자기 진단** 가능

---

## 🤔 개발 이유

### 💬 말하기에 어려움을 겪는 젊은 세대
- 많은 청년들이 말하기에 어려움을 겪고 있음
- 공식적인 말하기 상황 중 대표적인 사례: **면접**
- 단순한 연습보다 **구체적이고 자동화된 피드백 제공**이 필요

---

## 🧱 기술 스택

이 프로젝트는 **음성 기반 면접 분석 플랫폼**으로, 사용자 음성을 업로드/녹음하여
속도, 음량, 문법, 표현력을 종합 분석하고 피드백을 제공하는 **웹 애플리케이션**입니다.
(현재는 로컬 환경만 지원)

---

### 🖥️ Frontend

> **기술 기반**: Next.js (React 기반 프레임워크)

| 기술 | 설명 |
|------|------|
| **Next.js** | 페이지 기반 라우팅 및 API Route 지원 |
| **React** | UI 컴포넌트 구조화 |
| **styled-components** | CSS-in-JS 방식의 스타일 정의 |
| **Chart.js** | 분석 결과 시각화 (도넛/막대 차트 등) |
| **react-chartjs-2** | Chart.js의 React 통합 라이브러리 |
| **chartjs-plugin-datalabels** | 차트에 값 라벨 표시 기능 |
| **recorder-js** | 브라우저 내 오디오 녹음 기능 구현 |
| **file-type** | 업로드된 파일의 MIME 타입 검사 및 유효성 검증 |

---

### 🔧 Backend (Next.js API Routes + Python)

> **Node.js 기반 API Routes + 분석용 Python 스크립트 연동**

#### 📂 Node.js 환경 (API)

| 기술 | 설명 |
|------|------|
| **multer** | multipart/form-data 기반 오디오 업로드 처리 |
| **fluent-ffmpeg** | ffmpeg를 활용한 오디오 포맷 변환 (MP3 ↔ WAV) |
| **child_process (spawn, exec)** | 파이썬 분석 스크립트 실행 |
| **fs / path** | 파일 시스템 및 경로 관리 |
| **Next.js API Routes** | 서버리스 API 엔드포인트 구현 |

#### 🧠 Python 분석 모듈

| 라이브러리 | 역할 |
|-----------|------|
| **speech_recognition** | Google API 기반 음성 → 텍스트 변환 (한국어) |
| **librosa** | 오디오 신호 처리 (볼륨, 길이 분석) |
| **nltk** | 문장 분리 (발화 속도 분석용) |
| **numpy** | 볼륨 계산, 통계 분석 |
| **openai** | Whisper (STT) 및 GPT (문법 분석) API 호출 |
| **json** | 분석 결과를 stdout을 통해 JSON 형태로 반환 |

---

## 🧪 실행 방법 (로컬 환경 기준)

```bash
# 1. 의존성 설치
npm install

# 2. 개발 서버 실행
npm run dev

# 3. Python 환경 세팅
# 가상환경 생성 후 아래 라이브러리 설치
pip install speechrecognition librosa nltk numpy openai
```

### 🐍 Python 환경 세팅 (분석 스크립트용)

> 음성 분석을 위한 Python 환경은 **가상환경(venv)**를 사용하는 것을 권장합니다.

```bash
# 1. Python 가상환경 생성
python -m venv venv

# 2. 가상환경 활성화
# Windows
venv\Scripts\activate

# macOS / Linux
source venv/bin/activate

# 3. 필요한 라이브러리 설치
pip install speechrecognition librosa nltk numpy openai

# 4. nltk tokenizer 다운로드
python -c "import nltk; nltk.download('punkt')"
```

> 💡 `ffmpeg`도 시스템에 설치되어 있어야 정상 작동합니다.  
> (Windows의 경우 `C:\ffmpeg\bin` 경로를 환경변수에 추가해야 합니다)

## 📌 참고

- OpenAI API 키는 `.env` 파일 또는 시스템 환경변수에 `OPENAI_API_KEY=your_key_here` 형식으로 등록
- Node.js ≥ 16, Python ≥ 3.8 이상 권장

