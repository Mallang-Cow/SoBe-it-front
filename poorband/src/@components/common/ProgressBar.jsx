import React, { useState } from "react";
import { styled } from "styled-components";

export default function ProgressBar(props) {
  const { basecolor, barcolor, percentage, reverse } = props;
  return (
    <>
      <BaseBar reverse={reverse} basecolor={basecolor}>
        <ColorBar barcolor={barcolor} percentage={percentage}></ColorBar>
      </BaseBar>
    </>
  );
}
const BaseBar = styled.div`
  border-radius: 5rem;
  background-color: ${({ basecolor }) => basecolor};
  display: flex;
  justify-content: ${({ reverse }) => (reverse === 0 ? "start" : "end")};
  height: 1.2rem;
  width: 100%;
`;
const ColorBar = styled.div`
  border-radius: 5rem;
  background-color: ${({ barcolor }) => barcolor};
  width: ${({ percentage }) => percentage}%;
  height: 1.2rem;
`;
