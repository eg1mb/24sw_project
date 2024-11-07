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

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.
