import React, { useState } from "react";
import ChallengeCard from "./ChallengeCard";
import { styled } from "styled-components";
import { ARTICLE_DETAIL } from "../../../core/articleData";
import { TIER } from "../../../core/tierImage";
import ChallengeCardMake from "./ChallengeCardMake";

export default function ProfileChallenges() {
  const [showChallengeMake, setShowChallengeMake] = useState(false);

  const specificUserId = "test3";

  return (
    <ProfileChallengesWrapper>
      {/* 자기 페이지인 경우 도전과제 추가 버튼 & 도전과제 현황 보여주기 */}
      {ARTICLE_DETAIL.user.userId === specificUserId && (
        <ChallengeMineWrapper>
          {!showChallengeMake ? (
            <MakeButton onClick={() => setShowChallengeMake(true)}> + 새로운 도전과제 시작하기</MakeButton>
          ) : (
            <ChallengeCardMake showChallengeMake={showChallengeMake} setShowChallengeMake={setShowChallengeMake} />
          )}

          <ChallengeCnt>
            <p className="name">성공한 도전과제</p>
            <p className="cnt">9개/12개</p>
          </ChallengeCnt>

          <NextTierCnt>
            <p className="name">다음 등급까지</p>
            <img id="tier-img" src={TIER[ARTICLE_DETAIL.user.userTier]} alt="티어" />
            <p className="cnt">3개</p>
          </NextTierCnt>
        </ChallengeMineWrapper>
      )}
      {/* 도전과제 리스트 불러오기 */}
      <ChallengeCard />
      <ChallengeCard />
      <ChallengeCard />
    </ProfileChallengesWrapper>
  );
}
const ProfileChallengesWrapper = styled.section`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 3rem;

  p.bold {
    font: ${({ theme }) => theme.fonts.bold};
  }
`;

const MakeButton = styled.button`
  width: 100%;
  border-radius: 1rem;
  ${({ theme }) => theme.shadows.card};
  font: ${({ theme }) => theme.fonts.bold};
  font-size: 1.6rem;
  padding: 3rem;
  background-color: ${({ theme }) => theme.colors.lightpurple};
`;

const ChallengeMineWrapper = styled.section`
  width: 100%;
`;

const ChallengeCnt = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: end;

  font-size: 1.4rem;

  p.name {
    margin-right: 1rem;
    ${({ theme }) => theme.fonts.medium};
    color: ${({ theme }) => theme.colors.mainpurple};
  }
  p.cnt {
    width: 8rem;
    text-align: right;
    ${({ theme }) => theme.fonts.regular};
  }
`;

const NextTierCnt = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: end;
  margin-bottom: 2rem;

  font-size: 1.4rem;

  p.name {
    margin-right: 1rem;
    ${({ theme }) => theme.fonts.medium};
    color: ${({ theme }) => theme.colors.mainpurple};
  }
  p.cnt {
    width: 8rem;
    text-align: right;
    ${({ theme }) => theme.fonts.regular};
  }

  #tier-img {
    width: 1rem;
    height: 1rem;
  }
`;
