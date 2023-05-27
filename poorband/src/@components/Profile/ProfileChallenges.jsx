import React, { useEffect, useState } from "react";
import ChallengeCard from "./ChallengeCard";
import { styled } from "styled-components";
import { ARTICLE_DETAIL } from "../../../core/articleData";
import { TIER } from "../../../core/tierImage";
import ChallengeCardMakeBtn from "./ChallengeCardMakeBtn";
import ChallengeCardMake from "./ChallengeCardMake";
import { getChallengeCntData } from "../../../api/getChallengeCntData";
import { useMutation } from "react-query";
import { getChallengeData } from "../../../api/getChallengeData";

export default function ProfileChallenges(props) {
  const{userId}=props;
  const[showChallengeMake, setShowChallengeMake] = useState(false)
  const[data, setData] = useState();

  useEffect(() => {
    data && console.log(data);
  }, [data]);

  useEffect(() => {
    cntUserId({userId:userId});
  }, [userId]);
  
  const {mutate: cntUserId} = useMutation (getChallengeCntData,{
    onSuccess: (response) => {
      console.log(response);
      setData(response);
    },
    onError: () => {
      console.log("error");
    },
  });

  useEffect(() => {
    challengeUserId({userId:userId});
  }, [userId]);

  const {mutate: challengeUserId} = useMutation (getChallengeData,{
    onSuccess: (response) => {
      console.log(response);
      setData(response);
    },
    onError: () => {
      console.log("error");
    },
  });

  return (
    <ProfileChallengesWrapper>
      {/* 자기 페이지인 경우 도전과제 추가 버튼 & 도전과제 현황 보여주기 */}
      {data?.status === 1 && (
        <ChallengeMineWrapper>
          {!showChallengeMake?<ChallengeCardMakeBtn showChallengeMake={showChallengeMake} setShowChallengeMake={setShowChallengeMake}/>:<ChallengeCardMake showChallengeMake={showChallengeMake} setShowChallengeMake={setShowChallengeMake}/>}
          
          <ChallengeCnt>
            <div>
              <span>성공한 도전과제</span>
              <span className="bold">{data?.successGoalAmountCnt}개/{data?.goalAmountCnt}개</span>
            </div>
          </ChallengeCnt>

          <NextTierCnt>
            <div>
              <span>다음 등급까지</span>
              <img id="tier-img" src={TIER[data?.user.userTier]} alt="티어" />
              <span className="bold">3개</span>
            </div>
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

const ChallengeMineWrapper = styled.section`

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