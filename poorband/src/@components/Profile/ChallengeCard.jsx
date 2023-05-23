import React from "react";
import { ARTICLE_DETAIL } from "../../../core/articleData";
import { styled } from "styled-components";
import { TIER } from "../../../core/tierImage";

export default function ChallengeCard() {
  return (
    <ChallengeCardWrapper>
      <ProfileAndBtn>
        <NicknameAndImg>
          <img id="profile-img" src={ARTICLE_DETAIL.user.profileImageUrl} alt="프로필사진" />
          <span className="bold">{ARTICLE_DETAIL.user.nickname}</span>
        </NicknameAndImg>
        <ChallengeBtn>
          <span className="bold">진행중/도전과제 상태</span>
          <button>공유/구현x</button>
          <button>삭제하기</button>
        </ChallengeBtn>
      </ProfileAndBtn>

      <ChallengeTitle>
        <div>도전과제 제목</div>
      </ChallengeTitle>

      <ChallengeDate>
        <span>기간</span>
        <span>2023-05-11~2023-05-18</span>
      </ChallengeDate>

      {/* 날짜 경과 그래프 */}

      <ChallengeDays>
        <span>달성일수 3/22</span>
      </ChallengeDays>

      <GoalAmount>
        <span>목표 금액</span>
        <span>매일 10000원</span>
      </GoalAmount>
      
      <Balance>
        <span>잔여 금액</span>
        <span>3100원</span>
      </Balance>

      {/* 소비(잔여금액)와 도전금액 비교 그래프 */}
      
      <BalancePercent>
        <span>잔여금액 31%</span>
      </BalancePercent>
    </ChallengeCardWrapper>
  );
}
const ChallengeCardWrapper = styled.div`
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

const ProfileAndBtn = styled.div`
  display: flex;
  justify-content: space-between;
`;

const NicknameAndImg = styled.div`
  display: flex;
  align-items: center;

  #profile-img {
    width: 3rem;
    height: 3rem;
    border-radius: 1rem;
  }
`;

const ChallengeBtn = styled.div`
  display: flex;
  align-items: center;
`;

const ChallengeTitle = styled.div`
  display: flex;
  justify-content: center;
  font: ${({ theme }) => theme.fonts.bold};
`;

const ChallengeDate = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChallengeDays = styled.div`
  display: flex;
  justify-content: end;
`;

const GoalAmount = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Balance = styled.div`
  display: flex;
  justify-content: space-between;
`;

const BalancePercent = styled.div`
  display: flex;
  justify-content: right;
`;