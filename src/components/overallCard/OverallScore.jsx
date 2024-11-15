const OverallScore = ({prData}) => {
  return (
      <div style = {styles.main}>
        <div>이미지 1</div>
        <div>이미지 2</div>
        <div>이미지 3</div>
        {prData.map((a, i) => (
          <div style={styles.items} key = {i}><p style={styles.scores}>{a.score}</p>/100</div>
        ))}
        {prData.map((a, i) => (
          <div style={styles.items} key = {i}>{a.label}</div>
        ))}
      </div>
  )
}

export default OverallScore

const styles = {
  main:{
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    position: 'relative',
    width: 'auto',
    height: 'auto',
    textAlign: "center",
  },
  items:{
    fontFamily: "Arial, sans-serif",
    fontSize: "12px",
    fontWeight: "bold",
    lineHeight: "16px",
    letterSpacing: "0em",
    color: "#747483"
  },
  scores:{
    display: "inline",
    fontSize: "16px",
    lineHeight: "20px",
    color: "#26262c",
  },
}