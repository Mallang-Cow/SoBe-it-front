import React, { useState } from "react";
import { styled } from "styled-components";

export default function ChallengeProgressBar(props) {
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
  background-color: ${({ baseColor }) => baseColor};
  height: 1.2rem;
  width: 100%;
`;
const ColorBar = styled.div`
  background-color: ${({ barColor }) => barColor};
  width: ${({ percentage }) => percentage}%;
  height: 1.2rem;
`;
