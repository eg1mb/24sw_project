import { useState } from "react"
import WeakStrongModal from "./Weak_Strong_Modal"

const WeakStrong = ({weak_strong, User}) => {
  const [isOpen, setIsOpen] = useState(false)

  const clickModal = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div>
      <div style={styles.main}>
        <div style={styles.titleBox}>
          <div  style={styles.title}>
            <p>&#x1f5e3; {User.name} 님의 장점과 단점은?</p>
          </div>
          <button
              type="button"
              style={styles.button}
              onClick={clickModal}
            >
              +
            </button>
        </div>
        <div style={styles.contentWrapper}>
          <div>
            <div style={styles.title}>
              <p>&#x1F44D; 나의 장점은?</p>
            </div>
            <div style={styles.content}>
              <ul>
                {weak_strong.strength.map((a, i) => {
                  if (i < 3) {
                    return (
                      <li style={styles.list} key={i}>{a}</li>
                    )
                  }
                  return null;
                })}
              </ul>
            </div>
          </div>
          <div>
            <div style={styles.title}>
              <p>&#x1F44E; 나의 단점은?</p>
            </div>
            <div style={styles.content}>
              <ul>
                {weak_strong.weakness.map((a, i) => {
                  if (i < 3) {
                    return (
                      <li style={styles.list} key={i}>{a}</li>
                    )
                  }
                  return null;
                })}
              </ul>
            </div>
          </div>
        </div>
        {isOpen && <WeakStrongModal clickModal={clickModal} isOpen={isOpen} setIsOpen={setIsOpen} WeakStrong={weak_strong}/>}
      </div>
    </div>
  )
}

const styles = {
  main: {
    position: "relative",
    width: "auto",
    height: "auto",
    maxWidth: "100%",
    maxHeight: "400px",
    borderRadius: "10px",
    backgroundColor: "#1B4495",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    color: "white",
  },
  titleBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    itemAlign: 'center',
  },
  title: {
    padding: "20px",
    fontSize: "30px",
    fontWeight: "bold",
    textAlign: "left",
    latterSpacing: "0px",
  },
  contentWrapper: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: 'minmax(250px, auto)'
  },
  content: {
    paddingLeft: "30px",
    fontWeight: "600",
    latterSpacing: "0px",
  },
  list:{
    listStyle: 'inside',
    margin: '10px',
  },
  button: {
    display: "inline-block",
    margin: "10px",
    width: "3.5rem",
    height: "3.5rem",
    borderRadius: "50%",
    fontSize: "14px",
    fontWeight: "600",
    latterSpacing: "0px",
    color: "#1B4495",
    backgroundColor: "white",
  },
}

export default WeakStrong