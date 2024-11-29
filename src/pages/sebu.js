import React, { useState } from "react";

const data = {
  details: {
    text: "음… 저는 이 프로젝트를 잘 했다고 생각해... 음... 그런데 음… 제가 제가 실수한 부분도 조금 있었던 것 같아요. \n 잘 넘어가게 되었습니다",
    Clarity: {
      hmm: ["음…", "음..."],
      reps: ["제가 제가"],
      blur: ["생각해..."],
    },
    Contents : [{origin: "이 프로젝트를", correct: "프로젝트", reason: ""}, {origin: "실수한 부분도", correct: "", reason: ""} ],
    Grammar: {
      contents: [{ original: "제가 실수한", corrected: "내가 실수한" }, { original: "안녕", corrected: "" }],
      politeness: [{ original: "부분도", corrected: "" }, { original: "조금", corrected: "" }],
      voca: [{ original: "ab", corrected: " " }, { original: "ab", corrected: "" }],
      sent_complition: [{ original: "add", corrected: "" }, { original: "ad", corrected: "" }],
    },
  },
};

export default function PolitenessHighlighter() {
  const [highlightedText, setHighlightedText] = useState(data.details.text); // 초기 상태: 원문
  const [totaldata , setTotaldata ] = useState(data);
  const [grammarErrors , setGrammerErr ] = useState("")
  const [flag , setFlag] = useState(false)
  const [flag2 , setFlag2] = useState(false)
  // 나중에 audioURL FLAG 하나 더 쓰기 



  const resetToOriginalText = () => {
    setHighlightedText(data.details.text); // 원문으로 초기화
  };
  // 명료성 
  const handleClarityHighlight = () => {
    resetToOriginalText(); // 원문 초기화
    // flag 초기화
    setFlag(false);
    setFlag2(false);
    setGrammerErr("");
    const { hmm, reps, blur } = data.details.Clarity; // 명료함 데이터 가져오기
    const highlights = [...hmm, ...reps, ...blur];
  
    const words = data.details.text.split(" "); // 원문을 단어 단위로 나누기
    const updatedText = words.map((word, index) => {
      // \n을 기점으로 줄바꿈 처리
      if (word === "\n") {
        return <br key={index} />;
      } else if (highlights.includes(word)) {
        // 하이라이트 처리
        return (
          <span key={index} style={{ backgroundColor: "yellow" }}>
            {word}{" "}
          </span>
        );
      } else {
        // 일반 단어는 그대로
        return word + " ";
      }
    });
  
    setHighlightedText(updatedText); // 명료함 하이라이트 적용
  };
  
  // 문법 
  const handleGrammarsHighlight = () => {
    resetToOriginalText(); // 원문 초기화
    setFlag2(false)
    setGrammerErr("");
    const { contents, politeness, voca, sent_complition } = data.details.Grammar;

    const highlights = [
      ...contents.map((item) => item.original),
      ...politeness.map((item) => item.original),
      ...voca.map((item) => item.original),
      ...sent_complition.map((item) => item.original),
    ];

    const sentences = data.details.text.split("\n"); // 문장 단위로 나누기

    const updatedText = sentences.map((sentence, index) => {
      const containsHighlight = highlights.some((highlight) =>
        sentence.includes(highlight)
      );
      return containsHighlight ? (
        <span
          key={index}
          style={{textDecoration: "underline", color: "black" }}
          onClick = {() => (checkSentenceGrammar(sentence))}
        >
          {sentence}
          <br />
        </span>
      ) : (
        <span key={index}>
          {sentence}
          <br />
        </span>
      );
    });

    setHighlightedText(updatedText); // 내용 하이라이트 적용
  };
  // 문법 오류 확인하는 함수 
  const checkSentenceGrammar = (sen) => {
    const polite = totaldata.details.Grammar.politeness
    const comple = totaldata.details.Grammar.sent_complition
    const voca = totaldata.details.Grammar.voca
    const contents = totaldata.details.Grammar.contents

    const result = {
      polite : polite.filter((a) => sen.includes(a.original)),
      comple : comple.filter((a) => sen.includes(a.original)),
      voca : voca.filter((a) => sen.includes(a.original)),
      contents : contents.filter((a) => sen.includes(a.original))
    }
    console.log(result)
    setGrammerErr(result)
    setFlag(true)
    
  };

  // 내용 확인하는 함수 
  const handleContentsHighlight = () => {
    resetToOriginalText(); // 원문 초기화
    setFlag(false);
    setGrammerErr("");
    const conty = [...totaldata.details.Contents.map((item) => item.origin)]
    console.log("conty" , conty)
    const sentences = data.details.text.split("\n"); // 문장 단위로 나누기
    const updatedText = sentences.map((sentence, index) => {
      const containsHighlight = conty.some((con) =>
        sentence.includes(con)
      );
      return containsHighlight ? (
        <span
          key={index}
          style={{  color: "green" }}
          onClick = {() => (checkSentenceContents(sentence))}
        >
          {sentence}
          <br />
        </span>
      ) : (
        <span key={index}>
          {sentence}
          <br />
        </span>
      );
    });

    setHighlightedText(updatedText); // 내용 하이라이트 적용
  };

  const checkSentenceContents = (sen) => {
    const centy = totaldata.details.Contents
    const result = centy.filter((a) => sen.includes(a.origin))
    console.log("result" , result)
    setGrammerErr(result)
    setFlag2(true)
    
  }
  
      
     
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <p>{highlightedText}</p>
     
      <div>
      <div style={{ display: "flex", gap: "10px" }}>
        <button onClick={handleClarityHighlight}>명료함</button>
        <button onClick={handleContentsHighlight} >내용</button>
        <button onClick={handleGrammarsHighlight}>문법</button>
      </div>
      {flag ? (
          <div>
            <h2>문법적 오류</h2>

            {grammarErrors.polite.length > 0 && (
              <div>
                <h4>높임 표현</h4>
                {grammarErrors.polite.map((item, index) => (
                  <p key={index}>
                    {item.original} &rarr; {item.corrected}
                  </p>
                ))}
              </div>
            )}

            {grammarErrors.comple.length > 0 && (
              <div>
                <h4>문장 완성</h4>
                {grammarErrors.comple.map((item, index) => (
                  <p key={index}>
                    {item.original} &rarr; {item.corrected}
                  </p>
                ))}
              </div>
            )}

            {grammarErrors.voca.length > 0 && (
              <div>
                <h4>어휘</h4>
                {grammarErrors.voca.map((item, index) => (
                  <p key={index}>
                    {item.original} &rarr; {item.corrected}
                  </p>
                ))}
              </div>
            )}

            {grammarErrors.contents.length > 0 && (
              <div>
                <h4>내용</h4>
                {grammarErrors.contents.map((item, index) => (
                  <p key={index}>
                  {item.original} &rarr; {item.corrected}
                  </p>
                ))}
              </div>
            )}
          </div>
        ) : <div></div> }
    
    {flag2 ? (<div><h2>내용적 오류</h2> 
      {grammarErrors.length > 0 && (
              <div>
                <h4>어휘</h4>
                {grammarErrors.map((item, index) => (
                  <p key={index}>
                    {item.origin} &rarr; {item.correct} <br/>
                    {item.reason}
                  </p>
                ))}
              </div>
            )}

    </div>) : <></>}
    
      </div>
    </div>
  );
}
