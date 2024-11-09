import React from 'react';
import { styled } from "styled-components";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const Main = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: auto; // 크기 조정
  height: auto; // 크기 조정
  max-width : 175px;
  max-height : 175px;
  
`;

const ArcContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Score = styled.div`
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 40px; // 텍스트 크기 조정
  color: #2d5ace;
  font-family: Arial, sans-serif;
  text-align: center;
`;

const Description = styled.div`
  position: absolute;
  top: 95%;
  left: 44%;
  transform: translate(-50%, -50%);
  font-size: 14px; // 텍스트 크기 조정
  color: #2d5ace;
  font-family: Arial, sans-serif;
  text-align: center;

`

export default function SemiCircleBarChart({ score, name }) {
  const Data = {
    labels: [],
    datasets: [
      {
        data: [score, 100 - score],
        backgroundColor: ["#2d5ace", "#a0a0a0"],
        borderColor: ["#2d5ace", "#a0a0a0"],
        circumference: 180, // 반원 도넛
        rotation: 270, // 도넛 회전
      },
    ],
  };

  const Options = {
    cutout: "95%",
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.formattedValue}%`;
          },
        },
      },
    },
  };

  return (
    <Main>
      <ArcContainer>
        <Doughnut data={Data} options={Options} />
        <Score>
          {score}점 
        </Score>
      </ArcContainer>
    </Main>
  );
}
