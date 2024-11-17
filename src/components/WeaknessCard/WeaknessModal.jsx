import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react"

const WeaknessModal = ({ clickModal, isOpen, setIsOpen, weaknesses }) => {
  return (
    <>
      <Dialog open={isOpen} onClose={setIsOpen} style={styles.dialog}>
        <DialogBackdrop style={styles.diaBack} className="data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in" />
        <div style={styles.main}>
          <DialogPanel style={styles.diaPanel}>
            <DialogTitle style={styles.title}>&#x1F44E; 나의 약점</DialogTitle>
            <ul style={styles.content}>
              {weaknesses.map((a, i) => (
                <li className="m-1" key={i}>{a}</li>
              ))}
            </ul>
            <div style={styles.button}>
              <button
                type="button"
                style={styles.button_sub}
                onClick={clickModal}
              >
                닫기
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
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
    width: "auto",
    height: "auto",
    maxWidth: "700px",
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
  content: {
    fontWeight: "600",
    latterSpacing: "0px",
    color: "white",
    paddingLeft:"10px",
  },
  button: {
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

export default WeaknessModal