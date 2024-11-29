import { revalidatePath } from "next/cache";

const WeakStrongModal = ({ clickModal, isOpen, setIsOpen, WeakStrong }) => {
  if (!isOpen) return null;

  return (
    <>
      <div open={isOpen} onClose={setIsOpen} style={styles.dialog}>
        <div style={styles.diaBack}></div>
        <div style={styles.main}>
          <div style={styles.diaPanel}>
            <div style={styles.contentWrapper}>
              <div>
                <div style={styles.title}>&#x1F44D; 나의 강점</div>
                <ul style={styles.content}>
                  {WeakStrong.strength.map((a, i) => (
                    <li className="m-1" key={i} style={styles.list}>{a}</li>
                  ))}
                </ul>
              </div>
              <div>
                <div style={styles.title}>&#x1F44E; 나의 약점</div>
                <ul style={styles.content}>
                  {WeakStrong.weakness.map((a, i) => (
                    <li className="m-1" key={i} style={styles.list}>{a}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div style={styles.button}>
              <button
                type="button"
                style={styles.button_sub}
                onClick={clickModal}
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const styles = {
  dialog: {
    position: "relative",
    zIndex: "10",
  },
  diaBack: {
    position: "fixed",
    inset: "0px",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    transitionProperty: "opacity",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    transitionDuration: "150ms"
  },
  main: {
    position: "fixed",
    inset: "0px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },
  diaPanel: {
    position: "relative",
    width: "100%",
    height: "100%",
    maxWidth: "1000px",
    maxHeight: "400px",
    borderRadius: "10px",
    backgroundColor: "#1B4495",
    padding: "48px",
  },
  title: {
    fontSize: "30px",
    fontWeight: "bold",
    color: "white",
  },
  contentWrapper: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridGap: "25px",
  },
  content: {
    fontWeight: "600",
    latterSpacing: "0px",
    color: "white",
    paddingLeft:"10px",
  },
  list:{
    listStyle: 'inside',
    margin: '10px',
  },
  button: {
    position: "relative",
    top: "55%",
    left: "55%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    justifyContent: "end",
    alignItems: "end",
    padding: "16px"
  },
  button_sub: {
    width: "10%",
    height: "12%",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "600",
    latterSpacing: "0px",
    color: "#1B4495",
    backgroundColor: "white",
  },
}

export default WeakStrongModal
