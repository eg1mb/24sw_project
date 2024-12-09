import { Radar } from "react-chartjs-2";

const dataValues = [65, 59, 90, 81, 56, 70, 85];
const RadiusChart = ({ dataset }) => {
  const COLOR = {
    ORANGE_1: 'rgba(255, 108, 61, 1)',
    GRAY_9E: 'rgba(158, 158, 158, 1)',
    BLACK: '#000000',
  };

  const data = {
    labels: [
      "속도", 
      "음성량", 
      "명확성" ,
      "내용 적절성", 
      "어휘 적절성", 
      "문장 완성도", 
      "높임 표현"
    ], // 각 축의 이름
    datasets: [
      {
        data: dataset, // 배열로 전달된 값
        backgroundColor: "rgba(59, 86, 195, 0.8)", // 반투명 배경 색
        borderColor: "#3B56C3", // 테두리 색상
        borderWidth: 2,
        pointBackgroundColor: 'transparent',
        pointBorderColor: 'transparent',
      },
    ],
  };

  const options = {
    elements: {
      line: {
        borderWidth: 2,
        borderColor: COLOR.ORANGE_1,
      },
      point: {
        pointBackgroundColor: COLOR.ORANGE_1,
      },
    },
    scales: {
      r: {
        ticks: {
          stepSize: 10,
          display: false,
        },
        grid: {
          color: COLOR.GRAY_9E,
        },
        pointLabels: {
          font: {
            size: 12,
            weight: '700',
            family: 'Pretendard',
          },
          color: COLOR.BLACK,
        },
        angleLines: {
          display: false,
        },
        suggestedMin: 0,
        suggestedMax: 10,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        display: true, // 숫자 표시
        color: 'black',
        font: {
          weight: 'bold',
          size: 12,
        },
        formatter: (value) => {
          return value; // 각 데이터 값을 그대로 숫자로 표시
        },
        anchor: 'end', // 숫자가 데이터 포인트 외곽에 위치하도록
        align: 'top', // 숫자가 포인트 위에 위치하도록
      },
    },
    animation: {
      duration: 1,
    },
  };


  return <Radar data={data} options={options} />;
};

export default RadiusChart;
