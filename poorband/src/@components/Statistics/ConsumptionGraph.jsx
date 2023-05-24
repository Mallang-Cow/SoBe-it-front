import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import { ResponsivePie } from "@nivo/pie";
import ProgressBar from "../common/ProgressBar";
import { CATEGORY } from "../../../core/expenditureCategory";
import { useMutation } from "react-query";
import { getStatGraph } from "../../../api/getStatGraph";

export default function ConsumptionGraph() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [data, setData] = useState([]);
  const [date, setDate] = useState({ year: year, month: month + 1 });
  const color = ["#6B53AE", "#845EC2", "#B393E8", "#C09EEC", "#D3AFF8", "#E4D3FF"];
  const [monthAmount, setMonthAmount] = useState(0);
  const [graphData, setGraphData] = useState([
    { id: 1, label: CATEGORY[1], value: 20 },
    { id: 2, label: CATEGORY[2], value: 20 },
    { id: 3, label: CATEGORY[3], value: 20 },
    { id: 4, label: CATEGORY[4], value: 20 },
    { id: 5, label: CATEGORY[5], value: 20 },
    { id: 6, label: CATEGORY[6], value: 20 },
  ]);
  useEffect(() => {
    setDate({ year: year, month: month + 1 });
  }, [month]);

  useEffect(() => {
    date && loadGraph(date);
  }, [date]);

  useEffect(() => {
    setGraphData([
      { id: 1, label: CATEGORY[1], value: Math.round((data[0]?.amount / monthAmount) * 100) },
      { id: 2, label: CATEGORY[2], value: Math.round((data[1]?.amount / monthAmount) * 100) },
      { id: 3, label: CATEGORY[3], value: Math.round((data[2]?.amount / monthAmount) * 100) },
      { id: 4, label: CATEGORY[4], value: Math.round((data[3]?.amount / monthAmount) * 100) },
      { id: 5, label: CATEGORY[5], value: Math.round((data[4]?.amount / monthAmount) * 100) },
      { id: 6, label: CATEGORY[6], value: Math.round((data[5]?.amount / monthAmount) * 100) },
    ]);
  }, [data]);

  const { mutate: loadGraph } = useMutation(getStatGraph, {
    onSuccess: (response) => {
      setData(response.data);
      setMonthAmount(response.monthAmount);
    },
    onError: () => {
      console.log("error");
    },
  });

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
    <>
      <Year>
        <p>{year}년</p>
      </Year>

      <Body>
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
          <p className="big">{monthAmount ? monthAmount?.toLocaleString("en-US") : 0}원</p>
        </Amount>
        <GraphWrapper>
          <ResponsivePie
            data={graphData}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            colors={color}
            borderWidth={1}
            borderColor={{
              from: "color",
              modifiers: [["darker", 0.2]],
            }}
            enableArcLinkLabels={false}
            arcLabel={(d) => `${d.value}%`}
            arcLabelsTextColor={"#000000"}
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
                itemWidth: 90,
                itemHeight: 20,
                itemTextColor: "#000000",
                itemDirection: "left-to-right",
                itemOpacity: 1,
                symbolSize: 20,
                symbolShape: "circle",
              },
            ]}
          />
        </GraphWrapper>
        <BarWrapper>
          {data?.map((d) => (
            <ProgressBarWrapper>
              <ProgressBarContainer>
                <p>{CATEGORY[d.id]}</p>
                <ProgressBar
                  reverse={0}
                  basecolor={"#E7E7E7"}
                  barcolor={color[d.id]}
                  percentage={(d.amount / monthAmount) * 100}></ProgressBar>
              </ProgressBarContainer>
              <p>{d.amount ? d.amount?.toLocaleString("en-US") : 0}원</p>
            </ProgressBarWrapper>
          ))}
        </BarWrapper>
      </Body>
    </>
  );
}

const Body = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 0 3rem;
`;
const Year = styled.div`
  width: 100%;
  padding: 0.5rem 0;
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  justify-content: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightgrey_1};
  p {
    color: ${({ theme }) => theme.colors.black};
    ${({ theme }) => theme.fonts.medium};
    font-size: 2rem;
    margin: 1.5rem 0;
  }
`;

const Month = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 2rem;
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
  margin-top: 1rem;
  padding: 0 2rem;
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
    justify-content: end;
    width: 100%;
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
    display: flex;
    justify-content: start;
  }
`;
