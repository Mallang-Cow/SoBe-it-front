import React, { useState } from "react";
import { styled } from "styled-components";

export default function ProgressBar(props) {
  const { basecolor, barcolor, percentage } = props;
  return (
    <>
      <BaseBar baseColor={basecolor}>
        <ColorBar barColor={barcolor} percentage={percentage}></ColorBar>
      </BaseBar>
    </>
  );
}
const BaseBar = styled.div`
  border-radius: 5rem;
  background-color: ${({ basecolor }) => basecolor};
  height: 1.2rem;
  width: 100%;
`;
const ColorBar = styled.div`
  border-radius: 5rem;
  background-color: ${({ barcolor }) => barcolor};
  width: ${({ percentage }) => percentage}%;
  height: 1.2rem;
`;
