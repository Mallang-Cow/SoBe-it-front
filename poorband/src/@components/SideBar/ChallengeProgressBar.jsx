import React, { useState } from "react";
import { styled } from "styled-components";

export default function ChallengeProgressBar(props) {
  const { basecolor, barcolor, percentage } = props;
  return (
    <>
      <BaseBar basecolor={basecolor}>
        <ColorBar barcolor={barcolor} percentage={percentage}></ColorBar>
      </BaseBar>
    </>
  );
}
const BaseBar = styled.div`
  background-color: ${({ basecolor }) => basecolor};
  height: 1.2rem;
  width: 100%;
`;
const ColorBar = styled.div`
  background-color: ${({ barcolor }) => barcolor};
  width: ${({ percentage }) => percentage}%;
  height: 1.2rem;
`;
