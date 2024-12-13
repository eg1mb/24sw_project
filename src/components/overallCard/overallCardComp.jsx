const SpeedCard = ({speed}) => {
  return (
    <div style={styles.blueCard}>
      <div style={styles.title}>
        속도
      </div>
      <div style={styles.score}>
        {speed}
      </div>
    </div>
  )
}

const VolumeCard = ({volume}) => {
  return (
    <div style={styles.blueCard}>
      <div style={styles.title}>
        음성량
      </div>
      <div style={styles.score}>
        {volume}
      </div>
    </div>
  )
}

const ContentCard = ({content}) => {
  return (
    <div style={styles.grayCard}>
      <div style={styles.title}>
        내용 적절성
      </div>
      <div style={styles.score}>
        {content}
      </div>
    </div>
  )
}

const VocaCard = ({voca}) => {
  return (
    <div style={styles.grayCard}>
      <div style={styles.title}>
        어휘 적절성
      </div>
      <div style={styles.score}>
        {voca}
      </div>
    </div>
  )
}

const SentCompletionCard = ({sent_completion}) => {
  return (
    <div style={styles.grayCard}>
      <div style={styles.title}>
        문장 완성도
      </div>
      <div style={styles.score}>
        {sent_completion}
      </div>
    </div>
  )
}

const PolitenessCard = ({politeness}) => {
  return (
    <div style={styles.grayCard}>
      <div style={styles.title}>
        높임 표현
      </div>
      <div style={styles.score}>
        {politeness}
      </div>
    </div>
  )
}

const ClarityCard = ({clarity}) => {
  return (
    <div style={styles.wideCard}>
      <div style={styles.title}>
        명료함
      </div>
      <div style={styles.listContainer}>
        <ul style={styles.list}>
          <li>의미 없는 어두</li>
          <li>말 흐리기</li>
          <li>무의미한 반복</li>
        </ul>
        <div style={styles.score}>
          {clarity}
        </div>
      </div>
    </div>
  )
}

const styles = {
  blueCard : {
    width : "100%",
    height : "100%",
    minHeight : "175px",
    margin : "20px",
    borderRadius : "20px",
    backgroundColor : "#1B4495",
    color : "white",
  },
  grayCard : {
    width : "100%",
    height : "100%",
    minHeight : "175px",
    margin : "20px",
    borderRadius : "20px",
    backgroundColor : "#F5F5F5",
    color : "#3D3D3D",
  },
  wideCard : {
    width : "100%",
    minWidth : "48%",
    height : "100%",
    minHeight : "175px",
    margin : "20px",
    borderRadius : "20px",
    backgroundColor : "#1B4495",
    color : "white",
  },
  title: {
    margin : "20px",
    fontSize : "27px",
    fontWeight : "700",
  },
  score: {
    margin : "0px 20px",
    fontSize : "60px",
    fontWeight : "600",
    textAlign : "right",
  },
  listContainer : {
    display : "flex",
    flexDirection : "row",
    justifyContent : "space-between",
  },
  list: {
    listStyle: 'inside',
    margin: "0px 0px 0px 30px",
    fontSize : "18px",
    fontWeight : "400",
  },
}

export {SpeedCard, VolumeCard, ContentCard, VocaCard, SentCompletionCard, PolitenessCard, ClarityCard};
