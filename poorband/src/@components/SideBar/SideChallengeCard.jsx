import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import ChallengeProgressBar from "./ChallengeProgressBar";
import { useMutation } from "react-query";
import { nowUserState } from "../../recoil/nowUserInfo";
import { useRecoilState } from "recoil";
import { getLatestChallenge } from "../../../api/getLatestChallenge";

export default function SideChallengeCard() {
  const [data, setData] = useState(null);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    challenge();
  }, []);

  useEffect(() => {
    setPercentage(Number(data?.goalAmount != 0) ? Number(data?.consumption) / Number(data?.goalAmount) : 0);
  }, [data]);

  const { mutate: challenge } = useMutation(getLatestChallenge, {
    onSuccess: (response) => {
      setData(response);
    },
    onError: (error) => {
      if (error.response && error.response.status === 500) {
        console.log("도전 정보 가져오기 실패");
      } else {
        console.log("오류 발생:", error.message);
      }
    },
  });
  return (
    <>
      {!data === null && !data === "" && (
        <Wrapper>
          <TitleContainer>
            <h2>Challenge</h2>
          </TitleContainer>
          <TitleWrapper>
            <p>{data?.title}</p>
          </TitleWrapper>
          <BarWrapper>
            <PeriodWrapper>
              <p>기간</p>
              <p>
                {data?.startDate} - {data?.endDate}
              </p>
            </PeriodWrapper>
            <ProgressBarWrapper>
              <ChallengeProgressBar basecolor={"#E7E7E7"} barcolor={"#845EC2"} percentage={percentage} />
            </ProgressBarWrapper>
          </BarWrapper>
          <RemainWrapper>
            <RemainDetailWrapper>
              <p className="name">지출</p>
              <p>{data?.consumption?.toLocaleString()}원</p>
            </RemainDetailWrapper>
            <RemainDetailWrapper>
              <p className="name">잔여</p>
              <p>{(data?.goalAmount - data?.consumption)?.toLocaleString()}원</p>
            </RemainDetailWrapper>
          </RemainWrapper>
        </Wrapper>
      )}
    </>
  );
}

const Wrapper = styled.div`
  padding: 2rem;
  background-color: ${({ theme }) => theme.colors.darkpurple};
  ${({ theme }) => theme.fonts.bold};
  font-size: 1rem;
  margin-bottom: 1rem;
`;

const TitleContainer = styled.div`
  text-align: center;
  font-size: 1.8rem;

  padding-bottom: 1rem;
`;
const TitleWrapper = styled.div`
  font-size: 1.4rem;
  padding: 0.7rem 0.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightgrey_1};
  border-top: 1px solid ${({ theme }) => theme.colors.lightgrey_1};
`;

const PeriodWrapper = styled.section`
  display: flex;
  font-size: 1.4rem;
  padding: 0.7rem 0.5rem;
  justify-content: space-between;
`;
const BarWrapper = styled.div`
  height: 5rem;
`;
const ProgressBarWrapper = styled.div`
  padding: 0 0.5rem;
`;

const RemainWrapper = styled.section`
  display: flex;
  padding: 0 0.5rem;
  justify-content: space-between;
  p {
    font-size: 1.4rem;
    text-align: right;
  }
  p.name {
    margin-right: 0.5rem;
  }
`;

const RemainDetailWrapper = styled.section`
  display: flex;
`;
