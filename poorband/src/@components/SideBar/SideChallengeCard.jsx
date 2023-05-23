import React from "react";
import { styled } from "styled-components";
import ChallengeProgressBar from "./ChallengeProgressBar";
export default function SideChallengeCard(props) {
  return (
    <Wrapper>
      <TitleWrapper>
        <p>하루 만원 챌린지🔥🔥🔥</p>
      </TitleWrapper>
      <BarWrapper>
        <span>기간</span>
        <span>23/05/10 - 23/05/31</span>

        <ProgressBarWrapper>
          <ProgressBarContainer>
            <ChallengeProgressBar baseColor={"#E7E7E7"} barColor={"#845EC2"} percentage={70}></ChallengeProgressBar>
          </ProgressBarContainer>
          <p>10,000원</p>
        </ProgressBarWrapper>
      </BarWrapper>
      <RemainWrapper>
        <div id="remain-container">
          <span className="bold">지출</span>
          <span className="gray">6,900</span>
          <span className="bold">잔여</span>
          <span className="gray">3,100</span>
        </div>
      </RemainWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 2rem 1rem;

  ${({ theme }) => theme.fonts.regular};

  #remain-container {
    display: flex;
    justify-content: flex-end;
  }
`;

const TitleWrapper = styled.div``;
const BarWrapper = styled.div`
  height: 5rem;
  background-color: ${({ theme }) => theme.colors.white};
`;
const ProgressBarWrapper = styled.div`
  padding: 2rem 1rem;
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
  display: flex;
  align-items: center;
  width: 70%;
  p {
    ${({ theme }) => theme.fonts.regular};
    color: ${({ theme }) => theme.colors.black};
    font-size: 1.6rem;
    margin-bottom: 1rem;
  }
`;

const RemainWrapper = styled.section`
  padding: 2rem;
`;
