import React, { useState } from "react";
import { graphData } from "../../../core/graphData";
import { styled } from "styled-components";
import { ResponsivePie } from "@nivo/pie";
import ProgressBar from "../common/ProgressBar";
import { CATEGORY } from "../../../core/expenditureCategory";

export default function ConsumptionGraph() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());

  function increaseMonth() {
    if (month < 11) {
      setMonth(month + 1);
    } else {
      setMonth(0);
      setYear(year + 1);
    }
  }
  function decreaseMonth() {
    if (month > 0) {
      setMonth(month - 1);
    } else {
      setMonth(11);
      setYear(year - 1);
    }
  }
  return (
    <Body>
      <Year>
        <p>{year}년</p>
      </Year>
      <Month>
        <span
          className="material-symbols-outlined"
          onClick={() => {
            decreaseMonth();
          }}>
          arrow_back_ios
        </span>
        <p>{month + 1}월</p>
        <span
          className="material-symbols-outlined"
          onClick={() => {
            increaseMonth();
          }}>
          arrow_forward_ios
        </span>
      </Month>
      <Amount>
        <p className="small">이번 달 지출 금액 </p>
        <p className="big">10,000원</p>
      </Amount>
      <GraphWrapper>
        <ResponsivePie
          data={graphData}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          colors={["#6B53AE", "#845EC2", "#B393E8", "#C09EEC", "#D3AFF8", "#E4D3FF"]}
          borderWidth={1}
          borderColor={{
            from: "color",
            modifiers: [["darker", 0.2]],
          }}
          enableArcLinkLabels={false}
          arcLabel={(d) => `${d.value}%`}
          arcLabelsTextColor={"#333333"}
          arcLabelsSkipAngle={10}
          tooltip={() => <></>}
          legends={[
            {
              anchor: "bottom",
              direction: "row",
              justify: false,
              translateX: 0,
              translateY: 70,
              itemsSpacing: 0,
              itemWidth: 100,
              itemHeight: 18,
              itemTextColor: "#333333",
              itemDirection: "left-to-right",
              itemOpacity: 1,
              symbolSize: 18,
              symbolShape: "circle",
            },
          ]}
        />
      </GraphWrapper>
      <BarWrapper>
        {CATEGORY.map((c) => (
          <ProgressBarWrapper>
            <ProgressBarContainer>
              <p>{c.value}</p>
              <ProgressBar baseColor={"#E7E7E7"} barColor={"#845EC2"} percentage={20}></ProgressBar>
            </ProgressBarContainer>
            <p>10,000원</p>
          </ProgressBarWrapper>
        ))}
      </BarWrapper>
    </Body>
  );
}

const Body = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 0 3rem;
`;
const Year = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};

  border-bottom: 1px solid ${({ theme }) => theme.colors.lightgrey_1};
  p {
    color: ${({ theme }) => theme.colors.black};
    ${({ theme }) => theme.fonts.medium};
    font-size: 1.5rem;
    margin: 1.5rem 0;
  }
`;

const Month = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 1.5rem;
  ${({ theme }) => theme.fonts.medium};
  span {
    color: ${({ theme }) => theme.colors.darkgrey_1};
  }
  font-size: 1.8rem;
  span:hover {
    color: ${({ theme }) => theme.colors.black};
  }
`;

const Amount = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
  padding: 1rem 5.5rem;
  ${({ theme }) => theme.fonts.medium};
  p {
    margin: 0.3rem;
    color: ${({ theme }) => theme.colors.black};
  }
  .big {
    font-size: 2.3rem;
  }
  .small {
    font-size: 1.8rem;
  }
`;

const GraphWrapper = styled.div`
  height: 50rem;
  background-color: ${({ theme }) => theme.colors.white};
`;

const BarWrapper = styled.div`
  height: 50rem;
  background-color: ${({ theme }) => theme.colors.white};
`;
const ProgressBarWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;

  p {
    ${({ theme }) => theme.fonts.bold};
    color: ${({ theme }) => theme.colors.darkgrey_2};
    font-size: 1.8rem;
    display: flex;
    align-items: center;
    width: 12rem;
  }
`;
const ProgressBarContainer = styled.div`
  width: 100%;
  margin: 1.5rem 2rem;
  align-items: center;
  p {
    ${({ theme }) => theme.fonts.regular};
    color: ${({ theme }) => theme.colors.black};
    font-size: 1.6rem;
    margin-bottom: 1rem;
  }
`;
