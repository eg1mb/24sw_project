import React, { useState , useEffect, forwardRef } from "react";
import RadiusChart from "../RadiusChart/RadiusChart" ;



const dataValues = [65, 59, 90, 81, 56, 70, 85];
// props로 chartdata(모든 7개의 값들)과 totalData(미리 짜놓은 객체) , audioURL을 받음 

const Sebucheck = ({Score , Array }, ref ) => {
    const [highlightedText, setHighlightedText] = useState(Score.text); // 초기 상태: 원문
    const [totaldata , setTotaldata ] = useState({details : Score}); // 총 data.details 
    const [chartdata , setChartdata ] = useState([])
    const [grammarErrors , setGrammerErr ] = useState("")
    const [audio , setAudioData] = useState("")
    const [flag , setFlag] = useState(false)
    const [flag2 , setFlag2] = useState(false)
    const [flag3 , setFlag3] = useState(false) // audioURL
    const [flag4 , setFlag4] = useState(false) // 총 평가 8개의 원형으로   

  

    useEffect(() => {
      // 이곳에 props를 받기 
      setTotaldata({details :Score })
      setHighlightedText(Score.text)
       
      //api 값 받기 
      setChartdata(Array)
      // audio 받기
      
     } , [Score]); 
    
    const resetToOriginalText = () => {
        setHighlightedText(totaldata.details.text); // 원문으로 초기화
      };
      // 명료성 
      const handleClarityHighlight = () => {
        resetToOriginalText(); // 원문 초기화
        // flag 초기화
        setFlag(false);
        setFlag2(false);
        setFlag4(false);
        setGrammerErr("");
        const { hmm, reps, blur } = totaldata.details.Clarity; // 명료함 데이터 가져오기
        const highlights = [...hmm, ...reps, ...blur];
      
        const words = totaldata.details.text.split(" "); // 원문을 단어 단위로 나누기
        const updatedText = words.map((word, index) => {
          // \n을 기점으로 줄바꿈 처리
          if (word === "\n") {
            return <br key={index} />;
          } else if (highlights.includes(word)) {
            // 하이라이트 처리
            return (
              <span key={index} style={{ color : "#3B56C3" , fontWeight: "bold" }}>
                {word}{" "}
              </span>
            );
          } else {
            // 일반 단어는 그대로
            return word + " ";
          }

        });
      
        setHighlightedText(updatedText); // 명료함 하이라이트 적용
        setFlag3(true)
      };
      
      // 문법 
      const handleGrammarsHighlight = () => {
        resetToOriginalText(); // 원문 초기화
        setFlag2(false)
        setFlag3(false)
        setFlag4(false)
        setGrammerErr("");
        const { politeness, voca, sent_completion        } = totaldata.details.Grammar;
    
        const highlights = [
          ...politeness.map((item) => item.original),
          ...voca.map((item) => item.original),
          ...sent_completion.map((item) => item.original),
        ];
    
        const sentences = totaldata.details.text.split("\n"); // 문장 단위로 나누기
        const updatedText = sentences.map((sentence, index) => {
          let parts = [sentence]; // 초기 문장은 한 덩어리로 시작
      
          // `conty`의 값을 포함하는 부분을 순차적으로 <span>으로 감싸기
          highlights.forEach((con, conIndex) => {
            const newParts = [];
            parts.forEach((part) => {
              if (typeof part === "string" && part.includes(con)) {
                const splitParts = part.split(con);
                // 매칭된 단어(con)를 하이라이트 적용
                splitParts.forEach((split, i) => {
                  newParts.push(split);
                  if (i < splitParts.length - 1) {
                    newParts.push(
                      <span key={`${index}-${conIndex}-${i}`} style={{ color: "#3B56C3" , fontWeight : "bold" }}>
                        {con}
                      </span>
                    );
                  }
                });
              } else {
                newParts.push(part);
              }
            });
            parts = newParts; // 업데이트된 parts로 교체
          });
      
          return (
            <span key={index} onClick={() => checkSentenceGrammar(sentence)}>
              {parts}
              <br />
            </span>
          );
        });
        setHighlightedText(updatedText);
        
      };
      // 문법 오류 확인하는 함수 
      const checkSentenceGrammar = (sen) => {
        const polite = totaldata.details.Grammar.politeness
        const comple = totaldata.details.Grammar.sent_completion
        const voca = totaldata.details.Grammar.voca
    
        const result = {
          polite : polite.filter((a) => sen.includes(a.original)),
          comple : comple.filter((a) => sen.includes(a.original)),
          voca : voca.filter((a) => sen.includes(a.original)),
        }
        console.log(result)
        setGrammerErr(result)
        setFlag(true)
        
      };
    
      // 내용 확인하는 함수 
      const handleContentsHighlight = () => {
        resetToOriginalText(); // 원문 초기화
        setFlag(false);
        setFlag3(false)
        setFlag4(false)
        setGrammerErr("");
      
        const conty = [...totaldata.details.Contents.map((item) => item.origin)];
        console.log("conty", conty);
      
        const sentences = totaldata.details.text.split("\n"); // 문장 단위로 나누기
      
        const updatedText = sentences.map((sentence, index) => {
          let parts = [sentence]; // 초기 문장은 한 덩어리로 시작
      
          // `conty`의 값을 포함하는 부분을 순차적으로 <span>으로 감싸기
          conty.forEach((con, conIndex) => {
            const newParts = [];
            parts.forEach((part) => {
              if (typeof part === "string" && part.includes(con)) {
                const splitParts = part.split(con);
                // 매칭된 단어(con)를 하이라이트 적용
                splitParts.forEach((split, i) => {
                  newParts.push(split);
                  if (i < splitParts.length - 1) {
                    newParts.push(
                      <span key={`${index}-${conIndex}-${i}`} style={{ color: "#3B56C3" , fontWeight : "bold" }}>
                        {con}
                      </span>
                    );
                  }
                });
              } else {
                newParts.push(part);
              }
            });
            parts = newParts; // 업데이트된 parts로 교체
          });
      
          return (
            <span key={index} onClick={() => checkSentenceContents(sentence)}>
              {parts}
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

      const handleTotal = () => {
        setFlag(false)
        setFlag2(false)
        setFlag3(false)
        setFlag4(true)
      }
      
    
    


    return (
      <div ref={ref} style={styles.analysisContainer}>
        <h1 style={styles.title}>상세 분석</h1>
        <p style={styles.subtitle}>
         발화 분석에 대해 상세하게 알려드릴게요!
        </p>
        <div style={styles.content}>
          <div style={styles.leftBox}>
          <p style ={{whiteSpace: "pre-line"}}>{highlightedText}</p>
          </div>
         
          <div style={styles.rightBox}>
            {/* 진행률 바 */}
            <div style={styles.progressBar}>

            <div style={{ ...styles.bar, ...styles.bar1, width: "50%" , fontSize : 14 , fontWeight : "bold" }}
              onClick ={handleGrammarsHighlight}
              >문법</div>

             <div style={{ ...styles.bar, ...styles.bar2, width: "50%" , fontSize : 14 , fontWeight : "bold" }}
              onClick={handleContentsHighlight}>내용</div>
             
              <div style={{ ...styles.bar, ...styles.bar3, width: "50%" ,fontSize : 14 , fontWeight : "bold" }}
              onClick={handleClarityHighlight}
              >명확성</div>
             
              
            
              

            <div style={{ ...styles.bar, ...styles.bar3, width: "50%" , fontSize : 14 , fontWeight : "bold" }}
              onClick ={handleTotal}
              >전체 평가</div>

            </div>
            {/* 오른쪽 하단 박스 */}
            <div style={styles.analysisBox}>
            {flag ? (
          <div>

            {grammarErrors.polite.length > 0 && (
              <div>
                <h4 style={{ color : "#3B56C3"
                ,fontSize: "1rem", // 글씨 크기 증가
                fontWeight: "bold",
                marginBottom: "10px",
                textAlign : "center" }}>높임 표현</h4>
                {grammarErrors.polite.map((item, index) => (
                  <p key={index}>
                    "{item.original}"은 "{item.corrected}"로 수정해야 합니다 <br/>
                    ({item.reason})
                  </p>
                ))}
              </div>
            )}

            {grammarErrors.comple.length > 0 && (
              <div>
                <h4 style={{ color : "#3B56C3"
                ,fontSize: "1rem", // 글씨 크기 증가
                fontWeight: "bold",
                marginBottom: "5px",
                textAlign : "center" }}>문장 완성</h4>
                {grammarErrors.comple.map((item, index) => (
                  <p key={index}>
                    "{item.original}"를 "{item.corrected}"로 수정해야 합니다 <br/>
                    ({item.reason})
                  </p>
                ))}
              </div>
            )}

            {grammarErrors.voca.length > 0 && (
              <div>
                <h4 style={{ color : "#3B56C3"
                ,fontSize: "1rem", // 글씨 크기 증가
                fontWeight: "bold",
                marginBottom: "5px" ,
                textAlign : "center"}}>어휘</h4>
                {grammarErrors.voca.map((item, index) => (
                  <p key={index}>
                    "{item.original}"를 "{item.corrected}"로 수정해야 합니다 <br/>
                    ({item.reason})
                  </p>
                ))}
              </div>
            )}

          </div>
        ) : <div></div> }
    
    {flag2 ? (<div>
      {grammarErrors.length > 0 && (
              <div>
                <h4 style={{ color : "#3B56C3"
                ,fontSize: "1rem", // 글씨 크기 증가
                fontWeight: "bold",
                marginBottom: "5px" ,
                textAlign : "center" }}>내용</h4>
                {grammarErrors.map((item, index) => (
                  (item.correct).length === 0 ? <p key={index}>
                  "{item.origin}"는 사용하지 말아야 합니다 <br/>
                  ({item.reason})
                </p> :  <p key={index}>
                  "{item.origin}"를 "{item.correct}"로 수정해야 합니다 <br/>
                  ({item.reason})
                </p> 
                 
                ))}
              </div>
            )}

    </div>) : <></>}
    {flag3 ? <div></div> : <div> </div>}  
    {flag4 ? (
      <div><RadiusChart dataset = {chartdata} /></div>
    ) : <div> </div> }

            </div>
          </div>
        </div>
      </div>
    );
  }
  
  const styles = {
    analysisContainer: {
      fontFamily: "Arial, sans-serif",
      margin: "10px 70px",
      padding: "20px",
    },
    title: {
      fontSize: "40px",
      fontWeight: "bold",
      marginBottom: "10px",
    },
    subtitle: {
      fontSize: "24px",
      color: "#26262C",
      marginBottom: "20px",
    },
    content: {
      display: "flex",
      gap: "20px",
    },
    leftBox: {
      flex: 1,
      height: "400px",
      backgroundColor: "#E3E5E6", // 배경색 수정
      borderRadius: "10px",
      
      textAlign: "left", // 텍스트 중앙 정렬
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px",
      overflowY: "auto", // 세로 스크롤만 활성화
      overflowX: "hidden", // 가로 스크롤 방지
      scrollbarWidth: "thin", // 스크롤바 두께 (Firefox 전용)
      scrollbarColor: "#888 #e3e5e6", // 스크롤바 색상 (Firefox 전용)
      wordBreak: "break-word", // 단어 단위로 줄바꿈
  whiteSpace: "pre-wrap", // 공백과 줄바꿈 유지
    },
    rightBox: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      gap: "20px",// 배경색 수정
      borderRadius: "10px",
      padding: "20px",
      backgroundColor: "#f0f1f2", 
    },
    progressBar: {
      display: "flex",
      flexDirection: "row",
      gap: "5px",
    },
    bar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      fontSize: "14px",
      borderRadius: "25px",
      height: "50px",
      padding: "0 5px",
      marginTop: "10px",
    },
    bar1: {
      backgroundColor: "#4a90e2",
    },
    bar2: {
      backgroundColor: "#6ca8f0",
    },
    bar3: {
      backgroundColor: "#8bc1ff",
    },
    analysisBox: {
      height: "280px",
      backgroundColor: "#E3E5E6", // 배경색 수정
      borderRadius: "10px",
      overflowY: "auto", // 스크롤바 활성화
      textAlign: "center", // 텍스트 중앙 정렬
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start", // 텍스트 위에서 시작
      padding: "20px",
      textAlign: "left", // 텍스트 왼쪽 정렬
      whiteSpace: "pre-wrap", // 텍스트 줄바꿈 활성화
      overflowWrap: "break-word", // 긴 단어를 줄바꿈
    },
    highlightedText: {
      fontSize: "1.2rem", // 크기 증가
      textAlign: "center", // 중앙 정렬
    },
  };

  export default forwardRef(Sebucheck);