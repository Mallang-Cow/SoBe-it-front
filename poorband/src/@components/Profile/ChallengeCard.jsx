import React from "react";
import { ARTICLE_DETAIL } from "../../../core/articleData";
import { styled } from "styled-components";
import { TIER } from "../../../core/tierImage";
import ProgressBar from "../common/ProgressBar";

export default function ChallengeCard() {
  return (
    <ChallengeCardWrapper>
      <HeaderWrapper>
          <img id="profile-img" src={ARTICLE_DETAIL.user.profileImageUrl} alt="프로필사진" />
          <span className="bold">{ARTICLE_DETAIL.user.nickname}</span>
          <span className="bold">진행중/도전과제 상태</span>
          <button>공유/구현x</button>
          <button>삭제하기</button>
      </HeaderWrapper>

      <ChallengeTitle>도전과제 제목</ChallengeTitle>

      <BarWrapper>
        <ChallengeDate>
          <span>기간</span>
          <span>2023-05-12~2023-05-18</span>
        </ChallengeDate>

        {/* 날짜 경과 그래프 */}
        <ProgressBarWrapper>
          <ProgressBarContainer>
            <ProgressBar baseColor={"#E7E7E7"} barColor={"#845EC2"} percentage={50}></ProgressBar>
          </ProgressBarContainer>
          <p>달성일수 3/6</p>
        </ProgressBarWrapper>

        <RemainWrapper>
          <div id="remain-container">
            <span className="bold">목표 금액</span>
            <span className="gray">매일 10000원</span>
            <span className="bold">잔여 금액</span>
            <span className="gray">3100원</span>
          </div>
        </RemainWrapper>

        {/* 소비(잔여금액)와 도전금액 비교 그래프 */}
        <ProgressBarWrapper>
          <ProgressBarContainer>
            <ProgressBar baseColor={"#E7E7E7"} barColor={"#845EC2"} percentage={31}></ProgressBar>
          </ProgressBarContainer>
          <p>잔여금액 31%</p>
        </ProgressBarWrapper>
      </BarWrapper>
    </ChallengeCardWrapper>  
  );
}
const ChallengeCardWrapper = styled.section`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 3rem;
  * {
    margin: 0.5rem;
  }

  hr {
    margin: 0;
    background: ${({ theme }) => theme.colors.lightgrey_1};
    height: 0.1rem;
    border: 0;
  }
  hr.dot {
    margin: 0;
    background: ${({ theme }) => theme.colors.lightgrey_1};
    height: 0.1rem;
    border: 0;
  }

  span.bold {
    font: ${({ theme }) => theme.fonts.bold};
  }
`;

const HeaderWrapper = styled.section`
  display: flex;
  justify-content: space-between;
  #profile-img {
    width: 3rem;
    height: 3rem;
    border-radius: 1rem;
  }
`;

const ChallengeTitle = styled.h1`
  display: flex;
  justify-content: center;
  font: ${({ theme }) => theme.fonts.bold};
`;

const ChallengeDate = styled.div`
  display: flex;
  justify-content: space-between;
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

const BarWrapper = styled.div`
  height: 5rem;
  background-color: ${({ theme }) => theme.colors.white};
`;

const RemainWrapper = styled.section`
  padding: 2rem;
`;