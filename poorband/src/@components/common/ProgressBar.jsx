import React, { useState } from "react";
import { styled } from "styled-components";

export default function ProgressBar(props) {
  const { baseColor, barColor, percentage } = props;
  return (
    <>
      <BaseBar baseColor={baseColor}>
        <ColorBar barColor={barColor} percentage={percentage}></ColorBar>
      </BaseBar>
    </>
  );
}
const BaseBar = styled.div`
  border-radius: 5rem;
  background-color: ${({ baseColor }) => baseColor};
  height: 1.2rem;
  width: 100%;
`;
const ColorBar = styled.div`
  border-radius: 5rem;
  background-color: ${({ barColor }) => barColor};
  width: ${({ percentage }) => percentage}%;
  height: 1.2rem;
`;
