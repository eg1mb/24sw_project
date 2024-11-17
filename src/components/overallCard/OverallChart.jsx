import { Doughnut } from "react-chartjs-2";
import { styled } from "styled-components";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ArcContainer = styled.div`
  position: relative;
  width: auto;
  height: auto;
  max-width: 180px;
  max-height: 180px;
`;

export default function OverallChart({prData}) {
  const Data = {
    labels: [],
    datasets: [
      {
        data: [prData[0].score, 100 - prData[0].score],
        backgroundColor: ["#3578FF", "#a0a0a0"],
        borderWidth:0,
        labels: [prData[0].label, ""],
        radius:"85%",
        wight:1,
      },
      {
        data: [prData[1].score, 100 - prData[1].score],
        backgroundColor: ["#0044CD", "#a0a0a0"],
        borderWidth:0,
        labels: [prData[1].label, ""],
        radius: "70%",
        wight:1,
      },
      {
        data: [prData[2].score, 100 - prData[2].score],
        backgroundColor: ["#1B4495", "#a0a0a0"],
        borderWidth:0,
        labels: [prData[2].label, ""],
        radius: "55%",
        wight:1,
      },
    ],
  };

  const Options = {
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        filter: function (tooltipItem) {
          const dataset = tooltipItem.dataset;
          const index = tooltipItem.dataIndex;
          return dataset.labels && dataset.labels[index] !== "";
        },
        callbacks: {
          label: function (context) {
            const dataset = context.dataset;
            const index = context.dataIndex;
      
            const label = dataset.labels ? dataset.labels[index] || "Unknown" : "Unknown";
            const value = dataset.data[index];
      
            return `${label}: ${value}%`;
          },
        },
      },
    }
  }

  return (
    <Main>
      <ArcContainer>
        <Doughnut data={Data} options={Options} />
      </ArcContainer>
    </Main>
  );
}
