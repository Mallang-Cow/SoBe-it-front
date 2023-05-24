import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import ChallengeProgressBar from "./ChallengeProgressBar";
import { useQuery } from "react-query";
import { getChallenge } from "../../../api/challengeAPI";
import { useMutation } from "react-query";
import axios from "axios";

export default function SideChallengeCard(props) {
  const [data, setData] = useState([]);
  const newData = {
    userId: "test1",
  };

  useEffect(() => {
    challenge(newData);
  }, []);

  const { mutate: challenge } = useMutation(getChallenge, {
    onSuccess: (response) => {
      setData(response.data[response.data.length - 1]); // 사이드바 가장 최근 도전 과제 한 개만 사용.
    },
    onError: (error) => {
      if (error.message === "Request failed with status code 500") {
        alert("로그인 정보를 다시 확인해 주세요.");
      }
    },
  });

  return (
    <Wrapper>
      <TitleWrapper>
        <p>{data.title}</p>
      </TitleWrapper>
      <BarWrapper>
        <span>기간</span>
        <span>
          {data.startDate} - {data.endDate}
        </span>

        <ProgressBarWrapper>
          <ProgressBarContainer>
            <ChallengeProgressBar baseColor={"#E7E7E7"} barColor={"#845EC2"} percentage={70}></ChallengeProgressBar>
          </ProgressBarContainer>
          <p>{data.goalAmount.toLocaleString()}원</p>
        </ProgressBarWrapper>
      </BarWrapper>
      <RemainWrapper>
        <div id="remain-container">
          <span className="bold">지출</span>
          <span className="gray">{data.consumption.toLocaleString()}원</span>
          <span className="bold">잔여</span>
          <span className="gray">{(data.goalAmount - data.consumption).toLocaleString()}원</span>
        </div>
      </RemainWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 2rem 1rem;

  ${({ theme }) => theme.fonts.regular};

  #remain-container {
    display: flex;
    justify-content: flex-end;
  }
`;

const TitleWrapper = styled.div``;
const BarWrapper = styled.div`
  height: 5rem;
  background-color: ${({ theme }) => theme.colors.white};
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

const RemainWrapper = styled.section`
  padding: 2rem;
`;
