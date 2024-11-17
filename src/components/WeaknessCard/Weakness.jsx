import { useState } from "react"
import WeaknessModal from "./WeaknessModal"

// backend 유저 정보
let name = "이름"
let weaknesses = ["약점 1", "약점 2", "약점 3", "정말로 왼쪽 정렬이 되었는지 확인하기 위한 내용"]

const Weakness = () => {
  const [isOpen, setIsOpen] = useState(false)

  const clickModal = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div>
      <div style={styles.main}>
        <div style={styles.title}>
          <p> &#x1F44E; 나의 단점은?</p>
          <p style={styles.title_sub}>{name} 님은...</p>
        </div>
        <div style={styles.content}>
          <ul>
            {weaknesses.map((a, i) => {
              if (i < 3) {
                return (
                  <li key={i}>{a}</li>
                )
              }
              return null;
            })}
          </ul>
        </div>
        <div style={styles.button}>
          <button
            type="button"
            style={styles.button_sub}
            onClick={clickModal}
          >
            더보기
          </button>
        </div>
        {isOpen && <WeaknessModal clickModal={clickModal} isOpen={isOpen} setIsOpen={setIsOpen} weaknesses={weaknesses}/>}
      </div>
    </div>
  )
}

const styles = {
  main: {
    position: "relative",
    width: "auto",
    height: "auto",
    maxWidth: "400px",
    maxHeight: "250px",
    borderRadius: "10px",
    backgroundColor: "#1B4495",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    color: "white",
  },
  title: {
    padding: "20px",
    fontSize: "30px",
    fontWeight: "bold",
    textAlign: "left",
    latterSpacing: "0px",
  },
  title_sub: {
    padding: "10px",
    fontSize: "20px",
    fontWeight: "600",
  },
  content: {
    paddingLeft: "30px",
    fontWeight: "600",
    latterSpacing: "0px",
  },
  button: {
    display: "flex",
    justifyContent: "end",
    alignItems: "end",
    padding: "16px"
  },
  button_sub: {
    width: "15%",
    height: "18%",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "600",
    latterSpacing: "0px",
    color: "#1B4495",
    backgroundColor: "white",
  },
}

export default Weakness