import React from "react";
import ChallengeCard from "./ChallengeCard";
import { styled } from "styled-components";
import { ARTICLE_DETAIL } from "../../../core/articleData";
import { TIER } from "../../../core/tierImage";

export default function ProfileChallenges() {
  return (
    <ProfileChallengesWrapper>
      <div>ProfileChallenges</div>
      
      <ChallengeCnt>
        <div>
          <span>성공한 도전과제</span>
          <span className="bold">9개/12개</span>
        </div>
      </ChallengeCnt>

      <NextTierCnt>
        <div>
          <span>다음 등급까지</span>
          <img id="tier-img" src={TIER[ARTICLE_DETAIL.user.userTier]} alt="티어" />
          <span className="bold">3개</span>
        </div>
      </NextTierCnt>

      {/* 자기 페이지인 경우 도전과제 추가 버튼 & 도전과제 현황 보여주기 */}

      {/* 도전과제 리스트 불러오기 */}
      <ChallengeCard />
      <ChallengeCard />
      <ChallengeCard />
    </ProfileChallengesWrapper>
  );
}
const ProfileChallengesWrapper = styled.div`
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
const ChallengeCnt = styled.div`  
  display: flex;
  justify-content: right;
`;

const NextTierCnt = styled.div`  
  display: flex;
  justify-content: right;

  #tier-img {
    width: 1rem;
    height: 1rem;
  }
`;