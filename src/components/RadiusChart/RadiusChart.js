import { Radar } from "react-chartjs-2";

const RadiusChart = ({ dataset }) => {
  const COLOR = {
    ORANGE_1: 'rgba(255, 108, 61, 1)',
    GRAY_9E: 'rgba(158, 158, 158, 1)',
    BLACK: '#000000',
  };

  const data = {
    labels: [
      "속도", 
      "크기", 
      "내용 적절성", 
      "어휘 적절성", 
      "문장 완성도", 
      "높임 표현", 
      "명료함"
    ], // 각 축의 이름
    datasets: [
      {
        data: dataset, // 배열로 전달된 값
        backgroundColor: "rgba(59, 86, 195, 0.2)", // 반투명 배경 색
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
          stepSize: 2.5,
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
    },
    animation: {
      duration: 0,
    },
  };


  return <Radar data={data} options={options} />;
};

export default RadiusChart;
