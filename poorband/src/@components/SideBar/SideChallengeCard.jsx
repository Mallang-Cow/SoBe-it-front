import React from "react";
import { styled } from "styled-components";
// import ProgressBar from "react-bootstrap/ProgressBar";
export default function SideChallengeCard(props) {
  const now = 60;

  return (
    <Wrapper>
      <SideChallengeContainer>
        <div>
          <hr></hr>
          <h3>하루 만원 챌린지🔥🔥🔥</h3>
          <hr></hr>
          <div id="progress-box"></div>
          {/* <ProgressBar now={now} label={`${now}%`} /> */}
          {/* React Bootstrap 적용 안 됨,, */}
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
  padding: 1rem;
  * {
    margin: 0.5rem;
  }
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
