import React from "react";
import { ARTICLE_DETAIL } from "../../../core/articleData";
import { styled } from "styled-components";
import { TIER } from "../../../core/tierImage";
import ProgressBar from "../common/ProgressBar";

export default function ChallengeCard() {
  return (
    <ChallengeCardWrapper>
      <HeaderWrapper>
        <ProfileWrapper>
          <img id="profile-img" src={ARTICLE_DETAIL.user.profileImageUrl} alt="프로필사진" />
          <p className="nickname">{ARTICLE_DETAIL.user.nickname}</p>
          <p className="userId">@userId</p>
          <img id="tier-img" src={TIER["BRONZE"]} alt="티어" />
        </ProfileWrapper>

        <OptionWrapper>
          <p className="bold">진행중</p>
          <button>
            <span class="material-symbols-rounded">close</span>
          </button>
        </OptionWrapper>
      </HeaderWrapper>

      <ChallengeTitle>
        <p> 도전과제 제목</p>
      </ChallengeTitle>

      <ChallengeDate>
        <p className="name">기간</p>
        <p className="value">2023-05-12 ~ 2023-05-18</p>
      </ChallengeDate>

      {/* 날짜 경과 그래프 */}
      <ProgressBarWrapper>
        <ProgressBar reverse={0} basecolor={"#C4C4C4"} barcolor={"#845EC2"} percentage={50}></ProgressBar>
        <p className="desc">달성일수 3/6</p>
      </ProgressBarWrapper>
      <ChallengeDate>
        <p className="name">목표 금액</p>
        <p className="value">{(10000).toLocaleString("en-US")}원</p>
      </ChallengeDate>
      <ChallengeDate>
        <p className="name">잔여 금액</p>
        <p className="value">{(5000).toLocaleString("en-US")}원</p>
      </ChallengeDate>

      {/* 소비(잔여금액)와 도전금액 비교 그래프 */}
      <ProgressBarWrapper>
        <ProgressBar reverse={0} basecolor={"#C4C4C4"} barcolor={"#845EC2"} percentage={50}></ProgressBar>
        <p className="desc">잔여금액 50%</p>
      </ProgressBarWrapper>
    </ChallengeCardWrapper>
  );
}
const ChallengeCardWrapper = styled.section`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 2rem;
  margin-bottom: 2rem;
  ${({ theme }) => theme.shadows.card};

  p.name {
    color: ${({ theme }) => theme.colors.darkgrey_2};
    ${({ theme }) => theme.fonts.regular};
    font-size: 1.6rem;
  }
  p.value {
    color: ${({ theme }) => theme.colors.black};
    ${({ theme }) => theme.fonts.bold};
    font-size: 1.6rem;
  }
  p.desc {
    color: ${({ theme }) => theme.colors.darkgrey_1};
    ${({ theme }) => theme.fonts.regular};
    font-size: 1.2rem;
    margin: 0.5rem 0;
    display: flex;
    justify-content: end;
    text-align: right;
  }
`;

const HeaderWrapper = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.4rem;
  margin: 1rem 0;
  padding: 0.5rem 0;
`;

const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;

  p.nickname {
    ${({ theme }) => theme.fonts.bold};
    margin: 0 0.5rem 0 1rem;
  }
  p.userId {
    color: ${({ theme }) => theme.colors.darkgrey_1};
    margin: 0 0.5rem;
  }
  #profile-img {
    width: 4rem;
    height: 4rem;
    border-radius: 1rem;
  }

  #tier-img {
    width: 2rem;
    height: 2rem;
  }
`;
const OptionWrapper = styled.div`
  display: flex;
  align-items: center;

  button {
    margin-left: 1rem;
  }
`;

const ChallengeTitle = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  ${({ theme }) => theme.fonts.bold};
  font-size: 1.6rem;
  padding: 1rem 0;
  border-top: 1px solid ${({ theme }) => theme.colors.lightgrey_1};
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightgrey_1};
`;

const ChallengeDate = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
`;

const ProgressBarWrapper = styled.div`
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
