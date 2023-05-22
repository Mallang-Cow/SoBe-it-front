import React from "react";
import { graphData } from "../../../core/graphData";
import { styled } from "styled-components";
import { ResponsivePie } from "@nivo/pie";
import { ResponsiveBar } from "@nivo/bar";

export default function ConsumptionGraph() {
  return (
    <Body>
      <Year>
        <p>2023년</p>
      </Year>
      <Month>
        <span class="material-symbols-outlined">arrow_back_ios</span>
        <p>5월</p>
        <span class="material-symbols-outlined">arrow_forward_ios</span>
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
      <BarWrapper></BarWrapper>
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
  font-size: 1.8rem;
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

const BarWrapper = styled.div``;
