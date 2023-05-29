import React, { useEffect, useState } from "react";
import ChallengeCard from "./ChallengeCard";
import { styled } from "styled-components";
import { ARTICLE_DETAIL } from "../../../core/articleData";
import { TIER } from "../../../core/tierImage";
// import ChallengeCardMakeBtn from "./ChallengeCardMakeBtn";
import ChallengeCardMake from "./ChallengeCardMake";
import { getChallengeCntData } from "../../../api/getChallengeCntData";
import { useMutation } from "react-query";
import { getChallengeData } from "../../../api/getChallengeData";
import { useRecoilState } from "recoil";
import { nowUserState } from "../../recoil/nowUserInfo";

export default function ProfileChallenges(props) {
  const [nowUser] = useRecoilState(nowUserState);
  const { userId } = props;
  const [showChallengeMake, setShowChallengeMake] = useState(false);
  const [cntData, setCntData] = useState();
  // const[data, setData] = useState();
  const [challenges, setChallenges] = useState();
  const [ReloadChallenges, setReloadChallenges] = useState(false);

  useEffect(() => {
    console.log(userId);
    challengeCnt({ userId: userId });
  }, []);

  // 도전과제 카운트 가져오기
  const { mutate: challengeCnt } = useMutation(getChallengeCntData, {
    onSuccess: (response) => {
      console.log("challengeCnt response: " + response.nextTier);
      setCntData(response);
    },
    onError: () => {
      console.log("error");
    },
  });

  useEffect(() => {
    challengeData({ userId: userId });
  }, []);
  console.log(cntData);

  //도전과제 정보 가져오기
  const { mutate: challengeData } = useMutation(getChallengeData, {
    onSuccess: (response) => {
      setChallenges(response.data);
    },
    onError: () => {
      console.log("error");
    },
  });

  useEffect(() => {
    if (ReloadChallenges) {
      challengeData({ userId: userId });
      setReloadChallenges(false);
    }
  }, [ReloadChallenges]);
  return (
    <ProfileChallengesWrapper>
      {/* 자기 페이지인 경우 도전과제 추가 버튼 & 도전과제 현황 보여주기 */}
      {userId === nowUser.userId && (
        <ChallengeMineWrapper>
          {!showChallengeMake ? (
            <MakeButton onClick={() => setShowChallengeMake(true)}> + 새로운 도전과제 시작하기</MakeButton>
          ) : (
            <ChallengeCardMake
              showChallengeMake={showChallengeMake}
              setShowChallengeMake={setShowChallengeMake}
              setReloadChallenges={setReloadChallenges}
            />
          )}

          <ChallengeCnt>
            <p className="name">성공한 도전과제</p>
            <p className="cnt">
              {cntData?.successGoalAmountCnt}개/{cntData?.goalAmountCnt}개
            </p>
          </ChallengeCnt>
          <NextTierCnt>
            <p className="name">다음 등급까지</p>
            <img id="tier-img" src={TIER[cntData?.nextTier]} alt="티어" />
            <p className="cnt">{cntData?.leftCnt}개</p>
          </NextTierCnt>
        </ChallengeMineWrapper>
      )}

      {/* 도전과제 리스트 불러오기 */}
      <ChallengeCardListWrapper>
        {(Array.isArray(challenges) ? challenges : []).map((challenge, idx) => (
          <React.Fragment key={idx}>
            <ChallegeWrapper>
              <ChallengeCard
                profileImg={challenge.profileImg}
                nickName={challenge.nickName}
                userId={challenge.userId}
                title={challenge.title}
                goalAmount={challenge.goalAmount}
                userTier={challenge.userTier}
                isSuccess={challenge.isSuccess}
                startDate={challenge.startDate}
                endDate={challenge.endDate}
                consumption={challenge.consumption}
                goalAmountSeq={challenge.goalAmountSeq}
                setReloadChallenges={setReloadChallenges}
              />
            </ChallegeWrapper>
          </React.Fragment>
        ))}
      </ChallengeCardListWrapper>
    </ProfileChallengesWrapper>
  );
}
const ProfileChallengesWrapper = styled.section`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 3rem;

  span.bold {
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

const ChallengeCardListWrapper = styled.section``;

const NextTierCnt = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: end;
  align-items: center;
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

const ChallegeWrapper = styled.section`
  margin: 2.5rem 0;
`;
