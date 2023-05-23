import React from "react";
import { styled } from "styled-components";
import ChallengeProgressBar from "./ChallengeProgressBar";
export default function SideChallengeCard(props) {
  return (
    <Wrapper>
      <SideChallengeContainer>
        <div>
          <h3>하루 만원 챌린지🔥🔥🔥</h3>
          <div id="progress-box"></div>

          <BarWrapper>
            <ProgressBarWrapper>
              <ProgressBarContainer>
                <p>test</p>
                <ChallengeProgressBar baseColor={"#E7E7E7"} barColor={"#845EC2"} percentage={70}></ChallengeProgressBar>
              </ProgressBarContainer>
              <p>10,000원</p>
            </ProgressBarWrapper>
          </BarWrapper>
          <div id="remain-container">
            <span className="bold">지출</span>
            <p className="gray">6,900</p>
            <p className="bold">잔여</p>
            <p className="gray">3,100</p>
          </div>
        </div>
      </SideChallengeContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: #eee;
  padding: 2rem 1rem;
  * {
    margin: 0.5rem;
  }
  ${({ theme }) => theme.fonts.regular};
`;

const SideChallengeContainer = styled.div`
  background-color: #eee;

  h2 {
    text-align: center;
    font-size: 2rem;
  }

  hr {
    margin: 0;
    background: ${({ theme }) => theme.colors.black};
    height: 0.1rem;
    border: 0;
  }

  #progress-box {
    width: 10rem;
    height: 5rem;
    color: blue;
  }

  #remain-container {
    display: flex;
    justify-content: flex-end;
  }
`;
const BarWrapper = styled.div`
  height: 5rem;
  background-color: ${({ theme }) => theme.colors.white};
`;
const ProgressBarWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;

  p {
    ${({ theme }) => theme.fonts.bold};
    color: ${({ theme }) => theme.colors.darkgrey_2};
    font-size: 1rem;
    display: flex;
    align-items: center;
  }
`;
const ProgressBarContainer = styled.div`
  width: 100%;
  align-items: center;
  p {
    ${({ theme }) => theme.fonts.regular};
    color: ${({ theme }) => theme.colors.black};
    font-size: 1.6rem;
    margin-bottom: 1rem;
  }
`;
