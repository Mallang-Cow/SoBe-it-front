import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { styled } from "styled-components";
import { ko } from "date-fns/esm/locale";
import { useMutation } from "react-query";
import { addNewChallnge } from "../../../api/addChallenge";

export default function ChallengeCardMake(props) {
  const { setShowChallengeMake, setReloadChallenges } = props;

  const [cTitle, setCTitle] = useState("");
  const [cStartDate, setCStartDate] = useState(new Date());
  const [cEndDate, setCEndDate] = useState(new Date());
  const [cRoutine, setCRoutine] = useState("daily");
  const [cGoalAmount, setCGoalAmount] = useState(null);

  let getToday = new Date();
  let year = getToday.getFullYear(); // 년도
  let month = getToday.getMonth() + 1; // 월
  let date = getToday.getDate(); // 날짜
  let today = year + "-" + month + "-" + date;

  const handleChallengeInput = (event) => {
    setCTitle((prev) => ({ ...prev, cTitle: event.target.value }));
  };

  const handleStartDate = (event) => {
    setCStartDate((prev) => ({ ...prev, cStartDate: event.target.value }));
  };

  const handleEndDate = (event) => {
    setCEndDate((prev) => ({ ...prev, cEndDate: event.target.value }));
  };

  const handleRoutine = (event) => {
    setCRoutine(event.target.value);
  };

  const addComma = (price) => {
    let returnString = price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return returnString;
  };

  const handleAmountChange = (e) => {
    const { value } = e.target;
    let str = value.replaceAll(",", "");
    setCGoalAmount(str);
  };

  function submitNewChallenge() {
    const addChallengeData = {
      newGoalAmountRequestDTO: {
        title: cTitle.cTitle,
        startDate: cStartDate,
        endDate: cEndDate,
        routine: cRoutine === "daily" ? 1 : 2,
        goalAmount: cGoalAmount,
      },
    };

    if (cTitle && cStartDate && cEndDate && cRoutine && cGoalAmount) {
      //API 호출
      addChallenge(addChallengeData.newGoalAmountRequestDTO);
    }
    setShowChallengeMake(false);
  }

  const { mutate: addChallenge } = useMutation(addNewChallnge, {
    onSuccess: (response) => {
      console.log(response);
      setReloadChallenges(true);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  console.log(cRoutine);

  return (
    <>
      <ChallengeCardMakeWrapper>
        <HeaderWrapper>
          <ExitButton>
            <span onClick={() => setShowChallengeMake(false)} class="material-symbols-rounded">
              close
            </span>
          </ExitButton>

          <p>새로운 도전과제 시작하기</p>
        </HeaderWrapper>

        <CCTitleWrapper>
          <p className="name">제목</p>
          <TitleInput type="text" placeholder="제목을 입력하세요." onChange={handleChallengeInput} />
        </CCTitleWrapper>

        <CCDateWrapper>
          <p className="name">기간</p>
          <DatePicker
            selected={cStartDate}
            onChange={(date) => setCStartDate(date)}
            locale={ko}
            dateFormat="yyyy-MM-dd"
          />

          <p className="wave">~</p>
          <DatePicker selected={cEndDate} onChange={(date) => setCEndDate(date)} locale={ko} dateFormat="yyyy-MM-dd" />
        </CCDateWrapper>
        <CCEtcWrapper>
          <p className="name">반복</p>
          <RadioBox>
            <label>
              <input type="radio" value="daily" checked={cRoutine === "daily"} onChange={handleRoutine} />
              <p>매일</p>
            </label>

            <label>
              <input type="radio" value="all" checked={cRoutine === "all"} onChange={handleRoutine} />
              <p>전체 기간</p>
            </label>
          </RadioBox>

          <Price>
            <p className="name">금액</p>
            <GoalAmountInput
              type="text"
              placeholder="금액을 입력하세요."
              onChange={(e) => handleAmountChange(e)}
              value={addComma(cGoalAmount) || ""}
            />
          </Price>
        </CCEtcWrapper>
        <ButtonContainer>
          <CCMButton onClick={submitNewChallenge}>저장하기</CCMButton>
        </ButtonContainer>
      </ChallengeCardMakeWrapper>
    </>
  );
}

const ChallengeCardMakeWrapper = styled.section`
  background-color: ${({ theme }) => theme.colors.lightpurple};
  ${({ theme }) => theme.shadows.card};
  border-radius: 1rem;
  padding: 2rem;

  p.name {
    ${({ theme }) => theme.fonts.regular};
    color: ${({ theme }) => theme.colors.darkgrey_1};
    font-size: 1.6rem;
    margin-right: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  p.wave {
    ${({ theme }) => theme.fonts.regular};
    color: ${({ theme }) => theme.colors.darkgrey_1};
    font-size: 1.6rem;
    margin: 0 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const HeaderWrapper = styled.section`
  display: flex;
  justify-content: start;
  align-items: center;
  margin-bottom: 1rem;

  p {
    ${({ theme }) => theme.fonts.bold};
    font-size: 1.8rem;
    display: flex;
    align-items: center;
    height: 2.4rem;
    margin-left: 1rem;
  }
`;

const ExitButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const CCMTitile = styled.title`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  font-style: normal;
`;

const CCTitleWrapper = styled.section`
  display: flex;
  margin-bottom: 1rem;
  width: 100%;
`;

const TitleInput = styled.input`
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.lightgrey_1};
  border-radius: 0.5rem;
  flex: auto;
  font-size: 1.4rem;
  padding: 0.5rem;
  ${({ theme }) => theme.fonts.regular};
`;

const CCDateWrapper = styled.section`
  display: flex;
  margin-bottom: 1rem;
  ${({ theme }) => theme.fonts.regular};
  font-size: 1.4rem;
  .react-datepicker-wrapper {
    margin: 0;
    width: fit-content;
    flex: auto;
    height: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
    background-color: ${({ theme }) => theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors.lightgrey_1};
    border-radius: 0.5rem;
  }
  .react-datepicker__input-container {
    width: 100%;
    display: flex;
    height: 100%;
    justify-content: center;
  }
  .react-datepicker-ignore-onclickoutside {
    width: fit-content;
  }
  .react-datepicker__input-container input {
    text-align: center;
    margin: 0;
    padding: 0.5rem 0;
    width: fit-content;
    ${({ theme }) => theme.fonts.medium};
    font-size: 1.2rem;
    padding: 0.7rem 0;
  }
`;

const RadioBox = styled.div`
  display: flex;
  align-items: center;
  flex: auto;
  justify-content: space-evenly;
  ${({ theme }) => theme.fonts.regular};
  font-size: 1.6rem;
  label {
    display: flex;
    align-items: center;
    flex: auto;
  }
  p {
    margin-left: 0.5rem;
    margin-right: 1rem;
  }

  input {
    margin: 0;
    accent-color: ${({ theme }) => theme.colors.mainpurple};
  }
`;

const CCEtcWrapper = styled.section`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const Price = styled.div`
  display: flex;
  align-items: center;
  width: 42%;
`;

const GoalAmountInput = styled.input`
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.lightgrey_1};
  border-radius: 0.5rem;
  flex: auto;
  font-size: 1.4rem;
  padding: 0.5rem;
  ${({ theme }) => theme.fonts.regular};
`;

const ButtonContainer = styled.section`
  display: flex;
  justify-content: right;
`;

const CCMButton = styled.button`
  margin-left: 1rem;
  border-radius: 3rem;
  height: 3rem;
  width: 8rem;
  ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.mainpurple};
  font-size: 1.4rem;
`;
