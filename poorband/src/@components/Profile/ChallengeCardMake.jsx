import React, { useState } from 'react'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { styled } from 'styled-components';
import { ko } from "date-fns/esm/locale";

export default function ChallengeCardMake(props) {
  const {setShowChallengeMake}=props;
  
  const [cTitle, setCTitle] = useState("");
  const [cStartDate, setCStartDate] = useState(new Date);
  const [cEndDate, setCEndDate] = useState(new Date);
  const [cRoutine, setCRoutine] = useState("DAILY");
  const [cGoalAmount, setCGoalAmount] = useState(null);

  const [newChallenge, setNewChallenge] = useState({
    "title":cTitle,
    "startDate":cStartDate,
    "endDate":cEndDate,
    "routine":cRoutine,
    "goalAmount":cGoalAmount,
    "isSuccess":"진행중"
  });

  let getToday = new Date();
  let year = getToday.getFullYear(); // 년도
  let month = getToday.getMonth() + 1;  // 월
  let date = getToday.getDate();  // 날짜
  let today = year + "-" + month +"-"+date;

  const handleChallengeInput = (event) => {
    setCTitle((prev)=>({...prev,cTitle:event.target.value}));
  };

  const handleStartDate = (event) => {
    setCStartDate((prev)=>({...prev,cStartDate:event.target.value}));
  };

  const handleEndDate = (event) => {
    setCEndDate((prev)=>({...prev,cEndDate:event.target.value}));
  };

  const handleRoutine = (event) => {
    setCRoutine(event.target.value);
  };

  const addComma = (price) => {
    let returnString = price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return returnString;
  }

  const handleAmountChange = (e) => {
    const { value } = e.target;
    let str = value.replaceAll(",", "");
    setCGoalAmount(str);
  };

  function submitNewChallenge() {
    if(newChallenge.title&&newChallenge.startDate&&newChallenge.endDate&&newChallenge.routine&&newChallenge.goalAmount&&newChallenge.isSuccess){
      //API 호출
    }
    setShowChallengeMake(false);
  };

  return (
    <>
      <ChallengeCardMakeWrapper>
        <CCMTitleWrapper>
          <ExitButton onClick={() => setShowChallengeMake(false)}>나가기</ExitButton>
          <CCMTitile>새로운 도전과제 시작하기</CCMTitile>
        </CCMTitleWrapper>
        <CCTitleWrapper>
          <span>제목</span>
          <TitleInput type="text" placeholder="제목을 입력하시오." onChange={handleChallengeInput}/>
        </CCTitleWrapper>
        <CCDateWrapper>
          <span>기간</span>
          <DatePicker selected={cStartDate} onChange={date => setCStartDate(date)} locale={ko} dateFormat="yyyy-MM-dd" />
          <span>~</span>
          <DatePicker selected={cEndDate} onChange={date => setCEndDate(date)} locale={ko} dateFormat="yyyy-MM-dd" />
        </CCDateWrapper>
        <CCEtcWrapper>
          <span>반복</span>
          <div>
            <label>
              <input
                type="radio"
                value="DAILY"
                checked={cRoutine === 'daily'}
                onChange={handleRoutine}
              />
              매일
            </label>
            <br />
            <label>
              <input
                type="radio"
                value="all"
                checked={cRoutine === 'all'}
                onChange={handleRoutine}
              />
              전체 기간
            </label>
          </div>
          <span>금액</span>
          <GoalAmountInput type="text" placeholder="금액을 입력하시오." onChange={(e) => handleAmountChange(e)} value={addComma(cGoalAmount) || ""}/>
        </CCEtcWrapper>
        <CCMButton onClick={submitNewChallenge}>저장하기</CCMButton>
      </ChallengeCardMakeWrapper>
    </>
  );
}

const ChallengeCardMakeWrapper = styled.section`
  background-color: ${({ theme }) => theme.colors.white};
`;

const CCMTitleWrapper = styled.section`
  display: flex;
`;

const ExitButton = styled.button`
  option {
    color : #FFFFFF;
  }
  width: 8rem;
  height: 2.65rem;
  border-radius: 3rem;
  background-color: #845EC2;
  ${({ theme }) => theme.fonts.bold};
  font-size: 12px;
  font-style: normal;
  color: white;
  appearance: none; // 이 행은 브라우저 기본 스타일을 제거합니다.
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 2rem;
`;

const CCMTitile = styled.title`
  display: flex;
  font-size: 12px;
  font-style: normal;
`;

const CCTitleWrapper = styled.section`
  display: flex;
`;

const TitleInput = styled.textarea`
  width: 300px;
  height: 20px;
  border: 1px solid #ddd;
  text-align: left;
  margin-left: 1.5rem;
  margin-right: 3.5rem;
  margin-top: 1.3rem;
  border-radius: 0.5rem;
`;

const CCDateWrapper = styled.section`
  display: flex;
`;

const CCEtcWrapper = styled.section`
  display: flex;
  justify-content: space-between;
`;

const GoalAmountInput = styled.input`
  width: 14rem;
  height: 2.5rem;
  border: 1px solid #ddd;
  border-radius: 0.4rem;
  text-align: center;
  font-size: 15px;
  margin-top: 1.24rem;
  color: #845EC2;
`;

const CCMButton = styled.button`
  option {
    color : #FFFFFF;
  }
  width: 8rem;
  height: 2.65rem;
  border-radius: 3rem;
  background-color: #845EC2;
  ${({ theme }) => theme.fonts.bold};
  font-size: 12px;
  font-style: normal;
  color: white;
  appearance: none; // 이 행은 브라우저 기본 스타일을 제거합니다.
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 2rem;
`;