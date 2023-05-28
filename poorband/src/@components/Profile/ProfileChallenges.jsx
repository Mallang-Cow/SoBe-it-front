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
import { useRecoilState } from "recoil";
import { nowUserState } from "../../recoil/nowUserInfo";

export default function ProfileChallenges(props) {
  const[ nowUser ] = useRecoilState(nowUserState);
  const{userId}=props;
  const[showChallengeMake, setShowChallengeMake] = useState(false);
  const[cntData, setCntData] = useState();
  const[data, setData] = useState();
  const[challenges, setChallenges] = useState()

  useEffect(() => {
    console.log(userId);
    challengeCnt({userId:userId});
  }, []);
  
  // 도전과제 카운트 가져오기
  const {mutate: challengeCnt} = useMutation (getChallengeCntData,{
    onSuccess: (response) => {
      console.log("challengeCnt response: " + response);
      setCntData(response);
    },
    onError: () => {
      console.log("error");
    },
  });

  useEffect(() => {
    challengeData({userId:userId});
  }, []);

  //도전과제 정보 가져오기
  const {mutate: challengeData} = useMutation (getChallengeData,{
    onSuccess: (response) => {
      console.log("challengeData" + response.data[0]);
      setChallenges(response.data);

    },
    onError: () => {
      console.log("error");
    },
  });

  return (
    <ProfileChallengesWrapper>
      {/* 자기 페이지인 경우 도전과제 추가 버튼 & 도전과제 현황 보여주기 */}
      {userId === nowUser.userId&& (
        <ChallengeMineWrapper>
          {!showChallengeMake?
            <ChallengeCardMakeBtn showChallengeMake={showChallengeMake} setShowChallengeMake={setShowChallengeMake}/>
            :<ChallengeCardMake showChallengeMake={showChallengeMake} setShowChallengeMake={setShowChallengeMake}/>
          }
          
          <ChallengeCnt>
            <div>
              <span>성공한 도전과제</span>
              <span className="bold">
                {cntData?.successGoalAmountCnt}개/
                {cntData?.goalAmountCnt}개
              </span>
            </div>
          </ChallengeCnt>

          <NextTierCnt>
            <div>
              <span>다음 등급까지</span>
              <img 
                id="tier-img" 
                src={TIER[ARTICLE_DETAIL.user.userTier]} 
                alt="티어" />
              <span className="bold">
                ({data?.goalAmountCnt}-{data?.successGoalAmountCnt})개
              </span>
            </div>
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

const ChallengeCardListWrapper = styled.section`
  
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

const ChallegeWrapper = styled.section`
  margin: 2.5rem 0;
`;