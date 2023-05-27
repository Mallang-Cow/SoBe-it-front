import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import ChallengeProgressBar from "./ChallengeProgressBar";
import { getChallenge } from "../../../api/getChallenge";
import { useMutation, useQuery, useQueryClient } from "react-query";

export default function SideChallengeCard(props) {
  const { nowUser } = props;

  const [data, setData] = useState([]);
  const [percentage, setPercentage] = useState(0);

  const newData = {
    // userId: "test1",
    userId: nowUser?.userId,
  };

  useEffect(() => {
    // console.log(nowUser?.userId);
    challenge(newData);
  }, []);

  const { mutate: challenge } = useMutation(getChallenge, {
    onSuccess: (response) => {
      // console.log(response);
      setData(response.data[response.data.length - 1]); // 사이드바 가장 최근 도전 과제 한 개만 사용.

      setPercentage(
        response?.data[response.data.length - 1]?.consumption / response?.data[response.data.length - 1]?.goalAmount,
      ); // progress bar의 percentage
      // console.log(response.data[response.data.length - 1]);
      // console.log(response.data[response.data.length - 1].goalAmount);
      // console.log(percentage);
    },
    onError: (error) => {
      if (error.message === "Request failed with status code 500") {
        console.log("도전 정보 가져오기 실패");
      }
    },
  });
  return (
    <>
      {data && (
        <Wrapper>
          <TitleWrapper>
            <hr></hr>
            <p>{data?.title}</p>
            <hr></hr>
          </TitleWrapper>
          <BarWrapper>
            <PeriodWrapper>
              <span>기간</span>
              <span>
                {data?.startDate} - {data?.endDate}
              </span>
            </PeriodWrapper>

            <ProgressBarWrapper>
              <ProgressBarContainer>
                <ChallengeProgressBar
                  basecolor={"#E7E7E7"}
                  barcolor={"#845EC2"}
                  percentage={percentage}></ChallengeProgressBar>
              </ProgressBarContainer>
            </ProgressBarWrapper>
          </BarWrapper>
          <RemainWrapper>
            <RemainDetailWrapper>
              <span className="bold">지출</span>
              <span className="gray">{data?.consumption?.toLocaleString()}원</span>
            </RemainDetailWrapper>
            <RemainDetailWrapper>
              <span className="bold">잔여</span>
              <span className="gray">{(data?.goalAmount - data?.consumption)?.toLocaleString()}원</span>
            </RemainDetailWrapper>
          </RemainWrapper>
        </Wrapper>
      )}
    </>
  );
}

const Wrapper = styled.div`
  padding: 1rem 2rem;

  ${({ theme }) => theme.fonts.bold};
  font-size: 1rem;

  #remain-container {
  }
`;

const TitleWrapper = styled.div`
  hr {
    color: ${({ theme }) => theme.colors.lightgrey_1};
  }
`;
const BarWrapper = styled.div`
  height: 5rem;
  background-color: ${({ theme }) => theme.colors.lightgrey_1};
`;
const ProgressBarWrapper = styled.div`
  padding: 1rem 0;
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
  width: 100%;
  p {
    ${({ theme }) => theme.fonts.regular};
    color: ${({ theme }) => theme.colors.black};
    font-size: 1.6rem;
    margin-bottom: 1rem;
  }
`;

const RemainWrapper = styled.section`
  display: flex;
  justify-content: space-between;
`;

const PeriodWrapper = styled.section`
  display: flex;
  justify-content: space-between;
`;

const RemainDetailWrapper = styled.section`
  span {
    padding: 0 0.4rem;
  }
`;
